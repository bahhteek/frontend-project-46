import yaml from "js-yaml";
import path from "path";

const parse = (filepath, data) => {
  const ext = path.extname(filepath);

  switch (ext) {
    case ".json":
      return JSON.parse(data);
    case ".yml":
    case ".yaml":
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

export default parse;
