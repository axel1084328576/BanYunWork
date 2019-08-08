import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,infoAddOrEdit, infoDel, infoSelect, infoList,infoUpload,jobTypeList}=apiConfig;

export async function getInfoSafe() {
  return request('/api/InfoSafe/list');
}

export async function addOrEditInfo(params) {
  return request(`${host}${infoAddOrEdit}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}


export async function delInfo(params) {
  return request(`${host}${infoDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function selectInfo(params) {
  return request(`${host}${infoSelect}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
export async function listInfo(params) {
  return request(`${host}${infoList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function uploadInfo(params) {
  return request(`${host}${infoUpload}`,{
    method: 'POST',
    body: params,
  });
}
//获取动态岗位类型
export async function getJobType(params) {
  return request(`${host}${jobTypeList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}