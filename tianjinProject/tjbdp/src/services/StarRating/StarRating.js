import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,starList, starOption, starImport}=apiConfig;


export async function optionStar(params) {
  return request(`${host}${starOption}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listStar(params) {
  return request(`${host}${starList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function importStar(params) {
  return request(`${host}${starImport}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}