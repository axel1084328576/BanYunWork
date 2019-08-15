export default [
  // user
  { path: '/', redirect: '/home' },
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/home', authority: ['admin', 'user'] },
      {
        path: '/home',
        name:'home',
        icon:'home',
        component: './Home/Home',
      },
      {
        path: '/securitySituation',
        name:'home',
        icon:'home',
        component: './SecuritySituation/SecuritySituation',
      },
      {
        path: '/policyEffectiveness',
        name:'home',
        icon:'home',
        component: './PolicyEffectiveness/PolicyEffectiveness',
      },
      {
        path: '/enterpriseIntegration',
        name:'home',
        icon:'home',
        component: './EnterpriseIntegration/EnterpriseIntegration',
      },
      {
        path: '/serviceContribution',
        name:'home',
        icon:'home',
        component: './ServiceContribution/ServiceContribution',
      },
      {
        path: '/comprehensiveGovernance',
        name:'home',
        icon:'home',
        component: './ComprehensiveGovernance/ComprehensiveGovernance',
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu:true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
            hideInMenu:true,
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
            hideInMenu:true,
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
            hideInMenu:true,
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
