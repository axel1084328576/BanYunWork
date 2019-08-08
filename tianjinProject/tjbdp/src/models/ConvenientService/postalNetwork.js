import {message} from 'antd';
import {addOrEditPost,delPost,selectPost,listPost,uploadPost} from '../../services/ConvenientService/postalNetwork';
import { getUserPage } from "../../services/public";
import { uploadExpress } from "../../services/ConvenientService/expressNetwork";

export default {
  namespace:'postalNetwork',

  state:{
    postList:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{post_imp:false,post_del:false,post_add:false,post_mod:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listPost,payload);
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

    *AddOrEdit({payload,callback},{call,put}){
      const response=yield call(addOrEditPost,payload.data);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'List',
            payload:payload.searchItem,
          });
          if(callback){
            callback()
          }
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *Del({payload,callback},{call,put}){
      const response=yield call(delPost,payload.data);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'List',
            payload:payload.searchItem,
          });
          message.success('删除成功');
        }else {
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *Select({payload,callback},{call,put}){
      const response=yield call(selectPost,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'newList',
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *upload({payload,callback},{call,put}){
      const response=yield call(uploadPost,payload);
      if(response!=undefined){
        if(response.success){
          if(callback)callback(true)
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *Control({payload,callback},{call,put}){
      const response=yield call(getUserPage,payload);
      if(response!=undefined){
        if(response.success==true){
          if(response.rows.length>=1){
            // console.log("response",response);
            const control={};
            response.rows.map(item=>{
              if(item.menuCode=="post_mod"){
                control.post_mod=true
              }else if(item.menuCode=="post_add"){
                control.post_add=true
              }else if(item.menuCode=="post_del"){
                control.post_del=true
              }else if(item.menuCode=="post_imp"){
                control.post_imp=true
              }
            });
            yield put({
              type:'pageList',
              payload:control,
            });
          }
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
        postList:payload.rows,
        page:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },
    newList(state,{payload}){
      return {
        ...state,
        postList:payload.rows,
      };
    },

    pageList(state,{payload}){
      return {
        ...state,
        controlList:payload,
      };
    },
  },
}
