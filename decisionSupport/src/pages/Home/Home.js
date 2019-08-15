/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import echarts from 'echarts'
import 'echarts-gl'
import { Row, Col, Statistic, Button } from 'antd'
import geoJson from 'echarts/map/json/china.json'
import { geoCoordMap, provienceData } from './geo.js'

import { numberToShow } from '@/utils/numberUtils'
import FTips from '@/components/home/FTipsComponent.js'

import homeStyle from './home.css'
// 主屏

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'admin',
      userType: '1',
      userArea: 'china',
      mapData: provienceData,
      FTipsvalue: {
        current: 12312441,
        yesterday: 23325433,
        month: 3452346623,
        year: 2357495687
      },
      // 业务趋势数据  []中[0]表示量（亿），[1]表示增幅，正为增长，负为下降
      // type 0 业务统计 1 业务总览
      BusinessTrendValue: {
        type: 0,
        value: {
          ywl: 40346684,
          sm: 14178414,
          ds: 1231313
        },
        day: {
          dayAvg: [1351641868, 32],
          workAvg: [1378641868, 31],
          weekendAvg: [1351641868, 28],
          holidayAvg: [1351641868, 25]
        },
        month: {
          dayAvg: [1351641868, -10],
          workAvg: [2351641868, 21],
          weekendAvg: [3351641868, 25],
          holidayAvg: [4351641868, 27]
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.initalECharts();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this))

  }

  onWindowResize() {
    console.log('changeSize');
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

  // 地图上方四类数据
  // FTips(props) {
  //   // const nameStyle=homeStyle['ftips-name'];
  //   return (
  //     <div>
  //       <Col span={6}>
  //         <div className={homeStyle['ftips-name']}>今日业务量</div>
  //         <div className={homeStyle['ftips-value']}>{numberToShow(props.value.current)}</div>
  //         <Statistic title="Active Users" value={props.value.current} />
  //       </Col>
  //       <Col span={6}>
  //         <div className={homeStyle['ftips-name']}>昨日业务量</div>
  //         <div className={homeStyle['ftips-value']}>{numberToShow(props.value.yesterday)}</div>
  //       </Col>
  //       <Col span={6}>
  //         <div className={homeStyle['ftips-name']}>本月累计业务量</div>
  //         <div className={homeStyle['ftips-value']}>{numberToShow(props.value.month)}</div>
  //       </Col>
  //       <Col span={6}>
  //         <div className={homeStyle['ftips-name']}>本年累计业务量</div>
  //         <div className={homeStyle['ftips-value']}>{numberToShow(props.value.year)}</div>
  //       </Col>
  //     </div>)
  // }

  // 业务趋势
  BusinessTrend(props) {

    return (
      <div>
        <div className={homeStyle['component-title-background']}>
          <Col span={12} className={homeStyle['component-title']}>业务趋势 </Col>
          <Col span={12}>
            <Button ghost className={homeStyle['float-right-el']}>业务统计</Button>
            <Button ghost className={homeStyle['float-right-el']}>业务总览</Button>
          </Col>

        </div>
      </div>
    )
  }

  // formatValue(val){
  //   return(

  //   )

  // }

  render() {
    return (
      <div>
        <Row>
          <Col span={6} style={{ height: '90vh' }}>
            <Col span={24}>
              <this.BusinessTrend value={this.state.BusinessTrendValue} />
            </Col>
          </Col>
          <Col span={12} style={{ height: '90vh' }}>
            <Col span={24} style={{ height: '10%' }}>
              <FTips value={this.state.FTipsvalue} />
            </Col>
            <Col span={24} style={{ height: '70%' }}>
              <div id="mainMap" style={{ height: '100%' }} />
            </Col>
            <Col span={24} style={{ height: '20%' }}>
              <div id="mainMap" style={{ height: '100%' }} />
            </Col>
          </Col>
          <Col span={6} style={{ height: '90vh' }}>span2</Col>
        </Row>
      </div>
    );
  }
}
