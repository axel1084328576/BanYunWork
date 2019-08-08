import mockjs from 'mockjs';
const businessInfo = mockjs.mock({
	'data|100-500':[{
		'key|+1': 1,
		'logisticProviderID|1':['STO','SF','YD','YT','ZT','ST','YZ'],
		'mailNo': /\d{12}/,
		'mailType|1': ['线上订单','线下订单','人工面单','到付面单'],
		'customerType|1': ['散件面单','协议面单'],
		'weight': /\d{1,4}/,
		'senAreaCode':/\d{10}/,
		'recAreaCode':/\d{10}/,
		'senCityCode':/\d{6}/,
		'recCityCode':/\d{6}/,
		'senName':'@name',
		'senMobile':/\d{11}/,
		'senPhone':/\d{11}/,
		'senProv':'@province',
		'senCity': '@city',
		'senCounty': '@county',
		'senAddress': '@address',
		'recName':'@name',
		'recMobile':/\d{11}/,
		'recPhone':/\d{11}/,
		'recProv':'@province',
		'recCity': '@city',
		'recCounty': '@county',
		'recAddress': '@address',
		'typeOfContents|1':[1,2,3],
		'nameOfCoutents|1-3':'con',
		'mailCode|1':[1,2,3],
		'recDatetime':'@date',
		'insuranceValue|8-100':1
	}],
});

export default {
	'GET /api/businessInfo/getBusinessInfo': businessInfo,
}