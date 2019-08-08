import {message} from 'antd';
import {addOrEditMail,delMail,selectMail,listMail,uploadMail} from '../../services/ConvenientService/postboxManage';
import { getUserPage } from "../../services/public";
import { uploadExpress } from "../../services/ConvenientService/expressNetwork";

export default {
  namespace:'postboxManage',

  state:{
    mailList:[],
    otherList:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{pbox_imp:false,pbox_del:false,pbox_add:false,pbox_mod:false},
  },

  effects:{
    *List({payload},{call,put}){
      const response=yield call(listMail,payload);
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
      const response=yield call(addOrEditMail,payload.data);
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

    *Del({payload},{call,put}){
      const response=yield call(delMail,payload.data);
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


    *Select({payload},{call,put}){
      const response=yield call(selectMail,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'newList',
            payload:response,
          });
          message.success('搜索列表成功');
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *upload({payload,callback},{call,put}){
      const response=yield call(uploadMail,payload);
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
              if(item.menuCode=="pbox_mod"){
                control.pbox_mod=true
              }else if(item.menuCode=="pbox_add"){
                control.pbox_add=true
              }else if(item.menuCode=="pbox_del"){
                control.pbox_del=true
              }else if(item.menuCode=="pbox_imp"){
                control.pbox_imp=true
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
        mailList:payload.rows,
        otherList:payload,
        page:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },
    newList(state,{payload}){
      return {
        ...state,
        mailList:payload.rows,
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
