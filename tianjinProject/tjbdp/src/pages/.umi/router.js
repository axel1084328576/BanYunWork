import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'C:/Work/tianjinProject/tjbdp/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true
  },
  {
    "path": "/",
    "redirect": "/user",
    "exact": true
  },
  {
    "path": "/",
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
        "routes": [
          {
            "path": "/user/login",
            "component": dynamic({ loader: () => import('../User/Login'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/user/register",
            "component": dynamic({ loader: () => import('../User/Register'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/user/register-result",
            "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/app",
        "component": dynamic({ loader: () => import('../../layouts/MyLayout'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
        "Routes": [require('../Authorized').default],
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/app",
            "component": dynamic({ loader: () => import('../../layouts/welcome'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/app/businessmanage",
            "name": "businessinfo",
            "icon": "table",
            "routes": [
              {
                "path": "/app/businessmanage/statistics",
                "name": "statistics",
                "component": dynamic({ loader: () => import('../BusinessInfo/Statistics'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/businessmanage/businessinfo",
                "name": "carinfomanage",
                "component": dynamic({ loader: () => import('../BusinessInfo/BusinessInfo'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/businessmanage/dataassets",
                "name": "carusecount",
                "component": dynamic({ loader: () => import('../BusinessInfo/DataAssets'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/businessmanage/localEnterprises",
                "name": "carusecount",
                "component": dynamic({ loader: () => import('../BusinessInfo/localEnterprises/localEnterprises'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/businessmanage/mailForm",
                "name": "carusecount",
                "component": dynamic({ loader: () => import('../BusinessInfo/MailForm/MailForm'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/businessmanage/commerceData",
                "name": "carusecount",
                "component": dynamic({ loader: () => import('../BusinessInfo/CommerceData/CommerceData'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/app/dangerous",
            "name": "dangerous",
            "icon": "table",
            "routes": [
              {
                "path": "/app/dangerous/securityProtocol",
                "name": "statistics",
                "component": dynamic({ loader: () => import('../BusinessManage/SecurityProtocol/SecurityProtocol'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/dangerous/dangerousEnterprises",
                "name": "carinfomanage",
                "component": dynamic({ loader: () => import('../BusinessManage/DangerousEnterprises/DangerousEnterprises'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/dangerous/dangerousChemicals",
                "name": "carusecount",
                "component": dynamic({ loader: () => import('../BusinessManage/DangerousChemicals/DangerousChemicals'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/app/carmanage",
            "name": "carmanage",
            "icon": "car",
            "routes": [
              {
                "path": "/app/carmanage/carinfomanage",
                "name": "carinfomanage",
                "component": dynamic({ loader: () => import('../CarManage/CarInfoManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/carmanage/carusecount",
                "name": "carusecount",
                "component": dynamic({ loader: () => import('../CarManage/CarUseCount'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/carmanage/carmonitortrace",
                "name": "carmonitortrace",
                "component": dynamic({ loader: () => import('../CarManage/CarMonitorTrace'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/app/securitymachine",
            "name": "securitymachine",
            "icon": "robot",
            "component": dynamic({ loader: () => import('../SecurityMachine/ReplayCheck'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/app/delivery",
            "name": "dangerous",
            "icon": "table",
            "routes": [
              {
                "path": "/app/delivery/networkManage",
                "name": "statistics",
                "component": dynamic({ loader: () => import('../BrandManage/NetworkManage/NetworkManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/delivery/deliveryEnterprise",
                "name": "carinfomanage",
                "component": dynamic({ loader: () => import('../BrandManage/DeliveryEnterprise/DeliveryEnterprise'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/app/empolyedmanage",
            "name": "empolyedmanage",
            "icon": "idcard",
            "component": dynamic({ loader: () => import('../EmpolyedManage/Infosafeguard'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/app/videomonitor",
            "name": "videomonitor",
            "icon": "video-camera",
            "component": dynamic({ loader: () => import('../VideoMonitor/VideoReplay'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/app/convenientservice",
            "name": "convenientservice",
            "icon": "shop",
            "routes": [
              {
                "path": "/app/convenientservice/expressnetwork",
                "name": "expressnetwork",
                "component": dynamic({ loader: () => import('../ConvenientService/ExpressNetwork'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/convenientservice/postalnetwork",
                "name": "postalnetwork",
                "component": dynamic({ loader: () => import('../ConvenientService/PostalNetwork'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/convenientservice/postboxmanage",
                "name": "postboxmanage",
                "component": dynamic({ loader: () => import('../ConvenientService/PostboxManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/convenientservice/expressbox",
                "name": "expressbox",
                "component": dynamic({ loader: () => import('../ConvenientService/ExpressBox'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/convenientservice/kioskinfo",
                "name": "postalnetwork",
                "component": dynamic({ loader: () => import('../ConvenientService/KioskInfo'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/convenientservice/kioskinfo",
                "name": "postalnetwork",
                "component": dynamic({ loader: () => import('../ConvenientService/KioskInfo'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/convenientservice/terminalmanage",
                "name": "postalnetwork",
                "component": dynamic({ loader: () => import('../ConvenientService/TerminalManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/app/expressboxmanage",
            "name": "convenientservice",
            "icon": "shop",
            "routes": [
              {
                "path": "/app/expressboxmanage/boxinfo",
                "name": "postalnetwork",
                "component": dynamic({ loader: () => import('../ExpressBoxManage/BoxInfo/BoxInfo'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/expressboxmanage/deliverinfo",
                "name": "postalnetwork",
                "component": dynamic({ loader: () => import('../ExpressBoxManage/DeliverInfo/DeliverInfo'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/expressboxmanage/accessinfo",
                "name": "postalnetwork",
                "component": dynamic({ loader: () => import('../ExpressBoxManage/AccessInfo/AccessInfo'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/app/enforcementrecord",
            "name": "securitymachine",
            "icon": "robot",
            "component": dynamic({ loader: () => import('../EnforcementRecord/EnforcementRecord'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/app/starrating",
            "name": "securitymachine",
            "icon": "robot",
            "component": dynamic({ loader: () => import('../StarRating/StarRating'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/app/uniformidentity",
            "name": "uniformidentity",
            "icon": "team",
            "routes": [
              {
                "path": "/app/uniformidentity/usermanage",
                "name": "usermanage",
                "component": dynamic({ loader: () => import('../UniformIdentity/UserManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/uniformidentity/organizationmanage",
                "name": "organizationmanage",
                "component": dynamic({ loader: () => import('../UniformIdentity/OrganizationManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/uniformidentity/rolemanage",
                "name": "rolemanage",
                "component": dynamic({ loader: () => import('../UniformIdentity/RoleManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/uniformidentity/menusmanage",
                "name": "menusmanage",
                "component": dynamic({ loader: () => import('../UniformIdentity/MenusManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/uniformidentity/parametermanage",
                "name": "parametermanage",
                "component": dynamic({ loader: () => import('../UniformIdentity/ParameterManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/uniformidentity/expressmanage",
                "name": "expressmanage",
                "component": dynamic({ loader: () => import('../UniformIdentity/ExpressManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/uniformidentity/dictionariesmanage",
                "name": "dictionariesmanage",
                "component": dynamic({ loader: () => import('../UniformIdentity/DictionariesManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/uniformidentity/enterprisemanage",
                "name": "enterprisemanage",
                "component": dynamic({ loader: () => import('../UniformIdentity/EnterpriseManage'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "name": "exception",
            "icon": "warning",
            "path": "/app/exception",
            "hideInMenu": true,
            "routes": [
              {
                "path": "/app/exception/403",
                "name": "not-permission",
                "component": dynamic({ loader: () => import('../Exception/403'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/exception/404",
                "name": "not-find",
                "component": dynamic({ loader: () => import('../Exception/404'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/exception/500",
                "name": "server-error",
                "component": dynamic({ loader: () => import('../Exception/500'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/app/exception/trigger",
                "name": "trigger",
                "hideInMenu": true,
                "component": dynamic({ loader: () => import('../Exception/TriggerException'), loading: require('C:/Work/tianjinProject/tjbdp/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('C:/Work/tianjinProject/tjbdp/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
