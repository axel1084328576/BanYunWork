import {message} from 'antd';
import {getVideoReplayInfo,addOrEditVideo,delVideo, selectVideo,listVideo} from '../../services/VideoMonitor/videoReplay';
import { getUserPage } from "../../services/public";

export default {
  namespace:'videoReplay',

  state:{
    videoList:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{video_mod:false,video_add:false,video_del:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listVideo,payload);
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
      const response=yield call(addOrEditVideo,payload);
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
      const response=yield call(delVideo,payload);
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
      const response=yield call(selectVideo,payload);
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
              if(item.menuCode=="video_mod"){
                control.video_mod=true
              }else if(item.menuCode=="video_add"){
                control.video_add=true
              }else if(item.menuCode=="video_del"){
                control.video_del=true
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
        videoList:payload.rows,
        page:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },
    newList(state,{payload}){
      return {
        ...state,
        videoList:payload.rows,
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
