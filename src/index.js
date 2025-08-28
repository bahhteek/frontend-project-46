import fs from "fs";
import _ from "lodash";
import path from "path";

const getFileData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(data);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1);
  const data2 = getFileData(filepath2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  
  const result = keys.map((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isEqual(data1[key], data2[key])) {
        return `  ${key}: ${data1[key]}`;
      }
      return [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`].join(
        "\n  "
      );
    }
    if (_.has(data1, key)) {
      return `- ${key}: ${data1[key]}`;
    }
    return `+ ${key}: ${data2[key]}`;
  });

  return `{\n  ${result.join("\n  ")}\n}`;
};

export default genDiff;
