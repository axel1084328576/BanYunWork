import {message} from 'antd';
import {getStaEchartsData,getComponeyList} from '../../services/Statistics/Statistics';

export default {
  namespace:'statistics',

  state:{
    echartsStaList:[],
    componeyList:[],
  },

  effects:{
    *getStaEcharts({payload,callback},{call,put}){
      const response=yield call(getStaEchartsData,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'List',
            payload:response,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *getComponeyList({payload,callback},{call,put}){
      const response=yield call(getComponeyList,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'componeyList',
            payload:response,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },
  },

  reducers:{
    List(state,{payload}){
      return {
        ...state,
        echartsStaList:payload,
      };
    },

    componeyList(state,{payload}){
      return {
        ...state,
        componeyList:payload.rows,
      };
    },
  },
}
