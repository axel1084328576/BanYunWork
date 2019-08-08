import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import MapDetail from './views/MapDetail'
import CarInfomation from './views/CarInfomation'
import Flow from './views/Flow'
import Employees from './views/Employees'
import Intelligence from './views/Intelligence'
import TotalMonitor from './views/TotalMonitor'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/mapDetail',
            name: 'MapDetail',
            component: MapDetail
        },
        {
            path: '/CarInfomation',
            name: 'CarInfomation',
            component: CarInfomation
        },
        {
            path: '/flow',
            name: 'Flow',
            component: Flow
        },
        {
            path: '/employees',
            name: 'Employees',
            component: Employees
        },
        {
            path: '/intelligence',
            name: 'Intelligence',
            component: Intelligence
        },
        {
            path: '/totalMonitor',
            name: 'TotalMonitor',
            component: TotalMonitor
        }
    ]
})