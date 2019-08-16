/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import echarts from 'echarts'
import 'echarts-gl'
import { Row, Col, Statistic, Button } from 'antd'
import geoJson from 'echarts/map/json/china.json'
import { provinceData } from './geo.js'
import { numberToShow } from '@/utils/numberUtils'
import FTips from '@/components/Home/FTipsComponent'
import MainMap from '@/components/Home/MainMap'
import BusinessTrend from '@/components/Home/BusinessTrend'
import BusinessValueTrend from '@/components/Home/BusinessValueTrend'

import homeStyle from './home.css'

// 主屏

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'admin',
      userType: '1',
      userArea: 'china',
      mapData: provinceData,
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
      },
      // 业务量趋势   0 快递业务 1 邮政业务 
      BusinessValueTrendValue: {
        type: 0,
        ywl: [{
          year: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
          ywl: [29.45, 45.54, 89.14, 113.24, 143.45, 257.54, 301.12, 506.59, 135.29],
          rate: [56, 45, 68, 25, 46, 38, 48]
        }, {
          year: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
          ywl: [19.45, 35.54, 80.14, 93.24, 123.45, 237.54, 271.12, 306.59, 98.29],
          rate: [46, 48, 78, 35, 56, 48, 42]
        }]
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this))

  }

  onWindowResize() {
    console.log('changeSize');
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={6} style={{ height: '90vh' }}>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessTrend value={this.state.BusinessTrendValue} />
            </Col>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessValueTrend value={this.state.BusinessValueTrendValue} />
            </Col>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessTrend value={this.state.BusinessTrendValue} />
            </Col>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessValueTrend value={this.state.BusinessValueTrendValue} />
            </Col>
          </Col>
          <Col span={12} style={{ height: '90vh' }}>
            <Col span={24} style={{ height: '10%' }}>
              <FTips value={this.state.FTipsvalue} />
            </Col>
            <Col span={24} style={{ height: '65%' }}>
              <MainMap value={this.state.mapData} />
            </Col>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessValueTrend value={this.state.BusinessValueTrendValue} />
            </Col>
          </Col>
          <Col span={6} style={{ height: '90vh' }}>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessValueTrend value={this.state.BusinessValueTrendValue} />
            </Col>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessValueTrend value={this.state.BusinessValueTrendValue} />
            </Col>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessValueTrend value={this.state.BusinessValueTrendValue} />
            </Col>
            <Col span={24} style={{ height: '25%' }}>
              <BusinessValueTrend value={this.state.BusinessValueTrendValue} />
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}
