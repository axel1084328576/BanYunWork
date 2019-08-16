export default [
  // user
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
    component: '../layouts/TopNavLayout',
    routes: [
      { path: '/', redirect: '/index'},
      {
        name: 'index',
        icon: 'home',
        path: '/index',
        hideInMenu:true,
        component: './Index/Index',
      },
      // {
      //   component: '404',
      // },
    ],
  },
];
