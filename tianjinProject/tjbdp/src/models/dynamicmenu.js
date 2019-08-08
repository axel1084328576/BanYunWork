import { getDynamicmenu } from '../services/dynamicMenu';
import {message} from 'antd';

export default {
  namespace: 'dynamicmenu',

  state: {
    menuData: [],
  },

  effects: {
    *getDynamicmenu(payload,{ call, put }) {
      const response = yield call(getDynamicmenu,{token:sessionStorage.getItem('sys-token')});
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type: 'getDynamicmenuSuccess',
            payload: response.rows,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('菜单获取失败');
      }
    },
  },

  reducers: {
    getDynamicmenuSuccess(state, action) {
      return {
        ...state,
        menuData: action.payload,
      };
    },
  },
};
