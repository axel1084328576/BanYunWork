import { message } from 'antd';
import { listWqy, optionWqy, importWqy, listNet } from '../../services/BusinessManage/dangerousEnterprisesServ';
import { getUserPage } from "../../services/public";

export default {
  namespace: 'dangerousEnterprises',

  state: {
    list: [],
    netList: [],
    page: '',
    pageSize: '',
    total: '',
    controlList: { wqy_add: false, wqy_edit: false, wqy_del: false, wqy_imp: false },
  },

  effects: {
    *NetList({ payload, callback }, { call, put }) {
      const response = yield call(listNet, payload);
      if (response != undefined) {
        if (response.success == true) {
          yield put({
            type: 'netList',
            payload: response,
          });
        } else {
          message.success(response.msg);
        }
      } else {
        message.success('获取数据失败');
      }
    },

    *List({ payload, callback }, { call, put }) {
      const response = yield call(listWqy, payload);
      if (response != undefined) {
        if (response.success == true) {
          yield put({
            type: 'list',
            payload: response,
          });
        } else {
          message.success(response.msg);
        }
      } else {
        message.success('获取数据失败');
      }
    },

    *AddOrEdit({ payload, callback }, { call, put }) {
      const response = yield call(optionWqy, payload);
      if (response != undefined) {
        if (response.success == true) {
          if (callback) callback();
          message.success("更新列表成功");
        } else {
          message.success(response.msg);
        }
      } else {
        message.success('获取数据失败');
      }
    },

    *Upload({ payload, callback }, { call, put }) {
      const response = yield call(importWqy, payload);
      if (response != undefined) {
        if (response.success) {
          if (callback) callback(true)
        } else {
          message.success(response.msg);
        }
      } else {
        message.success('获取数据失败');
      }
    },

    *Control({ payload, callback }, { call, put }) {
      const response = yield call(getUserPage, payload);
      if (response != undefined) {
        if (response.success == true) {
          if (response.rows.length >= 1) {
            // console.log("response",response);
            const control = {};
            response.rows.map(item => {
              if (item.menuCode == "wqy_add") {
                control.wqy_add = true
              } else if (item.menuCode == "wqy_del") {
                control.wqy_del = true
              } else if (item.menuCode == "wqy_edit") {
                control.wqy_edit = true
              } else if (item.menuCode == "wqy_imp") {
                control.wqy_imp = true
              }
            });
            yield put({
              type: 'pageList',
              payload: control,
            });
          }
        } else {
          message.success(response.msg);
        }
      } else {
        message.success('获取数据失败');
      }
    },
  },

  reducers: {
    list(state, { payload }) {
      return {
        ...state,
        list: payload.rows,
        page: payload.page,
        pageSize: payload.pageSize,
        total: payload.total,
      };
    },

    pageList(state, { payload }) {
      return {
        ...state,
        controlList: payload,
      };
    },

    netList(state, { payload }) {
      return {
        ...state,
        netList: payload.rows
      }
    }
  },
}
