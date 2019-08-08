<template>
	<div class="total-monitor">
		<div class="left">
			<date :title="title" :isIndex="false"></date>
		</div>
		<div class="middle">
			<div class="title">快递业务实时统计</div>
			<div id="main"></div>
		</div>
		<div class="bottom">
			<div class="title">快递业务月度监控</div>
			<div id="main1"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
import Date from '@/components/Date'
import TableList from '@/components/TableList'
import VueProgressBar from 'svg-progress-bar'
export default{
	data(){
		return{
			showType:false,
			title: '武清区业务量监控',
			regionUrl: 'http://rap2api.taobao.org/app/mock/223607/regionLeft',
			realTime:{
				xAxis:[],
				yAxis:[],
				data:[],
				name:[]
			},
			monitor:{
				xAxis:[],
				yAxis:[],
				data:[],
				name:[]
			},
		}
	},
    created() {
        this.init()
    },
    components: {
        Date,
        TableList,
        VueProgressBar
    },
    mounted() {
        this.setWork()
        this.setMonitor()
    },
    methods:{
    	init() {
            this.getRealtimeData()
            this.getMonitorData()
        },
        getRealtimeData(){
			this.$axios.get('http://rap2api.taobao.org/app/mock/223607/TotalMonitor/realTime')
			.then((res) => {
                let data = res.data
                if (data.code == 0) {
                	this.realTime.xAxis = data.xAxis
                	this.realTime.yAxis = data.yAxis
                }
                this.setWork()
            }).catch(err => {
                /*console.log(err)*/
            })
        },
        getMonitorData(){
			this.$axios.get('http://rap2api.taobao.org/app/mock/223607/TotalMonitor/Monitor')
			.then((res) => {
                let data = res.data
                if (data.code == 0) {
                	this.monitor.xAxis = data.xAxis
                	this.monitor.yAxis = data.yAxis
                }
                this.setMonitor()
            }).catch(err => {
                /*console.log(err)*/
            })
        },
        setWork (){
        	var bars = this.$echarts.init(document.getElementById('main'));
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
		            data:this.realTime.yAxis,
		            icon:'circle',
		            textStyle:{
		                fontSize:16,
		                color:['#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5',,'#4472C5']
		            },
		            x: 'right',
		            itemGap: 30,
		            padding:[0,0,0,0]
		        },
		        color:['#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5',,'#4472C5'],
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
		                data : this.realTime.xAxis,
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
		                name:'全一',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[
		                            {
		                                offset: 1, color: '#70a07a' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[30, 32, 61, 13, 10, 23, 20]
		            },
		            {
		                name:'民航',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{
		                                offset: 1, color: '#5a7193' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 20, 21]
		            },
		            {
		                name:'EMS',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#4189b8' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 20, 80, 40, 120, 30, 30]
		            },
		            {
		                name:'顺丰',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#759aa0' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'申通',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#e69d87' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'圆通',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#8dc1a9' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'中通',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#ea7e53' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            
		            {
		                name:'韵达',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#eedd78' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'百世',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#73a373' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'宅急送',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#73b9bc' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'安能',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#f49f42' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'天天',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#3ebcbc' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'优速',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#71959c' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            }
		        ]
		    };
		    bars.setOption(option1);
        },
        setMonitor (){
        	var bars = this.$echarts.init(document.getElementById('main1'));
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
		            data:this.monitor.yAxis,
		            icon:'circle',
		            textStyle:{
		                fontSize:16,
		                color:['#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5',,'#4472C5']
		            },
		            x: 'right',
		            itemGap: 30,
		            padding:[0,0,0,0]
		        },
		        color:['#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5','#4472C5',,'#4472C5'],
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
		                data : this.monitor.xAxis,
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
		                name:'全一',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[
		                            {
		                                offset: 1, color: '#70a07a' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[30, 32, 61, 13, 10, 23, 20]
		            },
		            {
		                name:'民航',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{
		                                offset: 1, color: '#5a7193' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 20, 21]
		            },
		            {
		                name:'EMS',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#4189b8' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 20, 80, 40, 120, 30, 30]
		            },
		            {
		                name:'顺丰',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#759aa0' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'申通',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#e69d87' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'圆通',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#8dc1a9' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'中通',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#ea7e53' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            
		            {
		                name:'韵达',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#eedd78' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'百世',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#73a373' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'宅急送',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#73b9bc' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'安能',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#f49f42' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'天天',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#3ebcbc' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            },
		            {
		                name:'优速',
		                type:'line',
		                stack: '总量',
		                itemStyle: {  
		                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
		                       color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[ {
		                                offset: 0, color: '#71959c' // 100% 处的颜色
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
		                symbolSize:5, //折线点的大小
		                areaStyle: {normal: {}},
		                label: {
		                    normal: {
		                        show: false,
		                        position: 'top'
		                    }
		                },
		                data:[20, 50, 80, 134, 120, 230, 210]
		            }
		        ]
		    };
		    bars.setOption(option1);
        },
    }
}
</script>
<style src="../assets/css/common.css"></style>
<style scoped>
.total-monitor { height: 100%; }
.left { width: 100%; height: 315px; }
.left .top { width: 25%; height: 315px; float: left; }
.left .top h1 { color: #abdbf6; font-size: 38px; text-align: center; margin-top: 15%; }
.left .top h2 { color: #2d4ea0; font-size: 18px; text-align: center; margin-top: 10%; }
.left .top h2 span { margin-right: 20px; }
.left .top a { width: 138px; height: 28px; background: url(../assets/images/index/images/back.png); background-size: 100% 100%;
display: block; margin: 50px; }
#main,#main1 { width: 100%; height: 320px; float: left; }
.middle { width: 100%; height: 340px; padding: 10px; }
.bottom { width: 100%; height: 340px; padding: 10px; }
.title { width: 170px; height: 50px; float: left; line-height: 50px; color: #fff; text-align: center; background: url(../assets/images/index/images/title2.png);}
</style>