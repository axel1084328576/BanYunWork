import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,expressAddOrEdit,expressDel,expressSelect,expressList,expressUpload,sortNet}=apiConfig;

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


export async function listExpress(params) {
  return request(`${host}${expressList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function uploadExpress(params) {
  return request(`${host}${expressUpload}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function netSort(params) {
  return request(`${host}${sortNet}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
