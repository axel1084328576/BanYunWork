import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { message } from 'antd';
import { accountLogin, modifyPassword, accountLogout, accountReload} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    currentUser: {},
    // userId:"",
  },
 
  effects: {
    *login({ payload,callback}, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);
      // console.log("11111");
      const res = yield call(accountLogin, {userName:payload.userName,password:payload.password});
      // console.log("22222");
      if(typeof res !== 'undefined'){
        if(res.success){
          const response = {
            status: 'ok',
            currentAuthority: res.userInfo.stype === "1" ? 'admin' : 'admin',// 维护登入 登入角色
            role: res.userInfo.role,
            currentUser: {
              ...res.userInfo,
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            },
            // token: res.token,
            token: res.userInfo.token,
          };
          yield put({
            type: 'changeLoginStatus',
            payload: response,
          });
          if(callback)callback();
          yield put({
            type: 'getUserId',
            payload:res.userInfo.sid,
          });
          // Login successfully
          // if (response.status === 'ok') {
          //   reloadAuthorized();
          //   const urlParams = new URL(window.location.href);
          //   const params = getPageQuery();
          //   let { redirect } = params;
          //   if (redirect) {
          //     const redirectUrlParams = new URL(redirect);
          //     console.log("redirectUrlParams",redirectUrlParams);
          //     if (redirectUrlParams.origin === urlParams.origin) {
          //       redirect = redirect.substr(urlParams.origin.length);
          //       if (redirect.startsWith('/#')) {
          //         redirect = redirect.substr(2);
          //       }
          //     } else {
          //       window.location.href = redirect;
          //       return;
          //     }
          //   }
          //   yield put(routerRedux.replace(redirect || '/app'));
          // }

          reloadAuthorized();
          // const urlParams = new URL(window.location.href);
          const urlParams = new URL(window.location.hash);
          const params = getPageQuery();
          let { redirect } = params;
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            // console.log("redirectUrlParams",redirectUrlParams);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.startsWith('/#')) {
                redirect = redirect.substr(2);
              }
            } else {
              // window.location.href = redirect;
              window.location.hash= redirect
              return;
            }
          }
          yield put(routerRedux.replace('/app'));
        }else{
          const response = {
            status: 'error',
            currentAuthority: 'guest',
            role: '',
            currentUser: {},
            token: '',
          };
          yield put({
            type: 'changeLoginStatus',
            payload: response,
          });
        }
      }else{
        message.error("登入失败！服务器异常...");
      }
    },

    /*
    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    */

    *modifyPassword({payload},{call,put,select}){
      const res = yield call(modifyPassword,{...payload,token:sessionStorage.getItem('sys-token')});
      // console.log("修改的",res);
      if(typeof res !== 'undefined'){
        if(res.success){
          message.success("密码修改成功, 请重新登入");
          yield put({
              type:'logout',
            });
        }else{
          message.warning("密码验证失败, 请确认原密码是否正确");
        }
      }else{
        message.error("密码修改接口错误...");
      }
    },

    *reloadLogin({payload}, {put,call}){
      const res = yield call(accountReload,{...payload});
      if(typeof res !== 'undefined' && res.success){
        yield put({
          type:'setCurrentUser',
          payload:{
            currentUser: {
              ...res.userInfo,
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            },
          }
        });
      }else{
        yield put(
          routerRedux.push({
            pathname: '/user/login',
          })
        );
      }
    },

    *logout(_, { put,call }) {
      const res = yield call(accountLogout, {token:sessionStorage.getItem("sys-token")});
      // console.log(res);
      if(typeof res !== 'undefined'){
        if(res.success){
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: false,
              currentAuthority: 'guest',
            },
          });
          reloadAuthorized();
          yield put(
            routerRedux.push({
              pathname: '/user/login',
              /*
              search: stringify({
                redirect: window.location.href,
              }),
              */
            })
          );
        }else{
          message.warning("退出登入失败...");
        }
      }else{
        message.error("退出登入接口错误...");
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // console.log("modal-payload",payload);
      setAuthority(payload.currentAuthority);
      sessionStorage.setItem('sys-role',payload.role);
      sessionStorage.setItem('sys-token',payload.token);
      // console.log("sessionStorage.getItem('sys-token')",sessionStorage.getItem('sys-token'));
      return {
        ...state,
        status: payload.status,
        currentUser: payload.currentUser,
      };
    },

    setCurrentUser(state,{payload}){
      return {...state,...payload};
    },

    getUserId(state,{payload}){
      return {
        ...state,
        userId:payload,
      };
    },
  },
};
