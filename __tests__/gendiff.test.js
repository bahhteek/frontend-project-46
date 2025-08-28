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

test("gendiff json", () => {
  const filepath1 = getFixturePath("file1.json");
  const filepath2 = getFixturePath("file2.json");
  const expected = readFile("expected.txt");
  expect(genDiff(filepath1, filepath2).trim().replace(/\r\n/g, "\n")).toEqual(
    expected.trim().replace(/\r\n/g, "\n")
  );
});

test("gendiff yaml", () => {
  const filepath1 = getFixturePath("file1.yml");
  const filepath2 = getFixturePath("file2.yml");
  const expected = readFile("expected.txt");
  expect(genDiff(filepath1, filepath2).trim().replace(/\r\n/g, "\n")).toEqual(
    expected.trim().replace(/\r\n/g, "\n")
  );
});
