/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
import React from 'react';
import echarts from 'echarts';
import { Col, Button } from 'antd';

import Style from './BusinessValueTrend.less';
import HomeStyle from './HomeGeneral.less';

// 主页左中业务量趋势

class BusinessValueTrend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ywl: props.value,
      type: 0,
    };
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

    // const ywlArray = data.ywl;
    // console.log(data.ywl.map((item) => {
    //     return item * 5;
    // }))

    const ywlArray = data.ywl.map(item => {
      return {
        value: Math.floor(item * (Math.random() / 10 + 1) * 100) / 100,
      };
    });

    if (ywlArray.length > 2) {
      ywlArray[ywlArray.length - 2] = {
        value: ywlArray[ywlArray.length - 2].value,
        itemStyle: {
          color: 'rgba(68,212,102,1)',
        },
      };
    }

    const xData = data.year;
    const legendData = [
      { name: index === 0 ? '邮政业务量(亿件)' : '快递业务量(亿件)' },
      {
        name: '同比增长率',
        // icon: 'pin'
      },
    ];
    //解决重置窗口大小问题
    echarts.init(document.getElementById('option')).dispose();
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
          color: '#44abf7',
        },
      },
      grid: {
        bottom: '15%',
        top: '10%',
        left: '10%',
        right: '10%',
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            color: '#44abf7',
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            alignWithLabel: true,
          },
          data: xData,
        },
        {
          type: 'category',
          boundaryGap: true,
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: '#44abf7',
          },
          axisTick: {
            alignWithLabel: true,
          },
          // data: xData
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '业务量',
          min: 0,
          axisLabel: {
            color: '#44abf7',
          },
          splitLine: {
            show: false,
          },
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: '增长率',
          max: 100,
          min: 0,
          axisLabel: {
            color: '#44abf7',
            formatter: function(value, index) {
              return value + '%';
            },
          },
          splitLine: {
            show: false,
          },
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: index === 0 ? '邮政业务量(亿件)' : '快递业务量(亿件)',
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          barWidth: '30%',
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.6, 0.3, 1, [
              {
                offset: 0,
                color: 'rgba(68,185,222,1)',
              },
              {
                offset: 1,
                color: 'rgba(68,185,222,1)',
              },
            ]),
          },
          label: {
            show: true,
            position: 'top',
            color: '#44abf7',
          },
          data: ywlArray,
        },
        {
          name: '同比增长率',
          // symbol: 'none',
          color: ['#FBA233'],
          xAxisIndex: 1,
          yAxisIndex: 1,
          type: 'line',
          label: {
            show: true,
            color: '#FBA233',
            formatter: '{c}%',
          },
          data: riseRate,
        },
      ],
    });
  }

  change(val) {
    this.setState({ type: val });
    this.initOption(val);
  }

  componentWillUpdate() {
    this.initOption(this.state.type);
  }

  render() {
    const typeClass = [HomeStyle['float-right-el'], HomeStyle['float-right-el']];
    typeClass[this.state.type] = HomeStyle['float-right-el-selected'];

    return (
      <div className={HomeStyle['background-image-normal']}>
        <div className={HomeStyle['component-title']}>
          <span className={HomeStyle['component-title-name']}>业务量趋势</span>
          <span className={typeClass[1]}>
            {' '}
            <a onClick={this.change.bind(this, 1)}>邮政业务</a>
          </span>
          <span className={typeClass[0]}>
            {' '}
            <a onClick={this.change.bind(this, 0)}>快递业务</a>
          </span>
        </div>
        <div id="option" style={{ height: '85%' }} />
      </div>
    );
  }
}

export default BusinessValueTrend;
