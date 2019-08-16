
import React from 'react'
import echarts from 'echarts'
import geoJson from 'echarts/map/json/china.json'

// 大屏中间地图组件
class MainMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: props.value
    }
  }

  componentDidMount() {
    this.initalECharts();
  }

  // 主地图加载更新
  initalECharts() {
    echarts.registerMap('china', geoJson);
    // 获取地图数据
    const { mapData } = this.state;
    // 拼装echarts所需数据结构
    const regions = mapData.map(function res(feature) {
      return {
        name: feature.name,
        value: Math.random(),
        // height: 1,
        itemStyle: {
          opacity: 0.8,
          borderWidth: 1
        }
      };
    });

    const myChart = echarts.init(document.getElementById('mainMap'));
    myChart.setOption({
      tooltip: {
        show: false,       // 不显示提示标签
        formatter: '{b}',      // 提示标签格式
        backgroundColor: "#ff7f50",// 提示标签背景颜色
        textStyle: { color: "#fff" } // 提示标签字体颜色
      },
      visualMap: {
        show: false,
        min: 0,
        max: 1,
        inRange: {
          color: ['#313695', '#4575b4']
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '2%',
        bottom: '10%',
        containLabel: true
      },
      series: [
        {
          name: 'china',
          type: 'map3D',
          map: 'china',
          viewControl: {
            // 缩放灵敏度 0为不缩放
            zoomSensitivity: 0,
            // 平移灵敏度 0为不平移
            panSensitivity: 0,
            beta: 0,
            alpha: 60,
            minBeta: 0,
            maxBeta: 0,
            minAlpha: 50,
            maxAlpha: 70
          },
          regionHeight: 2,
          data: regions
        }
      ],
    })
  }

  render() {
    return (
      <div id="mainMap" style={{ height: '100%' }} />
    );
  }
}

export default MainMap;