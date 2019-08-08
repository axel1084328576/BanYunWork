import {message} from 'antd';
import {saveOrAddDict,delDict,infoDict,listDict,TreeParaset} from '../../services/UniformIdentity/dictionariesManage';
import { getUserPage } from "../../services/public";

export default {
  namespace:'dictionaries',

  state:{
    diceList:[],
    current:'',
    pageSize:'',
    total:'',
    dictTreeList:[],
    treeId:null,
    controlList:{dic_mod:false,dic_add:false,dic_del:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listDict,payload);
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
      const response=yield call(saveOrAddDict,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'List',
            payload:{
              pid:payload.pid
            }
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
      const response=yield call(delDict,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'List',
            payload:{
              pid:payload.pid,
            },
          });
          if(callback)callback();
          message.success('删除成功');
        }else {
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },


    *Select({payload,callback},{call,put}){
      const response=yield call(infoDict,payload);
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

    *Tree({payload,callback},{call,put}){
      const response=yield call(TreeParaset,payload);
      // console.log('树responst',response)
      if(response!=undefined){
          yield put({
            type:'treeList',
            payload:response,
          });
      if(callback) callback(response)
      }else{
        message.success(response.msg);
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
              if(item.menuCode=="dic_add"){
                control.dic_add=true
              }else if(item.menuCode=="dic_del"){
                control.dic_del=true
              }else if(item.menuCode=="dic_mod"){
                control.dic_mod=true
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
        diceList:payload.rows,
        current:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },

    newList(state,{payload}){
      return {
        ...state,
        diceList:payload.rows,
      };
    },

    treeList(state,{payload}){
      return {
        ...state,
        dictTreeList:payload,
      };
    },

    setTreeData(state,{payload}){
      return {
        ...state,
        treeId:payload.treeId,
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
