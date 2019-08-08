import { stringify } from 'qs';
import request from '@/utils/request';

export async function getOutsideInterface() {
  return request('/api/OutsideInterface/getOutsideInterface');
}
