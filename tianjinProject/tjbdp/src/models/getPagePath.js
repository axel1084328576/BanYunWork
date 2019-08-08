import { message } from "antd/lib/index";
import { getUserPage } from "../services/public";

export default {
  namespace: 'getPagePage',

  state: {
    pagePath:"",
  },

  effects: {

  },

  reducers: {
    pagePath(state,{payload}) {
      return {
        ...state,
        pagePath:payload,
      };
    },
  },
};
