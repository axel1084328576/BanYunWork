$(function(){
	let myCharts = echarts.init(document.getElementById('cityMap'));
	$.get('./libs/echarts/tianjin.json',function(data){
		echarts.registerMap('tianjin', data, {});
		var mapData = [ // 地图数据
			{name: '宝坻区',selected: false,value:110},
            {name: '武清区',selected: false,value:120},
            {name: '和平区',selected: false,value:130},
            {name: '河东区',selected: false,value:140},
            {name: '河西区',selected: false,value:150},
            {name: '南开区',selected: false,value:160},
            {name: '河北区',selected: false,value:170},
            {name: '红桥区',selected: false,value:180},
            {name: '滨海新区',selected: false,value:10},
            {name: '东丽区',selected: false,value:109},
            {name: '西青区',selected: false,value:100},
            {name: '津南区',selected: false,value:101},
            {name: '北辰区',selected: false,value:102},
            {name: '宁河区',selected: false,value:103},
            {name: '静海区',selected: false,value:104},
            {name: '蓟州区',selected: false,value:105},
		];
		var sanData = [ // 散点数据
			{name: '散点1', value: 22},
			{name: '散点2', value: 30},
			{name: '散点3', value: 40},
			{name: '散点4', value: 32},
			{name: '散点5', value: 42},
			{name: '散点6', value: 12}
		];
		var geoCoordMap = { // 散点坐标
			'散点1': [117, 39.9],
			'散点2': [117.2, 39.2],
			'散点3': [117.7, 39.6],
			'散点4': [117.4, 40],
			'散点5': [116.9, 39],
			'散点6': [117.9, 39],
		};
		var convertData = function (data) { // 处理数据函数
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];
				if (geoCoord) {
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value)
					});
				}
			}
			return res;
		};
		var option = { // echarts 配置
			tooltip : {
                trigger: 'item', 
                formatter:function(params, ticket, callback){
                    if(params.seriesType=="effectScatter") {
                        return ""+params.data.name+"："+params.data.value[2];
                    }else if(params.seriesType=="lines"){
                        return params.data.fromName+">"+params.data.toName+"<br />"+params.data.value;
                    }else{
                        return params.name;
                    }
                }
            },
			geo: { // 地图配置
				show: true,
				map: 'tianjin',
				label: {
		            normal:{
						show:true,
						textStyle:{
							color:'#fff',
							fontSize:16
						}  
		            },
		            emphasis: {
		                show: true,
		                textStyle:{
							color:'#fff',
							fontSize:13
						}
		            }
		        },
				roam: true,
				itemStyle: {
		            normal: {
		                areaColor: '#076291',
		                borderColor: '#76c1d1'
		            },
		            emphasis: {
		                areaColor: '#003c5d'
		            }
		        },
				zoom: 1.2
			},
			series: [{ // 散点配置
			    name: '数量',
			    type: 'effectScatter',
			    coordinateSystem: 'geo',
			    data: convertData(sanData),
			    
			    showEffectOn: 'emphasis',
			    rippleEffect: {
			        brushType: 'stroke'
			    },
			    hoverAnimation: true,
			    label: {
					normal:{
						show:false,
						textStyle:{
							color:'#fff',
							fontSize:13
						}  
		            },
		            emphasis: {
		                show: false,
		                textStyle:{
							color:'#fff',
							fontSize:13
						}
		            }
			    },
			    itemStyle: {
					normal: {
						color: 'rgba(0,198,255,0.8)'
					}
			    }
			}, { // 地图配置
			    name: '工程数',
			    type: 'map',
			    mapType: 'guagzhou', // 自定义扩展图表类型
			    geoIndex: 0,
			    aspectScale: 0.75, // 长宽比
			    itemStyle: {
					normal: {label: {show: true}},
					emphasis: {label: {show: true}}
			    },
			    data: mapData
			}]
		};
		myCharts.setOption(option);
	});
});