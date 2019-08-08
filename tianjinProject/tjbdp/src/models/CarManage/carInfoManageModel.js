import {message} from 'antd';
import {uploadCar,getCarInfosList,getCarInfoDetail,addOrSaveCarInfo,delCarInfo} from '../../services/CarManage/carInfoManageServ';
import { getUserPage } from "../../services/public";
import { delVideo } from "../../services/VideoMonitor/videoReplay";

export default {
  namespace:'carInfoManage',

  state:{
    list:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{cinfo_add:false,cinfo_edit:false,cinfo_del:false,cinfo_imp:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(getCarInfosList,payload);
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
      const response=yield call(addOrSaveCarInfo,payload);
      // console.log("response",response);
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

    *Del({payload,callback},{call,put}){
      const response=yield call(delCarInfo,payload);
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

    *Upload({payload,callback},{call,put}){
      const response=yield call(uploadCar,payload);
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
              if(item.menuCode=="cinfo_add"){
                control.cinfo_add=true
              }else if(item.menuCode=="cinfo_del"){
                control.cinfo_del=true
              }else if(item.menuCode=="cinfo_mod"){
                control.cinfo_edit=true
              }else if(item.menuCode=="cinfo_imp"){
                control.cinfo_imp=true
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
