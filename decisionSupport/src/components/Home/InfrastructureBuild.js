import React from 'react';
import { Col, Button } from 'antd';

import Style from './InfrastructureBuild.less';
import HomeStyle from './HomeGeneral.less';
// 基础设施建设
class InfrastructureBuild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      value: {
        '0': [
          {
            value: 2000,
            unit: '个',
            rate: 5,
            name: '分拣中心',
          },
          {
            value: 1000,
            unit: '个',
            rate: 5,
            name: '转运中心',
          },
          {
            value: 1000,
            unit: '个',
            rate: 5,
            name: '二级转运中心',
          },
          {
            value: 220,
            unit: '万',
            rate: 5,
            name: '智能快递柜',
          },
          {
            value: 3000,
            unit: '万',
            rate: 5,
            name: '智能快递箱',
          },
          {
            value: 10.5,
            unit: '万',
            rate: 5,
            name: '网点数量',
          },
          {
            value: 1000,
            unit: '家',
            rate: 5,
            name: '智能化分拣中心',
          },
          {
            value: 1000,
            unit: '架',
            rate: 5,
            name: '无人机',
          },
          {
            value: 1000,
            unit: '架',
            rate: 5,
            name: '专用货机',
          },
        ],
        '1': [
          {
            value: 1000,
            unit: '万',
            rate: 5,
            name: '村邮站',
          },
          {
            value: 1000,
            unit: '万',
            rate: 5,
            name: '营业网点',
          },
          {
            value: 990,
            unit: '个',
            rate: 5,
            name: '报刊亭',
          },
          {
            value: 220,
            unit: '万',
            rate: 5,
            name: '信筒数量',
          },
          {
            value: 3000,
            unit: '万',
            rate: 5,
            name: '信报箱数量',
          },
          {
            value: 10.5,
            unit: '万',
            rate: 5,
            name: '邮政从业人员',
          },
          {
            value: 1000,
            unit: '家',
            rate: 5,
            name: '邮路总条数',
          },
          {
            value: 1000,
            unit: '架',
            rate: 5,
            name: '邮路总长度',
          },
          {
            value: 1000,
            unit: '架',
            rate: 5,
            name: '邮政车辆',
          },
        ],
      },
    };
  }

  change(val) {
    this.setState({ type: val });
  }

  render() {
    const typeClass = [HomeStyle['float-right-el'], HomeStyle['float-right-el']];
    typeClass[this.state.type] = HomeStyle['float-right-el-selected'];

    const dataArray = this.state.value[this.state.type];
    const cellClass = [Style['list-style-cell-even'], Style['list-style-cell-odd']];
    const row1 = dataArray.slice(0, 3).map((val, index) => {
      return (
        <span className={cellClass[index % 2]}>
          <div className={Style['list-style-cell-value']}>
            {val.value}
            <span className={Style['list-style-cell-unit']}>{val.unit}</span>
            <span className={Style['list-style-cell-rate']}>{val.rate}%</span>
          </div>
          <div className={Style['list-style-cell-name']}>{val.name}</div>
        </span>
      );
    });
    const row2 = dataArray.slice(3, 6).map((val, index) => {
      return (
        <span className={cellClass[(index + 1) % 2]}>
          <div className={Style['list-style-cell-value']}>
            {val.value}
            <span className={Style['list-style-cell-unit']}>{val.unit}</span>
            <span className={Style['list-style-cell-rate']}>{val.rate}%</span>
          </div>
          <div className={Style['list-style-cell-name']}>{val.name}</div>
        </span>
      );
    });
    const row3 = dataArray.slice(6, 9).map((val, index) => {
      return (
        <span className={cellClass[index % 2]}>
          <div className={Style['list-style-cell-value']}>
            {val.value}
            <span className={Style['list-style-cell-unit']}>{val.unit}</span>
            <span className={Style['list-style-cell-rate']}>{val.rate}%</span>
          </div>
          <div className={Style['list-style-cell-name']}>{val.name}</div>
        </span>
      );
    });

    return (
      <div className={HomeStyle['background-image-normal']}>
        <div className={HomeStyle['component-title']}>
          <span className={HomeStyle['component-title-name']}>基础设施建设</span>
          <span className={typeClass[1]}>
            {' '}
            <a onClick={this.change.bind(this, 1)}>快递发展</a>
          </span>
          <span className={typeClass[0]}>
            {' '}
            <a onClick={this.change.bind(this, 0)}>普服发展</a>
          </span>
        </div>
        <div className={Style['list-style']}>{row1}</div>
        <div className={Style['list-style']}>{row2}</div>
        <div className={Style['list-style']}>{row3}</div>
      </div>
    );
  }
}

export default InfrastructureBuild;
