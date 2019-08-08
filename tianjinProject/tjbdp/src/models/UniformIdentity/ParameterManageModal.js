import {message} from 'antd';
import {saveOrAddParaset,delParaset,infoParaset,listParaset} from '../../services/UniformIdentity/ParameterManage';
import { getUserPage } from "../../services/public";

export default {
  namespace:'parameter',

  state:{
    parasetList:[],
    current:'',
    pageSize:'',
    total:'',
    controlList:{par_mod:false,par_add:false,par_del:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listParaset,payload);
      // console.log("dict  response",response);
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
      const response=yield call(saveOrAddParaset,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'List',
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
      const response=yield call(delParaset,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'List',
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
      const response=yield call(infoParaset,payload);
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

    *Control({payload,callback},{call,put}){
      const response=yield call(getUserPage,payload);
      if(response!=undefined){
        if(response.success==true){
          if(response.rows.length>=1){
            // console.log("response",response);
            const control={};
            response.rows.map(item=>{
              if(item.menuCode=="par_add"){
                control.par_add=true
              }else if(item.menuCode=="par_del"){
                control.par_del=true
              }else if(item.menuCode=="par_mod"){
                control.par_mod=true
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
        parasetList:payload.rows,
        current:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },
    newList(state,{payload}){
      return {
        ...state,
        parasetList:payload.rows,
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
