import {getBusinessInfo,getCompany} from '@/services/BusinessInfo/businessInfoServ'
import {message} from 'antd';
import { listVideo } from "../../services/VideoMonitor/videoReplay";
export default {
  namespace: 'businessinfo',

  state:{
    businessInfo:[],
    deliveryno:{},
    LPIDSelect:[{
      key:'1',
        text: '申通',
        value: 'ST',
      }, {
        key:'2',
        text: '韵达',
        value: 'TD',
      },{
        key:'3',
        text: 'STO',
        value: 'STO',
      },{
        key:'4',
        text: '圆通',
        value: 'YRT',
      },{
        key:'5',
        text: '中通',
        value: 'ZT',
      },{
        key:'6',
        text: '顺丰',
        value: 'SF',
      },{
        key:'7',
        text: '邮政',
        value: 'YZ',
      }],
      showHighSearch:false,
      current:1,
      pageSize:10,
      total:0,
      companyList:[],
  },

  effects:{
    *getBusinessInfo({payload},{call,put}){
      const res = yield call(getBusinessInfo,{...payload,token:sessionStorage.getItem('sys-token')});
      // console.log("res",res);
      if(typeof res !== 'undefined'){
        if(res.success){
          const businessInfo = res.rows;
          yield put({
            type:'setBusinessInfo',
            payload:{
              businessInfo,
              current:res.page,
              pageSize:res.pageSize,
              total:res.total,
              spent:res.spent,
            }
          });
        }else{
          if(typeof payload.search !== 'undefined'){
            message.warning("搜索面单数据失败...");
          }else{
            message.warning("获取面单数据失败...");
          }
        }
      }else{
        if(typeof payload.search !== 'undefined'){
          message.error("搜索面单信息数据接口错误...");
        }else{
          message.error("获取面单信息数据接口错误...");
        }
      }
    },

    *companyList({payload,callback},{call,put}){
      const response=yield call(getCompany,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'getCompanyList',
            payload:response.rows,
          });
          if(callback)callback(response.rows)
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

    *simpleSearch({payload},{call,put}){
      // console.log("myPayload22222",payload);
      yield put({
        type:'getValue',
        payload: {
          start: payload.start,
          end: payload.end,
          ...payload
        },
      });
      yield put({
        type:'getBusinessInfo',
        payload: {
          ...payload,
          search:true,
        },
      });
      // const data={
      //   deliveryno:payload.deliveryno,
      // };


      /*
      const res = yield call(getBusinessInfo,{...payload,token:sessionStorage.getItem('sys-token')})
      console.log(res);
      if(typeof res !== 'undefined'){
        if(res.success){
          const businessInfo = res.rows.map(item=>{
            return {
              key: item.mailno,
              logisticProviderID: item.logisticproviderid,
              mailNo: item.mailno,
              mailType: item.mailtype,
              customerType: item.customertype,
              weight: item.weight,
              senAreaCode: item.senareacode,
              recAreaCode: item.recareacode,
              senCityCode: item.sencitycode,
              recCityCode: item.reccitycode,
              senName: item.senname,
              senMobile: item.senmobile,
              senPhone: item.senphone,
              senProv: item.senprovcode,
              senCity: item.sencitycode,
              senCounty: item.sencountycode,
              senAddress: item.senaddress,
              recName: item.recname,
              recMobile: item.recmobile,
              recPhone: item.recphone,
              recProv: item.recprovcode,
              recCity: item.reccitycode,
              recCounty: item.reccountycode,
              recAddress: item.recaddress,
              typeOfContents: item.typeofcontents,
              nameOfCoutents: item.nameofcoutents,
              mailCode: item.mailcode,
              recDatetime: item.recdate,
              insuranceValue: item.insurancevalue,
            }
          });
          yield put({
            type:'setBusinessInfo',
            payload:{
              businessInfo,
              current:1,
              pageSize:10,
              total:res.total,
            }
          });
        }else{
          message.warning("搜索面单数据失败...");
        }
      }else{
        message.error("搜索面单信息数据接口错误...");
      }
      */
    },

    *highSearch({payload},{call,put}){
      // console.log("payload",payload);
      yield put({
        type:'getBusinessInfo',
        payload:{
          ...payload,
          search:true,
        },
      });
    },
  },

  reducers:{
    setBusinessInfo(state,{payload}){
      return {...state,...payload};
    },

    // setShowHighSearch(state,{payload}){
    //   return {
    //     ...state,
    //     ...payload,
    //     // deliveryno:{},
    //   }
    // },

    getValue(state,{payload}){
      // console.log("payload333333",payload);
      return {
        ...state,
        deliveryno:payload,
      };
    },


    getCompanyList(state,{payload}){
      return {
        ...state,
        companyList:payload,
      };
    },
  },
}