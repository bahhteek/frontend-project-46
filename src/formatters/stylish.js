// src/formatters/stylish.js
import _ from "lodash";

const INDENT = 4;
const SIGN_INDENT_SHIFT = 2;

const makeIndent = (depth, shift = 0) => " ".repeat(depth * INDENT - shift);

const stringify = (value, depth) => {
  // скаляры
  if (!_.isPlainObject(value)) {
    // важно: для пустой строки вернуть именно "", чтобы не добавлять пробел после ":"
    if (value === "") return "";
    return String(value);
  }

  // объекты
  const entries = Object.entries(value).map(([k, v]) => {
    const rendered = stringify(v, depth + 1);
    const sep = rendered === "" ? "" : ` ${rendered}`;
    return `${makeIndent(depth + 1)}${k}:` + sep;
  });

  return `{\n${entries.join("\n")}\n${makeIndent(depth)}}`;
};

const stylish = (ast) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      const { type, key } = node;

      const renderLine = (prefix, val) => {
        const rendered = stringify(val, depth);
        const sep = rendered === "" ? "" : ` ${rendered}`;
        return `${makeIndent(depth, SIGN_INDENT_SHIFT)}${prefix} ${key}:` + sep;
      };

      switch (type) {
        case "added":
          return renderLine("+", node.value);

        case "removed":
          return renderLine("-", node.value);

        case "unchanged": {
          const rendered = stringify(node.value, depth);
          const sep = rendered === "" ? "" : ` ${rendered}`;
          return `${makeIndent(depth)}${key}:` + sep;
        }

        case "updated":
          return [
            renderLine("-", node.oldValue),
            renderLine("+", node.newValue),
          ].join("\n");

        case "nested":
          return `${makeIndent(depth)}${key}: ${`{\n${iter(
            node.children,
            depth + 1
          )}\n${makeIndent(depth)}}`}`;

        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });

    return lines.join("\n");
  };

  return `{\n${iter(ast, 1)}\n}`;
};

export default stylish;
