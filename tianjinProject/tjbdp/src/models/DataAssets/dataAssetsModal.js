import {message} from 'antd';
import {getEchartsData} from '../../services/DataAssets/DataAssets';

export default {
  namespace:'dataAssets',

  state:{
    echartsList:[],
    type:1,
    echartsStaList:[]
  },

  effects:{
    *getEcharts({payload,callback},{call,put}){
      const response=yield call(getEchartsData,payload);
      // console.log("response.rows",response.rows);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'newList',
            payload:response,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *getStaEcharts({payload,callback},{call,put}){
      const response=yield call(getEchartsData,payload);
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
  },

  reducers:{
    newList(state,{payload}){
      return {
        ...state,
        echartsList:payload.rows,
        type:payload.type,
      };
    },

    List(state,{payload}){
      return {
        ...state,
        echartsStaList:payload.rows,
      };
    },
  },
}
