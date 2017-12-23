/* eslint-disable prefer-destructuring */
import { getUrlParams } from './utils';

// mock roleListDataSource
const alphabet = ['A', 'C', 'E', 'D', 'L', 'P', 'O', 'Q', 'Z', 'R', 'B', 'X', 'F', 'M', 'N'];
let roleListDataSource = [];
for (let i = 0; i < 45; i++) {
  roleListDataSource.push({
    id: i,
    code: i * 100,
    name: `${alphabet[i % 7]} roleName`,
    description: `超级管理员 ${alphabet[i % 5]}`,
    status: 1,
    obsolete: 0,
    sort: i,
  });
}

export function getRole(req, res, u) {
  const url = (!u || Object.prototype.toString.call(u) !== '[object String]') ? req.url : u;
  // if (!url || Object.prototype.toString.call(url) !== '[object String]') {
  //   url = req.url;
  // }

  const params = getUrlParams(url);

  let dataSource = [...roleListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10)),
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postRole(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, no, description } = body;

  switch (method) {
    case 'delete':
      roleListDataSource = roleListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      roleListDataSource.unshift({
        id: i,
        code: i * 100,
        name: `${alphabet[i % 7]} roleName`,
        description: `超级管理员 ${alphabet[i % 5]} ${description}`,
        status: 1,
        obsolete: 0,
        sort: i,
      });
      break;
    default:
      break;
  }

  const result = {
    list: roleListDataSource,
    pagination: {
      total: roleListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getRole,
  postRole,
};
