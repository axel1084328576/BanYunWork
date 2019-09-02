/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'dva';
import 'echarts-gl';
import { Row, Col, Spin, Icon } from 'antd';
import { provinceData } from './geo';
import FTips from '@/components/Home/FTipsComponent';
import MainMap from '@/components/Home/MainMap';
import BusinessTrend from '@/components/Home/BusinessTrend';
import BusinessValueTrend from '@/components/Home/BusinessValueTrend';
import BusinessAndIncrease from '@/components/Home/BusinessAnd​​Increase';
import ProcessEfficacy from '@/components/Home/ProcessEfficacy';
import QualitySupervision from '@/components/Home/QualitySupervision';
import InfrastructureBuild from '@/components/Home/InfrastructureBuild';
import BusinessIncome from '@/components/Home/BusinessIncome';
import ThreeKeyPoint from '@/components/Home/ThreeKeyPoint';
import BeltAndRoad from '@/components/Home/BeltAndRoad';

import homeStyle from './home.css';

// 主屏

@connect(({ home }) => {
  const {
    BusinessTrendValue,
    FTipsvalue,
    BusinessValueTrendValue,
    BusinessAndIncreaseValue,
    ProcessEfficacyValue,
    BusinessIncomeValue,
    InfrastructureBuildValue,
    ThreeKeyPointValue,
    BeltAndRoadValue,
  } = home;
  return {
    BusinessTrendValue,
    FTipsvalue,
    BusinessValueTrendValue,
    BusinessAndIncreaseValue,
    ProcessEfficacyValue,
    BusinessIncomeValue,
    InfrastructureBuildValue,
    ThreeKeyPointValue,
    BeltAndRoadValue,
  };
})
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'admin',
      userType: '1',
      userArea: 'china',
      mapData: provinceData,
      refresh: 0,
      // FTipsvalue: {
      //   current: 12312441,
      //   yesterday: 23325433,
      //   month: 3452346623,
      //   year: 2357495687
      // },
      // 业务趋势数据  []中[0]表示量（亿），[1]表示增幅，正为增长，负为下降
      // BusinessTrendValue: {
      //   value: {
      //     ywl: 40346684,
      //     sm: 14178414,
      //     ds: 1231313
      //   },
      //   day: {
      //     dayAvg: [1351641868, 32],
      //     workAvg: [1378641868, 31],
      //     weekendAvg: [1351641868, 28],
      //     holidayAvg: [1351641868, 25]
      //   },
      //   month: {
      //     dayAvg: [1351641868, -10],
      //     workAvg: [2351641868, 21],
      //     weekendAvg: [3351641868, 25],
      //     holidayAvg: [4351641868, 27]
      //   }
      // },
      // 业务量趋势
      // BusinessValueTrendValue: {
      //   ywl: [{
      //     year: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      //     ywl: [29.45, 45.54, 89.14, 113.24, 143.45, 257.54, 301.12, 506.59, 135.29],
      //     rate: [56, 45, 68, 25, 46, 38, 48]
      //   }, {
      //     year: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      //     ywl: [19.45, 35.54, 80.14, 93.24, 123.45, 237.54, 271.12, 306.59, 98.29],
      //     rate: [46, 48, 78, 35, 56, 48, 42]
      //   }]
      // },
      // 业务量及增速
      // BusinessAndIncreaseValue: [
      //   {
      //     year: '2019',
      //     ent: ['YTO', 'ZTO', 'SF', 'YUNDA', 'EMS', 'ZGYZ', 'BSHT'],
      //     ywl: [34, 52, 64, 37, 17, 48, 44],
      //     rate: [2.5, 5.3, 3.4, 3.3, 6.7, 0.9, 8.1]
      //   },
      //   {
      //     year: '2018',
      //     ent: ['YTO', 'ZTO', 'SF', 'YUNDA', 'EMS', 'ZGYZ', 'BSHT'],
      //     ywl: [39, 22, 54, 47, 27, 41, 40],
      //     rate: [3.5, -3.3, 7.4, 4.3, 8.7, -3.9, 5.1]
      //   }
      // ],
      // 行政处理效能
      // ProcessEfficacy: [
      //   { value: 10, name: '市场秩序' },
      //   { value: 5, name: '行业秩序管理' },
      //   { value: 15, name: '集邮市场监管' },
      //   { value: 25, name: 'name2' },
      //   { value: 20, name: 'name3' },
      //   { value: 35, name: 'name4' },
      //   { value: 30, name: 'name5' },
      //   { value: 40, name: 'name6' }
      // ],

      // 业务收入

      // BusinessIncomeValue: {
      //   ywl: [{
      //     year: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      //     ywl: [29.45, 45.54, 89.14, 113.24, 143.45, 257.54, 301.12, 506.59, 135.29],
      //     rate: [56, 45, 68, 25, 46, 38, 28]
      //   }, {
      //     year: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      //     ywl: [19.45, 35.54, 80.14, 93.24, 123.45, 237.54, 271.12, 306.59, 98.29],
      //     rate: [46, 48, 78, 35, 56, 48, 22]
      //   }
      //   ]
      // }
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getBusinessTrendValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });
    dispatch({
      type: 'home/getBusinessValueTrendValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });
    dispatch({
      type: 'home/getFTipsValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });
    dispatch({
      type: 'home/getBusinessAndIncreaseValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });
    dispatch({
      type: 'home/getProcessEfficacyValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });
    dispatch({
      type: 'home/getBusinessIncomeValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });

    dispatch({
      type: 'home/getInfrastructureBuildValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });

    dispatch({
      type: 'home/getThreeKeyPointValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });

    dispatch({
      type: 'home/getBeltAndRoadValue',
      payload: {
        // menuCode: this.props.pagePath,
        // token: sessionStorage.getItem('sys-token'),
      },
    });
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.onWindowResize.bind(this))
  }

  onWindowResize() {
    // 用于刷新组件
    this.setState({ redresh: this.state.refresh + 1 });
  }

  render() {
    const {
      BusinessTrendValue,
      BusinessValueTrendValue,
      InfrastructureBuildValue,
      BusinessIncomeValue,
      FTipsvalue,
      BusinessAndIncreaseValue,
      ProcessEfficacyValue,
      BeltAndRoadValue,
      ThreeKeyPointValue,
    } = this.props;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <div>
        <Row>
          <Col span={6} style={{ height: '90vh' }}>
            <Col span={24} style={{ height: '24%' }} className={homeStyle['block-layout-left']}>
              {BusinessTrendValue != null ? (
                <BusinessTrend value={BusinessTrendValue} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
            <Col span={24} style={{ height: '24%' }} className={homeStyle['block-layout-left']}>
              {BusinessValueTrendValue != null ? (
                <BusinessValueTrend value={BusinessValueTrendValue} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
            <Col span={24} style={{ height: '24%' }} className={homeStyle['block-layout-left']}>
              {InfrastructureBuildValue != null ? (
                <InfrastructureBuild value={InfrastructureBuildValue} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
            <Col span={24} style={{ height: '28%' }} className={homeStyle['block-layout-left']}>
              {BusinessIncomeValue != null ? (
                <BusinessIncome value={BusinessIncomeValue} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
          </Col>
          <Col span={12} style={{ height: '90vh' }}>
            <Col span={24} style={{ height: '10%' }} className={homeStyle['block-layout']}>
              {FTipsvalue != null ? (
                <FTips value={FTipsvalue} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
            <Col span={24} style={{ height: '62%' }} className={homeStyle['block-layout']}>
              <MainMap value={this.state.mapData} />
            </Col>
            <Col span={24} style={{ height: '28%' }} className={homeStyle['block-layout']}>
              <ThreeKeyPoint value={ThreeKeyPointValue} />
            </Col>
          </Col>
          <Col span={6} style={{ height: '90vh' }}>
            <Col span={24} style={{ height: '24%' }} className={homeStyle['block-layout-right']}>
              {BusinessAndIncreaseValue != null ? (
                <BusinessAndIncrease value={BusinessAndIncreaseValue} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
            <Col span={24} style={{ height: '24%' }} className={homeStyle['block-layout-right']}>
              {BusinessValueTrendValue != null ? (
                <QualitySupervision value={{}} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
            <Col span={24} style={{ height: '24%' }} className={homeStyle['block-layout-right']}>
              {ProcessEfficacyValue != null ? (
                <ProcessEfficacy value={ProcessEfficacyValue} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
            <Col span={24} style={{ height: '28%' }} className={homeStyle['block-layout-right']}>
              {BeltAndRoadValue != null ? (
                <BeltAndRoad value={BeltAndRoadValue} />
              ) : (
                <div className={homeStyle.loading}>
                  <Spin indicator={antIcon} />
                </div>
              )}
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}
