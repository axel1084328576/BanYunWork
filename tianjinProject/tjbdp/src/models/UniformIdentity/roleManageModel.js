import {message} from 'antd';
import {getRoles, delRoles, saveOrAddRole,saveOrAddRoleMenu,getRoleMenus} from '@/services/UniformIdentity/roleManageServ';
import { listVideo } from "../../services/VideoMonitor/videoReplay";
import { getUserPage } from "../../services/public";

export default {
  namespace:'rolemanage',

  state:{
    selectedRowKeys:[], 
    roles:[],
    addModalVisible:false,
    modifyModalVisible:false,
    current:1,
    pageSize:10,
    total:0,
    menuData:"",
    rolesMenu:"",
    chnName:"",
    controlList:{role_mod:false,role_add:false,role_del:false,role_auz:false},
  }, 

  effects:{
    *getRoles({payload},{call,put}){
      const res = yield call(getRoles,{...payload,token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          const roles = res.rows.map(item => {
            return {
              key:item.sid,
              order:item.roleOrder,
              name:item.roleName,
              comments:item.roleNote,
            };
          });
          yield put({
            type:'setRoles',
            payload:{
              roles,
              current: res.page,
              pageSize: res.pageSize,
              total: res.total,
              addModalVisible:false,
              modifyModalVisible:false,
            }
          });
        }else{
          if(typeof payload.search !== 'undefined'){
            message.warning("搜索角色失败...");
          }else{
            message.warning("获取角色列表失败...");
          }
        }
      }else{
        if(typeof payload.search !== 'undefined'){
          message.error("搜索角色接口错误...");
        }else{
          message.error("获取角色列表接口错误...");
        }
      }
      
    },

    *addRole({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(saveOrAddRole,{...payload,opType:'add',token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getRoles',
            payload:{
              page: 1,
              pageSize:state.rolemanage.pageSize,
            }
          });
          message.success("添加角色成功");
        }else{
          message.warning("添加角色失败...");
        }
      }else{
        message.error("添加角色接口错误...");
      }
    },

    *searchRole({payload},{call,put,select}){
      yield put({
        type:'getRoles',
        payload:{...payload,search:true},
      });
      yield put({
        type:'getValue',
        payload:{
          ...payload,
        },
      });
    },

    *roleMenu({payload},{call,put}){
      const res = yield call(saveOrAddRoleMenu,payload);
      if(typeof res !== 'undefined'){
        if(res.success==true){
          yield put({
            type:'menuList',
            payload:res,
          });
          message.success("角色菜单授权成功");
        }else{
          message.warning(response.msg);
        }
      }else {
        message.error('获取数据失败');
      }
    },

    *modifyRole({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(saveOrAddRole,{...payload,opType:'mod',token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getRoles',
            payload:{
              page:state.rolemanage.current,
              pageSize:state.rolemanage.pageSize,
            }
          });
          message.success("修改角色成功");
        }else{
          message.warning("修改角色失败...");
        }
      }else{
        message.error("修改角色接口错误...");
      }
    },

    *deleteRole({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(delRoles,{ids:payload.key.toString(),opType:'del',token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getRoles',
            payload:{
              page:1,
              pageSize:state.rolemanage.pageSize,
            }
          });
          message.success("删除角色成功");
        }else{
          message.warning("删除角色失败...");
        }
      }else{
        message.error("删除角色接口错误...");
      }
    },

    *deletePartRoles({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(delRoles,payload);
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getRoles',
            payload:{
              page:1,
              pageSize:state.rolemanage.pageSize,
            }
          });
          message.success("删除角色成功");
        }else{
          message.warning("删除角色失败...");
        }
      }else{
        message.error("删除角色接口错误...");
      }
    },

    *roleMenus({payload,callback},{call,put}){
      const response=yield call(getRoleMenus,payload);
      if(typeof response !== 'undefined'){
        if(response.success){
          const arr=[];
          response.rows.map((item)=>{
            if(item.sid!=undefined){
              arr.push(item.sid)
            }
          });
          if(callback)callback(arr);
        }else{
          message.warning("无法获取角色已授权菜单...");
        }
      }else{
        message.error("获取菜单接口错误...");
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
              if(item.menuCode=="role_add"){
                control.role_add=true
              }else if(item.menuCode=="role_del"){
                control.role_del=true
              }else if(item.menuCode=="role_mod"){
                control.role_mod=true
              }else if(item.menuCode=="role_auz"){
                control.role_auz=true
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

    setAddModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    setModifyModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    setRoles(state,{payload}){
      return {...state, ...payload}
    },

    setSelectedRowKeys(state,{payload}){
      return {...state,...payload};
    },

    menuList(state,{payload}){
      return {
        ...state,
        menuData:payload,
      };
    },

    getValue(state,{payload}){
      return {
        ...state,
        chnName:payload.roleName,
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
