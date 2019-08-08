import {message} from 'antd';
import {getOutsideInterface} from '@/services/OutsideInterface/outsideInterfaceServ';

export default {
  namespace:'outsideinterface',

  state:{
    interfaceList:[],
    perInterfaceList:[],
    paramsFormatContent:[],
    viewKey:null,

    interfaceListShow:true,
    interfaceParamsShow:false,
    perInterfaceListShow:false,

    interfaceListKey:0,
    interfaceParamsKey:0,
    perInterfaceListKey:0,
  },

  effects:{
    *getOutsideInterface({payload},{call,put}){
      const res = yield call(getOutsideInterface);
      // console.log(res);

      yield put({
        type:'setInterfaceList',
        payload:{
          interfaceList:res.data,
          interfaceListKey:res.data.length,
          ...payload,
        }
      });
    },

    *getPerInterface({payload},{call,put,select}){
      const state = yield select();
      const {interfaceList} = state.outsideinterface;
      const perInterfaceList = interfaceList.filter(item => item.key === payload.key)[0].interface;
      // console.log(perInterfaceList);
      yield put({
        type:'setPerInterfaceList',
        payload:{
          perInterfaceList,
          perInterfaceListKey:perInterfaceList.length,
          viewKey:payload.key,
        }
      });
    },

    *getParamsFormatContent({payload},{call,put,select}){
      const state = yield select();
      const {interfaceList} = state.outsideinterface;
      const paramsFormatContent = interfaceList.filter(item => item.key === payload.key)[0].paramFormat.content;
      // console.log(paramsFormatContent);
      yield put({
        type:'setParamsFormatContent',
        payload:{
          paramsFormatContent,
          interfaceParamsKey:paramsFormatContent.length,
          viewKey:payload.key,
        }
      });
    },

    *deleteInterfaceList({payload},{call,put,select}){
      const state = yield select();
      let { interfaceList } = state.outsideinterface;
      // console.log(interfaceList);
      const newInterfaceList = interfaceList.filter(item => item.key !== payload.key);

      yield put({
        type:'setInterfaceList',
        payload:{
          interfaceList:newInterfaceList,
        }
      });
    },

    *deletePerInterfaceList({payload},{call,put,select}){
      const state = yield select();
      let {
        interfaceList,
        viewKey,
      } = state.outsideinterface;
      const newInterfaceList = interfaceList.map(item => {
        if(item.key === viewKey){
          const newPerInterfaceList = item.interface.filter(inte => inte.key !== payload.key);
          item.interface = [...newPerInterfaceList];
        }
        return item;
      });

      const perInterfaceList = newInterfaceList.filter(item => item.key === viewKey)[0].interface;
      // console.log(perInterfaceList);
      yield put({
        type:'setPerInterfaceList',
        payload:{
          interfaceList:newInterfaceList,
          perInterfaceList
        }
      });
    },

    *deleteParamsFormatContent({payload},{call,put,select}){
      const state = yield select();
      let {
        interfaceList,
        viewKey,
      } = state.outsideinterface;
      const newInterfaceList = interfaceList.map(item => {
        if(item.key === viewKey){
          const newParams = item.paramFormat.content.filter(param => param.key !== payload.key);
          item.paramFormat.content = [...newParams];
        }
        return item
      });
      const paramsFormatContent = newInterfaceList.filter(item => item.key === viewKey)[0].paramFormat.content;
      // console.log(paramsFormatContent);
      yield put({
        type:'setParamsFormatContent',
        payload:{
          interfaceList:newInterfaceList,
          paramsFormatContent
        }
      });
    },

    *updateInterfaceList({payload},{call,put,select}){
      const state = yield select();
      let { interfaceList } = state.outsideinterface;
      // console.log(interfaceList);
      const newInterfaceList = interfaceList.map(item => {
        if(item.key === payload.key){
          item.url= payload.url;
          item.name= payload.name;
          item.interfaceType= payload.interfaceType,
          item.description= payload.description;
          item.paramFormat.pType= payload.paramFormat;
          item.returnFormat= payload.returnFormat;
        }
        return item;
      });

      yield put({
        type:'setInterfaceList',
        payload:{
          interfaceList:newInterfaceList,
        }
      });
    },

    *updatePerInterfaceList({payload},{call,put,select}){
      const state = yield select();
      const {interfaceList,viewKey} = state.outsideinterface;
      const newInterfaceList = interfaceList.map(item=>{
        if(item.key === viewKey){
          item.interface = item.interface.map(inte => {
            if(inte.key === payload.key){
              inte = {...payload}; 
            }
            return inte;
          });
        }
        return item;
      });

      const perInterfaceList = newInterfaceList.filter(item => item.key === viewKey)[0].interface;
      // console.log(perInterfaceList);
      yield put({
        type:'setPerInterfaceList',
        payload:{
          interfaceList:newInterfaceList,
          perInterfaceList
        }
      });
    },

    *updateInterfaceParams({payload},{call,put,select}){
      const state = yield select();
      const {interfaceList,viewKey} = state.outsideinterface;
      const newInterfaceList = interfaceList.map(item => {
        if(item.key === viewKey){
          const newParams = item.paramFormat.content.map(param => {
            if(param.key === payload.key){
              param = {...payload}; 
            }
            return param;
          });
          item.paramFormat.content = [...newParams];
        }
        return item;
      });

      const paramsFormatContent = newInterfaceList.filter(item => item.key === viewKey)[0].paramFormat.content;
      // console.log(paramsFormatContent);
      yield put({
        type:'setParamsFormatContent',
        payload:{
          interfaceList:newInterfaceList,
          paramsFormatContent
        }
      });      
    },

    *addInterfaceList({payload},{call,put,select}){
      const state = yield select();
      let { interfaceList, interfaceListKey } = state.outsideinterface;
      const newKey = interfaceListKey+1;
      // console.log(interfaceList);
      interfaceList.unshift({
          key: newKey,
          url: payload.url,
          name: payload.name,
          description: payload.description,
          interfaceType: payload.interfaceType,
          paramFormat:{
            pType:payload.paramFormat,
            content:[],
          },
          returnFormat: payload.returnFormat,
          interface:[],
        });
      yield put({
        type:'setInterfaceList',
        payload:{
          interfaceList,
          interfaceListKey:newKey,
        }
      });
    },

    *addPerInterfaceList({payload},{call,put,select}){
      const state = yield select();
      const {interfaceList,viewKey,perInterfaceListKey} = state.outsideinterface;
      const newKey = perInterfaceListKey+1;

      const newInterfaceList = interfaceList.map(item=>{
        if(item.key === viewKey){
          item.interface = [...item.interface, {...payload,key:newKey}];
        }
        return item;
      });

      const perInterfaceList = newInterfaceList.filter(item => item.key === viewKey)[0].interface;
      // console.log(perInterfaceList);
      yield put({
        type:'setPerInterfaceList',
        payload:{
          interfaceList:newInterfaceList,
          perInterfaceListKey:newKey,
          perInterfaceList
        }
      });
    },

    *addInterfaceParams({payload},{call,put,select}){
      const state = yield select();
      const {interfaceList,viewKey,interfaceParamsKey} = state.outsideinterface;
      const newKey = interfaceParamsKey+1;
      const newInterfaceList = interfaceList.map(item => {
        if(item.key === viewKey){
          item.paramFormat.content.unshift({
              key:newKey,
              pName: payload.pName,
              pType: payload.pType,
              pDefaultValue: payload.pDefaultValue,
              pIsNull: payload.pIsNull,
              pDescription: payload.pDescription,
          });
        }
        return item;
      });

      const paramsFormatContent = newInterfaceList.filter(item => item.key === viewKey)[0].paramFormat.content;
      // console.log(paramsFormatContent);
      yield put({
        type:'setParamsFormatContent',
        payload:{
          interfaceList:newInterfaceList,
          interfaceParamsKey:newKey,
          paramsFormatContent,
        }
      });      
    },

  },

  reducers:{
    setInterfaceList(state,{payload}){
      return {...state, ...payload}
    },

    setPerInterfaceList(state,{payload}){
      return {...state, ...payload}
    },

    setShowState(state,{payload}){
      return {...state, ...payload}
    },

    setParamsFormatContent(state,{payload}){
      return {...state, ...payload}
    },  

  },
}
