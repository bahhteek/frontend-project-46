import plain from "./plain.js";
import stylish from "./stylish.js";

const map = { stylish, plain };

export default function getFormatter(name = "stylish") {
  const fmt = map[name];
  if (!fmt) throw new Error(`Unknown format: ${name}`);
  return fmt;
}
