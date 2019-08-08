import {message} from 'antd';
import {getExpressNetwork,addOrEditBox,delBox,selectBox,listBox,uploadBox,componeyList} from '../../services/ConvenientService/expressBox';
import { getUserPage } from "../../services/public";

export default {
  namespace:'expressBox',

  state:{
    expressBoxList:[],
    page:'',
    pageSize:'',
    total:'',
    compList:[],
    controlList:{ebox_imp:false,ebox_del:false,ebox_add:false,ebox_mod:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listBox,payload);
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
      const response=yield call(addOrEditBox,payload);
      if(response!=undefined){
        if(response.success==true){
          // yield put({
          //   type:'List',
          //   payload:payload.searchItem,
          // });
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
      const response=yield call(delBox,payload);
      if(response!=undefined){
        if(response.success==true){
          // yield put({
          //   type:'List',
          //   payload:payload.searchItem,
          // });
          if(callback)callback();
          message.success('删除成功');
        }else {
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *upload({payload,callback},{call,put}){
      const response=yield call(uploadBox,payload);
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

    *compList({payload,callback},{call,put}){
      const response=yield call(componeyList,payload);
      if(response!=undefined){
        yield put({
          type:'compList1',
          payload:response,
        });
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
    list(state,{payload}){
      return {
        ...state,
        expressBoxList:payload.rows,
        page:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },

    compList1(state,{payload}){
      return {
        ...state,
        compList:payload,
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
