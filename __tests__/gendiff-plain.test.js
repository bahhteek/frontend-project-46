import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import genDiff from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (name) =>
  path.join(__dirname, "..", "__fixtures__", name);
const read = (name) => fs.readFileSync(getFixturePath(name), "utf-8");
const norm = (s) => s.trim().replace(/\r\n/g, "\n");

test("gendiff nested json plain", () => {
  const f1 = getFixturePath("nested1.json");
  const f2 = getFixturePath("nested2.json");
  expect(norm(genDiff(f1, f2, "plain"))).toEqual(
    norm(read("expected-plain.txt"))
  );
});

test("gendiff nested yaml plain", () => {
  const f1 = getFixturePath("nested1.yml");
  const f2 = getFixturePath("nested2.yml");
  expect(norm(genDiff(f1, f2, "plain"))).toEqual(
    norm(read("expected-plain.txt"))
  );
});
