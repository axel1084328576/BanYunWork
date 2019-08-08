import { stringify } from 'qs';
import request from '@/utils/request';

export async function getCarUseCount() {
  return request('/api/carUseCount/getCarUseCount');
}

 