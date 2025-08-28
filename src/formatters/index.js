import json from './json.js'
import plain from './plain.js'
import stylish from './stylish.js'

const formatters = {
  stylish,
  plain,
  json,
}

export default function getFormatter(name = 'stylish') {
  const fmt = formatters[name]
  if (!fmt) throw new Error(`Unknown format: ${name}`)
  return fmt
}
