import {message} from 'antd';
import {getUserData,getRoleSelect,
        getUserList,resetPassword,
        delUsers,saveOrAddUsers,
        saveUserRoles,getUserRoles,} from '@/services/UniformIdentity/userManageServ';
import {getAllOrganizationTree,getOrganization} from '@/services/UniformIdentity/organizationManageServ';
import {getRoles} from '@/services/UniformIdentity/roleManageServ';
import { getUserPage } from "../../services/public";
 
export default {
  namespace:'usermanage',
  
  state:{
    organizationTree:[],
    userData:[],
    roleSelect:[],
    selectOrganizationKeys:[],
    rootKey:undefined,
    addModalVisible:false,
    modifyModalVisible:false,
    showHighSearch:false,
    current:1,
    pageSize:10,
    total:0,
    chnName:"",
    highValue:{},
    arr:[],
    controlList:{user_mod:false,user_add:false,user_del:false,user_resetpasswd:false,user_auz:false,},
  },
 
  effects:{
    *getAllOrganizationTree({payload},{call,put,select}){
      const res = yield call(getAllOrganizationTree,{token:sessionStorage.getItem('sys-token')});
      // const res = yield call(getOrganization)
      // console.log(res);
      if(typeof res !== 'undefined'){
        function getTree(data){
          return data.map(item => item.isLeaf ? {
            title:item.text,
            value:item.id,
            key:item.id,
            isLeaf:item.isLeaf,
          } : {
            title:item.text,
            value:item.id,
            key:item.id,
            isLeaf:item.isLeaf,
            children:getTree(item.children),
          });
        }

        const organizationTree = getTree(res);
        // console.log(organizationTree);
        const rootKey = organizationTree.length>0 ? organizationTree[0].key : undefined;
        yield put({
          type:'setOrganizationTree',
          payload:{
            organizationTree,
            rootKey,
          }
        });
      }else{
        message.error("获取组织结构失败...");
      }
    },

    *getUserData({payload},{call,put,select}){
      const res= yield call(getUserList,{...payload,token:sessionStorage.getItem('sys-token')});
      //const res = yield call(getUserData);
      // console.log(res);
      if(typeof res !== 'undefined'){
        if(res.success){
          const users = res.rows.map(item => {
            return {
              key:item.sid,
              name: item.chnName,
              account: item.userName,
              password: item.password,
              stype: item.stype,
              description: '',
              organization: item.org,
              orgId: item.orgId,
              role: item.role,
              islock: false,
            };
          });

          yield put({
            type:'setUserData',
            payload:{
              userData:users,
              current:res.page,
              pageSize:res.pageSize,
              total:res.total,
              addModalVisible:false,
              modifyModalVisible:false,
            }
          });
        }else{
          if(typeof payload.search !== 'undefined'){
            message.warning("搜索用户失败...");
          }else{
            message.warning("获取用户列表失败...");
          }
        }
      }else{
        if(typeof payload.search !== 'undefined'){
          message.error("搜索用户接口错误...");
        }else{
          message.error("获取用户列表接口错误...");
        }
      }
    },

    *getRoleSelect({payload},{call,put}){
      const res = yield call(getRoles,{token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          // console.log(res);
          const roleSelect = res.rows.map(item => {
            return {
              key:item.sid,
              value:item.sid,
              label:item.roleName,
            }
          });
          yield put({
            type:'setRoleSelect',
            payload:{
              roleSelect,
            }
          });
        }else{
          message.warning("获取角色列表接口错误...");
        }
      }else{
        message.error("获取角色列表接口错误...");
      }
    },

    *simpleSearchUser({payload},{call,put}){
      yield put({
        type:'getUserData',
        payload:{
          ...payload,
          search:true
        },
      });
      yield put({
        type:'getValue',
        payload:{
          ...payload,
        },
      });
    },

    *highSearchUser({payload},{call,put}){
      yield put({
        type:'getUserData',
        payload:{...payload,search:true},
      });
      const data={
        orgId:payload.orgId,
        userName:payload.userName,
        role:payload.role,
        stype:payload.stype,
      };
      yield put({
        type:'getValue1',
        payload: data,
      });
      /*
      const res= yield call(getUserList,{...payload,token:sessionStorage.getItem('sys-token')});
      console.log(res);
      //const res = yield call(getUserData);
      // console.log(res);
      if(typeof res !== 'undefined'){
        if(res.success){
          const users = res.rows.map(item => {
            return {
              key:item.sid,
              name: item.chnName,
              account: item.userName,
              description: '',
              organization: item.org,
              orgId: item.orgId,
              role: item.role,
              islock: false,
            };
          });

          yield put({
            type:'setUserData',
            payload:{
              userData:users,
              current:res.page,
              pageSize:res.pageSize,
              total:res.total,
            }
          });
        }else{
          message.warning("搜索用户失败...");
        }
      }else{
        message.error("搜索用户接口错误...");
      }
      */
    },

    *addUser({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(saveOrAddUsers,{...payload,opType:'add',token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getUserData',
            payload:{
              orgId: state.usermanage.selectOrganizationKeys[0],
              page:1,
              pageSize:state.usermanage.pageSize,
            }
          });
          message.success("添加用户成功");
        }else{
          message.warning("添加用户失败...");
        }
      }else{
        message.error("添加用户接口错误...");
      }  
    },

    *modifyUser({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(saveOrAddUsers,{...payload,opType:'mod',token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getUserData',
            payload:{
              orgId: state.usermanage.selectOrganizationKeys[0],
              page:1,
              pageSize:state.usermanage.pageSize,
            }
          });
          message.success("修改用户成功");
        }else{
          message.warning("修改用户失败...");
        }
      }else{
        message.error("修改用户接口错误...");
      }  
    },

    *setUserAuthority({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(saveUserRoles,{
        ...payload,
        token:sessionStorage.getItem('sys-token')
      });

      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getUserData',
            payload:{
              orgId: state.usermanage.selectOrganizationKeys[0],
              page:1,
              pageSize:state.usermanage.pageSize,
            }
          });
          message.success("修改用户角色成功");
        }else{
          message.warning("修改用户角色失败...");
        }
      }else{
        message.error("修改用户角色接口错误...");
      }  
    },

    *resetPassword({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(resetPassword,{...payload,token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getUserData',
            payload:{
              page:state.usermanage.current,
              pageSize:state.usermanage.pageSize,
            }
          });
          message.success("重置该用户密码成功");
        }else{
          message.warning("重置该用户密码失败...");
        }
      }else{
        message.error("重置该用户密码接口错误...");
      }
    },

    *deleteUser({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(delUsers,{userIds:payload.key.toString(),opType:'del',token:sessionStorage.getItem('sys-token')});
      // console.log(res);
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getUserData',
            payload:{
              page:state.usermanage.current,
              pageSize:state.usermanage.pageSize,
            }
          });
          message.success("删除该用户成功");
        }else{
          message.warning("删除该用户失败...");
        }
      }else{
        message.error("删除该用户接口错误...");
      }
    },

    *deletePartUser({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(delUsers,payload);
      // console.log(res);
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'getUserData',
            payload:{
              page:state.usermanage.current,
              pageSize:state.usermanage.pageSize,
            }
          });
          message.success("删除该用户成功");
        }else{
          message.warning("删除该用户失败...");
        }
      }else{
        message.error("删除该用户接口错误...");
      }
    },

    *roleMenus({payload,callback},{call,put}){
      const response=yield call(getUserRoles,payload);
      // console.log("我的response",response);
      if(typeof response !== 'undefined'){
        if(response.success){
          const arr=[];
          // console.log("我又被执行22222222")
          response.rows.map((item)=>{
            if(item.roleId!=undefined){
              arr.push(item.roleId)
            }
          });
          if(callback)callback(arr)
          yield put({
            type:'setArr',
            payload: arr,
          });
          // console.log("我的arr",arr)
        }else{
          message.warning("无法获取用户已授权角色...");
        }
      }else{
        message.error("获取已授权角色接口错误...");
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
              if(item.menuCode=="user_add"){
                control.user_add=true
              }else if(item.menuCode=="user_del"){
                control.user_del=true
              }else if(item.menuCode=="user_mod"){
                control.user_mod=true
              }else if(item.menuCode=="user_resetpasswd"){
                control.user_resetpasswd=true
              }else if(item.menuCode=="user_auz"){
                control.user_auz=true
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

    setOrganizationTree(state,{payload}){
      return {...state, ...payload}
    },

    setSelectOrganization(state,{payload}){
      return {...state,...payload}
    },

    setRoleSelect(state,{payload}){
      return {...state, ...payload}
    },

    setUserData(state,{payload}){
      return {...state, ...payload}
    },

    setAddModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    setShowHighSearch(state,{payload}){
      return {
        ...state,
        ...payload,
        chnName:"",
      }
    },

    setModifyModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    setAuthorityModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    getValue(state,{payload}){
      return {
        ...state,
        chnName:payload.chnName,
      };
    },

    getValue1(state,{payload}){
      return {
        ...state,
        highValue:payload,
      };
    },

    setArr(state,{payload}){
      return {
        ...state,
        arr:payload,
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
