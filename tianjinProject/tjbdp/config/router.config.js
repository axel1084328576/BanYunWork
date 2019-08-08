export default [
{
  path:'/',
  routes:[
    { path: '/', redirect: '/user' },
    {
      // user
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: './User/Login' },
        { path: '/user/register', component: './User/Register' },
        { path: '/user/register-result', component: './User/RegisterResult' },
      ],
    },
    // app
    {
      path: '/app',
      component: '../layouts/MyLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        //原默认页面
        // { path: '/app', redirect: '/app/businessmanage/statistics'},
        //初始默认进入 welcome
        { path: '/app', 
          component: '../layouts/welcome'},
        {
          path: '/app/businessmanage',
          name: 'businessinfo',
          icon: 'table',
          routes: [
            {
              path: '/app/businessmanage/statistics',
              name: 'statistics',
              component: './BusinessInfo/Statistics',
            },
            {
              path: '/app/businessmanage/businessinfo',
              name: 'carinfomanage',
              component: './BusinessInfo/BusinessInfo',
            },
            {
              path: '/app/businessmanage/dataassets',
              name: 'carusecount',
              component: './BusinessInfo/DataAssets',
            },
            {
              path: '/app/businessmanage/localEnterprises',
              name: 'carusecount',
              component: './BusinessInfo/localEnterprises/localEnterprises',
            },
            {
              path: '/app/businessmanage/mailForm',
              name: 'carusecount',
              component: './BusinessInfo/MailForm/MailForm',
            },
            {
              path: '/app/businessmanage/commerceData',
              name: 'carusecount',
              component: './BusinessInfo/CommerceData/CommerceData',
            },
          ],
        },
        {
          path: '/app/dangerous',
          name: 'dangerous',
          icon: 'table',
          routes: [
            {
              path: '/app/dangerous/securityProtocol',
              name: 'statistics',
              component: './BusinessManage/SecurityProtocol/SecurityProtocol',
            },
            {
              path: '/app/dangerous/dangerousEnterprises',
              name: 'carinfomanage',
              component: './BusinessManage/DangerousEnterprises/DangerousEnterprises',
            },
            {
              path: '/app/dangerous/dangerousChemicals',
              name: 'carusecount',
              component: './BusinessManage/DangerousChemicals/DangerousChemicals',
            },
          ],
        },
        {
          path: '/app/carmanage',
          name: 'carmanage',
          icon: 'car',
          routes: [
            {
              path: '/app/carmanage/carinfomanage',
              name: 'carinfomanage',
              component: './CarManage/CarInfoManage',
            },
            {
              path: '/app/carmanage/carusecount',
              name: 'carusecount',
              component: './CarManage/CarUseCount',
            },
            {
              path: '/app/carmanage/carmonitortrace',
              name: 'carmonitortrace',
              component: './CarManage/CarMonitorTrace',
            },
          ],
        },
        {
          path: '/app/securitymachine',
          name: 'securitymachine',
          icon: 'robot',
          component: './SecurityMachine/ReplayCheck',
        },
        {
          path: '/app/delivery',
          name: 'dangerous',
          icon: 'table',
          routes: [
            {
              path: '/app/delivery/networkManage',
              name: 'statistics',
              component: './BrandManage/NetworkManage/NetworkManage',
            },
            {
              path: '/app/delivery/deliveryEnterprise',
              name: 'carinfomanage',
              component: './BrandManage/DeliveryEnterprise/DeliveryEnterprise',
            },
          ],
        },
        {
          path: '/app/empolyedmanage',
          name: 'empolyedmanage',
          icon: 'idcard',
          component: './EmpolyedManage/Infosafeguard',
        },
        {
          path: '/app/videomonitor',
          name: 'videomonitor',
          icon: 'video-camera',
          component: './VideoMonitor/VideoReplay',
        },
        {
          path: '/app/convenientservice',
          name: 'convenientservice',
          icon: 'shop',
          routes: [
            {
              path: '/app/convenientservice/expressnetwork',
              name: 'expressnetwork',
              component: './ConvenientService/ExpressNetwork',
            },
            {
              path: '/app/convenientservice/postalnetwork',
              name: 'postalnetwork',
              component: './ConvenientService/PostalNetwork',
            },
            {
              path: '/app/convenientservice/postboxmanage',
              name: 'postboxmanage',
              component: './ConvenientService/PostboxManage',
            },
            {
              path: '/app/convenientservice/expressbox',
              name: 'expressbox',
              component: './ConvenientService/ExpressBox',
            },
            {
              path: '/app/convenientservice/kioskinfo',
              name: 'postalnetwork',
              component: './ConvenientService/KioskInfo',
            },
            {
              path: '/app/convenientservice/kioskinfo',
              name: 'postalnetwork',
              component: './ConvenientService/KioskInfo',
            },
            {
              path: '/app/convenientservice/terminalmanage',
              name: 'postalnetwork',
              component: './ConvenientService/TerminalManage',
            },

          ],
        },
        {
          path: '/app/expressboxmanage',
          name: 'convenientservice',
          icon: 'shop',
          routes: [
            {
              path: '/app/expressboxmanage/boxinfo',
              name: 'postalnetwork',
              component: './ExpressBoxManage/BoxInfo/BoxInfo',
            },
            {
              path: '/app/expressboxmanage/deliverinfo',
              name: 'postalnetwork',
              component: './ExpressBoxManage/DeliverInfo/DeliverInfo',
            },
            {
              path: '/app/expressboxmanage/accessinfo',
              name: 'postalnetwork',
              component: './ExpressBoxManage/AccessInfo/AccessInfo',
            },
          ],
        },
        {
          path: '/app/enforcementrecord',
          name: 'securitymachine',
          icon: 'robot',
          component: './EnforcementRecord/EnforcementRecord',
        },
        {
          path: '/app/starrating',
          name: 'securitymachine',
          icon: 'robot',
          component: './StarRating/StarRating',
        },
        {
          path: '/app/uniformidentity',
          name: 'uniformidentity',
          icon: 'team',
          routes: [
            {
              path: '/app/uniformidentity/usermanage',
              name: 'usermanage',
              component: './UniformIdentity/UserManage',
            },
            {
              path: '/app/uniformidentity/organizationmanage',
              name: 'organizationmanage',
              component: './UniformIdentity/OrganizationManage',
            },
            {
              path: '/app/uniformidentity/rolemanage',
              name: 'rolemanage',
              component: './UniformIdentity/RoleManage',
            },
            {
              path: '/app/uniformidentity/menusmanage',
              name: 'menusmanage',
              component: './UniformIdentity/MenusManage',
            },
            {
              path: '/app/uniformidentity/parametermanage',
              name: 'parametermanage',
              component: './UniformIdentity/ParameterManage',
            },
            {
              path: '/app/uniformidentity/expressmanage',
              name: 'expressmanage',
              component: './UniformIdentity/ExpressManage',
            },
            {
              path: '/app/uniformidentity/dictionariesmanage',
              name: 'dictionariesmanage',
              component: './UniformIdentity/DictionariesManage',
            },
            {
              path: '/app/uniformidentity/enterprisemanage',
              name: 'enterprisemanage',
              component: './UniformIdentity/EnterpriseManage',
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
    }
  ],
}
];
