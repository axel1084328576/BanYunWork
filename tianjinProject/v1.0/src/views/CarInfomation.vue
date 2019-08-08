<template>
    <div class="car_infomation">
        <div class="left">
            <date :title="title" :isIndex="false"></date>
            <div class="middle">
                <div class="title">地区流量排名</div>
                <table-list :showType="showType" :url="regionUrl"></table-list>                
            </div>
        </div>
        <div class="center">
            <div class="top">
                <ul>
                    <li>
                        <h1>车辆总数</h1>
                        <p>50,185<span>辆</span></p>
                    </li>
                    <li>
                        <h1>持证车辆</h1>
                        <p>73,985<span>辆</span></p>
                    </li>
                </ul>
            </div>
            <div class="middle">
                <div class="top">
                    <div class="title" style="float: initial;">车辆数量趋势</div>
                    <div id="main"></div>
                </div>
                <div class="bottom">
                    <div class="title">持证车辆趋势</div>
                    <div id="main1"></div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <div class="title">车辆信息</div>
                <div class="l">
                    <div class="circleChart" id="3" data-value="10">
                        <vue-progress-bar :value="carInfo[0]/10" :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#43b9fd'], rectWidth: 133, rectHeight: 133}"></vue-progress-bar>
                    </div>
                    <p>
                        <span class="number3">{{carInfo[0]}}</span>
                        <span>总数</span>
                    </p>
                </div>
                <div class="c">
                    <div class="circleChart" id="4" data-value="100">
                        <vue-progress-bar :value="carInfo[1]/10" :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#33ea94'], rectWidth: 133, rectHeight: 133}"></vue-progress-bar>
                    </div>
                    <p>
                        <span class="number4">{{carInfo[1]}}</span>
                        <span>运行</span>
                    </p>
                </div>
                <div class="r">
                    <div class="circleChart" id="5" data-value="100">
                        <vue-progress-bar :value="carInfo[2]/10" :options="{radius:70,circleLineCap: 'round',varyStrokeArray: [10,12],pathColors: ['rgba(0, 0, 0, 0.3)', '#faa136'], rectWidth: 133, rectHeight: 133}"></vue-progress-bar>
                    </div>
                    <p>
                        <span class="number5">{{carInfo[2]}}</span>
                        <span>联网</span>
                    </p>
                </div>
            </div>
            <div class="bottom">
                <div class="title fl">区域流量排名</div>
                <table-list :showType="showType" :url="regionUrl2"></table-list> 
            </div>
        </div>
    </div>
</template>
<script>
import Date from '@/components/Date'
import TableList from '@/components/TableList'
import VueProgressBar from 'svg-progress-bar'
export default {
    data(){
        return {
            title: '武清区业务量监控',
            showType: false,
            regionUrl: 'http://rap2api.taobao.org/app/mock/223607/regionLeft',
            regionUrl2: 'http://rap2api.taobao.org/app/mock/223607/regionLeft',
            carInfo: []
        }
    },
    mounted() {
        this.setVehiclesNumberTrend()
        this.setLicensedVehiclesTrend()
    },
    created() {
        this.getCarInfo()
    },
    methods: {
        getCarInfo() {
            this.$axios.get('http://rap2api.taobao.org/app/mock/223607/information').then(res => {
                if (res.data.code == '0') {
                    this.carInfo = res.data.data
                    console.log(this.carInfo)
                }
            }).catch(err => {    
                console.log(err)
            })
        },
        setVehiclesNumberTrend() {
            var myChart1 = this.$echarts.init(document.getElementById('main'));
            var option1 = {
                tooltip : {
                    show: true,
                    trigger: 'true',
                    axisPointer: {
                        type: 'cross',
                        
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    }
                },
                legend: {
                    data:['小型车辆','大型车辆'],
                    icon:'circle',
                    textStyle:{
                        fontSize:16,
                        color:['#000','#fff']
                    },
                    x: 'right',
                    padding:[0,0,0,0]
                },
                color:['#fff','#fff'],
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '10%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['0501','0502','0503','0504','0501','0501','0501'],
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
                        name:'小型车辆',
                        type:'line',
                        stack: '总量',
                        itemStyle: {  
                            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                                        offset: 1, color: '#112645' // 0% 处的颜色
                                    }, {
                                        offset: 0, color: '#62bb82' // 100% 处的颜色
                                    }]
                                ),  //背景渐变色 
                                lineStyle: {        // 系列级个性化折线样式  
                                    width: 3,  
                                    type: 'solid',  
                                    color: "#62bb82"
                                }
                            },  
                            emphasis: {  
                                color: '#62bb82',  
                                lineStyle: {        // 系列级个性化折线样式  
                                    width:2,  
                                    type: 'dotted',  
                                    color: "#62bb82" //折线的颜色
                                }  
                            }  
                        },//线条样式  
                        smooth: true,
                        symbolSize:10, //折线点的大小
                        areaStyle: {normal: {}},
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data:[272, 933, 392, 491, 632, 318, 313]
                    },
                    {
                        name:'大型车辆',
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
                        smooth: true,
                        symbolSize:10, //折线点的大小
                        areaStyle: {normal: {}},
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data:[120, 350, 280, 934, 220, 730, 510]
                    }
                ]
            };
            myChart1.setOption(option1);
        },
        setLicensedVehiclesTrend() {
            var myChart1 = this.$echarts.init(document.getElementById('main1'));
            var option1 = {
                tooltip : {
                    show: true,
                    trigger: 'true',
                    axisPointer: {
                        type: 'cross',
                        
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    }
                },
                legend: {
                    data:['小型车辆','大型车辆'],
                    icon:'circle',
                    textStyle:{
                        fontSize:16,
                        color:['#000','#fff']
                    },
                    x: 'right',
                    padding:[0,0,0,0]
                },
                color:['#fff','#fff'],
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '10%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['0501','0502','0503','0504','0501','0501','0501'],
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
                        name:'小型车辆',
                        type:'line',
                        stack: '总量',
                        itemStyle: {  
                            normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                                        offset: 1, color: '#112645' // 0% 处的颜色
                                    }, {
                                        offset: 0, color: '#62bb82' // 100% 处的颜色
                                    }]
                                ),  //背景渐变色 
                                lineStyle: {        // 系列级个性化折线样式  
                                    width: 3,  
                                    type: 'solid',  
                                    color: "#62bb82"
                                }
                            },  
                            emphasis: {  
                                color: '#62bb82',  
                                lineStyle: {        // 系列级个性化折线样式  
                                    width:2,  
                                    type: 'dotted',  
                                    color: "#62bb82" //折线的颜色
                                }  
                            }  
                        },//线条样式  
                        smooth: true,
                        symbolSize:10, //折线点的大小
                        areaStyle: {normal: {}},
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data:[331, 451, 521, 931, 231, 413, 113]
                    },
                    {
                        name:'大型车辆',
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
                        smooth: true,
                        symbolSize:10, //折线点的大小
                        areaStyle: {normal: {}},
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data:[622, 234, 452, 341, 452, 113, 285]
                    }
                ]
            };
            myChart1.setOption(option1);
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
    .index-layer{
        height: 100%;
    }
    
    .left .middle ul { float: right; margin-top: 10px; margin-right: 20px; width:158px; }
    .left .middle ul li {width: auto;}
    body { background: url(../assets/images/common/bg.jpg); background-size: 100% 100%; display: flex; }
.left { width: 25%; height: 100%; float: left;}
.left .top { width: 100%; height: 315px;float: left; }
.left .top h1 { color: #abdbf6; font-size: 38px; text-align: center; margin-top: 18%; }
.left .top h2 { color: #2d4ea0; font-size: 18px; text-align: center; margin-top: 10%; }
.left .top h2 span { margin-right: 20px; }
.left .top a { width: 138px; height: 28px; background: url(../assets/images/index/images/back.png); background-size: 100% 100%; display: block; margin: 50px; }
.left .middle { padding: 10px; }
.left .middle .title { width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px; float: left; }
.left .middle ul { float: right; margin-top: 10px; margin-right: 20px; }
.left .middle ul li { padding: 5px 10px; color: #1f397c; float: left; font-size: 14px; cursor: pointer; }
.left .middle ul .this { box-shadow: 0px 0px 10px #0085ff; color: #fff; }
.left .middle table { width: 100%; height: 79%; margin-top: 10px; float: left; }
.left .middle table td { font-size: 14px; color: #fff; }
.left .middle table tr { height: 33px; }
.left .middle table tr td:last-child { color: #62bb82; }
.left .middle table tr td:nth-child(1),.left .middle table tr td:nth-child(3) { width: 20%; text-align: center; }
.left .middle table tr td span { width: 100%; height: 12px; background: #161a3c; display: block; border-radius: 6px;
overflow: hidden; }
.left .middle table tr td span i { width: 0%; background: #62bb82; display: block; height: 100%; border-radius: 0 6px 6px 0; }
.left .middle table tr:nth-child(1) td,.left .middle table tr:nth-child(2) td,.left .middle table tr:nth-child(3) td { color: #f19d3a; }
.left .middle table tr:nth-child(1) i,.left .middle table tr:nth-child(2) i,.left .middle table tr:nth-child(3) i { background: #f19d3a; }







.center { width: 50%; height: 100%; float: left; }
.center .top { width: 100%; height: 320px; float: left; }
.center .top ul { margin: 0 auto; width: 800px; height: 250px; margin-top: 20px; }
.center .top ul li { width: 326px; height: 100%; float: left; color: #3eb9f7; }
.center .top ul li:last-child { float: right; color: #33eb94; }
.center .top ul li:last-child p { background: url(../assets/images/index/images/img2.png); background-size: 100% 100%; }
.center .top ul li h1 { width: 100%; height: 120px; text-align: center; line-height: 120px;
margin-top: 0; }
.center .top p { width: 100%; font-size: 44px; height: 130px; line-height: 130px; 
     background: url(../assets/images/index/images/img1.png); background-size: 100% 100%; text-align: center; }
.center .top p span { font-size: 24px; }
.center .middle { width: 100%; }
.center .middle .title { width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px; float: left; margin: 10px;  }
.center .middle .top { width: 100%; height: 340px; }
#main,#main1 { width: 94%; height: 320px; float: left; }


.right { width: 25%; height: 100%; float: left; }
.right .top { height: 320px !important; }
.right .top,.right .bottom { width: 100%; height: 40%; padding: 10px; }
.right .top .title { margin-bottom: 30px; }
.right .top .title,.right .bottom .title {width: 148px; height: 50px; line-height: 50px; text-align: center; background: url(../assets/images/index/images/title.png);
color: #fff; font-size: 18px;
}
.right .top .l,.right .top .c,.right .top .r { width: 133px; height: 133px; position: relative; margin-top: 30px; float: left; margin-right: 15px; }
.right .top .l p,.right .top .c p,.right .top .r p { width: 80px; height: 80px; position: absolute; top: 50%; left: 50%;
margin-top: -35px; margin-left: -40px; }
.right .top .l p span,.right .top .c p span,.right .top .r p span { width: 100%; height: 25px; display: block;
 margin-top: 8px; text-align: center; }
.right .top p span i { font-size: 14px; }
.right .top .l p span:nth-child(1),.right .top .c p span:nth-child(1),.right .top .r p span:nth-child(1) { color: #3eb9f7; font-size: 24px; }
.right .top .l p span:nth-child(2),.right .top .c p span:nth-child(2),.right .top .r p span:nth-child(2) { color: #fff; }
.right .top .l p span:nth-child(3),.right .top .c p span:nth-child(3),.right .top .r p span:nth-child(3) { color: #f19d3a; }
.right .top .r { width: 133px; height: 133px; position: relative; margin-top: 30px; float: left; margin-right: 0; }
.circleChart_text { display: none; }

.right .bottom ul { float: right; margin-top: 10px;margin-right: 20px; }
.right .bottom ul li { padding: 5px 10px; color: #1f397c; float: left; font-size: 14px; cursor: pointer; }
.right .bottom ul .this { box-shadow: 0px 0px 10px #0085ff; color: #fff; }
.right .bottom table { width: 100%; height: 79%; margin-top: 10px; float: left; }
.right .bottom table td { font-size: 14px; color: #fff; }
.right .bottom table tr {  height: 33px; margin: 5px 0; }
.right .bottom table tr td:last-child { color: #62bb82; }
.right .bottom table tr td:nth-child(1),.right .bottom table tr td:nth-child(3) { width: 20%; text-align: center; }
.right .bottom table tr td span { width: 100%; height: 12px; background: #161a3c; display: block; border-radius: 6px;
overflow: hidden; }
.right .bottom table tr td span i { width: 0%; background: #62bb82; display: block; height: 100%; border-radius: 0 6px 6px 0; }
.right .bottom table tr:nth-child(1) td,.right .bottom table tr:nth-child(2) td,.right .bottom table tr:nth-child(3) td { color: #f19d3a; }
.right .bottom table tr:nth-child(1) i,.right .bottom table tr:nth-child(2) i,.right .bottom table tr:nth-child(3) i { background: #f19d3a; }


</style>