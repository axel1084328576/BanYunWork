import React from 'react';
import echarts from 'echarts';
import { Row, Col } from 'antd';
import Style from './ProcessEfficacy.css';
import HomeStyle from './HomeGeneral.less';
// 行政处理效能

class ProcessEfficacy extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      data: value,
    };
  }

  componentDidMount() {
    this.initOption();
  }

  initOption() {
    const showData = this.state.data;
    let legendData = [];

    showData.forEach((item, index) => {
      legendData.push(item.name);
    });

    const myCharts = echarts.init(document.getElementById('PEoption'));
    myCharts.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      // legend: {
      //     data: legendData
      // },
      title: {
        text: '2212',
        textStyle: {
          fontSize: 20,
          color: 'rgba(61, 100, 228, 0.88)',
        },
        subtext: '案件总量',
        subtextStyle: {
          fontSize: 14,
          color: 'rgba(61, 80, 133, 0.89)',
        },
        textAlign: 'center',
        textVerticalAlign: 'center',
        top: '45%',
        left: '50%',
      },
      grid: {
        bottom: '15%',
        top: '10%',
        left: '10%',
        right: '10%',
      },
      // calculable: true,
      series: [
        {
          name: '行政处理效能',
          type: 'pie',
          radius: [40, 60],
          center: ['50%', '50%'],
          roseType: 'area',
          label: {
            show: true,
            formatter: '{d}%\n{nameStyle|{b}}',
            // (params) => {

            //     return '{c}%\n{nameStyle|{a}}'
            // }
            rich: {
              nameStyle: {
                color: 'rgba(61, 80, 133, 0.89)',
                fontSize: 10,
              },
            },
          },
          itemStyle: {
            borderWidth: 5,
            borderColor: 'rgba(61, 80, 133, 0)',
          },
          lableLine: {
            normal: {
              show: false,
            },
            emphasis: {
              show: true,
            },
          },
          data: showData,
        },
      ],
    });
  }

  render() {
    return (
      <div className={HomeStyle['background-image-normal']}>
        <div className={HomeStyle['component-title']}>
          <span className={HomeStyle['component-title-name']}>行政处理效能</span>
        </div>
        <div id="PEoption" style={{ height: '85%' }} />
      </div>
    );
  }
}

export default ProcessEfficacy;
