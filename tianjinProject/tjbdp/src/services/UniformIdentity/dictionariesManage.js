import { stringify } from 'qs';

import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host, dictList, dictInfo,dictTypeDicttree, dictDel, dictSave} = apiConfig;

export async function saveOrAddDict(params) {
  return request(`${host}${dictSave}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delDict(params) {
  return request(`${host}${dictDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function infoDict(params) {
  return request(`${host}${dictInfo}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}


export async function listDict(params) {
  return request(`${host}${dictList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function TreeParaset(params) {
  return request(`${host}${dictTypeDicttree}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}