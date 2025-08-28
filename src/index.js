import fs from "fs";
import path from "path";

const getFileData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath); // абсолютный путь
  const data = fs.readFileSync(fullPath, "utf-8"); // читаем содержимое
  return JSON.parse(data); // парсим JSON
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  // пока просто выводим оба объекта (позже сделаем красивый diff)
  return { data1, data2 };
};

export default genDiff;
