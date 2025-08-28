import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = name => path.join(__dirname, '..', '__fixtures__', name)

const pickNode = (nodes, key) => nodes.find(n => n.key === key)
const assert = (cond, msg) => {
  if (!cond) throw new Error(msg)
}

test('gendiff nested json -> format json produces valid structured diff', () => {
  const f1 = getFixturePath('nested1.json')
  const f2 = getFixturePath('nested2.json')

  const out = genDiff(f1, f2, 'json')
  const data = JSON.parse(out)

  assert(Array.isArray(data), 'root should be an array')

  const common = pickNode(data, 'common')
  assert(common && common.type === 'nested', 'common should be nested')

  const follow = pickNode(common.children, 'follow')
  assert(
    follow && follow.type === 'added' && follow.value === false,
    'follow added false',
  )

  const setting6 = pickNode(common.children, 'setting6')
  const doge = pickNode(setting6.children, 'doge')
  const wow = pickNode(doge.children, 'wow')
  assert(
    wow &&
      wow.type === 'updated' &&
      wow.oldValue === '' &&
      wow.newValue === 'so much',
    "wow updated '' -> 'so much'",
  )

  const group2 = pickNode(data, 'group2')
  assert(group2 && group2.type === 'removed', 'group2 removed')

  const group3 = pickNode(data, 'group3')
  assert(group3 && group3.type === 'added', 'group3 added')
})

test('gendiff nested yaml -> format json valid too', () => {
  const f1 = getFixturePath('nested1.yml')
  const f2 = getFixturePath('nested2.yml')
  const out = genDiff(f1, f2, 'json')
  const data = JSON.parse(out)
  expect(Array.isArray(data)).toBe(true)
})
