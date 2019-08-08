import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,gyfwList, gyfwOption, gyfwImport,}=apiConfig;


export async function optionGyfw(params) {
  return request(`${host}${gyfwOption}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listGyfw(params) {
  return request(`${host}${gyfwList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function importGyfw(params) {
  return request(`${host}${ gyfwImport}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}