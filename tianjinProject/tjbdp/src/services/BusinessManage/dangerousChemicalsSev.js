import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,cheOption, cheImport, cheList}=apiConfig;


export async function optionChe(params) {
  return request(`${host}${cheOption}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listChe(params) {
  return request(`${host}${cheList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function importChe(params) {
  return request(`${host}${cheImport}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}