import { stringify } from 'qs';

import {toQueryPair,toQueryString} from '@/utils/queryParams';
import request from '@/utils/request';

import apiConfig from '@/utils/apiConfig';

const {host,addOrSaveCarDir,carListDir,delCarDir,carInfoDir,carUpload}=apiConfig;

export async function getCarInfos() {
  return request('/api/carInfoManage/getCarInfos');
}

export async function uploadCar(params) {
  return request(`${host}${carUpload}`,{
    method: 'POST',
    body: params,
  });
}

export async function getCarInfosList(params) {
  	return request(`${host}${carListDir}?${toQueryString(params)}`,{
      method: 'POST',
      body: params,
    })
}

export async function getCarInfoDetail(params) {
  	return request(`${host}${carInfoDir}?${toQueryString(params)}`,{
      method: 'POST',
      body: params,
    });

} 
 
export async function delCarInfo(params){
	// console.log(params);
	return request(`${host}${delCarDir}`,{
		method:'POST',
		body:params,
	});
}

 export async function addOrSaveCarInfo(params){
 	// console.log(params);
	return request(`${host}${addOrSaveCarDir}?${toQueryString(params)}`,{
		method:'POST',
		body:params,
	});
 }
