<template>
    <div class="index-layer">
        <div class="left">
            <div class="top">
                <h1>天津市邮政管理局</h1>
                <h2><span>{{date}}</span><span>{{week}}</span><span>{{time}}</span></h2>
            </div>
            <div class="middle">
                <div class="title">智能快件箱</div>
                <h1>总柜数<span><em>{{courierBoxData.totalBoxNum}}</em><i>个</i></span></h1>
                <h2><span>当前柜数</span><p><i :style="{width: courierBoxData.liyonglv + '%'}"></i></p><em>{{courierBoxData.currentBoxNum}}</em></h2>
                <ul>
                    <li>
                        
                        <h2>{{courierBoxData.ruguiliang}}<span>件</span></h2>
                        <h3>入柜量</h3>
                        
                    </li>
                    <li>
                        
                        <h2>{{courierBoxData.chuguliliang}}<span>件</span></h2>
                        <h3>出柜量</h3>
                        
                    </li>
                    <li>
                        
                        <h2>{{courierBoxData.liyonglv}}</h2>
                        <h3>利用率</h3>
                        
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <div class="title">企业投递TOP3</div>
                <p>
                    <span>中通快递</span>
                    <i>{{top3Data.zhongtong}}件</i>
                </p>
                <p>
                    <span>圆通快递</span>
                    <i>{{top3Data.yuantong}}件</i>
                </p>
                <p>
                    <span>申通快递</span>
                    <i>{{top3Data.shentong}}件</i>
                </p>
            </div>
        </div>
        <div class="center">
            <div class="top">
                <div class="title">区域详细业务量</div>
                <table class="thead">
                    <tr>
                        <td>区域</td>
                        <td>揽收（件）</td>
                        <td>投递（件）</td>
                        <td>实名（件）</td>
                    </tr>
                </table>
                <div class="box">
                    <table class="tbody" v-scroll>                          
                        <tr v-for="(regional, index) in regionalTrafficData" :key="index">
                            <td>{{regional.areaname}}</td>
                            <td>{{regional.collectNum}}</td>
                            <td>{{regional.deliverNum}}</td>
                            <td>{{regional.realNameNum}}</td>
                        </tr>
                    </table>
                </div>
                <table class="tbottom">
                    <tr>
                        <td>合计</td>
                        <td>309,885</td>
                        <td>1,393,504</td>
                        <td>297,152</td>
                    </tr>
                </table>
            </div>
            <div class="middle">
                <div class="title">总业务量波动</div>
                <ul>
                    <li :class="{'this': index == business.index}" v-for="(title, index) in business.titles" :key="index" @click="getBusinessData(index)">{{title}}</li>
                </ul>
                <div id="main"></div>
            </div>
            <div class="bottom">
                <div class="title">流量流向</div>
                <div class="circleChart circleChart6" id="6" data-value="10">
                    <CircleProgress  
                    id="circleChart6"
                    :width="216"
                    :radius="12"
                    :progress="flowData[0]"
                    :isAnimation="true"
                    barColor="#43b9fd"
                    ></CircleProgress>
                </div>
                <div class="circleChart circleChart7" id="7" data-value="10">
                    <CircleProgress  
                    id="circleChart7"
                    :width="175"
                    :radius="12"
                    :progress="flowData[1]"
                    :isAnimation="true"
                    barColor="#faa136"
                    ></CircleProgress>
                </div>
                <div class="circleChart circleChart8" id="8" data-value="10">
                    <CircleProgress  
                    id="circleChart8"
                    :width="175"
                    :radius="12"
                    :progress="flowData[2]"
                    :isAnimation="true"
                    barColor="#33ea94"
                    ></CircleProgress>
                </div>
                <ul>
                    <li>
                        <i></i>
                        <h1>省内流量</h1>
                        <h2 class="number6"></h2>
                        <h3>{{flowData[0]}}%</h3>
                    </li>
                    <li>
                        <i></i>
                        <h1>省内流量</h1>
                        <h2 class="number7"></h2>
                        <h3>{{flowData[1]}}%</h3>
                    </li>
                    <li>
                        <i></i>
                        <h1>省内流量</h1>
                        <h2 class="number8"></h2>
                        <h3>{{flowData[2]}}%</h3>
                    </li>
                </ul>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <div class="title">企业排行列表</div>
                <ul>
                    <li class="this">业务量</li>
                    <li>实名量</li>
                    <li>面单量</li>
                    <li>电商量</li>
                </ul>
                <table>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>200</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>330</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>433</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>490</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>120</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>450</td>
                    </tr>
                    <tr>
                        <td> 1  京邦达</td>
                        <td>
                            <span><i></i></span>
                        </td>
                        <td>220</td>
                    </tr>
                </table>
            </div>
            <div class="middle">
                <div class="title">总业务量波动</div>
                <ul>
                    <li>
                        <h1>全职员工</h1>
                        <h2>{{employeesData.data1[0].number}}<span>万人</span></h2>
                        <h3>同比<span><img src="../assets/images/index/images/icon1.png" alt="">
                        {{employeesData.data1[0].percentage}}%</span></h3>
                        <p>
                            <span>行业平均值</span>
                            <i>{{employeesData.data1[0].average}}<em>%</em></i>
                        </p>
                    </li>
                    <li>
                        <h1>全职员工</h1>
                        <h2>{{employeesData.data2[0].number}}<span>万人</span></h2>
                        <h3>同比<span><img src="../assets/images/index/images/icon1.png" alt="">
                        {{employeesData.data2[0].percentage}}%</span></h3>
                        <p>
                            <span>行业平均值</span>
                            <i>{{employeesData.data2[0].average}}<em>%</em></i>
                        </p>
                    </li>
                    <li>
                        <h1>全职员工</h1>
                        <h2>{{employeesData.data3[0].number}}<span>万人</span></h2>
                        <h3>同比<span><img src="../assets/images/index/images/icon1.png" alt="">
                        {{employeesData.data3[0].percentage}}%</span></h3>
                        <p>
                            <span>行业平均值</span>
                            <i>{{employeesData.data3[0].average}}<em>%</em></i>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <div class="title">车辆信息</div>
                <p>
                    <span>车辆总数<i>{{carsData.carNum[0]}}<em>辆</em></i></span>
                    <span>车辆总数<i>{{carsData.carNum[1]}}<em>辆</em></i></span>
                </p>
                <div id="main1"></div>
                <ul>
                    <li>
                        <i></i>
                        <h1>小型车辆</h1>
                        <h2 class="number9">{{carsData.carPercentage[0]}}</h2>
                        <h3 class="number11">{{carsData.proportion[0]}}%</h3>
                    </li>
                    <li>
                        <i></i>
                        <h1>大型车辆</h1>
                        <h2 class="number10">{{carsData.carPercentage[1]}}</h2>
                        <h3 class="number12">{{carsData.proportion[1]}}%</h3>
                    </li>
                </ul>
            </div>
        </div>
        <div class="map-top">
            <ul>
                <li>
                    <h1>揽收总量</h1>
                    <h2>309,885</h2>
                </li>
                <li>
                    <h1>揽收总量</h1>
                    <h2>309,885</h2>
                </li>
                <li>
                    <h1>揽收总量</h1>
                    <h2>309,885</h2>
                </li>
            </ul>
        </div>
        <div class="map">
            <div id="map" style="width: 100%;height:660px;"></div>
        </div>
        <div class="map-bottom">
            <div class="title">安检机</div>
                <div class="l">
                    <div class="circleChart" id="3" style="height: 133px;">
                        <CircleProgress  
                        id="circleChart3"
                        :width="133"
                        :radius="12"
                        :progress="securityData[0] / 100"
                        :isAnimation="true"
                        barColor="#43b9fd"
                        ></CircleProgress>
                    </div>
                    <p>
                        <span class="number3">{{securityData[0]}}</span>
                        <span>使用量</span>
                        
                    </p>
                </div>
                <div class="c">
                    <div class="circleChart" id="4" style="height: 133px;">
                        <CircleProgress  
                        id="circleChart4"
                        :width="133"
                        :radius="12"
                        :progress="securityData[1] / 100"
                        :isAnimation="true"
                        barColor="#33ea94"
                        ></CircleProgress>
                    </div>
                    <p>
                        <span class="number4">{{securityData[1]}}</span>
                        <span>使用量</span>
                        
                    </p>
                </div>
                <div class="r">
                    <div class="circleChart" id="5" style="height: 133px;">
                        <CircleProgress  
                        id="circleChart5"
                        :width="133"
                        :radius="12"
                        :progress="securityData[2] / 100"
                        :isAnimation="true"
                        barColor="#faa136"
                        ></CircleProgress>
                    </div>
                    <p>
                        <span class="number5">{{securityData[2]}}</span>
                        <span>使用量</span>
                        
                    </p>
                </div>
            <!-- <div class="title">战备指挥</div>
            <div class="text">
                <p>
                    <span>战备人员总数</span>
                    <i>7,842,256<em>人</em></i>
                </p>
                <p>
                    <span>战备人员总数</span>
                    <i>7,842,256<em>人</em></i>
                </p>
                <p>
                    <span>战备人员总数</span>
                    <i>7,842,256<em>人</em></i>
                </p>
            </div> -->
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import CircleProgress from 'vue-circleprogressbar'
import { setInterval } from 'timers';
let mapData = require('../assets/map/province/tianjin.json')
export default {
    data() {
        return {
            time: moment(new Date()).format('HH:mm:ss'),
            courierBoxData: {},
            top3Data: {},
            regionalTrafficData: [],
            business: {
                index: 0,
                titles: ['揽收量','投递量','实名量'],
                data: {
                    x: [],
                    y: []
                }
            },
            flowData: [],
            carsData: {
                carNum: [0, 0],
                carPercentage: [0, 0],
                allPercentage: 0,
                proportion: ['0', '0']
            },
            securityData: [0, 0, 0],
            employeesData: {
                data1: {
                    number: 0,
                    percentage: 0,
                    average: 0
                },
                data2: {
                    number: 0,
                    percentage: 0,
                    average: 0
                },
                data3: {
                    number: 0,
                    percentage: 0,
                    average: 0
                }
            }
        }
    },
    computed: {
        week() {
            const mday = new Date().getDay()
            const weekData = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
            return weekData[mday]
        },
        date() {
            const date = new Date()
            return moment(date).format("YYYY年DD月MM日")
        }
    },
    mounted() {
        let _this = this
        this.timer = setInterval(() => {
            _this.time = moment(new Date()).format('HH:mm:ss')
        }, 1000)

        this.setBusinessEcharts()
        this.setCarsEcharts()
        this.setMap()
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getCourierBoxData()
            this.getTop3Data()
            this.getRegionalTrafficData()
            this.getBusinessData(this.business.index)
            this.getFlowData()
            this.getCarsData()
            this.getSecurityData()
            this.getEmployeesData()
        },
        getCourierBoxData() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/index/intelligenceBox').then((res) => {
                let data = res.data
                if (data.code == '0') {
                    this.courierBoxData = data.data                    
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getTop3Data() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/index/top').then((res) => {
                let data = res.data
                if (data.code == '0') {
                    this.top3Data = data.data                    
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getRegionalTrafficData() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/index/detailedBusiness').then((res) => {
                let data = res.data
                if (data.code == '0') {
                    this.regionalTrafficData = data.data                    
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getBusinessData(type) {
            this.business.index = type
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/index/wave', {
            params: {
                type: type
            }}).then((res) => {
                let data = res.data
                if (data.code == '0') {
                    this.business.data.x = data.data[0].date
                    this.business.data.y = data.data[0].number
                    this.setBusinessEcharts()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getFlowData() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/index/flow').then((res) => {
                let data = res.data
                if (data.code == '0') {
                    this.flowData = data.data.map(item => {
                        return item.number
                    })        
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getCarsData() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/index/car').then((res) => {
                let data = res.data
                if (data.code == '0') {
                    this.carsData = data.data
                    this.carsData.allPercentage = parseInt(data.data.carPercentage[0] + data.data.carPercentage[1])
                    this.carsData.proportion = [(data.data.carPercentage[0] / this.carsData.allPercentage * 100).toFixed(2), (data.data.carPercentage[1] / this.carsData.allPercentage * 100).toFixed(2)]
                    this.setCarsEcharts()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getSecurityData() {
            setInterval(() => {
                this.$axios.get('http://rap2api.taobao.org/app/mock/223607/index/Security').then((res) => {
                    let data = res.data
                    if (data.code == '0') {
                        this.securityData = data.data
                        console.log(this.securityData)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }, 5000)
        },
        getEmployeesData() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/indexEmployees').then((res) => {
                let data = res.data
                if (data.code == '0') {
                    this.employeesData = data.data
                    console.log(this.employeesData)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        setBusinessEcharts() {
            let myChart = this.$echarts.init(document.getElementById('main'));
            myChart.setOption({
                title: {
                    textStyle: {
                        color: '#989898',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: 12
                    }
                },
                tooltip: {
                    show: false,
                    trigger: 'false',
                    axisPointer: {
                        type: 'cross',
                        
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    }   
                },
                color:['#fff','#fff'],
                legend: {
                    data: ['订单总数']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '15%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.business.data.x,
                        axisLine : {
                            lineStyle : {
                                type : 'solid',
                                color : '#009bff',// 左边线的颜色
                                width : '1',// 坐标线的宽度
                            }
                        },
                        splitLine: {     //网格线
                            show: true,
                            lineStyle: {
                                color: '#393f70',
                                type: 'solid',
                                width: '1'
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine : {
                            lineStyle : {
                                type : 'solid',
                                color : '#009bff',// 左边线的颜色
                                width : '1'// 坐标线的宽度
                            }
                        },
                        axisTick:{       //y轴刻度线
                            show:false
                        },
                        splitLine: {     //网格线
                            show: false
                        }
                    },
                    
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        itemStyle: {  
                            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                                        offset: 1, color: '#112645' // 0% 处的颜色
                                    }, {
                                        offset: 0, color: '#4da9dc' // 100% 处的颜色
                                    }]
                                ),  //背景渐变色 
                                lineStyle: {        // 系列级个性化折线样式  
                                    width: 3,  
                                    type: 'solid',  
                                    color: "#50aee3"
                                }
                            },  
                            emphasis: {  
                                color: '#50aee3',  
                                lineStyle: {        // 系列级个性化折线样式  
                                    width:2,  
                                    type: 'dotted',  
                                    color: "#50aee3" //折线的颜色
                                }  
                            }  
                        },//线条样式  
                        symbolSize:5, //折线点的大小
                        areaStyle: {normal: {}},
                        data:this.business.data.y
                    }
                ]
            })
        },
        setCarsEcharts() {
            var myChart = this.$echarts.init(document.getElementById('main1'));
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                color: ['#43b9fd', '#faa136'],
                series: [
                    {
                        name:'车辆信息',
                        type:'pie',
                        radius: [this.carsData.proportion[0]+'%', this.carsData.proportion[1]+'%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:this.carsData.carPercentage[0], name:'小型车辆'},
                            {value:this.carsData.carPercentage[1], name:'大型车辆'},
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        },
        setMap() {
            //地图容器
            var chart = this.$echarts.init(document.getElementById('map'));
            //34个省、市、自治区的名字拼音映射数组
            var provinces = {
                //23个省
                "台湾": "taiwan",
                "河北": "hebei",
                "山西": "shanxi",
                "辽宁": "liaoning",
                "吉林": "jilin",
                "黑龙江": "heilongjiang",
                "江苏": "jiangsu",
                "浙江": "zhejiang",
                "安徽": "anhui",
                "福建": "fujian",
                "江西": "jiangxi",
                "山东": "shandong",
                "河南": "henan",
                "湖北": "hubei",
                "湖南": "hunan",
                "广东": "guangdong",
                "海南": "hainan",
                "四川": "sichuan",
                "贵州": "guizhou",
                "云南": "yunnan",
                "陕西": "shanxi1",
                "甘肃": "gansu",
                "青海": "qinghai",
                //5个自治区
                "新疆": "xinjiang",
                "广西": "guangxi",
                "内蒙古": "neimenggu",
                "宁夏": "ningxia",
                "西藏": "xizang",
                //4个直辖市
                "北京": "beijing",
                "天津": "tianjin",
                "上海": "shanghai",
                "重庆": "chongqing",
                //2个特别行政区
                "香港": "xianggang",
                "澳门": "aomen"
            };

            //初始化绘制全国地图配置
            var option = {
                title : {
                    text: '',
                
                    link: 'https://blog.csdn.net/example440982',
                    left: 'center',
                    textStyle:{
                        color: '#fff',
                        fontSize:16,
                        fontWeight:'normal',
                        fontFamily:"Microsoft YaHei"
                    },
                    subtextStyle:{
                        color: '#fff',
                        fontSize:18,
                        fontWeight:'normal',
                        fontFamily:"Microsoft YaHei"
                    }
                },
                
                tooltip: {
                    enterable:true,
                    trigger: 'item',
                    borderRadius: 8,
                    backgroundColor:'rgba(7,8,26,0.9)',
                    padding: [10,20,10,20],
                    textStyle:{
                        lineHeight: 24,
                        fontSize:18
                    },
                    formatter:function(params){
                        var relVal ='';
                        var ser = option.series;
                        for(var i = 0 ;i < ser.length;i++){
                            for(var j = 0 ;j<ser[i].data.length;j++){
                                if(ser[i].data[j].name==params.name){
                                    relVal += '<span style="color:#43b9fd;">数据1'+":"+ser[i].data[j].value[0]+"<br/></span>";
                                    relVal += '<span style="color:#33eb94;">数据2'+":"+ser[i].data[j].value[1]+"<br/></span>";
                                    relVal += '<span style="color:#faa136;">数据3'+":"+ser[i].data[j].value[2]+"<br/></span>";
                                }
                            }
                        }
                        return relVal;
                    }
                },
                animationDuration:1000,
                animationEasing:'cubicOut',
                idanimationDurationUpdate:1000,
                
            };

            var area = {
                
            };
            //直辖市和特别行政区-只有二级地图，没有三级地图
            var special = ["北京","天津","上海","重庆","香港","澳门"];
            var mapdata = [];
            //绘制全国地图
            
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
            renderMap('tianjin', d, option);

            function renderMap(map, data, option) {
                option.series = [ 
                    {
                        data: [
                            {name: '宝坻区',selected: false,value:[100,200,300]},
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
                        ],
                        name: map,
                        type: 'map',
                        mapType: map,
                        roam: true,
                        nameMap:{
                            'china':'中国'
                        },
                        label: {
                            normal:{
                                show:true,
                                textStyle:{
                                    color:'#fff',
                                    fontSize:13
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
                        itemStyle: {
                            normal: {
                                areaColor: '#076291',
                                borderColor: '#76c1d1'
                            },
                            emphasis: {
                                areaColor: '#003c5d'
                            }
                        }
                    }	
                ];
                //渲染地图
                chart.setOption(option);
            }
        },
        
    },
    directives: {
        scroll: {
            inserted(el) {
                let num = 0;
                let rollLength = 5;
                setTimeout(() => {
                    let tr = el.children[0];
                    setInterval(() => {
                        num += rollLength
                        if (num == 10) {
                            num = 0
                        }
                        el.style.top = -num * tr.offsetHeight + 'px';
                    }, 3000)
                }, 3000)
                
            }
        }
    },
    components: {
        CircleProgress
    }
}
</script>

<style>
    @import "../assets/css/common.css";
    @import "../assets/css/index/style/style.css";
    .index-layer{
        height: 100%;
    }
    .tbody{
        position: relative;
        transition: 1s;
        top: 0;
    }
    .map-bottom .center_text{
        display: none !important;
    }
</style>

