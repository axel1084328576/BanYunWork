import {message} from 'antd';
import {
  listMenus,
  allTreeMenus,
  treeMenus,
  delMenus,
  saveOrAddMenus,

} from '../../services/UniformIdentity/menusManage';
import { getUserPage } from "../../services/public";

export default {
  namespace:'menusmanage',

  state:{
    menusList:[],
    menuTree:[],
    page:'',
    pageSize:'',
    total:'',
    controlList:{menu_mod:false,menu_add:false,menu_del:false},
  },

  effects:{
    *List({payload,callback},{call,put}){
      const response=yield call(listMenus,payload);
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

    *AddOrEdit({payload,callback},{call,put,select}){
      const response=yield call(saveOrAddMenus,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'getPartTree',
          });
          yield put({
            type:'List',
            payload:{
              pid:payload.pid,
              // ...payload.searchItem
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

    *Del({payload,callback},{call,put,select}){
      const state = yield select();
      const response=yield call(delMenus,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'getPartTree',
          });
          yield put({
            type:'List',
            payload:{
              pid:payload.pid
            }
          });
          message.success('删除成功');
        }else {
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *getPartTree({payload},{call,put}){
      const response = yield call(allTreeMenus,{...payload,token:sessionStorage.getItem('sys-token')});
      if(typeof response !== 'undefined'){
        yield put({
          type:'setMenuTree',
          payload:{
            response,
          },
        });
      }else{
        message.error("获取部分组织树接口错误...");
      }
    },

    *getPartMenuTree({payload},{call,put,select}){
      const state = yield select();
      const response = yield call(allTreeMenus,{...payload,token:sessionStorage.getItem('sys-token')});
      if(typeof response !=='undefined'){
        const childrenTree = response.map(item => {
          return {
            title:item.text,
            value:item.text,
            key:item.id,
            isLeaf:item.isLeaf,
          };
        });

        function setChildren(parent){
          // console.log(parent);
          return parent.map(item=>{
            if(item.id === payload.pid){
              // console.log('find');
              item.children = childrenTree;
              return item;
            }
            if(!item.isLeaf && typeof item.children !== 'undefined'){
              setChildren(item.children);
            }
            return item;
          });
        }

        const newPartTree = setChildren(state.menusmanage.menuTree);

        // console.log(newPartTree);

        const rootKey = newPartTree.length > 0 ? newPartTree[0].id : undefined;

        yield put({
          type:'setMenu',
          payload:{
            organizationTree:newPartTree,
            rootKey,
          }
        });
      }else{
        message.error("获取下级组织接口错误...");
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
              if(item.menuCode=="menu_add"){
                control.menu_add=true
              }else if(item.menuCode=="menu_del"){
                control.menu_del=true
              }else if(item.menuCode=="menu_mod"){
                control.menu_mod=true
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

  reducers: {
    list(state,{payload}){
      return {
        ...state,
        menusList:payload.rows,
        page:payload.page,
        pageSize:payload.pageSize,
        total:payload.total,
      };
    },

    setMenuTree(state,{payload}){
      return {
        ...state,
        menuTree:payload.response,
        rootKey:payload.rootKey,
      }
    },

    pageList(state,{payload}){
      return {
        ...state,
        controlList:payload,
      };
    },
  },
}
