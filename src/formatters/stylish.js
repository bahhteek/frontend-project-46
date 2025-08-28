import _ from 'lodash'

const INDENT = 4
const SIGN_INDENT_SHIFT = 2
const makeIndent = (depth, shift = 0) => ' '.repeat(depth * INDENT - shift)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    if (value === '') return ''
    return String(value)
  }

  const lines = Object.entries(value).map(
    ([k, v]) => `${makeIndent(depth + 1)}${k}: ${stringify(v, depth + 1)}`,
  )

  return `{\n${lines.join('\n')}\n${makeIndent(depth)}}`
}

const stylish = (ast) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      const { type, key } = node

      const line = (sign, val) =>
        `${makeIndent(depth, SIGN_INDENT_SHIFT)}${sign} ${key}: ${stringify(
          val,
          depth,
        )}`

      switch (type) {
        case 'added':
          return line('+', node.value)
        case 'removed':
          return line('-', node.value)
        case 'unchanged':
          return `${makeIndent(depth)}${key}: ${stringify(node.value, depth)}`
        case 'updated':
          return [line('-', node.oldValue), line('+', node.newValue)].join('\n')
        case 'nested':
          return `${makeIndent(depth)}${key}: ${`{\n${iter(
            node.children,
            depth + 1,
          )}\n${makeIndent(depth)}}`}`
        default:
          throw new Error(`Unknown node type: ${type}`)
      }
    })
    return lines.join('\n')
  }

  return `{\n${iter(ast, 1)}\n}`
}

export default stylish
