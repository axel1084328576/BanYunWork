import {message} from 'antd';
import {optionGyfw,listGyfw,importGyfw} from '../../services/ConvenientService/KioskInfoServ';
import { getUserPage } from "../../services/public";

export default {
  namespace:'kioskInfo',

  state:{
    list:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{kt_add:false,kt_edit:false,kt_del:false,kt_imp:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listGyfw,payload);
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
      const response=yield call(optionGyfw,payload);
      console.log("response",response);
      if(response!=undefined){
        if(response.success==true){
          if(callback)callback();
          message.success("更新列表成功");
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *Upload({payload,callback},{call,put}){
      const response=yield call(importGyfw,payload);
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
              if(item.menuCode=="kt_add"){
                control.kt_add=true
              }else if(item.menuCode=="kt_del"){
                control.kt_del=true
              }else if(item.menuCode=="kt_edit"){
                control.kt_edit=true
              }else if(item.menuCode=="kt_imp"){
                control.kt_imp=true
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
        list:payload.rows,
        page:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
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
