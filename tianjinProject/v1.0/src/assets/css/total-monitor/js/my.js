$(function(){
	//企业人员排名
	for (var i = 0; i <= $('.left table tr').length; i++) {
		$('.left table tr').eq(i).find('td:nth-child(2) i').animate({width: $('.left table tr').eq(i).find('td:nth-child(3)').text()/1000*100+'%'},1000,'linear');
	}
	//时间
	 function showSystemTime() {
	    var currentDate = new Date(), // 当前时间
	    year = currentDate.getFullYear(), // 获取当前年
	    month = currentDate.getMonth() + 1, //获取当前月
	    days = currentDate.getDate(), // 获取当前日
	    hours = currentDate.getHours(), // 小时
	    minutes = currentDate.getMinutes(), // 分钟
	    seconds = currentDate.getSeconds(), // 秒
	    week = "星期" + "日一二三四五六".charAt(currentDate.getDay()); // 星期几
	    /*if (month < 10) {
	    	month = '0'+ month;
	    }
	    if (days < 10) {
	    	days = '0'+ days;
	    }*/
	    if (hours < 10) {
	        hours = '0'+ hours;
	    }
	    if (minutes < 10) {
	        minutes = '0'+ minutes;
	    }
	    if (seconds < 10) {
	        seconds = '0'+ seconds;
	    }
	    $('.left .top h2 span').eq(0).text(year +'年'+ month +'月'+ days + '日');
	    $('.left .top h2 span').eq(1).text(week);
	    $('.left .top h2 span').eq(2).text(hours +":"+ minutes +":"+ seconds);
	}
	showSystemTime();
	setInterval(function() {
	   showSystemTime();
	},1000);
	//运转中心
    var bars=echarts.init( document.getElementById('bar1'));
    option1 = {
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
	            data: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'],
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
	            data:[200.0, 4.9, 7.0, 23.2, 250.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
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
	            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 2.4, 23.0, 16.5, 12.0, 6.2],
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
    //运转中心
    var bars2=echarts.init( document.getElementById('bar2'));
    option2 = {
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
	            data: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'],
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
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	            itemStyle : {  
                    normal : {  
                        color:'#27e991',  //圈圈的颜色
                        lineStyle:{  
                            color:'#27e991'  //线的颜色
                        }  
                    }  
                }, 
	        },
	        {
	            name:'同比增长率',
	            type:'line',
	            yAxisIndex: 1,
	            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 2.4, 23.0, 16.5, 12.0, 6.2],
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
    bars2.setOption(option2);
    //网点
    var bars3=echarts.init( document.getElementById('bar3'));
    option3 = {
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
	            data: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'],
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
	            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	            itemStyle : {  
                    normal : {  
                        color:'#f19d3a',  //圈圈的颜色
                        lineStyle:{  
                            color:'#f19d3a'  //线的颜色
                        }  
                    }  
                }, 
	        },
	        {
	            name:'同比增长率',
	            type:'line',
	            yAxisIndex: 1,
	            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 2.4, 23.0, 16.5, 12.0, 6.2],
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
    bars3.setOption(option3);
});