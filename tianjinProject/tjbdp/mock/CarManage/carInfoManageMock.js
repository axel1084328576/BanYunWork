import mockjs from 'mockjs';

const carInfos = mockjs.mock({
  'data|50-200':[{
    'key|+1':1,
    'number|+1':1,
    'licenceNumber': /\d{11}/,
    'carType|1': ['小型车','中型车','大型车'],
    'carBrand|1': ['长城','五菱','三菱','大众','丰田'],
    'carDriver': '@name',
    'carFactory': /\w{4,10}/,
    'buyTime': '@date',
    'serviceLife' : /[3-5]/,
    'licence': ' ',
  }],
});

export default {
  'GET /api/carInfoManage/getCarInfos':carInfos,
}
