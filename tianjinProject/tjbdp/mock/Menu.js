// 这里模仿后台返回的菜单数据
export default {
  'GET /DynamicMenu/getDynamicMenu': [
    // dashboard
    // { path: '/', redirect: '/user' },
    // {
    //   // user
    //   path: '/user',
    //   component: '../layouts/UserLayout',
    //   routes: [
    //     { path: '/user', redirect: '/user/login' },
    //     { path: '/user/login', component: './User/Login' },
    //     { path: '/user/register', component: './User/Register' },
    //     { path: '/user/register-result', component: './User/RegisterResult' },
    //   ],
    // },
    // app
    { path: '/app', redirect: '/app/businessinfo' },
    {
      path: '/app/businessinfo',
      name: '业务信息',
      icon: 'table',
      authority: ['admin', 'user'],
      component: './BusinessInfo/BusinessInfo',
    },
    {
      path: '/app/carmanage',
      name: '车辆管理',
      icon: 'car',
      routes: [
        {
          path: '/app/carmanage/carinfomanage',
          name: '车辆信息管理',
          component: './CarManage/CarInfoManage',
        },
        {
          path: '/app/carmanage/carusecount',
          name: '车辆使用统计',
          component: './CarManage/CarUseCount',
        },
        {
          path: '/app/carmanage/carmonitortrace',
          name: '车辆监控轨迹',
          component: './CarManage/CarMonitorTrace',
        },
      ],
    },
    {
      path: '/app/securitymachine',
      name: '安检机联网',
      icon: 'robot',
      component: './SecurityMachine/ReplayCheck',
    },
    {
      path: '/app/empolyedmanage',
      name: '从业人员管理',
      icon: 'idcard',
      component: './EmpolyedManage/Infosafeguard',
    },
    {
      path: '/app/videomonitor',
      name: '视频监控管理',
      icon: 'video-camera',
      component: './VideoMonitor/VideoReplay',
    },
    {
      path: '/app/convenientservice',
      name: '便民服务',
      icon: 'shop',
      routes: [
        {
          path: '/app/convenientservice/expressnetwork',
          name: '快递网点管理',
          component: './ConvenientService/ExpressNetwork',
        },
        {
          path: '/app/convenientservice/postalnetwork',
          name: '邮政网点管理',
          component: './ConvenientService/PostalNetwork',
        },
        {
          path: '/app/convenientservice/postboxmanage',
          name: '信筒信箱管理',
          component: './ConvenientService/PostboxManage',
        },
      ],
    },
    {
      path: '/app/uniformidentity',
      name: '系统管理',
      icon: 'team',
      routes: [
        {
          path: '/app/uniformidentity/usermanage',
          name: '用户管理',
          component: './UniformIdentity/UserManage',
        },
        {
          path: '/app/uniformidentity/organizationmanage',
          name: '组织管理',
          component: './UniformIdentity/OrganizationManage',
        },
        {
          path: '/app/uniformidentity/rolemanage',
          name: '角色管理',
          component: './UniformIdentity/RoleManage',
        },
        {
          path: '/app/uniformidentity/menusmanage',
          name: '菜单管理',
          component: './UniformIdentity/MenusManage',
        },
      ],
    },
    {
      name: 'exception',
      icon: 'warning',
      path: '/app/exception',
      hideInMenu: true,
      routes: [
        // exception
        {
          path: '/app/exception/403',
          name: 'not-permission',
          component: './Exception/403',
        },
        {
          path: '/app/exception/404',
          name: 'not-find',
          component: './Exception/404',
        },
        {
          path: '/app/exception/500',
          name: 'server-error',
          component: './Exception/500',
        },
        {
          path: '/app/exception/trigger',
          name: 'trigger',
          hideInMenu: true,
          component: './Exception/TriggerException',
        },
      ],
    },
  ],
};
