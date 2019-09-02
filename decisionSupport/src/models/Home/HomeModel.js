import { message } from 'antd';
import {
  getBusinessTrend,
  getBeltAndRoad,
  getBusinessAndIncrease,
  getBusinessIncome,
  getBusinessValueTrend,
  getFTips,
  getInfrastructureBuild,
  getMainMap,
  getProcessEfficacy,
  getQualitySupervision,
  getThreeKeyPoint,
} from '@/services/Home/HomeService';

export default {
  namespace: 'home',

  state: {
    BusinessTrendValue: null,
    FTipsvalue: null,
    BusinessValueTrendValue: null,
    BusinessAndIncreaseValue: null,
    ProcessEfficacyValue: null,
    BusinessIncomeValue: null,
    InfrastructureBuildValue: null,
    ThreeKeyPointValue: null,
    BeltAndRoadValue: null,
  },

  effects: {
    *getBusinessTrendValue({ payload, callback }, { call, put }) {
      const response = yield call(getBusinessTrend, payload);
      if (response !== undefined) {
        yield put({
          type: 'BusinessTrend',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },

    *getFTipsValue({ payload, callback }, { call, put }) {
      const response = yield call(getFTips, payload);
      if (response !== undefined) {
        yield put({
          type: 'FTips',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },
    *getMainMapValue({ payload, callback }, { call, put }) {
      const response = yield call(getMainMap, payload);
      if (response !== undefined) {
        yield put({
          type: 'MainMap',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },
    *getBusinessValueTrendValue({ payload, callback }, { call, put }) {
      const response = yield call(getBusinessValueTrend, payload);
      if (response !== undefined) {
        yield put({
          type: 'BusinessValueTrend',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },

    *getBusinessAndIncreaseValue({ payload, callback }, { call, put }) {
      const response = yield call(getBusinessAndIncrease, payload);
      if (response !== undefined) {
        yield put({
          type: 'BusinessAndIncrease',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },

    *getProcessEfficacyValue({ payload, callback }, { call, put }) {
      const response = yield call(getProcessEfficacy, payload);
      if (response !== undefined) {
        yield put({
          type: 'ProcessEfficacy',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },

    *getQualitySupervisionValue({ payload, callback }, { call, put }) {
      const response = yield call(getQualitySupervision, payload);
      if (response !== undefined) {
        yield put({
          type: 'QualitySupervision',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },

    *getInfrastructureBuildValue({ payload, callback }, { call, put }) {
      const response = yield call(getInfrastructureBuild, payload);
      if (response !== undefined) {
        yield put({
          type: 'InfrastructureBuild',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },

    *getBusinessIncomeValue({ payload, callback }, { call, put }) {
      const response = yield call(getBusinessIncome, payload);
      if (response !== undefined) {
        yield put({
          type: 'BusinessIncome',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },

    *getThreeKeyPointValue({ payload, callback }, { call, put }) {
      const response = yield call(getThreeKeyPoint, payload);
      if (response !== undefined) {
        yield put({
          type: 'ThreeKeyPoint',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },

    *getBeltAndRoadValue({ payload, callback }, { call, put }) {
      const response = yield call(getBeltAndRoad, payload);
      if (response !== undefined) {
        yield put({
          type: 'BeltAndRoad',
          payload: response,
        });
      } else {
        message.success('获取数据失败');
      }
    },
  },
  reducers: {
    BusinessTrend(state, { payload }) {
      return {
        ...state,
        BusinessTrendValue: payload.data,
      };
    },

    FTips(state, { payload }) {
      return {
        ...state,
        FTipsvalue: payload.data,
      };
    },

    BusinessValueTrend(state, { payload }) {
      return {
        ...state,
        BusinessValueTrendValue: payload.data,
      };
    },

    BusinessAndIncrease(state, { payload }) {
      return {
        ...state,
        BusinessAndIncreaseValue: payload.data,
      };
    },

    ProcessEfficacy(state, { payload }) {
      return {
        ...state,
        ProcessEfficacyValue: payload.data,
      };
    },

    BusinessIncome(state, { payload }) {
      return {
        ...state,
        BusinessIncomeValue: payload.data,
      };
    },

    InfrastructureBuild(state, { payload }) {
      return {
        ...state,
        InfrastructureBuildValue: payload.data,
      };
    },

    ThreeKeyPoint(state, { payload }) {
      return {
        ...state,
        ThreeKeyPointValue: payload.data,
      };
    },

    BeltAndRoad(state, { payload }) {
      return {
        ...state,
        BeltAndRoadValue: payload.data,
      };
    },

    MainMap(state, { payload }) {
      return {
        ...state,
        MainMapValue: payload.data,
      };
    },
  },
};
