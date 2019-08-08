import {message} from 'antd';
import {addOrEditExpress,delExpress,listExpress,uploadExpress,netSort} from '../../services/BrandManage/networkManageServ';
import {getUserPage} from '../../services/public';

export default {
  namespace:'networkManage',

  state:{
    netList:[],
    list:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{net_imp:false,net_del:false,net_add:false,net_edit:false,net_map:false},
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
      const response=yield call(addOrEditExpress,payload);
      if(response!=undefined){
        if(response.success==true){
          if(callback)callback();
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *Del({payload,callback},{call,put}){
      const response=yield call(delExpress,payload);
      if(response!=undefined){
        if(response.success==true){
          if(callback)callback();
          message.success('删除成功');
        }else {
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *Upload({payload,callback},{call,put}){
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

    *sortNet({payload,callback},{call,put}){
      const response=yield call(netSort,payload);
      // console.log("12345",response);
      if(response!=undefined){
        if(response.success){
          yield put({
            type:'net',
            payload:response.rows,
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
              if(item.menuCode=="net_edit"){
                control.net_edit=true
              }else if(item.menuCode=="net_add"){
                control.net_add=true
              }else if(item.menuCode=="net_del"){
                control.net_del=true
              }else if(item.menuCode=="net_imp"){
                control.net_imp=true
              }else if(item.menuCode=="net_map"){
                control.net_map=true
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

    net(state,{payload}){
      return {
        ...state,
        netList:payload,
      };
    },
  },
}
