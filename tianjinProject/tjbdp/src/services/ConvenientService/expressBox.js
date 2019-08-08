import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,boxAddOrEdit, boxDel, boxSelect, boxList, boxUpload,newComponeyList}=apiConfig;

export async function getExpressNetwork() {
  return request('/api/ExpressNetwork/list');
}

export async function addOrEditBox(params) {
  return request(`${host}${boxAddOrEdit}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delBox(params) {
  return request(`${host}${boxDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function selectBox(params) {
  return request(`${host}${boxSelect}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listBox(params) {
  return request(`${host}${boxList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function uploadBox(params) {
  return request(`${host}${boxUpload}`,{
    method: 'POST',
    body: params,
  });
}

export async function componeyList(params) {
  return request(`${host}${newComponeyList}`,{
    method: 'POST',
    body: params,
  });
}