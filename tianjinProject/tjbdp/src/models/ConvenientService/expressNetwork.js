import {message} from 'antd';
import {getExpressNetwork,addOrEditExpress,delExpress,selectExpress,listExpress,uploadExpress} from '../../services/ConvenientService/expressNetwork';
import {getUserPage} from '../../services/public';

export default {
  namespace:'expressNetwork',

  state:{
    expressList:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{exp_imp:false,exp_del:false,exp_add:false,exp_mod:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listExpress,payload);
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
      const response=yield call(addOrEditExpress,payload.data);
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
      const response=yield call(delExpress,payload.data);
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
      const response=yield call(selectExpress,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'newList',
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
      const response=yield call(uploadExpress,payload);
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
              if(item.menuCode=="exp_mod"){
                control.exp_mod=true
              }else if(item.menuCode=="exp_add"){
                control.exp_add=true
              }else if(item.menuCode=="exp_del"){
                control.exp_del=true
              }else if(item.menuCode=="exp_imp"){
                control.exp_imp=true
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
        expressList:payload.rows,
        page:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },

    newList(state,{payload}){
      return {
        ...state,
        expressList:payload.rows,
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
