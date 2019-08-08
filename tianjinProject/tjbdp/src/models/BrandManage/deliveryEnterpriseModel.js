import {message} from 'antd';
import {listJdq,optionJdq,importJdq} from '../../services/BrandManage/deliveryEnterpriseServ';
import { getUserPage } from "../../services/public";

export default {
  namespace:'deliveryEnterprise',

  state:{
    list:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{jdq_add:false,jdq_edit:false,jdq_del:false,jdq_imp:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listJdq,payload);
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
      const response=yield call(optionJdq,payload);
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
      const response=yield call(importJdq,payload);
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
              if(item.menuCode=="jdq_add"){
                control.jdq_add=true
              }else if(item.menuCode=="jdq_del"){
                control.jdq_del=true
              }else if(item.menuCode=="jdq_edit"){
                control.jdq_edit=true
              }else if(item.menuCode=="jdq_imp"){
                control.jdq_imp=true
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
