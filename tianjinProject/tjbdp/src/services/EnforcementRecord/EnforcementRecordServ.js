import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,enforceList,enforceOption,enforceImport,}=apiConfig;


export async function optionEnf(params) {
  return request(`${host}${enforceOption}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listEnf(params) {
  return request(`${host}${enforceList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function importEnf(params) {
  return request(`${host}${enforceImport}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}