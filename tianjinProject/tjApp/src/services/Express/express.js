import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,expressStation,compList,expressBox,postBox,postStation}=apiConfig;

export async function getExpress(params) {
  return request(`${host}${expressStation}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function getExpressBox(params) {
  return request(`${host}${expressBox}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function getPostBox(params) {
  return request(`${host}${postBox}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}


export async function getPost(params) {
  return request(`${host}${postStation}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function getCompList(params) {
  return request(`${host}${compList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}



