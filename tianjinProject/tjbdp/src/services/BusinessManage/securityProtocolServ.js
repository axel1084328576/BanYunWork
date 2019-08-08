import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,gsOption, gsImport, gsList,xyOption, xyImport,xyList,picUpDown, picDown,picDel,}=apiConfig;


export async function optionGs(params) {
  return request(`${host}${gsOption}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listGs(params) {
  return request(`${host}${gsList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function importGs(params) {
  return request(`${host}${gsImport}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function optionXy(params) {
  return request(`${host}${xyOption}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function listXy(params) {
  return request(`${host}${xyList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function importXy(params) {
  return request(`${host}${xyImport}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}