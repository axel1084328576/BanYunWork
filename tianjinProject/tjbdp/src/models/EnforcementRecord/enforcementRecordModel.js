import {message} from 'antd';
import {optionEnf,listEnf,importEnf} from '../../services/EnforcementRecord/EnforcementRecordServ';
import { getUserPage } from "../../services/public";

export default {
  namespace:'enforcementRecord',

  state:{
    list:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{enf_add:false,enf_edit:false,enf_del:false,enf_imp:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listEnf,payload);
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
      const response=yield call(optionEnf,payload);
      // console.log("response",response);
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
      const response=yield call(importEnf,payload);
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
              if(item.menuCode=="enf_add"){
                control.enf_add=true
              }else if(item.menuCode=="enf_del"){
                control.enf_del=true
              }else if(item.menuCode=="enf_edit"){
                control.enf_edit=true
              }else if(item.menuCode=="enf_imp"){
                control.enf_imp=true
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
