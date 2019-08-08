import { stringify } from 'qs';

import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host, menuAddOrEdit, menuDel, menuTree, menuAllTree, menuList} = apiConfig;

export async function saveOrAddMenus(params) {
  return request(`${host}${menuAddOrEdit}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delMenus(params) {
  return request(`${host}${menuDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function treeMenus(params) {
  return request(`${host}${menuTree}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function allTreeMenus(params) {
  return request(`${host}${menuAllTree}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listMenus(params) {
  return request(`${host}${menuList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
