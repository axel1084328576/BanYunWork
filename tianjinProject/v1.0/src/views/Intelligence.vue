<template>
	<div class="intelligence">
		<div class="left">
			<date :title="title" :isIndex="false"></date>
			<div class="middle">
				<h1>丰巢<span>2019年5月21日</span></h1>
				<h2><span>总柜数</span><p><i></i></p><em>{{ statisticsData.cabinetNum }}</em></h2>
				<h2><span>总箱数</span><p><i></i></p><em>{{ statisticsData.caseNum }}</em></h2>
				<h2><span>使用量</span><p><i></i></p><em>{{ statisticsData.useNum }}</em></h2>
				<ul>
					<li>
						<h3>入柜量</h3>
						<h2>{{ statisticsData.enterCabinet }}<span>件</span></h2>
						
						
					</li>
					<li>
						<h3>出柜量</h3>
						<h2>{{ statisticsData.outCabinet }}<span>件</span></h2>
						
						
					</li>
					<li>
						<h3>利用率</h3>
						<h2>{{ statisticsData.useRate }}<span>%</span></h2>
					</li>
				</ul>
			</div>
			<div class="bottom">
				<div class="title">企业投递TOP3</div>
				<p>
					中通快递
					<span>{{ statisticsData.zhongtong }}<i>件</i></span>
				</p>
				<p>
					韵达快递
					<span>{{ statisticsData.yunda }}<i>件</i></span>
				</p>
				<p>
					圆通速递
					<span>{{ statisticsData.yuantong }}<i>件</i></span>
				</p>
			</div>
		</div>
		<div class="center">
			<ul>
				<li class="this">丰巢</li>
				<li>近邻宝</li>
				<li>速递易</li>
				<li>富友</li>
				<li>云柜</li>
				<li>日日顺</li>
			</ul>
			<div id="map"></div>
		</div>
		<div class="right">
		<div class="title">企业流量排名</div>
			<table-list :showType="showType" :url="regionUrl"></table-list>
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
			statisticsData:{},
			sanData:[],
			geoCoordMap:{},
		}
	},
    mounted() {
        this.setMap()
    },
    created() {
        this.init()
    },
    components: {
        Date,
        TableList,
        VueProgressBar
    },
    methods:{
    	init() {
            this.getMapData()
            this.getStatisticsData()
        },
    	getMapData() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/intelligence/map').then((res) => {
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
                    this.setMap()
                }
            }).catch(err => {
                /*console.log(err)*/
            })
        },
        getStatisticsData(){
        	this.$axios.get('http://rap2api.taobao.org/app/mock/223607/intelligence/statistics').then((res) => {
        		let data = res.data
        		if (data.code == 0) {
        			this.statisticsData = data 
        		}
        	})
        },
        setMap() {
            //地图容器
            var chart = this.$echarts.init(document.getElementById('map'));
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
		                        color: '#ffff00'
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
        }
    }
}
</script>
<style src="../assets/css/common.css"></style>
<style scoped>
.intelligence { height: 100%; }
.left { width: 25%; height: 100%; float: left;}
.left .top { width: 100%; height: 315px;float: left; }
.left .top h1 { color: #abdbf6; font-size: 38px; text-align: center; margin-top: 18%; }
.left .top h2 { color: #2d4ea0; font-size: 18px; text-align: center; margin-top: 10%; }
.left .top h2 span { margin-right: 20px; }
.left .top a { width: 138px; height: 28px; background: url(../assets/images/index/images/back.png); background-size: 100% 100%; display: block; margin: 50px; }
.left .middle .title { width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px; float: left; }
.left .middle { width: 100%; height: 325px; float: left; padding: 0 20px; }
.left .middle .title { width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px; float: left; }
.left .middle h1 { width: 100%; height: 40px; line-height: 40px; font-size: 24px; color: #ff8a00; padding-left: 20px; }
.left .middle h1 span { margin-left: 30px; color: #fff; font-size: 18px; }
.left .middle h2 { color: #fff; font-size: 18px; margin: 20px 0; text-align: left; height: 24px; padding-left: 20px; }
.left .middle h2 em { float: left; font-size: 18px; color: #3eb9f7; margin-left: 20px; }
.left .middle p { width: 200px; height: 12px; float: left; margin-top: 7px; background: #161a3c; margin-left: 10px;
border-radius: 6px; overflow: hidden; }
.left .middle h2 span { float: left; }
.left .middle p i { width: 0; height: 12px; border-radius: 6px; background: #4faee3; display: block; }
.left .middle ul { width: 100%; height: 110px; float: left; margin-top: 10px; }
.left .middle ul li { width: 33.33%; height: 100%; background: #fff; float: left; background: url(../assets/images/index/images/line2.png) no-repeat;
background-size: auto 100%; }
.left .middle ul li:nth-child(1) { background: none; }
.left .middle ul li h1 { width: 100%; height: 50px; line-height: 50px; text-align: center; color: #fff; font-size: 14px; }
.left .middle ul li h2 { width: 100%; height: 30px; line-height: 30px;
background: none; margin-top: 10px; padding-left: 10px; color: #4faee3; font-size: 18px; }
.left .middle ul li h2 span { font-size: 16px !important; float: none; }
.left .middle ul li h3 { width: 100%; height: 40px; line-height: 40px; padding-left: 10px; color: #fff; font-size: 14px; 
margin-top: 10px;}
.left .middle ul li h3 span { font-size: 18px !important; color: #fba233; }
.left .middle ul li h3 span img { margin: -5px 7px 0px 7px; }
.left .middle ul li p { width: 104px; height: 74px; margin: 0 auto; background: url(../assets/images/index/images/block.png);
margin-top: 10px; padding-top: 10px; }
.left .middle ul li p span { text-align: center; color: #43b9fd; font-size: 14px; display: block; line-height: 30px; }
.left .middle ul li p i { text-align: center; color: #43b9fd; font-size: 20px; display: block; }
.left .middle ul li p i em { font-size: 14px; }

.left .bottom { width: 100%; height: 375px; float: left; padding: 20px;}
.left .bottom .title { width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px; margin-bottom: 20px; }
.left .bottom p { width: 254px; height: 67px; margin: 10px 0; float: left; line-height: 67px;
padding: 0 20px; }
.left .bottom p span { float: right; font-size: 20px; }
.left .bottom p span i { font-size: 14px; margin-left: 5px; }
.left .bottom p:nth-child(2) { color: #42baff; background: url(../assets/images/index/images/img1.png); }
.left .bottom p:nth-child(3) { color: #6bbf89; background: url(../assets/images/index/images/img2.png);}
.left .bottom p:nth-child(4) { color: #ff8e08; background: url(../assets/images/index/images/img3.png);}


.center { width: 50%; height: 100%; float: left; }
.center ul { float: left; margin-top: 40px; }
.center ul li { padding: 5px 20px; color: #1f397c; float: left; font-size: 14px; cursor: pointer; }
.center ul .this { box-shadow: 0px 0px 10px #0085ff; color: #fff; }
#map { width: 100%; height: 920px; float: left; margin-top: 30px; }


.right { width: 25%; height: 100%; padding: 20px; float: left; }
.right .title {width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px;}
.right table { width: 100%; margin-top: 10px; float: left; }
.right table td { font-size: 14px; color: #fff; }
.right table tr {  height: 33px; margin: 5px 0; }
.right table tr td:last-child { color: #62bb82; }
.right table tr td:nth-child(1),.right table tr td:nth-child(3) { width: 20%; text-align: center; }
.right table tr td span { width: 100%; height: 12px; background: #161a3c; display: block; border-radius: 6px;
overflow: hidden; }
.right table tr td span i { width: 0%; background: #62bb82; display: block; height: 100%; border-radius: 0 6px 6px 0; }
.right table tr:nth-child(1) td,.right table tr:nth-child(2) td,.right table tr:nth-child(3) td { color: #f19d3a; }
.right table tr:nth-child(1) i,.right table tr:nth-child(2) i,.right table tr:nth-child(3) i { background: #f19d3a; }

</style>