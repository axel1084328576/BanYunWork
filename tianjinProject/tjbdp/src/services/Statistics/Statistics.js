import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,anyidiTotal,company}=apiConfig;

export async function getStaEchartsData(params) {
  return request(`${host}${anyidiTotal}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function getComponeyList(params) {
  return request(`${host}${company}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

