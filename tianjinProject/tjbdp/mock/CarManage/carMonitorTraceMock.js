import mockjs from 'mockjs';

const carMonitorTrace = mockjs.mock({
  'data|5-10':[{
    'key|+1':1,
    'number|+1':1,
    'licenceNumber': /\w{5}/,
    'carDriver':/\w{5}/,
    'location':'@city',
    'position|1':[{
      'longitude|116-118.4-4': 1,
      'latitude|23-24.4-4': 1,
    }],
  }],
});

const perCarTrace={};

carMonitorTrace.data.map(item => {
  perCarTrace[item.licenceNumber]=[item.position];
  for(let i=1;i<60;i++){
    let isLongitude = Math.random();
    let isLatitude = Math.random();
    let temp = perCarTrace[item.licenceNumber][i-1];

    perCarTrace[item.licenceNumber].push({
      longitude : isLongitude > 0.5 ? temp.longitude+0.001 : temp.longitude,
      latitude : isLatitude < 0.5 ? temp.latitude+0.001 : temp.latitude,
    });
  }
});

export default {
  'GET /api/carMonitorTrace/getCarMonitorTrace':carMonitorTrace,
  'GET /api/carMonitorTrace/getPerCarTrace':perCarTrace,
}
