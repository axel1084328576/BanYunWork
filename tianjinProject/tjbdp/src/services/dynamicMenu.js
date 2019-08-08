import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,userMenu}=apiConfig;

export async function getDynamicmenu(params) {
  // return request('/DynamicMenu/getDynamicMenu');
  return request(`${host}${userMenu}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
