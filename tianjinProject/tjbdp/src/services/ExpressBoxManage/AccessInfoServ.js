import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,pickup}=apiConfig;

export async function boxPick(params) {
  return request(`${host}${pickup}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
