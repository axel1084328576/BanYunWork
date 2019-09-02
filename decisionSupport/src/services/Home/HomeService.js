import request from '@/utils/request';
import apiConfig from '@/utils/apiConfig';
import { toQueryPair, toQueryString } from '@/utils/queryParams';

const {
  host,
  businessTrend,
  fTips,
  mainMap,
  businessValueTrend,
  businessAndIncrease,
  processEfficacy,
  qualitySupervision,
  infrastructureBuild,
  businessIncome,
  threeKeyPoint,
  beltAndRoad,
} = apiConfig;

export async function getBusinessTrend(params) {
  return request(`${host}${businessTrend}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getFTips(params) {
  return request(`${host}${fTips}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getMainMap(params) {
  return request(`${host}${mainMap}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getBusinessValueTrend(params) {
  return request(`${host}${businessValueTrend}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getBusinessAndIncrease(params) {
  return request(`${host}${businessAndIncrease}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getProcessEfficacy(params) {
  return request(`${host}${processEfficacy}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getQualitySupervision(params) {
  return request(`${host}${qualitySupervision}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getInfrastructureBuild(params) {
  return request(`${host}${infrastructureBuild}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getBusinessIncome(params) {
  return request(`${host}${businessIncome}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getThreeKeyPoint(params) {
  return request(`${host}${threeKeyPoint}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}

export async function getBeltAndRoad(params) {
  return request(`${host}${beltAndRoad}?${toQueryString(params)}`, {
    method: 'POST',
    body: params,
  });
}
