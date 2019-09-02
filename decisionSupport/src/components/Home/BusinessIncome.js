import React from 'react';
import echarts from 'echarts';
import { Col, Button } from 'antd';

import Style from './BusinessIncome.less';
import HomeStyle from './HomeGeneral.less';
// 大屏左下 业务收入

class BusinessIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      value: props.value,
    };
  }

  change(val) {
    this.setState({ type: val });
  }

  componentDidMount() {
    this.initOption();
  }

  componentDidUpdate() {
    this.initOption();
  }

  initOption() {
    let title = '';
    this.state.type == 0 ? (title = '快递业务') : (title = '寄递业务');
    const xData = this.state.value[this.state.type].year;
    const ywl = this.state.value[this.state.type].ywl.map(val => {
      return Math.floor(val * (Math.random() / 10 + 1) * 100) / 100;
    });
    const rate = [null];
    rate.push.apply(rate, this.state.value[this.state.type].rate);
    rate.push(null);
    const legendData = [
      { name: `${title}收入(亿元)` },
      {
        name: '同比增长率',
        // icon: 'pin'
      },
    ];

    //解决重置窗口大小问题
    echarts.init(document.getElementById('BIoption')).dispose();
    const myCharts = echarts.init(document.getElementById('BIoption'));
    myCharts.setOption({
      grid: {
        top: '10%',
        bottom: '10%',
        left: '10%',
        right: '10%',
      },
      legend: {
        data: legendData,
        right: '10%',
        textStyle: {
          color: '#44abf7',
        },
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: '#44abf7',
          },
          splitLine: {
            show: true,
            lineStyle: {
              opacity: 0.4,
            },
          },
          // axisTick: {
          //     alignWithLabel: true,
          // },
          // offset: 10,
          data: xData,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '业务量',
          offset: 8,
          // min: -20,
          axisLabel: {
            color: '#44abf7',
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        {
          type: 'value',
          scale: true,
          name: '增长率',
          // max: 20,
          offset: 8,
          min: 0,
          axisLine: {
            onZeroAxisIndex: 0,
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#44abf7',
            formatter: function(value, index) {
              return value + '%';
            },
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: `${title}收入(亿元)`,
          type: 'line',
          lineStyle: {
            color: 'rgba(24,144,255,0.6)',
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(24,144,255,0.6)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(24,144,255,0.2)',
                  },
                ],
                false
              ),
            },
          },
          label: {
            show: true,
            color: 'rgb(24,144,255)',
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: ywl,
        },
        {
          name: '同比增长率',
          type: 'line',
          xAxisIndex: 0,
          yAxisIndex: 1,
          lineStyle: {
            color: 'rgba(16,196,60,0.7)',
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(16,196,60,0.7)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(65,210,100,0.3)',
                  },
                ],
                false
              ),
            },
          },
          label: {
            show: true,
            color: 'rgb(16,196,60)',
            formatter: '{c}%',
          },
          data: rate,
        },
      ],
    });
  }

  render() {
    const typeClass = [HomeStyle['float-right-el'], HomeStyle['float-right-el']];
    typeClass[this.state.type] = HomeStyle['float-right-el-selected'];

    return (
      <div className={HomeStyle['background-image-bigger']}>
        <div className={HomeStyle['component-title']}>
          <span className={HomeStyle['component-title-name']}>业务收入</span>
          <span className={typeClass[1]}>
            {' '}
            <a onClick={this.change.bind(this, 1)}>寄递业务</a>
          </span>
          <span className={typeClass[0]}>
            {' '}
            <a onClick={this.change.bind(this, 0)}>快递业务</a>
          </span>
        </div>
        <div id="BIoption" style={{ height: '85%' }} />
      </div>
    );
  }
}

export default BusinessIncome;
