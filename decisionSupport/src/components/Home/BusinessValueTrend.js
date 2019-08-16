/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
import React from 'react';
import echarts from 'echarts';
import { Col, Button } from 'antd';

import Style from './BusinessValueTrend.css'


// 主页左中业务量趋势

class BusinessValueTrend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props.value
        }
    }



    componentDidMount() {
        this.initOption();
    }

    initOption(val) {

        const index = val > -1 ? val : 0;

        const data = this.state.ywl[index];
        const riseRate = [null];
        riseRate.push.apply(riseRate, data.rate);
        riseRate.push(null);

        const ywlArray = data.ywl;
        const xData = data.year;
        const legendData = [
            { name: '邮政业务量(亿件)' },
            {
                name: '同比增长率',
                // icon: 'pin'
            }];


        const myChart = echarts.init(document.getElementById('option'));
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                // axisPointer: {
                //     type: 'cross',
                //     label: {
                //         backgroundColor: '#283b56'
                //     }
                // }
            },
            legend: {
                data: legendData,
                right: '10%',
                textStyle: {
                    color: '#44abf7'
                }
            },
            grid: {
                bottom: '10%',
                top: '10%',
                left: '10%',
                right: '10%'
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLabel: {
                        color: '#44abf7'
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        alignWithLabel: true,
                    },
                    data: xData
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#44abf7'
                    },
                    axisTick: {
                        alignWithLabel: true,
                    },
                    // data: xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '业务量',
                    min: 0,
                    axisLabel: {
                        color: '#44abf7'
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: [0.2, 0.2]
                },
                {
                    type: 'value',
                    scale: true,
                    name: '增长率',
                    max: 100,
                    min: 0,
                    axisLabel: {
                        color: '#44abf7',
                        formatter: function (value, index) {
                            // 格式化成月/日，只在第一个刻度显示年份
                            return value + '%';
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: [0.2, 0.2]
                }
            ],
            series: [
                {
                    name: '邮政业务量(亿件)',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    barWidth: '30%',
                    itemStyle: {
                        color: new echarts.graphic.RadialGradient(0.6, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(129, 227, 238,0.8)'
                        }, {
                            offset: 1,
                            color: 'rgb(25, 183, 207,0.6)'
                        }])
                    },
                    label: {
                        show: true,
                        position: 'top',
                        color: '#44abf7'
                    },
                    data: ywlArray
                },
                {
                    name: '同比增长率',
                    // symbol: 'none',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    type: 'line',
                    data: riseRate
                }
            ]
        })
    }

    change(val) {
        this.setState({ type: val });
        this.initOption(val);
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className={Style['component-title-background']}>
                    <Col span={12} className={Style['component-title']}>业务量趋势</Col>
                    <Col span={12}>
                        <Button ghost className={Style['float-right-el']} onClick={this.change.bind(this, 1)} > 邮政业务 </Button>
                        <Button ghost className={Style['float-right-el']} onClick={this.change.bind(this, 0)} > 快递业务 </Button>
                    </Col>
                </div>
                <div id='option' style={{ height: '80%' }} />
            </div>

        )
    }
}

export default BusinessValueTrend;