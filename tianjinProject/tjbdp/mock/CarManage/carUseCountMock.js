import mockjs from 'mockjs';

const carUseCount = mockjs.mock({
  'data|50-200':[{
    'key|+1':1,
    'number|+1':1,
    'licenceNumber': /\d{11}/,
    'totalMileage|100-1000':1,
    'convey|20-100':1,
    'reportInfo|1':['info1','info2','info3'],
    'operate':' ',
    'enterprises|1':['企业1','企业2','企业3','企业4'],
    'ownership|1':['归属1','归属2','归属3','归属4'],
    'scope|1':['范围1','范围2','范围3'],
  }],
});

export default {
  'GET /api/carUseCount/getCarUseCount':carUseCount,
}
