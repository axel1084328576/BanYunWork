import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')