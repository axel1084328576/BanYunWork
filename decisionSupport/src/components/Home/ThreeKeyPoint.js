import React from 'react';
import { Col } from 'antd';

import { numberSimplify } from '@/utils/numberUtils';
import Style from './ThreeKeyPoint.less';
import HomeStyle from './HomeGeneral.less';

// 三大攻坚战
export default class ThreeKeyPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 四个一组
  FArea(props) {
    const type = props.value;

    const title = ['重大风险', '精准扶贫', '绿色工程'];
    // 若还未获取到数据 返回空
    if (props.props.value == null) {
      return null;
    }
    let data = props.props.value[title[type]];
    // 组装对不同业务的变量
    const classArray = [
      {
        cell: Style['content-cell-blue'],
        colorStyle: { color: '#33b6de' },
        img: <img src={require('../../assets/Home/arrowBlue.png')} />,
        imgRotate: (
          <img
            style={{ transform: 'rotate(180deg)' }}
            src={require('../../assets/Home/arrowBlue.png')}
          />
        ),
      },
      {
        cell: Style['content-cell-orange'],
        colorStyle: { color: '#FBA233' },
        img: <img src={require('../../assets/Home/arrowOrange.png')} />,
        imgRotate: (
          <img
            style={{ transform: 'rotate(180deg)' }}
            src={require('../../assets/Home/arrowOrange.png')}
          />
        ),
      },
      {
        cell: Style['content-cell-green'],
        colorStyle: { color: '#38e34e' },
        img: <img src={require('../../assets/Home/arrowGreen.png')} />,
        imgRotate: (
          <img
            style={{ transform: 'rotate(180deg)' }}
            src={require('../../assets/Home/arrowGreen.png')}
          />
        ),
      },
    ];
    // 对当前业务数据进行处理
    const row = data.map(item => {
      return (
        <span className={classArray[type].cell}>
          <span className={Style['value-show']}>
            <div className={Style['name']}>{item.name}</div>
            <div className={Style['value']} style={classArray[type].colorStyle}>
              {item.value}
              <span className={Style['unit']}>{item.unit}</span>
            </div>
            <div className={Style['rate']}>
              <p1>同比</p1>
              <p2 className={Style['rate-value']} style={classArray[type].colorStyle}>
                {item.rate > 0 ? classArray[type].img : classArray[type].imgRotate}
                {item.rate}%
              </p2>
            </div>
          </span>
        </span>
      );
    });

    return (
      <span className={Style['area']}>
        <span className={Style['sub-title']}>{title[type]}</span>
        {row}
      </span>
    );
  }

  render() {
    return (
      <div className={HomeStyle['background-image-bottom']}>
        <div className={HomeStyle['component-title']}>
          <span className={HomeStyle['component-title-name']}>三大攻坚战</span>
        </div>
        <div className={HomeStyle['component-content']}>
          <this.FArea value={0} props={this.props} />
          <this.FArea value={1} props={this.props} />
          <this.FArea value={2} props={this.props} />
        </div>
      </div>
    );
  }
}
