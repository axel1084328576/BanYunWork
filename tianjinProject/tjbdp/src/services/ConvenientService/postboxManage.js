import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const { host,mailAddOrEdit, mailDel, mailSelect, mailList,mailUpload}=apiConfig;

export async function addOrEditMail(params) {
  console.log("params",params);
  return request(`${host}${mailAddOrEdit}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delMail(params) {
  return request(`${host}${mailDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function selectMail(params) {
  return request(`${host}${mailSelect}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listMail(params) {
  return request(`${host}${mailList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function uploadMail(params) {
  return request(`${host}${mailUpload}`,{
    method: 'POST',
    body: params,
  });
}