import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,send}=apiConfig;

export async function boxSend(params) {
  return request(`${host}${send}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
