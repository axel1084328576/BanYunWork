import { stringify } from 'qs';
import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import {toQueryPair,toQueryString} from '@/utils/queryParams';

const {host,videoAddOrEdit,videoDel,videoSelect, videoList}=apiConfig;

export async function getVideoReplayInfo() {
  return request('/api/VideoReplay/list');
}

export async function addOrEditVideo(params) {
  return request(`${host}${videoAddOrEdit}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function delVideo(params) {
  return request(`${host}${videoDel}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}

export async function selectVideo(params) {
  return request(`${host}${videoSelect}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}
export async function listVideo(params) {
  return request(`${host}${videoList}?${toQueryString(params)}`,{
    method: 'POST',
    body: params,
  });
}