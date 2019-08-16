import {message} from 'antd';
import {getExpress,getCompList,getExpressBox,getPost,getPostBox} from '../../services/Express/express';

export default {
  namespace:'express',

  state:{
    expressList:[],
    compList:[],
  },

  effects:{
    *expList({payload,callback},{call,put}){
      const response=yield call(getExpress,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'list',
            payload:response,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *expBoxList({payload},{call,put}){
      const response=yield call(getExpressBox,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'list',
            payload:response,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *postList({payload},{call,put}){
      const response=yield call(getPost,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'list',
            payload:response,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *postBoxList({payload},{call,put}){
      const response=yield call(getPostBox,payload);
      // console.log("response",response);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'list',
            payload:response,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *compList({payload,callback},{call,put}){
      const response=yield call(getCompList,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'comp',
            payload:response,
          });
          // if(callback)callback(response.rows)
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },
  },

  reducers:{
    list(state,{payload}){
      return {
        ...state,
        expressList:payload.rows,
      };
    },

    comp(state,{payload}){
      return {
        ...state,
        compList:payload.rows,
      };
    },
  },
}
