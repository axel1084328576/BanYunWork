import { stringify } from 'qs';
import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host,mailDir,company} = apiConfig;
/*
export async function getBusinessInfo() {
  return request('/api/businessInfo/getBusinessInfo');
}
*/
export async function getBusinessInfo(params) {
  return request(`${host}${mailDir}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}

export async function getCompany(params) {
  return request(`${host}${company}?${toQueryString(params)}`,{
    method:'POST',
    body:params,
  });
}

