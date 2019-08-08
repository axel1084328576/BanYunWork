import {message} from 'antd';
import {saveOrAddCompany,delCompany,infoCompany,listCompany,selectCompany} from '../../services/UniformIdentity/EnterpriseManage';
import { getUserPage } from "../../services/public";

export default {
  namespace:'enterprise',

  state:{
    companyList:[],
    current:'',
    pageSize:'',
    total:'',
    option:[],
    controlList:{ent_mod:false,ent_add:false,ent_del:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listCompany,payload);
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
      const response=yield call(saveOrAddCompany,payload);
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
      const response=yield call(delCompany,payload);
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
      const response=yield call(infoCompany,payload);
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


    *SelectOption({payload,callback},{call,put}){
      const response=yield call(selectCompany,payload);
      // console.log("response",response);
      if(response!=undefined){
        yield put({
          type:'optionList',
          payload:response,
        });
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
              if(item.menuCode=="ent_add"){
                control.ent_add=true
              }else if(item.menuCode=="ent_del"){
                control.ent_del=true
              }else if(item.menuCode=="ent_mod"){
                control.ent_mod=true
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
        companyList:payload.rows,
        current:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },

    newList(state,{payload}){
      return {
        ...state,
        companyList:payload.rows,
      };
    },

    optionList(state,{payload}){
      // console.log("11",payload);
      return {
        ...state,
        option:payload,
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
