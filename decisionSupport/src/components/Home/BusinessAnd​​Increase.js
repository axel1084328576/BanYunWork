
import React from 'react'
import echarts from 'echarts'
import { Col } from 'antd'

import Style from './BusinessAndIncrease.css'

// 主屏右上业务量及增速

class BusinessAndIncrease extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            select: {
                size: 1,
                options: ['2019', '2018', '2017', '2016', '2015', '2014', '2013']
            },
            value: props.value
        }
    }

    componentDidMount() {
        this.initOption(this.state.select.options[0]);
    }

    selectlength(val) {
        if (this.state.select.options.length > 3) {
            this.setState(
                {
                    select: {
                        ...this.state.select,
                        size: val
                    }
                }
            )
        };
    }

    selectChange(e) {
        this.setState(
            {
                select: {
                    ...this.state.select,
                    size: 1
                }
            }
        )
        this.initOption(e.target.value);
    }

    // option初始化
    initOption(current) {


        if (current == null) {
            current = this.state.select.options[0];
        }

        let data = null;
        for (let i in this.state.value) {
            if (this.state.value[i].year === current) {
                data = this.state.value[i];
                break;
            }
        }

        let riseRate = [];
        let ywlArray = [];
        let xData = [];
        if (data !== undefined && data != null) {
            riseRate = data.rate;
            ywlArray = data.ywl;
            xData = data.ent;
        }

        const legendData = [
            { name: '邮政业务量(亿件)' },
            {
                name: '同比增长率',
                // icon: 'pin'
            }];

        const myChart = echarts.init(document.getElementById('BAIoption'));
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
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
                    min: -20,
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
                    // max: 20,
                    min: -20,
                    axisLabel: {
                        color: '#44abf7',
                        formatter: function (value, index) {
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


    render() {

        const options = ['2019', '2018', '2017', '2016', '2015', '2014', '2013'].map((val) =>
            <option value={val}>{val}</option>)

        return (
            <div style={{ height: '100%' }}>
                <div className={Style['component-title-background']}>
                    <Col span={12} className={Style['component-title']}>业务量及增速 </Col>
                    <Col span={12}>
                        <select className={Style['float-right-el']}
                            onMouseDown={this.selectlength.bind(this, 4)}
                            onChange={this.selectChange.bind(this)}
                            onMouseLeave={this.selectlength.bind(this, 1)}
                            size={this.state.select.size}
                        // value = {}
                        >
                            {options}
                        </select>
                    </Col>
                </div>
                <div id='BAIoption' style={{ height: '80%' }} />
            </div>
        );
    }
}

export default BusinessAndIncrease;