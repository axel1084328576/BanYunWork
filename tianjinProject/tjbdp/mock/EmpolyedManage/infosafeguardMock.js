import mockjs from 'mockjs';

const info=mockjs.mock({
  'data|50-100':[{
    'key|+1':1,
    'employeeId|+1':100,
    "name|1":["小明","小王","小强","大王","大黄","大圣"],
    "birth|1":["杭州","厦门","福州"],
    "address|1":["台江区","晋安区","鼓楼区","永泰县","闽侯县"],
    "level|1":["会计从业资格证第二级","会计从业资格证第一级","高级会计从业资格证"],
    "identityType":"居民身份证",
    "identityId|1":/\d{18}/,
    "tel":/\d{11}/,
  }]
});

export default {
  'GET /api/InfoSafe/list':info,
}