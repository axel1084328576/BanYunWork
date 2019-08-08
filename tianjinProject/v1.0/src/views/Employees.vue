<template>
	<div class="employees">
		<div class="left">
			<date :title="title" :isIndex="false"></date>
            <div class="middle">
			<div class="title">企业人员排名</div>
				<table-list :showType="showType" :url="regionUrl"></table-list>
			</div>
		</div>
		<div class="center">
			<div class="top">
				<p>数据日期：2019年5月21日</p>
				<ul>
					<li class="this">全职员工</li>
					<li>兼职员工</li>
					<li>外包租赁</li>
				</ul>
				<span>全职员工总数<i>{{ map }}<em>万人</em></i></span>
			</div>
			<div id="cityMap" style="width:900px;height:100%"></div>
		</div>
		<div class="right">
			<div class="top">
				<div class="title">运转中心</div>
				<div id="bar1" style="width: 100%; height: 105%;"></div>
			</div>
			<div class="middle">
				<div class="title">分拨中心</div>
				<div id="bar2" style="width: 100%; height: 105%;"></div>
			</div>
			<div class="bottom">
				<div class="title">网点</div>
				<div id="bar3" style="width: 100%; height: 105%;"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import Date from '@/components/Date'
import TableList from '@/components/TableList'
import VueProgressBar from 'svg-progress-bar'
let mapData = require('../assets/map/province/tianjin.json')
export default {
	data(){
		return{
			showType:false,
			title: '武清区业务量监控',
			regionUrl: 'http://rap2api.taobao.org/app/mock/223607/regionLeft',
			//time: moment(new Date()).format('HH:mm:ss'),
			map:'',
			maps:{},
			sanData:[],
			geoCoordMap:{},
			workBars:{
				xAxis:[],
				bar:[],
				line:[]
			},
			separateBars:{
				xAxis:[],
				bar:[],
				line:[]
			},
			netWorkBars:{
				xAxis:[],
				bar:[],
				line:[]
			}
		}
	},
/*	computed: {
        week() {
            const mday = new Date().getDay()
            const weekData = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
            return weekData[mday]
        },
        date() {
            const date = new Date()
            return moment(date).format("YYYY年DD月MM日")
        }
    },*/
    mounted() {
        this.setMap()
        this.setWork()
        this.setSeparate()
        this.setNetwork()
    },
    created() {
        this.init()
    },
    methods:{
    	init() {
            this.getMapData()
            this.getBarData()
            this.getWorkData()
            this.getNetWorkData()
        },
    	getMapData() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/employees/map').then((res) => {
                let data = res.data
                if (data.code == '0') {
                	this.map = data.totalNum
                    data.data.forEach(data => {
                        this.sanData.push({
                            name: data.name,
                            value: data.val
                        })
                        var name = data.name
                        var coordinate = data.coordinate
                        this.geoCoordMap[name] = coordinate
                    })
                    console.log(this.sanData)
                    this.setMap()
                }
            }).catch(err => {
                /*console.log(err)*/
            })
        },
        getBarData(){
        	this.$axios.get('http://rap2api.taobao.org/app/mock/223607/employees/allocation').then((res) => {
        		let data = res.data
        		if (data.code == 0) {
        			this.workBars.xAxis = data.data.xAxis
        			this.workBars.bar = data.data.bar
        			this.workBars.line = data.data.line
        		}
        		this.setWork()
        	}).catch(err => {
        		console.log(err)
        	})
        },
        getWorkData(){
        	this.$axios.get('http://rap2api.taobao.org/app/mock/223607/employees/work').then((res) => {
        		let data = res.data
        		if (data.code == 0) {
        			this.separateBars.xAxis = data.data.xAxis
        			this.separateBars.bar = data.data.bar
        			this.separateBars.line = data.data.line
        		}
        		this.setSeparate()
        	}).catch(err => {
        		console.log(err)
        	})
        },
        getNetWorkData(){
        	this.$axios.get('http://rap2api.taobao.org/app/mock/223607/employees/dot').then((res) => {
        		let data = res.data
        		if (data.code == 0) {
        			this.netWorkBars.xAxis = data.data.xAxis
        			this.netWorkBars.bar = data.data.bar
        			this.netWorkBars.line = data.data.line
        		}
        		this.setNetwork()
        	}).catch(err => {
        		console.log(err)
        	})
        },
        setMap() {
            //地图容器
            var chart = this.$echarts.init(document.getElementById('cityMap'));
            //34个省、市、自治区的名字拼音映射数组
            var provinces = {
                "天津": "tianjin",
            };
            var geoCoordMap = this.geoCoordMap;
            var sanData = this.sanData;
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
			var option = {
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
                animationDuration:1000,
                animationEasing:'cubicOut',
                idanimationDurationUpdate:1000,
                
            };
            var area = { 
            };
            //直辖市和特别行政区-只有二级地图，没有三级地图
            
            //绘制全国地图
            var mapdata = [];
            let d = [];
            for( var i=0;i<mapData.features.length;i++ ){
                d.push({
                    name:mapData.features[i].properties.name
                })
            }
            mapdata = d;
            //注册地图
            this.$echarts.registerMap('tianjin', mapData);

            //绘制地图
            renderMap('tianjin', d, option, this.sanData);
            function renderMap(map, data, option, sanData) {
                option.series = [ 
                    { // 散点配置
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
					}, 
					{ // 地图配置
				    name: '工程数',
				    type: 'map',
				    mapType: 'guagzhou', // 自定义扩展图表类型
				    geoIndex: 0,
				    aspectScale: 0.75, // 长宽比
				    itemStyle: {
						normal: {label: {show: true}},
						emphasis: {label: {show: true}}
				    },
				    data: mapdata
					}
                ];
                //渲染地图
                chart.setOption(option);
            }
        },
        setWork (){
        	//运转中心
        	var bars = this.$echarts.init(document.getElementById('bar1'));
		    var option1 = {
		    	color:['#4472C5','#ED7C30'],
			    tooltip: {
			        trigger: 'axis',
			        formatter:function(params)  {  
					var relVal = params[0].name;  
						relVal += '<br/>' + params[0].seriesName + ' : ' + params[0].value+"人";
						relVal += '<br/>' + params[1].seriesName + ' : ' + params[1].value+"%";   
						return relVal;  
					} 
			    },
			    grid:{
			    	left:'0%',
			    	right:'0',
			    	top:'30px',
			    	containLabel:true
			    },
			    textStyle:{
		            fontSize:16,
		            color:'#434784'
		        },

			    legend: {
			        data:['全职员工','同比增长率'],
			        textStyle:{
			            fontSize:16,
			            color:'#3eb9f7'
			        },
			        x: 'right',
			        padding:[0,0,0,0]
			    },
			    xAxis: [
			        {
			            type: 'category',
			            data: this.workBars.xAxis,
			            axisPointer: {
			                type: 'shadow'
			            }
			        }
			    ],
			    icon: 'roundRect',
			    yAxis: [
			        {
			            type: 'value',
			            name: '',
			            min: 0,
			            max: 250,
			            interval: 50,
			            axisLabel: {
			                formatter: '{value} 人'
			            }
			        },
			        {
			            type: 'value',
			            name: '',
			            min: 0,
			            max: 25,
			            interval: 5,
			            axisLabel: {
			                formatter: '{value} %'
			            }
			        }
			    ],
			    series: [
			        {
			            name:'全职员工',
			            type:'bar',
			            data:this.workBars.bar,
			            itemStyle : {  
		                    normal : {  
		                        color:'#3eb9f7',  //圈圈的颜色
		                        lineStyle:{  
		                            color:'#3eb9f7'  //线的颜色
		                        }  
		                    }  
		                }, 
			        },
			        {
			            name:'同比增长率',
			            type:'line',
			            yAxisIndex: 1,
			            data:this.workBars.line,
			            itemStyle : {  
		                    normal : {  
		                        color:'#ff6969',  //圈圈的颜色
		                        lineStyle:{  
		                            color:'#ff6969'  //线的颜色
		                        }  
		                    }  
		                }, 
			        }
			    ]
			};
		    bars.setOption(option1);
        },
        setSeparate (){
        	//运转中心
        	var bars = this.$echarts.init(document.getElementById('bar2'));
		    var option2 = {
		    	color:['#4472C5','#ED7C30'],
			    tooltip: {
			        trigger: 'axis',
			        formatter:function(params)  {  
					var relVal = params[0].name;  
						relVal += '<br/>' + params[0].seriesName + ' : ' + params[0].value+"人";
						relVal += '<br/>' + params[1].seriesName + ' : ' + params[1].value+"%";   
						return relVal;  
					} 
			    },
			    grid:{
			    	left:'0%',
			    	right:'0',
			    	top:'30px',
			    	containLabel:true
			    },
			    textStyle:{
		            fontSize:16,
		            color:'#434784'
		        },

			    legend: {
			        data:['全职员工','同比增长率'],
			        textStyle:{
			            fontSize:16,
			            color:'#3eb9f7'
			        },
			        x: 'right',
			        padding:[0,0,0,0]
			    },
			    xAxis: [
			        {
			            type: 'category',
			            data: this.separateBars.xAxis,
			            axisPointer: {
			                type: 'shadow'
			            }
			        }
			    ],
			    icon: 'roundRect',
			    yAxis: [
			        {
			            type: 'value',
			            name: '',
			            min: 0,
			            max: 250,
			            interval: 50,
			            axisLabel: {
			                formatter: '{value} 人'
			            }
			        },
			        {
			            type: 'value',
			            name: '',
			            min: 0,
			            max: 25,
			            interval: 5,
			            axisLabel: {
			                formatter: '{value} %'
			            }
			        }
			    ],
			    series: [
			        {
			            name:'全职员工',
			            type:'bar',
			            data:this.separateBars.bar,
			            itemStyle : {  
		                    normal : {  
		                        color:'#3eb9f7',  //圈圈的颜色
		                        lineStyle:{  
		                            color:'#3eb9f7'  //线的颜色
		                        }  
		                    }  
		                }, 
			        },
			        {
			            name:'同比增长率',
			            type:'line',
			            yAxisIndex: 1,
			            data:this.separateBars.line,
			            itemStyle : {  
		                    normal : {  
		                        color:'#ff6969',  //圈圈的颜色
		                        lineStyle:{  
		                            color:'#ff6969'  //线的颜色
		                        }  
		                    }  
		                }, 
			        }
			    ]
			};
		    bars.setOption(option2);
        },
        setNetwork (){
        	//运转中心
        	var bars = this.$echarts.init(document.getElementById('bar3'));
		    var option3 = {
		    	color:['#4472C5','#ED7C30'],
			    tooltip: {
			        trigger: 'axis',
			        formatter:function(params)  {  
					var relVal = params[0].name;  
						relVal += '<br/>' + params[0].seriesName + ' : ' + params[0].value+"人";
						relVal += '<br/>' + params[1].seriesName + ' : ' + params[1].value+"%";   
						return relVal;  
					} 
			    },
			    grid:{
			    	left:'0%',
			    	right:'0',
			    	top:'30px',
			    	containLabel:true
			    },
			    textStyle:{
		            fontSize:16,
		            color:'#434784'
		        },

			    legend: {
			        data:['全职员工','同比增长率'],
			        textStyle:{
			            fontSize:16,
			            color:'#3eb9f7'
			        },
			        x: 'right',
			        padding:[0,0,0,0]
			    },
			    xAxis: [
			        {
			            type: 'category',
			            data: this.netWorkBars.xAxis,
			            axisPointer: {
			                type: 'shadow'
			            }
			        }
			    ],
			    icon: 'roundRect',
			    yAxis: [
			        {
			            type: 'value',
			            name: '',
			            min: 0,
			            max: 250,
			            interval: 50,
			            axisLabel: {
			                formatter: '{value} 人'
			            }
			        },
			        {
			            type: 'value',
			            name: '',
			            min: 0,
			            max: 25,
			            interval: 5,
			            axisLabel: {
			                formatter: '{value} %'
			            }
			        }
			    ],
			    series: [
			        {
			            name:'全职员工',
			            type:'bar',
			            data:this.netWorkBars.bar,
			            itemStyle : {  
		                    normal : {  
		                        color:'#3eb9f7',  //圈圈的颜色
		                        lineStyle:{  
		                            color:'#3eb9f7'  //线的颜色
		                        }  
		                    }  
		                }, 
			        },
			        {
			            name:'同比增长率',
			            type:'line',
			            yAxisIndex: 1,
			            data:this.netWorkBars.line,
			            itemStyle : {  
		                    normal : {  
		                        color:'#ff6969',  //圈圈的颜色
		                        lineStyle:{  
		                            color:'#ff6969'  //线的颜色
		                        }  
		                    }  
		                }, 
			        }
			    ]
			};
		    bars.setOption(option3);
        }
    },
    components: {
        Date,
        TableList,
        VueProgressBar
    }
}
</script>
<style src="../assets/css/common.css"></style>
<style scoped type="text/css">
.employees { height: 100%; }
#bar1,#bar2,#bar3 { width: 100%; height: 105%; }
body { background: url(../assets/images/common/bg.jpg); background-size: 100% 100%; }
.left { width: 25%; height: 100%; float: left;}
.left .top { width: 100%; height: 315px;float: left; }
.left .top h1 { color: #abdbf6; font-size: 38px; text-align: center; margin-top: 18%; }
.left .top h2 { color: #2d4ea0; font-size: 18px; text-align: center; margin-top: 10%; }
.left .top h2 span { margin-right: 20px; }
.left .top a { width: 138px; height: 28px; background: url(../assets/images/index/images/back.png); background-size: 100% 100%;
display: block; margin: 50px; }
.left .middle { padding: 10px; float: left;}
.left .middle .title { width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px; }
.left .middle table { width: 100%; height: 79%; margin-top: 10px; float: left; }
.left .middle table td { font-size: 14px; color: #fff; }
.left .middle table tr { height: 28px; }
.left .middle table tr td:last-child { color: #62bb82; }
.left .middle table tr td:nth-child(1),.left .middle table tr td:nth-child(3) { width: 20%; text-align: center; }
.left .middle table tr td span { width: 100%; height: 12px; background: #161a3c; display: block; border-radius: 6px;
overflow: hidden; }
.left .middle table tr td span i { width: 0%; background: #62bb82; display: block; height: 100%; border-radius: 0 6px 6px 0; }
.left .middle table tr:nth-child(1) td,.left .middle table tr:nth-child(2) td,.left .middle table tr:nth-child(3) td { color: #f19d3a; }
.left .middle table tr:nth-child(1) i,.left .middle table tr:nth-child(2) i,.left .middle table tr:nth-child(3) i { background: #f19d3a; }







.center { width: 50%; height: 100%;float: left; }
.center .top { width: 100%; height: 170px; float: left; position: absolute; }
.center .top p { font-size: 18px; color: #fff; height: 40px; margin-top: 30px; line-height: 40px; font-weight: bold; }
.center .top ul { float: left; margin-top: 20px; }
.center .top ul li { padding: 5px 10px; color: #1f397c; float: left; font-size: 14px; cursor: pointer; }
.center .top ul .this { box-shadow: 0px 0px 10px #0085ff; color: #fff; }
.center .top span { width: 100%; height: 30px; display: block; float: left; line-height: 30px;
color: #fff; font-size: 16px; margin-top: 20px; }
.center .top span i { margin-left: 10px; color: #3eb9f7; font-size: 24px; }
.center .top span i em { font-size: 16px; margin-left: 5px; }

.right { width: 25%; height: 100%;float: left; }
.right .top,.right .middle,.right .bottom { width: 100%; height: 33.3%; padding: 10px; float: left; }
.right .top .title,.right .middle .title,.right .bottom .title {width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px;
}

#cityMap { border: none !important; }

</style>