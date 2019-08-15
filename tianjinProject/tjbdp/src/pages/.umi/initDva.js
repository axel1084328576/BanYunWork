import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'deliveryEnterpriseModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/BrandManage/deliveryEnterpriseModel.js').default) });
app.model({ namespace: 'networkManageModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/BrandManage/networkManageModel.js').default) });
app.model({ namespace: 'businessInfoModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/BusinessInfo/businessInfoModel.js').default) });
app.model({ namespace: 'agreementServ', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/BusinessManage/agreementServ.js').default) });
app.model({ namespace: 'companyServ', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/BusinessManage/companyServ.js').default) });
app.model({ namespace: 'dangerousChemicalsModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/BusinessManage/dangerousChemicalsModel.js').default) });
app.model({ namespace: 'dangerousEnterprisesModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/BusinessManage/dangerousEnterprisesModel.js').default) });
app.model({ namespace: 'carInfoManageModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/CarManage/carInfoManageModel.js').default) });
app.model({ namespace: 'carMonitorTraceModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/CarManage/carMonitorTraceModel.js').default) });
app.model({ namespace: 'carUseCountModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/CarManage/carUseCountModel.js').default) });
app.model({ namespace: 'expressBoxModal', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/ConvenientService/expressBoxModal.js').default) });
app.model({ namespace: 'expressNetwork', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/ConvenientService/expressNetwork.js').default) });
app.model({ namespace: 'kioskInfoModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/ConvenientService/kioskInfoModel.js').default) });
app.model({ namespace: 'postalNetwork', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/ConvenientService/postalNetwork.js').default) });
app.model({ namespace: 'postboxManage', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/ConvenientService/postboxManage.js').default) });
app.model({ namespace: 'terminalManageModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/ConvenientService/terminalManageModel.js').default) });
app.model({ namespace: 'dataAssetsModal', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/DataAssets/dataAssetsModal.js').default) });
app.model({ namespace: 'dynamicmenu', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/dynamicmenu.js').default) });
app.model({ namespace: 'infosafeguard', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/EmpolyedManage/infosafeguard.js').default) });
app.model({ namespace: 'enforcementRecordModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/EnforcementRecord/enforcementRecordModel.js').default) });
app.model({ namespace: 'expressBoxManageModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/ExpressBoxManage/expressBoxManageModel.js').default) });
app.model({ namespace: 'getPagePath', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/getPagePath.js').default) });
app.model({ namespace: 'global', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/login.js').default) });
app.model({ namespace: 'outsideInterfaceModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/OutsideInterface/outsideInterfaceModel.js').default) });
app.model({ namespace: 'project', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/project.js').default) });
app.model({ namespace: 'replayCheck', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/SecurityMachine/replayCheck.js').default) });
app.model({ namespace: 'setting', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/setting.js').default) });
app.model({ namespace: 'starRatingModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/StarRating/starRatingModel.js').default) });
app.model({ namespace: 'statisticsModal', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/Statistics/statisticsModal.js').default) });
app.model({ namespace: 'dictionariesManageModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/UniformIdentity/dictionariesManageModel.js').default) });
app.model({ namespace: 'EnterpriseManageModal', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/UniformIdentity/EnterpriseManageModal.js').default) });
app.model({ namespace: 'menusManage', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/UniformIdentity/menusManage.js').default) });
app.model({ namespace: 'organizationManageModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/UniformIdentity/organizationManageModel.js').default) });
app.model({ namespace: 'ParameterManageModal', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/UniformIdentity/ParameterManageModal.js').default) });
app.model({ namespace: 'roleManageModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/UniformIdentity/roleManageModel.js').default) });
app.model({ namespace: 'userManageModel', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/UniformIdentity/userManageModel.js').default) });
app.model({ namespace: 'user', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/user.js').default) });
app.model({ namespace: 'videoReplay', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/models/VideoMonitor/videoReplay.js').default) });
app.model({ namespace: 'register', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/pages/User/models/register.js').default) });
app.model({ namespace: 'error', ...(require('C:/WorkCode/BanYunWork/tianjinProject/tjbdp/src/pages/Exception/models/error.js').default) });
