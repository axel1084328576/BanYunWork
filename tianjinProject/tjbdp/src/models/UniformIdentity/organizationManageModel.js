import {message} from 'antd';
import {
        getOrganization,
        getAllOrganization,
        getAllOrganizationTree,
        deleteOrganization,
        getPartOrganization,
        saveOrAddOrganization,
      } from '@/services/UniformIdentity/organizationManageServ';
import { getUserPage } from "../../services/public";

export default {
  namespace:'organizationmanage', 

  state:{
    organization:[],
    organizationTree:[],
    addModifyOrganizationTree:[],
    selectedRowKeys:[],
    selectOrganizationKeys:[],
    rootKey:undefined,
    addModalVisible:false,
    modifyModalVisible:false,
    current:1,
    pageSize:10,
    total:0,
    chnName:"",
    controlList:{org_mod:false,org_add:false,org_del:false},
  },

  effects:{
    *getPartTreeInit({payload},{call,put}){
      const partTree = yield call(getPartOrganization,{token:sessionStorage.getItem('sys-token')});
      if(typeof partTree !== 'undefined'){
        const organizationTree = partTree.map(item => {
          return {
            title:item.text,
            value:item.text,
            key:item.id,
            isLeaf:item.isLeaf,
          };
        });
        const rootKey = organizationTree.length > 0 ? organizationTree[0].key : undefined;
        yield put({
          type:'setOrganizationTree',
          payload:{
            organizationTree,
            rootKey,
          }
        });
      }else{
        message.error("获取部分组织树接口错误...");
      }
    },

    *getPartOrganizationTree({payload},{call,put,select}){
      const state = yield select();
      const partTree = yield call(getPartOrganization,{...payload,token:sessionStorage.getItem('sys-token')});

      if(typeof partTree !== 'undefined'){
        const childrenTree = partTree.map(item => {
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
            if(item.key === payload.pid){
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

        const newPartTree = setChildren(state.organizationmanage.organizationTree);

        // console.log(newPartTree);

        const rootKey = newPartTree.length > 0 ? newPartTree[0].key : undefined;

        yield put({
            type:'setOrganization',
            payload:{
              organizationTree:newPartTree,
              rootKey,
            }
          });
      }else{
        message.error("获取下级组织接口错误...");
      }
    },

    *getAddModifyOrganizationTree({payload},{call,put,select}){
      const res = yield call(getAllOrganizationTree);

      function getTreeData(data){
        return data.map(item=>{
          return item.isLeaf ? {
            title: item.text,
            value: item.id,
            isLeaf: item.isLeaf,
          } : {
            title: item.text,
            value: item.id,
            isLeaf: item.isLeaf,
            children: getTreeData(item.children),
          }
        });
      }

      const addModifyOrganizationTree = getTreeData(res);
      // console.log(addModifyOrganizationTree);
      yield put({
        type:'setAddModifyOrganizationTree',
        payload:{
          addModifyOrganizationTree,
        }
      });
    },

    *selectOrganization({payload},{call,put,select}){
      const orgList = yield call(getAllOrganization,{...payload,token:sessionStorage.getItem('sys-token')});
      // console.log(orgList);
      if(typeof orgList !== 'undefined'){
        if(orgList.success){
          const newOrganization = orgList.rows.map(item=>{
            return {
              key:item.sid,
              pid:item.pid,
              orgName:item.orgName,
              orgNo:item.orgNo,
              orgCode:item.orgCode,
              orgType:item.stype,
              orgOrder:item.orgOrder,
            };
          });
          yield put({
            type:'setSelectOrganization',
            payload:{
              organization:newOrganization,
              total:orgList.total,
              current:orgList.page,
              pageSize:orgList.pageSize,
            }
          });
        }else{
          if(typeof payload.search !== 'undefined'){
            message.warning("搜索组织失败...");
          }else{
            message.warning("获取下级组织列表失败...");
          }
        }
      }else{
        if(typeof payload.search !== 'undefined'){
          message.error("搜索组织接口错误...");
        }else{
          message.error("获取下级组织列表接口错误...");
        }
      }
    },

    *searchOrganization({payload},{call,put,select}){
      yield put({
        type:'selectOrganization',
        payload:{...payload,search:true},
      });
      yield put({
        type:'getValue',
        payload:{
          ...payload,
        },
      });
      /*
      const orgList = yield call(getAllOrganization,{...payload,token:sessionStorage.getItem('sys-token')});
      // console.log(orgList);
      if(typeof orgList !== 'undefined'){
        if(orgList.success){
          const newOrganization = orgList.rows.map(item=>{
            return {
              key:item.sid,
              pid:item.pid,
              orgName:item.orgName,
              orgNo:item.orgNo,
              orgType:item.stype,
              orgOrder:item.orgOrder,
            };
          });
          yield put({
            type:'setSelectOrganization',
            payload:{
              organization:newOrganization,
              total:orgList.total,
              current:orgList.page,
              pageSize:orgList.pageSize,
            }
          });
        }else{
          message.warning("搜索组织失败...");
        }
      }else{
        message.error("搜索组织接口错误...");
      }
      */
    },

    *addOrganization({payload},{call,put,select}){
      const res = yield call(saveOrAddOrganization,{...payload,opType:'add',orgCode:'',token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        const state = yield select();
        if(res.success){
          yield put({
            type:'selectOrganization',
            payload:{
              pid:payload.pid,
              current:1,
              pageSize:state.organizationmanage.pageSize,
            }
          });
          yield put({
            type:'setSelectOrganization',
            payload:{
              selectOrganizationKeys:[payload.pid.toString()],
              addModalVisible:false,
            }
          });
          message.success("添加成功");
        }else{
          message.warning("添加组织信息失败...");
        }
      }else{
        message.error("添加组织信息接口错误...");
      }

    },

    *modifyOrganization({payload},{call,put,select}){
      // console.log(payload);
      const res = yield call(saveOrAddOrganization, {...payload,opType:'mod',orgCode:'',token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        const state = yield select();
        if(res.success){
          /*
          let newOrganization = state.organizationmanage.organization.map(item=>{
            if(item.key === payload.key){
              item={...item,...payload};
            }
            return item;
          });
          */
          yield put({
            type:'selectOrganization',
            payload:{
              pid:payload.pid,
              current:1,
              pageSize:state.organizationmanage.pageSize,
            }
          });
          yield put({
            type:'setSelectOrganization',
            payload:{
              selectOrganizationKeys:[payload.pid.toString()],
              modifyModalVisible:false,
            }
          });

          message.success("修改组织信息成功");
        }else{
          message.warning("修改组织信息失败...");
        }
      }else{
        message.error("修改组织信息接口错误...");
      }
    },

    *deleteOrganization({payload},{call,put,select}){
      const state = yield select();
      const res = yield call(deleteOrganization,{opType:'del',ids:payload.key.toString(),token:sessionStorage.getItem('sys-token')});
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'selectOrganization',
            payload:{
              pid: state.organizationmanage.selectOrganizationKeys[0],
              page: 1,
              pageSize: state.organizationmanage.pageSize,
            },
          });
          message.success("删除组织信息成功");
        }else{
          message.warning("删除组织信息失败...");
        }
      }else{
        message.error("删除组织信息接口错误...");
      }
    },

    *deletePartOrganization({payload},{call,put,select}){
     const res = yield call(deleteOrganization,payload);
     if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type:'selectOrganization',
            payload:{
              pid: state.organizationmanage.selectOrganizationKeys[0],
              page: 1,
              pageSize: state.organizationmanage.pageSize,
            },
          });
          message.success("删除组织信息成功");
        }else{
          message.warning("删除组织信息失败...");
        }
      }else{
        message.error("删除组织信息接口错误...");
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
              if(item.menuCode=="org_add"){
                control.org_add=true
              }else if(item.menuCode=="org_del"){
                control.org_del=true
              }else if(item.menuCode=="org_mod"){
                control.org_mod=true
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

    setOrganization(state,{payload}){
      return {...state, ...payload}
    },

    setOrganizationTree(state,{payload}){
      return {...state, ...payload}
    },

    setSelectOrganization(state,{payload}){
      return {...state,...payload}
    },

    setAddModifyOrganizationTree(state,{payload}){
      return {...state,...payload}
    },

    setAddModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    setModifyModalVisible(state,{payload}){
      return {...state, ...payload}
    },

    setSelectedRowKeys(state,{payload}){
      return {...state,...payload};
    },

    getValue(state,{payload}){
      return {
        ...state,
        chnName:payload,
      };
    },

    changeSelectNull(state,{payload}){
      return{
        ...state,
        selectedRowKeys:[],
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
