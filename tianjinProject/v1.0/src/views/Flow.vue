<template>
    <div class="flow">
        <div class="left">
            <date :title="title" :isIndex="false"></date>
            <div class="middle">
                <div class="title">地区流量排名</div>
                <table-list :showType="false" :url="regionUrl"></table-list>   
            </div>
        </div>
        <div class="center">
            <div class="top">
                <p>数据日期：2019年5月21日</p>
                <ul>
                    <li class="this">流出数据</li>
                    <li>流入数据</li>
                </ul>
            </div>
            <div class="middle" id="container" style="width: 910px; height: 840px;"></div>
        </div>
        <div class="right">
            <div class="top">
                <div class="title">地区流量分布</div>
                <div class="l">
                    <div class="circleChart" id="3" data-value="10">
                        <vue-progress-bar :value="35" :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#43b9fd'], rectWidth: 133, rectHeight: 133}"></vue-progress-bar>
                    </div>
                    <p>
                        <span class="number3">234</span>
                        <span>使用量</span>
                        <span>35%</span>
                    </p>
                </div>
                <div class="c">
                    <div class="circleChart" id="4" data-value="100">
                        <vue-progress-bar :value="72" :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#33ea94'], rectWidth: 133, rectHeight: 133}"></vue-progress-bar>
                    </div>
                    <p>
                        <span class="number4">980</span>
                        <span>使用量</span>
                        <span>72%</span>
                    </p>
                </div>
                <div class="r">
                    <div class="circleChart" id="5" data-value="100">
                        <vue-progress-bar :value="64" :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#faa136'], rectWidth: 133, rectHeight: 133}"></vue-progress-bar>
                    </div>
                    <p>
                        <span class="number5">719</span>
                        <span>使用量</span>
                        <span>64%</span>
                    </p>
                </div>
            </div>
            <div class="bottom">
                <div class="title">区域流量排名</div>
                <table-list :showType="false" :url="rangeUrl"></table-list>   
            </div>
        </div>
    </div>
</template>

<script>
import Date from '@/components/Date'
import TableList from '@/components/TableList'
import VueProgressBar from 'svg-progress-bar'
export default {
    data() {
        return {
            title: '武清区业务量监控',
            regionUrl: 'http://rap2api.taobao.org/app/mock/223607/region',
            rangeUrl: 'http://rap2api.taobao.org/app/mock/223607/range'
        }
    },
    mounted() {
        this.setMap()
    },
    created() {
        this.getRegionData()
    },
    methods: {
        getRegionData() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/region').then(res => {
                if (res.data.code == '0') {
                    this.regionData = res.data.data
                    console.log(this.regionData)
                }
            }).catch(err => {    
                console.log(err)
            })
        },
        setMap(){
            //var myChartChina = this.$echarts.init(document.getElementById('container')); 
            var myChart = this.$echarts.init(document.getElementById('container')); 
            var app = {};
            option = null;
            var geoCoordMap = {
                '上海': [121.4648,31.2891],
                '东莞': [113.8953,22.901],
                '东营': [118.7073,37.5513],
                '中山': [113.4229,22.478],
                '临汾': [111.4783,36.1615],
                '临沂': [118.3118,35.2936],
                '丹东': [124.541,40.4242],
                '丽水': [119.5642,28.1854],
                '乌鲁木齐': [87.9236,43.5883],
                '佛山': [112.8955,23.1097],
                '保定': [115.0488,39.0948],
                '兰州': [103.5901,36.3043],
                '包头': [110.3467,41.4899],
                '北京': [116.4551,40.2539],
                '北海': [109.314,21.6211],
                '南京': [118.8062,31.9208],
                '南宁': [108.479,23.1152],
                '南昌': [116.0046,28.6633],
                '南通': [121.1023,32.1625],
                '厦门': [118.1689,24.6478],
                '台州': [121.1353,28.6688],
                '合肥': [117.29,32.0581],
                '呼和浩特': [111.4124,40.4901],
                '咸阳': [108.4131,34.8706],
                '哈尔滨': [127.9688,45.368],
                '唐山': [118.4766,39.6826],
                '嘉兴': [120.9155,30.6354],
                '大同': [113.7854,39.8035],
                '大连': [121.669119,38.936274],
                // '天津': [117.4219,39.4189],
                '天津':[117.80678,39.011601],
                '太原': [112.3352,37.9413],
                '威海': [122.204585,37.452134],
                '宁波': [121.5967,29.6466],
                '宝鸡': [107.1826,34.3433],
                '宿迁': [118.5535,33.7775],
                '常州': [119.4543,31.5582],
                '广州': [113.5107,23.2196],
                '廊坊': [116.521,39.0509],
                '延安': [109.1052,36.4252],
                '张家口': [115.1477,40.8527],
                '徐州': [117.5208,34.3268],
                '德州': [116.6858,37.2107],
                '惠州': [114.6204,23.1647],
                '成都': [103.9526,30.7617],
                '扬州': [119.4653,32.8162],
                '承德': [117.5757,41.4075],
                '拉萨': [91.1865,30.1465],
                '无锡': [120.3442,31.5527],
                '日照': [119.2786,35.5023],
                '昆明': [102.9199,25.4663],
                '杭州': [119.5313,29.8773],
                '枣庄': [117.323,34.8926],
                '柳州': [109.3799,24.9774],
                '株洲': [113.5327,27.0319],
                '武汉': [114.3896,30.6628],
                '汕头': [117.1692,23.3405],
                '江门': [112.6318,22.1484],
                '沈阳': [123.1238,42.1216],
                '沧州': [116.8286,38.2104],
                '河源': [114.917,23.9722],
                '泉州': [118.3228,25.1147],
                '泰安': [117.0264,36.0516],
                '泰州': [120.0586,32.5525],
                '济南': [117.1582,36.8701],
                '济宁': [116.8286,35.3375],
                '海口': [110.3893,19.8516],
                '淄博': [118.0371,36.6064],
                '淮安': [118.927,33.4039],
                '深圳': [114.5435,22.5439],
                '清远': [112.9175,24.3292],
                '温州': [120.498,27.8119],
                '渭南': [109.7864,35.0299],
                '湖州': [119.8608,30.7782],
                '湘潭': [112.5439,27.7075],
                '滨州': [117.8174,37.4963],
                '潍坊': [119.0918,36.524],
                '烟台': [121.393715,37.556702],
                '玉溪': [101.9312,23.8898],
                '珠海': [113.7305,22.1155],
                '盐城': [120.2234,33.5577],
                '盘锦': [121.9482,41.0449],
                '石家庄': [114.4995,38.1006],
                '福州': [119.4543,25.9222],
                '秦皇岛': [119.2126,40.0232],
                '绍兴': [120.564,29.7565],
                '聊城': [115.9167,36.4032],
                '肇庆': [112.1265,23.5822],
                '舟山': [122.2559,30.2234],
                '苏州': [120.6519,31.3989],
                '莱芜': [117.6526,36.2714],
                '菏泽': [115.6201,35.2057],
                '营口': [122.4316,40.4297],
                '葫芦岛': [120.1575,40.578],
                '衡水': [115.8838,37.7161],
                '衢州': [118.6853,28.8666],
                '西宁': [101.4038,36.8207],
                '西安': [109.1162,34.2004],
                '贵阳': [106.6992,26.7682],
                '连云港': [119.1248,34.552],
                '邢台': [114.8071,37.2821],
                '邯郸': [114.4775,36.535],
                '郑州': [113.4668,34.6234],
                '鄂尔多斯': [108.9734,39.2487],
                '重庆': [107.7539,30.1904],
                '金华': [120.0037,29.1028],
                '铜川': [109.0393,35.1947],
                '银川': [106.3586,38.1775],
                '镇江': [119.4763,31.9702],
                '长春': [125.8154,44.2584],
                '长沙': [113.0823,28.2568],
                '长治': [112.8625,36.4746],
                '阳泉': [113.4778,38.0951],
                '青岛': [120.4651,36.3373],
                '韶关': [113.7964,24.7028]
            };
            
 
 
            var BJData = [
                // [{name:'天津'}, {name:'上海',value:95}],
                [{name:'天津'}, {name:'威海',value:90}],
                [{name:'天津'}, {name:'大连',value:80}],
                [{name:'天津'}, {name:'哈尔滨',value:80}],
                [{name:'天津'}, {name:'乌鲁木齐',value:80}],
                [{name:'天津'}, {name:'厦门',value:80}],
                [{name:'天津'},{name:'福州',value:95}],
                [{name:'天津'},{name:'太原',value:90}],
                [{name:'天津'},{name:'长春',value:80}],
                [{name:'天津'},{name:'重庆',value:70}],
                [{name:'天津'},{name:'西安',value:60}],
                [{name:'天津'},{name:'成都',value:50}],
                [{name:'天津'},{name:'常州',value:40}],
                [{name:'天津'},{name:'丹东',value:20}],
            ];
 
            var SHData = [
                [{name:'烟台'},{name:'威海',value:40}],
                [{name:'烟台'},{name:'天津',value:30}],
                [{name:'烟台'},{name:'丹东',value:20}],             
                [{name:'烟台'},{name:'大连',value:10}]
            ];
 
            var GZData = [
                [{name:'广州'},{name:'福州',value:95}],
                [{name:'广州'},{name:'太原',value:90}],
                [{name:'广州'},{name:'长春',value:80}],
                [{name:'广州'},{name:'重庆',value:70}],
                [{name:'广州'},{name:'西安',value:60}],
                [{name:'广州'},{name:'成都',value:50}],
                [{name:'广州'},{name:'常州',value:40}],
                [{name:'大连'},{name:'天津',value:30}],
                [{name:'大连'},{name:'威海',value:20}],             
                [{name:'大连'},{name:'烟台',value:10}]
            ];
 
            var planePath = 'path://L80.0625,-119.0000L-91.5000,72.0000L-22.8750,119.0000L91.5000,-87.0000L80.0625,-118.0000L80.0625,-117.0000L80.0625,-119.0000';
 
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem[0].name];
                    var toCoord = geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord],
                            value: dataItem[1].value
                        });
                    }
                }
                console.log(res);
                return res;
            };
 
            var color = ['#f0eb3a', '#ffa022', '#46bee9'];
            var series = [];
            [['天津', BJData]].forEach(function (item, i) {
                series.push(
                // obj 起点  
                {
                    name: item[0],
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                        },
                        
                    },
                    symbolSize: function (val) {
                        return val[2] / 8;
                    },
                    itemStyle: {
                        normal: {
                            color: color[i],
                        }
                    },
                    data: item[1].map(function (dataItem) {
                        return {
                            name: dataItem[0].name,
                            value: geoCoordMap[dataItem[0].name]
                        };
                    })
                },  
                //obj 1
                {
                    name: item[0],
                    type: 'lines',
                    zlevel: 1,
                    //飞行轮廓痕迹
                    effect: {
                        show: false,
                        period: 6,
                        trailLength: 0.6,
                        color: '#fff',
                        symbolSize: 8
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 2,
                            curveness: 0.3
                        }
                    },
                    data: convertData(item[1])
                },
                 //obj 2
                {
                    name: '',
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    // 箭头大小
                    symbolSize: 10,
                    // 航线
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        // loop:false,  //只飞一次
                        symbol: planePath,
                        symbolSize: 0
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.3 //曲率
                        }
                    },
                    data: convertData(item[1])
                },
                 //obj 3
                {
                    name: '',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                            fontSize: 16
                        },
                        textStyle:{

                            color:'red',
                            fontSize:30
                        }
                    },
                    symbolSize: function (val) {
                        return val[2] / 8;  //辐射圈大小
                    },
                    itemStyle: {

                        normal: {
                            color: color[i]
                        }
                    },
                    data: item[1].map(function (dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])

                        };
                    })
                });
            });
 
            var option = {
                title : {
                    text: '',
                    // subtext: '数据纯属虚构',
                    left: 'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
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
                legend: {
                    show:false,
                    icon: 'rect',
                    borderRadius:10,
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    data:'',
                    textStyle: {
                        color: '#fff',
                        color:'red'
                    },
                    selectedMode: 'single'
                },
                // dataRange: {
                //     // min : 0,
                //     // max : 100,
                //     // y: '60%',
                //     // calculable : true,
                //     color: ['#ff3333', 'orange', 'yellow','lime','aqua']
                // },
                geo: {
                    map: 'china',
                    label: {
                        normal:{
                            show:false,
                            textStyle:{
                                color:'#fff',
                                fontSize:16
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
                    roam: true,  
                    // 自定义map中心经纬度
                    center: [119.848013,38.640351], 
                    // layoutCenter layoutSize配合使用
                    layoutCenter: ['75%', '40%'],
                    layoutSize:900,                
                    itemStyle: {
                        normal: {
                            areaColor: 'none',
                            borderColor: '#77c9d6',
                            borderWidth: 2,
                            /*areaColor: '#323c48',
                            borderColor: '#404a59'*/
                        },
                        emphasis: {
                            // areaColor: '#e0decf'
                            areaColor: '#77c9d6'
                        }
                    }
                },
                series: series
            };
            window.onresize = myChart.resize;
            if (option && typeof option === "object") {
                myChart.setOption(option, true); 
                 window.addEventListener('resize', function () { 
                      myChart.resize(); 
                 });               
            }
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
<style scoped>
.flow { height: 100%; }
.left { width: 25%; height: 100%; float: left;}
.left .top { width: 100%; height: 315px;float: left; }
.left .top h1 { color: #abdbf6; font-size: 38px; text-align: center; margin-top: 18%; }
.left .top h2 { color: #2d4ea0; font-size: 18px; text-align: center; margin-top: 10%; }
.left .top h2 span { margin-right: 20px; }
.left .top a { width: 138px; height: 28px; background: url(../assets/images/index/images/back.png); background-size: 100% 100%; display: block; margin: 50px; }
.left .middle .title { width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px; float: left; }

.center { width: 50%; height: 100%; float: left; }
.center .top { width: 100%; height: 170px; float: left; }
.center .top p { font-size: 18px; color: #fff; height: 40px; margin-top: 30px; line-height: 40px; font-weight: bold; }
.center .top ul { float: left; margin-top: 20px; }
.center .top ul li { padding: 5px 10px; color: #1f397c; float: left; font-size: 14px; cursor: pointer; }
.center .top ul .this { box-shadow: 0px 0px 10px #0085ff; color: #fff; }
.center .middle { width: 100%; height: 840px; float: left; }


.right { width: 25%; height: 100%; float: left; }
.right .top { height: 29% !important; }
.right .top,.right .bottom { width: 100%; height: 40%; padding: 10px; }
.right .top .title { margin-bottom: 30px; }
.right .top .title,.right .bottom .title {width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png); color: #fff; font-size: 18px;
}
.right .bottom .title { float: left;}
.right .top .l,.right .top .c,.right .top .r { width: 133px; height: 133px; position: relative; margin-top: 30px; float: left; margin-right: 15px; }
.right .top .l p,.right .top .c p,.right .top .r p { width: 80px; height: 80px; position: absolute; top: 50%; left: 50%;
margin-top: -35px; margin-left: -40px; }
.right .top .l p span,.right .top .c p span,.right .top .r p span { width: 100%; height: 25px; display: block; text-align: center; }
.right .top .l p span:nth-child(1),.right .top .c p span:nth-child(1),.right .top .r p span:nth-child(1) { color: #3eb9f7; }
.right .top .l p span:nth-child(2),.right .top .c p span:nth-child(2),.right .top .r p span:nth-child(2) { color: #fff; }
.right .top .l p span:nth-child(3),.right .top .c p span:nth-child(3),.right .top .r p span:nth-child(3) { color: #f19d3a; }
.right .top .r { width: 133px; height: 133px; position: relative; margin-top: 30px; float: left; margin-right: 0; }
.circleChart_text { display: none; }

</style>