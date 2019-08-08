import mockjs from 'mockjs';

const roleData = [{
  value:'角色1',
  title:'角色1',
  key:'角色1',
},{
  value:'角色2',
  title:'角色2',
  key:'角色2',
},{
  value:'角色3',
  title:'角色3',
  key:'角色3',
},{
  value:'角色4',
  title:'角色4',
  key:'角色4',
}];

const userData = mockjs.mock({
  'data|30-60':[{
  'key|+1': 1,
  'name': /\w{3,8}/ ,
  'account': /100001\d\d\d/,
  'description': /London Park no.\w\w\w /,
  'organization|1': ['申通','中通','韵达','顺丰','圆通','汇通','中邮','宅急送'],
  'role|1':['角色1','角色2','角色3'],
  'islock|1':true,
  }],
});

const resUserData={
  ...userData,
  current:1,
  pageSize:10,
  total:30,
}

export default {
  'GET /api/userManage/getUserData': resUserData,
  'GET /api/userManage/getRoleSelect': roleData,
};
