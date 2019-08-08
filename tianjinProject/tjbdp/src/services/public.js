import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,userpagebuttonpriv}=apiConfig;

export async function getUserPage(params) {
  return request(`${host}${userpagebuttonpriv}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
