import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,replayCheckList,replayCheckDel,replayCheckAddOrEdit,replayCheckSelect,replayUpload}=apiConfig;

export async function getReplayCheck() {
  return request('/api/InfoSafe/list');
}

export async function RelayCheckList(params) {
  return request(`${host}${replayCheckList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function RelayCheckSelect(params) {
  return request(`${host}${replayCheckSelect}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function RelayCheckAddOrEdit(params) {
  return request(`${host}${replayCheckAddOrEdit}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function RelayCheckDel(params) {
  return request(`${host}${replayCheckDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function uploadReplay(params) {
  return request(`${host}${replayUpload}`,{
    method: 'POST',
    body: params,
  });
}
