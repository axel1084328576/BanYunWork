import { stringify } from 'qs';
import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host,saveOrAddUserDir,resetPasswordDir,getUserListDir,
  delUserDir,authorityRoleDir,userRoles}= apiConfig;

export async function getOrganizationTree() {
  return request('/api/userManage/getOrganizationTree');
} 

export async function getUserData() {
  return request('/api/userManage/getUserData');
}

export async function getRoleSelect() {
  return request('/api/userManage/getRoleSelect');
}

export async function getUserList(params){
  return request(`${host}${getUserListDir}?${toQueryString(params)}`,{
    method:'GET',
  });
}

export async function saveOrAddUsers(params){
  return request(`${host}${saveOrAddUserDir}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}

export async function saveUserRoles(params){
  return request(`${host}${authorityRoleDir}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}

export async function delUsers(params){
  return request(`${host}${delUserDir}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}

export async function resetPassword(params){
  return request(`${host}${resetPasswordDir}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  })
}


export async function getUserRoles(params){
  return request(`${host}${userRoles}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  })
}
