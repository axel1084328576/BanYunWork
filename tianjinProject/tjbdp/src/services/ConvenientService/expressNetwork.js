import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,expressAddOrEdit,expressDel,expressSelect,expressList,expressUpload}=apiConfig;

export async function getExpressNetwork() {
  return request('/api/ExpressNetwork/list');
}

export async function addOrEditExpress(params) {
  return request(`${host}${expressAddOrEdit}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delExpress(params) {
  return request(`${host}${expressDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function selectExpress(params) {
  return request(`${host}${expressSelect}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listExpress(params) {
  return request(`${host}${expressList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function uploadExpress(params) {
  return request(`${host}${expressUpload}`,{
    method: 'POST',
    body: params,
  });
}