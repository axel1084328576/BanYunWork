import mockjs from 'mockjs';

const replayCheck=mockjs.mock({
  'data|50-100':[{
    'key|+1':1,
    'scId|+1':100,
    "scPosition|1":["办公A区","办公B区","办公C区"],
    "scManufactor|1":["杭州机械制造厂","厦门机械制造厂","福州机械制造厂"],
    "scNumber|3-6":3,
    "scAlarm|1":["正常","异常"],
  }]
});

export default {
  'GET /api/RelayCheck/list':replayCheck,
}