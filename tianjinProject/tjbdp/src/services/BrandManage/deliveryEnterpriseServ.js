import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,jdqList,jdqOption,jdqImport}=apiConfig;


export async function optionJdq(params) {
  return request(`${host}${jdqOption}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listJdq(params) {
  return request(`${host}${jdqList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function importJdq(params) {
  return request(`${host}${jdqImport}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}