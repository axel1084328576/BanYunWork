import mockjs from 'mockjs';

const interfaceList = mockjs.mock({
	'data|5-10':[{
		'key|+1':1,
		'url': '@url',
		'name': /\w{5,7}/,
		'description': /\w{10,30}/,
		'interfaceType|1':['GET','POST','DELETE','PUT','OPTIONS','CONNECT','TRACE','HEAD'],
		'paramFormat':{
			'pType|1':['JSON','String'],
			'content|1-6':[{
				'key|+1':1,
				'pName': /\w{3,5}/,
				'pType|1': ['Integer','Float','String','Array','Object'],
				'pDefaultValue|1': ['','值1','值2','值3'],
				'pIsNull|1':true,
				'pDescription': '参数描述',
			}],
		},
		'returnFormat|1':['JSON','String'],
		'interface|0-4':[{
			'key|+1':1,
			'orgaName':/\w{5,7}/,
			'use': /\w{5,7}/,
			'securityKey': /\w{13,16}/,
			'open|1':true,
		}],
	}],
});

export default {
	'GET /api/OutsideInterface/getOutsideInterface': interfaceList,
}