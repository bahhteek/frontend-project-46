import _ from 'lodash'

const formatValue = val => {
  if (_.isPlainObject(val) || Array.isArray(val)) return '[complex value]'
  if (val === null) return 'null'
  if (typeof val === 'boolean' || typeof val === 'number') return String(val)
  if (typeof val === 'string') return `'${val.replace(/'/g, "\\'")}'`
  return String(val)
}

const plain = ast => {
  const iter = (nodes, ancestry) =>
    nodes.flatMap(node => {
      const { type, key } = node
      const path = [...ancestry, key].join('.')

      switch (type) {
        case 'nested':
          return iter(node.children, [...ancestry, key])

        case 'added':
          return `Property '${path}' was added with value: ${formatValue(
            node.value,
          )}`

        case 'removed':
          return `Property '${path}' was removed`

        case 'updated':
          return `Property '${path}' was updated. From ${formatValue(
            node.oldValue,
          )} to ${formatValue(node.newValue)}`

        case 'unchanged':
          return []

        default:
          throw new Error(`Unknown node type: ${type}`)
      }
    })

  return iter(ast, []).join('\n')
}

export default plain
