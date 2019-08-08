import {message} from 'antd';
import {getReplayCheck,RelayCheckList,RelayCheckSelect,RelayCheckAddOrEdit,RelayCheckDel,uploadReplay} from '../../services/SecurityMachine/replayCheck';
import { getUserPage } from "../../services/public";
import { uploadBox } from "../../services/ConvenientService/expressBox";

export default {
  namespace:'replayCheck',

  state:{
    checkList:[],
    info:{},
    page:'',
    pageSize:'',
    total:'',
    controlList:{sec_mod:false,sec_add:false,sec_del:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(RelayCheckList,payload);
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
      const response=yield call(RelayCheckAddOrEdit,payload.data);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'List',
            payload:payload.searchItem,
          });
          if(callback){
            callback()
          }
          message.success("更新列表成功");
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *Del({payload,callback},{call,put}){
      const response=yield call(RelayCheckDel,payload.data);
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
      const response=yield call(RelayCheckSelect,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'newList',
            payload:response,
          });
          if(callback)callback(response.info)
          // message.success('搜索列表成功');
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
              if(item.menuCode=="sec_add"){
                control.sec_add=true
              }else if(item.menuCode=="sec_del"){
                control.sec_del=true
              }else if(item.menuCode=="sec_mod"){
                control.sec_mod=true
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

    *upload({payload,callback},{call,put}){
      const response=yield call(uploadReplay,payload);
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
  },

  reducers:{
    list(state,{payload}){
      return {
        ...state,
        checkList:payload.rows,
        page:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },

    newList(state,{payload}){
      return {
        ...state,
        info:payload.info,
        // info:payload,
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
