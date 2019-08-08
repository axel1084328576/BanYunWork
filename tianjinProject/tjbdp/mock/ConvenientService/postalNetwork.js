import mockjs from 'mockjs';

const postInfo=mockjs.mock({
  'data|50-100':[{
    'key|+1':1,
    'postName|+1':"中国邮政分行",
    "postAddress|1":["西二环南路","北二环南路","北五环南路"],
    "postLal|1":["116.40,39.92","97.40,42.92","36.66,42.92"],
    "postContacts|1":["王快递员","黄快递员","杨快递员"],
    "postTel":/\d{11}/,
  }]
});

export default {
  'GET /api/PostalNetwork/list':postInfo,
}