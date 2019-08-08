import mockjs from 'mockjs';

const videoInfo=mockjs.mock({
  'data|50-100':[{
    'key|+1':1,
    'cameraId|+1':100,
    "cameraBrand":"海康",
    "cameraManufactor|1":["杭州机械制造厂","厦门机械制造厂","福州电子制造厂"],
    "manufactorContacts|1":["王总经理","黄总经理","李总经理","孙总经理"],
    "manufactorTel|1":/\d{11}/,
    "cameraPosion|1":["厂区门口","厂区内部"],
  }]
});

export default {
  'GET /api/VideoReplay/list':videoInfo,
}