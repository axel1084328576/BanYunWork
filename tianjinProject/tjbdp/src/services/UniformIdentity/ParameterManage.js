import { stringify } from 'qs';

import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host, parasetList, parasetInfo,parasetDel,parasetSave} = apiConfig;

export async function saveOrAddParaset(params) {
  return request(`${host}${parasetSave}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delParaset(params) {
  return request(`${host}${parasetDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function infoParaset(params) {
  return request(`${host}${parasetInfo}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listParaset(params) {
  return request(`${host}${parasetList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}


