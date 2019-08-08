import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,anyidi}=apiConfig;

export async function getEchartsData(params) {
  return request(`${host}${anyidi}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

