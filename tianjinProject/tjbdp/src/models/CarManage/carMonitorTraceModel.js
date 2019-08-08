import {message} from 'antd';
import {getCarMonitorTrace,getPerCarTrace,getMapData,getCarMapData,setCarData} from '@/services/CarManage/carMonitorTraceServ';
import { selectVideo } from "../../services/VideoMonitor/videoReplay";

export default {
  namespace:'carmonitortrace',

  state:{
    carTrace:[],
    perCarTrace:[],
    perCarTraces:{},
    selectCarKey:'',
    index:0,
    center:null,
    carList:[],
    mapList:[],
    carData:[],
  },

  effects:{
    *getCarMonitorTrace({payload},{call,put}){
      const res = yield call(getCarMonitorTrace);
      console.log("res",res);
      const perCarTraces=yield call(getPerCarTrace);
      console.log("perCarTraces",perCarTraces);
      let perCarTrace=[];
      let i=0;
      for(let [k,v] of Object.entries(perCarTraces)){
        perCarTrace[i]=[v[0],v[1]];
        i+=1;
      }
      // console.log(perCarTrace);
      yield put({
        type:'setCarTrace',
        payload:{
          carTrace:res.data,
          perCarTraces,
          perCarTrace,
          center:res.data[0].position,
          index:0,
        }
      });
    },

    *getCarData({payload},{call,put}){
      const res = yield call(setCarData);
      if(res!=undefined){
        if(res instanceof Array && res.length>0){
          let arr=[];
          res.map((item)=>{
            let value={
              position:{
                latitude:item.wd,
                longitude: item.jd
              },
              key:item.vin,
              carDriver:item.vin,
              time:item.time,
              sd:item.sd,
            }
            arr.push(value)
          });
          yield put({
            type:'setCarData',
            payload:arr,
          });
        }
      }
    },

    *updateCarTrace({payload},{call,put,select}){
      const state = yield select();
      let {
        carTrace,
        perCarTrace,
        perCarTraces,
        selectCarKey,
        index,
        center,
      } = state.carmonitortrace;
      const copyPerCarTrace = perCarTrace; 
      if(index < 59){
        index+=1;

        carTrace = carTrace.map(item => {
          item.position = {...perCarTraces[item.licenceNumber][index]};

          if(item.key === selectCarKey){
            center={...perCarTraces[item.licenceNumber][index]};
          }
          
          return item;
        });

        let i=0;
        for(let [k,v] of Object.entries(perCarTraces)){
          copyPerCarTrace[i]=[...copyPerCarTrace[i],v[index]];
          i+=1;
        }
      }
      
      yield put({
          type:'setCarTrace',
          payload:{
            carTrace,
            perCarTrace:copyPerCarTrace,
            perCarTraces,
            selectCarKey,
            index,
            center,
          }
        });

      /*
      let newCenter=state.carmonitortrace.center;
      let newCarTrace = state.carmonitortrace.carTrace.map(
        item => {
          const iflongitude = Math.random();
          if(iflongitude < 0.5){
            item.position.longitude += 0.0001;
          }

          const iflatitude = Math.random();
          if(iflatitude > 0.5){
            item.position.latitude += 0.0001;
          }

          if(item.key === state.carmonitortrace.selectCarKey){
            newCenter=item.position;
          }

          return item;
        });
      */

    },

    *carData({payload,callback},{call,put}){
      const response=yield call(getCarMapData,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'carList',
            payload:response.rows
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },


    *carMapData({payload,callback},{call,put}){
      const response=yield call(getMapData,payload);
      if(response!=undefined){
        if(response.success==true){
          yield put({
            type:'mapList',
            payload:response.rows
          });
        }else{
          message.success(response.msg);
        }
      }else {
        message.success('获取数据失败');
      }
    },

  },

  reducers:{

    setCarTrace(state,{payload}){
      return {...state, ...payload}
    },

    setCarData(state,{payload}){
      return {
        ...state,
        carData:payload,
        center:payload[0].position,
      };
    },

    setMapCenter(state,{payload}){
      return {...state,...payload}
    },

    setSelectCarKey(state,{payload}){
      return {...state,...payload}
    },

    carList(state,{payload}){
      return {
        ...state,
        carList:payload,
      };
    },

    mapList(state,{payload}){
      return {
        ...state,
        mapList:payload,
      };
    },
  },
}
