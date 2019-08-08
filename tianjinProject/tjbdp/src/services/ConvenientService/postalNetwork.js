import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,postAddOrEdit, postDel, postSelect, postList,postUpload}=apiConfig;

export async function addOrEditPost(params) {
  return request(`${host}${postAddOrEdit}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delPost(params) {
  return request(`${host}${postDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function selectPost(params) {
  return request(`${host}${postSelect}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listPost(params) {
  return request(`${host}${postList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function uploadPost(params) {
  return request(`${host}${postUpload}`,{
    method: 'POST',
    body: params,
  });
}