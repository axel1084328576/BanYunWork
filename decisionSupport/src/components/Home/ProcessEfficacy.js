
import React from 'react';
import echarts from 'echarts';
import { Row, Col } from 'antd'
import Style from './ProcessEfficacy.css';

// 行政处理效能

class ProcessEfficacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.initOption();
    }

    initOption() {

        const showData = [
            { value: 10, name: 'rose1' },
            { value: 5, name: 'rose2' },
            { value: 15, name: 'rose3' },
            { value: 25, name: 'rose4' },
            { value: 20, name: 'rose5' },
            { value: 35, name: 'rose6' },
            { value: 30, name: 'rose7' },
            { value: 40, name: 'rose8' }
        ];
        const legendData = ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']

        const myCharts = echarts.init(document.getElementById('PEoption'));
        myCharts.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: legendData
            },
            calculable: true,
            series: [
                {
                    name: '行政处理效能',
                    type: 'pie',
                    radius: [20, 80],
                    center: ['50%', '60%'],
                    roseType: 'area',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: showData
                }
            ]
        })
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className={Style['component-title-background']}>
                    <Col span={12} className={Style['component-title']}>行政处理效能</Col>
                </div>
                <div id='PEoption' style={{ height: '80%' }} />
            </div>
        );
    }
}

export default ProcessEfficacy;