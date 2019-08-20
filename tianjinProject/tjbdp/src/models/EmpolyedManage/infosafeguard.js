import { message } from 'antd';
import { getInfoSafe, addOrEditInfo, delInfo, listInfo, selectInfo, uploadInfo, getJobType, netInfo } from '../../services/EmpolyedManage/infosafeguard';
import { getUserPage } from "../../services/public";
import { uploadReplay } from "../../services/SecurityMachine/replayCheck";

export default {
  namespace: 'infoSafeGuard',

  state: {
    infoSafeList: [],
    jobTypeList: [],
    netInfo: '',
    info: {},
    page: '',
    pageSize: '',
    total: '',
    controlList: { emp_mod: false, emp_add: false, emp_del: false },
  },

  effects: {

    *getNetInfo({ payload, callback }, { call, put }) {
      const response = yield call(netInfo, payload);
      if (response != undefined) {

        yield put({
          type: 'netInfo',
          payload: response,
        });

      } else {
        message.success('获取数据失败');
      }
    },

    //动态获取岗位类型
    *getJobType({ payload, callback }, { call, put }) {
      const response = yield call(getJobType, payload);
      if (response != undefined) {
        if (response.success == true) {
          yield put({
            type: 'typeList',
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
      const response = yield call(listInfo, payload);
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
      const response = yield call(addOrEditInfo, payload.data);
      if (response != undefined) {
        if (response.success == true) {
          if (callback) {
            callback()
          }
          message.success("更新列表成功");
        } else {
          message.success(response.msg);
        }
      } else {
        message.success('获取数据失败');
      }
    },

    *Del({ payload, callback }, { call, put }) {
      const response = yield call(delInfo, payload.data);
      if (response != undefined) {
        if (response.success == true) {
          message.success('删除成功');
        } else {
          message.success(response.msg);
        }
      } else {
        message.success('获取数据失败');
      }
    },


    *Select({ payload, callback }, { call, put }) {
      const response = yield call(selectInfo, payload);
      if (response != undefined) {
        if (response.success == true) {
          if (callback) callback(response.info)
          // message.success('搜索列表成功');
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
              if (item.menuCode == "emp_mod") {
                control.emp_mod = true
              } else if (item.menuCode == "emp_add") {
                control.emp_add = true
              } else if (item.menuCode == "emp_del") {
                control.emp_del = true
              }
            });
            // console.log("control",control)
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

    *upload({ payload, callback }, { call, put }) {
      const response = yield call(uploadInfo, payload);
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
  },

  reducers: {

    // 网点信息
    // infoByNet
    netInfo(state, { payload }) {
      return {
        ...state,
        netInfo: payload
      }
    },

    //岗位类型列表
    typeList(state, { payload }) {
      return {
        ...state,
        jobTypeList: payload.rows
      }
    },

    list(state, { payload }) {
      return {
        ...state,
        infoSafeList: payload.rows,
        page: payload.page,
        pageSize: payload.pageSize,
        total: payload.total,
      };
    },

    newList(state, { payload }) {
      return {
        ...state,
        info: payload.info,
        // info:payload,
      };
    },

    pageList(state, { payload }) {
      return {
        ...state,
        controlList: payload,
      };
    },
  },
}
