import {message} from 'antd';
import {listGs,optionGs,importGs} from '../../services/BusinessManage/securityProtocolServ';
import { getUserPage } from "../../services/public";

export default {
  namespace:'agreement',

  state:{
    list:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{agr_add:false,agr_edit:false,agr_del:false,agr_imp:false,agr_ann:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listGs,payload);
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
      const response=yield call(optionGs,payload);
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
      const response=yield call(importGs,payload);
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
              if(item.menuCode=="agr_add"){
                control.agr_add=true
              }else if(item.menuCode=="agr_del"){
                control.agr_del=true
              }else if(item.menuCode=="agr_edit"){
                control.agr_edit=true
              }else if(item.menuCode=="agr_imp"){
                control.agr_imp=true
              }else if(item.menuCode=="agr_ann"){
                control.agr_ann=true
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
