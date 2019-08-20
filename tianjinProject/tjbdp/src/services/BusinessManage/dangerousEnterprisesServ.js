import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,wqyOption, wqyImport, wqyList,wqyNet}=apiConfig;


export async function optionWqy(params) {
  return request(`${host}${wqyOption}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listWqy(params) {
  return request(`${host}${wqyList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function importWqy(params) {
  return request(`${host}${wqyImport}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listNet(params) {
  return request(`${host}${wqyNet}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}