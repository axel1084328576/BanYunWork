import {message} from 'antd';
import {listXy,optionXy,importXy} from '../../services/BusinessManage/securityProtocolServ';
import { getUserPage } from "../../services/public";

export default {
  namespace:'company',

  state:{
    list:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{com_add:false,com_edit:false,com_del:false,com_imp:false,com_agr:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listXy,payload);
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
      const response=yield call(optionXy,payload);
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
      const response=yield call(importXy,payload);
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
              if(item.menuCode=="com_add"){
                control.com_add=true
              }else if(item.menuCode=="com_del"){
                control.com_del=true
              }else if(item.menuCode=="com_edit"){
                control.com_edit=true
              }else if(item.menuCode=="com_imp"){
                control.com_imp=true
              }else if(item.menuCode=="com_agr"){
                control.com_agr=true
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
