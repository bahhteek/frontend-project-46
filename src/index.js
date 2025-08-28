// src/index.js
import fs from 'fs'
import path from 'path'
import buildAst from './buildAst.js'
import getFormatter from './formatters/index.js'
import parse from './parsers.js'

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(fullPath, 'utf-8')
}

const getExt = filepath => path.extname(filepath).toLowerCase()

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  const parsed1 = parse(data1, getExt(filepath1))
  const parsed2 = parse(data2, getExt(filepath2))

  const ast = buildAst(parsed1, parsed2)

  const formatter = getFormatter(format)
  return formatter(ast)
}

export default genDiff
