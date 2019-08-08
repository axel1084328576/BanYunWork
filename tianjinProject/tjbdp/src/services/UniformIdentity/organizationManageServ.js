import { stringify } from 'qs';

import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host,delDir,allTreeDir,
        partTreeDir,saveOrAddDir,
        orglistDir} = apiConfig;
export async function getOrganization() {
  return request('/api/organizationManage/getOrganization');
} 

export async function getAllOrganization(params) {
  // console.log(params);
  return request(`${host}${orglistDir}?${toQueryString(params)}`,{
    method:'POST',
    body: params,
  });
} 

export async function getAllOrganizationTree(params) {
  return request(`${host}${allTreeDir}?${toQueryString(params)}`,{
    method:'POST',
    body: params,
  });
}

export async function deleteOrganization(params) {
  // console.log(params);
  return request(`${host}${delDir}?${toQueryString(params)}`,{
    method: 'POST',
    body: {
      ids:params.ids,
      opType: 'del',
    },
  });
}

export async function getPartOrganization(params) {
  // console.log(params);
  return request(`${host}${partTreeDir}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function saveOrAddOrganization(params) {
  // console.log(params);
  /* 
  let formData = new FormData();
  for(let key in params){
    formData.set( key , params[key] );
  }
  console.log(formData);
  */

  return request(`${host}${saveOrAddDir}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
