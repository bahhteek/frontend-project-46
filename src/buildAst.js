// src/buildAst.js
import _ from "lodash";

const isObject = (val) => _.isPlainObject(val);

const buildAst = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    const v1 = obj1[key];
    const v2 = obj2[key];
    const has1 = _.has(obj1, key);
    const has2 = _.has(obj2, key);

    if (has1 && !has2) {
      return { type: "removed", key, value: v1 };
    }
    if (!has1 && has2) {
      return { type: "added", key, value: v2 };
    }
    // оба есть
    if (isObject(v1) && isObject(v2)) {
      return { type: "nested", key, children: buildAst(v1, v2) };
    }
    if (!_.isEqual(v1, v2)) {
      return { type: "updated", key, oldValue: v1, newValue: v2 };
    }
    return { type: "unchanged", key, value: v1 };
  });
};

export default buildAst;
