import mockjs from 'mockjs';

const expressInfo=mockjs.mock({
  'data|50-100':[{
    'key|+1':1,
    'dotName|+1':["申通","顺丰","中通","韵达"],
    "dotAddress|1":["西二环南路","北二环南路","北五环南路"],
    "dotLal|1":["116.40,39.92","97.40,42.92","36.66,42.92"],
    "dotContacts|1":["王快递员","黄快递员","杨快递员"],
    "dotTel":/\d{11}/,
  }]
});

export default {
  'GET /api/ExpressNetwork/list':expressInfo,
}