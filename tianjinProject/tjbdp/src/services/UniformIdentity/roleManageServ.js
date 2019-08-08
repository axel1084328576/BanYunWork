import { stringify } from 'qs';
import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host,addOrSaveRoleDir,delRoleDir,authorityUserDir,getRoleMenu,
    authorityMenuDir,getRoleList}= apiConfig;

/*
export async function getRoles() {
  return request('/api/roleManage/getRoles');
}
*/
export async function getRoles(params) {
  return request(`${host}${getRoleList}?${toQueryString(params)}`);
}

export async function delRoles(params) {
  return request(`${host}${delRoleDir}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}

export async function saveOrAddRole(params) {
  return request(`${host}${addOrSaveRoleDir}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}

export async function saveOrAddRoleMenu(params) {
  return request(`${host}${authorityMenuDir}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}

export async function getRoleMenus(params) {
  return request(`${host}${getRoleMenu}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}