import { deepClone } from './base';

/* 父子关系的数组转换成树形结构 */
export function arrayTransTree(data = [], config) {
  const { id = 'id', parentId = 'parentId', children = 'children' } = config;
  let root = {};
  if (Object.keys(data).length > 0 && Array.isArray(data)) {
    const clone = deepClone(data);
    // 获取所有id在数组中的索引关系
    const idMapping = clone.reduce((acc, item, i) => {
      acc[item[id]] = i;
      return acc;
    }, {});
    clone.forEach(item => {
      // 找到根节点
      if (!item[parentId]) {
        root = item;
        return;
      }
      const parent = clone[idMapping[item[parentId]]];

      parent[children] = [...(parent[children] || []), item];
    });
  }

  return [root];
}

/* 树形结构转换成父子关系的数组 */
export function treeTransArray(data = {}, key = 'children') {
  let result = [];
  if (Object.keys(data).length > 0) {
    const clone = deepClone(Array.isArray(data) ? data : [data]);

    const loop = (con, item) => {
      con.push(item);
      if (item[key] && item[key].length > 0) {
        item[key].reduce(loop, con);
      }
      return con;
    };

    const pick = (con, item) => {
      const pickItem = {};
      Object.entries(item).forEach(([_key, _value]) => {
        if (_key !== key) pickItem[_key] = _value;
      });
      con.push(pickItem);
      return con;
    };

    result = clone.reduce(loop, []).reduce(pick, []);
  }

  return result;
}

/* 遍历嵌套树数据，取出所有checked=true对应的id */
export function getCheckedIds(data, config) {
  const { id = 'id', children = 'children', checked = 'checked' } = config;
  let result = [];
  if (Object.keys(data).length > 0) {
    const treeArr = treeTransArray(data, children);
    result = treeArr.reduce((col, m) => {
      if (m[checked]) {
        col.push(m[id]);
      }
      return col;
    }, []);
  }
  return result;
}

// 利用vue的diff算法和arrayTransTree、treeTransArray完成（无需封装）
// /* 在原数据的基础上添加（改变了原数据） */
// export function addTreeNode(tree, parentId, node, toFrist = false) {
//   const transArr = treeTransArray(tree);
//   let checked = false;
//   let res = [];
//   for (const item of transArr) {
//     if (item.id === parentId) {
//       checked = true;
//       break;
//     }
//   }
//   if (checked) {
//     const arr = toFrist ? [node, ...transArr] : [...transArr, node];
//     arrayTransTree(arr);
//   }
//   return checked;
// }

export default {
  arrayTransTree,
  treeTransArray,
  getCheckedIds,
};
