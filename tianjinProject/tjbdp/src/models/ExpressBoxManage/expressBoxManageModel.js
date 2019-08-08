import {message} from 'antd';
import {boxPick} from '../../services/ExpressBoxManage/AccessInfoServ';
import {boxSend} from '../../services/ExpressBoxManage/DeliverInfoServ';
import { getUserPage } from "../../services/public";

export default {
  namespace:'expressBoxManage',

  state:{
    sendList:[],
    sendPage:'',
    sendPageSize:'',
    sendTotal:'',

    pickUpList:[],
    pickUpPage:'',
    pickUpPageSize:'',
    pickUpTotal:'',

    controlList:{ebox_imp:false,ebox_del:false,ebox_add:false,ebox_mod:false},
  },

  effects:{
    *sendList({payload,callback},{call,put}){
      const response=yield call(boxSend,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'listSend',
            payload:response,
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *pickUpList({payload,callback},{call,put}){
      const response=yield call(boxPick,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'listPick',
            payload:response,
          });
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
              if(item.menuCode=="ebox_mod"){
                control.ebox_mod=true
              }else if(item.menuCode=="ebox_add"){
                control.ebox_add=true
              }else if(item.menuCode=="ebox_del"){
                control.ebox_del=true
              }else if(item.menuCode=="ebox_imp"){
                control.ebox_imp=true
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
    listSend(state,{payload}){
      return {
        ...state,
        sendList:payload.rows,
        sendPage:payload.page,
        sendPageSize:payload.pageSize,
        sendTotal:payload.total,
      };
    },

    listPick(state,{payload}){
      return {
        ...state,
        pickUpList:payload.rows,
        pickUpPage:payload.page,
        pickUpPageSize:payload.pageSize,
        pickUpTotal:payload.total,
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
