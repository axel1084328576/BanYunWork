import {message} from 'antd';
import {getCarUseCount} from '@/services/CarManage/carUseCountServ';
import { getUserPage } from "../../services/public";

export default {
  namespace:'carusecount',

  state:{
    selectedRowKeys:[],
    carUseCount:[],
    addModalVisible:false,
    modifyModalVisible:false,
    tableLoading:false,
    showHighSearch:false,
    current:1,
    pageSize:10,
    total:30,
    controlList:{cuse_mod:false,cuse_add:false,cuse_del:false},
  },
 
  effects:{
    *getCarUseCount({payload},{call,put}){
      const res = yield call(getCarUseCount);
      // console.log(res);
      yield put({
        type:'setCarUseCount',
        payload:{
          carUseCount:res.data,
        }
      });
    },

    *addCarUseCount({payload},{call,put,select}){
      const state = yield select();
      let newCarUseCount = state.carusecount.carUseCount;
      const newKey = `${parseInt(newCarUseCount[newCarUseCount.length-1].key)+1}`;
      newCarUseCount.push({...payload,key:newKey});

      yield put({
        type:'setCarUseCount',
        payload:{
          carUseCount:newCarUseCount,
          addModalVisible:false,
        }
      });
      message.info("添加成功");
    },

    *modifyCarUseCount({payload},{call,put,select}){
      // console.log(payload);
      const state = yield select();
      let newCarUseCount = state.carusecount.carUseCount;
      newCarUseCount=newCarUseCount.map(item => {
        if(item.key === payload.key){
          item=payload;
        }
        return item;
      });

      yield put({
        type:'setCarUseCount',
        payload:{
          carUseCount:newCarUseCount,
          modifyModalVisible:false,
        }
      });
      message.info("修改成功");
    },

    *deleteCarUseCount({payload},{call,put,select}){
      yield put({
        type:'setTableLoading',
        payload:{
          tableLoading:true,
        }
      });

      const state = yield select();
      const newCarUseCount = state.carusecount.carUseCount.filter(item=>item.key !== payload.key);
      yield put({
        type:'setCarUseCount',
        payload:{
          carUseCount:newCarUseCount,
          tableLoading:false,
        }
      });

      message.info("删除成功");
    },

    *deletePartCarUseCount({payload},{call,put,select}){
      yield put({
        type:'setTableLoading',
        payload:{
          tableLoading:true,
        }
      });

      const state = yield select();
      let newCarUseCount = state.carusecount.carUseCount;
      const selectedRowKeys = state.carusecount.selectedRowKeys;

      for(let i=0; i<selectedRowKeys.length; i+=1){
          newCarUseCount = newCarUseCount.filter(item => item.key !== selectedRowKeys[i]);
      }

      yield put({
        type:'setCarUseCount',
        payload:{
          carUseCount:newCarUseCount,
          selectedRowKeys:[],
          tableLoading:false,
        }
      });
      message.info("删除成功");
    },

    *Control({payload,callback},{call,put}){
      const response=yield call(getUserPage,payload);
      if(response!=undefined){
        if(response.success==true){
          if(response.rows.length>=1){
            // console.log("response",response);
            const control={};
            response.rows.map(item=>{
              if(item.menuCode=="cuse_add"){
                control.cuse_add=true
              }else if(item.menuCode=="cuse_del"){
                control.cuse_del=true
              }else if(item.menuCode=="cuse_mod"){
                control.cuse_mod=true
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
    setTableLoading(state,{payload}){
      return {...state, ...payload};
    },

    setAddModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    setModifyModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    setShowHighSearch(state,{payload}){
      return {...state, ...payload}
    },

    setCarUseCount(state,{payload}){
      return {...state, ...payload}
    },

    setSelectedRowKeys(state,{payload}){
      return {...state,...payload};
    },

    pageList(state,{payload}){
      return {
        ...state,
        controlList:payload,
      };
    },
  },
}
