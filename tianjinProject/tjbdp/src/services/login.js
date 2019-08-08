import { stringify } from 'qs';
import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host,loginDir,reloadDir,logoutDir,modifyPasswordDir}= apiConfig;
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function accountLogin(params) {
  // console.log(toQueryString(params));
  return request(`${host}${loginDir}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function accountReload(params) {
  // console.log(toQueryString(params));
  return request(`${host}${reloadDir}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function accountLogout(params) {
  // console.log(toQueryString(params));
  return request(`${host}${logoutDir}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function modifyPassword(params) {
  // console.log(toQueryString(params));
  return request(`${host}${modifyPasswordDir}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}