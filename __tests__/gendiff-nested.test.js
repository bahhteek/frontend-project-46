// __tests__/gendiff-nested.test.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import genDiff from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8");

const normalize = (s) => s.trim().replace(/\r\n/g, "\n");

test("gendiff nested json stylish", () => {
  const file1 = getFixturePath("nested1.json");
  const file2 = getFixturePath("nested2.json");
  const expected = readFile("expected-stylish.txt");
  expect(normalize(genDiff(file1, file2))).toEqual(normalize(expected));
});

test("gendiff nested yaml stylish", () => {
  const file1 = getFixturePath("nested1.yml");
  const file2 = getFixturePath("nested2.yml");
  const expected = readFile("expected-stylish.txt");
  expect(normalize(genDiff(file1, file2))).toEqual(normalize(expected));
});
