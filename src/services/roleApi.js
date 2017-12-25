import { stringify } from 'qs';
import request from '../utils/request';

export async function queryRole(params) {
  return request(`/api/role?${stringify(params)}`);
}

export async function removeRole(params) {
  return request('/api/role', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRole(params) {
  return request('/api/role', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
