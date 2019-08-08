import { stringify } from 'qs';

import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host, compnayList, companyInfo,companyDel, companySave,companySelect} = apiConfig;

export async function saveOrAddCompany(params) {
  return request(`${host}${companySave}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delCompany(params) {
  return request(`${host}${companyDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function infoCompany(params) {
  return request(`${host}${companyInfo}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}



export async function listCompany(params) {
  return request(`${host}${compnayList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function selectCompany(params) {
  return request(`${host}${companySelect}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
