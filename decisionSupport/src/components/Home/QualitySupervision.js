import React from 'react';
import echarts from 'echarts';
import { Col, Button } from 'antd';

import Style from './QualitySupervision.css';
import HomeStyle from './HomeGeneral.less';

// 大屏右中 质量监督

class QualitySupervision extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      value: [
        { name: '安检率', value: '56.8' },
        { name: '开箱验视率', value: '37.6' },
        { name: '实名率', value: '98.8' },
      ],
      avgAppeal: {
        value: '98.5',
        rate: '1.2',
      },
      appeal: [
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
        { ent: 'YTO', s: '100', rate: '19.02', sRate: '0.46' },
      ],
    };
  }

  change(val) {
    this.setState({ type: val });
    const myCharts = echarts.init(document.getElementById('QSoption'));
    myCharts.dispose();
  }

  componentDidMount() {
    this.initOption();
  }
  // DOM元素更新后执行
  componentDidUpdate() {
    if (this.state.type == 0) {
      this.initOption();
    } else {
      this.initAppealOption();
    }
  }

  initOption() {
    const data = this.state.value;
    const seriesArr = [];
    const colors = [
      ['#33b6de', 'rgba(9,9,99,0.4)'],
      ['#38e34e', 'rgba(9,9,99,0.4)'],
      ['#FBA233', 'rgba(9,9,99,0.4)'],
    ];
    data.forEach((item, index) => {
      seriesArr.push({
        name: item.name,
        type: 'pie',
        clockWise: false,
        radius: [55, 60],
        itemStyle: {
          normal: {
            color: colors[index][0],
            shadowColor: colors[index][0],
            shadowBlur: 0,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        },
        hoverAnimation: false,
        center: [index * 30 + 20 + '%', '50%'],
        data: [
          {
            value: 100 - item.value,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: colors[index][1],
              },
              emphasis: {
                color: colors[index][1],
              },
            },
          },
          {
            value: item.value,
            label: {
              formatter: '{valueStyle|{c}%}\n{nameStyle|{a}}',
              position: 'center',
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold',
                color: colors[index][0],
              },
              rich: {
                valueStyle: {
                  color: colors[index][0],
                  lineHeight: 40,
                  fontSize: 22,
                },
                nameStyle: {
                  color: 'rgba(61, 80, 133, 0.89)',
                  fontSize: 14,
                },
              },
            },
          },
        ],
      });
    });
    echarts.init(document.getElementById('QSoption')).dispose();
    const myCharts = echarts.init(document.getElementById('QSoption'));
    myCharts.setOption({
      series: seriesArr,
    });
  }

  initAppealOption() {
    const avgAppeal = this.state.avgAppeal;
    const data = this.state.appeal;

    const color = '#38e34e';
    const back = 'rgba(9,9,99,0.4)';
    echarts.init(document.getElementById('QSoption')).dispose();
    const myCharts = echarts.init(document.getElementById('QSoption'));
    myCharts.setOption({
      series: [
        {
          name: '申诉处理满意率',
          type: 'pie',
          clockWise: false,
          radius: [55, 60],
          itemStyle: {
            normal: {
              color: color,
              shadowColor: color,
              shadowBlur: 0,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          hoverAnimation: false,
          center: ['50%', '50%'],
          data: [
            {
              value: 100 - avgAppeal.value,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: back,
                },
                emphasis: {
                  color: back,
                },
              },
            },
            {
              data: avgAppeal,
              value: avgAppeal.value,
              label: {
                formatter: args => {
                  console.log(args);
                  const value = args.data.data.value;
                  let res = '{nameStyle|申诉处理\n满意度}';
                  res += '\n {valueStyle|' + value + '}{unitStyle|%}';
                  res += '\n {rateStyle|' + args.data.data.rate + '%}';
                  return res;
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold',
                  color: color,
                },
                rich: {
                  valueStyle: {
                    color: color,
                    lineHeight: 30,
                    fontSize: 22,
                  },
                  unitStyle: {
                    color: color,
                    lineHeight: 20,
                    fontSize: 14,
                  },
                  nameStyle: {
                    color: '#fff',
                    fontSize: 12,
                  },
                  rateStyle: {
                    color: '#FBA233',
                    fontSize: 12,
                    backgroundColor: {
                      image: '../../assets/Home/arrowOrange.png',
                      // width: '5px',
                      // height: '5px'
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    });
  }

  render() {
    const typeClass = [HomeStyle['float-right-el'], HomeStyle['float-right-el']];
    typeClass[this.state.type] = HomeStyle['float-right-el-selected'];

    return (
      <div className={HomeStyle['background-image-normal']}>
        <div className={HomeStyle['component-title']}>
          <span className={HomeStyle['component-title-name']}>质量监管</span>
          <span className={typeClass[1]}>
            {' '}
            <a onClick={this.change.bind(this, 1)}>申诉处置</a>
          </span>
          <span className={typeClass[0]}>
            {' '}
            <a onClick={this.change.bind(this, 0)}>安全监管</a>
          </span>
        </div>

        {this.state.type == 0 ? (
          <div id="QSoption" style={{ height: '85%' }} />
        ) : (
          <div style={{ height: '85%', width: '100%' }}>
            <div id="QSoption" style={{ height: '100%', width: '30%' }} />
            <div style={{ height: '100%', width: '70%' }} />
          </div>
        )}
      </div>
    );
  }
}

export default QualitySupervision;
