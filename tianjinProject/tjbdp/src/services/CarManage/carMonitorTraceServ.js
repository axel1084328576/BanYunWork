import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,carMapDate,mapDate,carDate}=apiConfig;

export async function getCarMonitorTrace(params) {
  return request('/api/carMonitorTrace/getCarMonitorTrace');
}

export async function setCarData(params) {
  return request(`${host}${carDate}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function getPerCarTrace() {
  return request('/api/carMonitorTrace/getPerCarTrace');
}

export async function getCarMapData(params) {
  return request(`${host}${carMapDate}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function getMapData(params) {
  return request(`${host}${mapDate}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}


