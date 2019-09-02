import React from 'react';
import { Col } from 'antd';

import Style from './BeltAndRoad.less';
import HomeStyle from './HomeGeneral.less';

export default class BeltAndRoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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

    return (
      <div className={HomeStyle['background-image-bigger']}>
        <div className={HomeStyle['component-title']}>
          <span className={HomeStyle['component-title-name']}>一带一路</span>
        </div>
        <div className={HomeStyle['component-content']}>
          <span className={Style['content-cell-area']}>
            <div className={Style['content-cell-blue']}>
              <span className={Style['value-show']}>
                <div className={Style['name']}>跨境电商收入</div>
                <div className={Style['value']} style={classArray[0].colorStyle}>
                  3500<span className={Style['unit']}>亿</span>
                </div>
                <div className={Style['rate']}>
                  <p1>同比</p1>
                  <p2 className={Style['rate-value']} style={classArray[0].colorStyle}>
                    {1 > 0 ? classArray[0].img : classArray[0].imgRotate}
                    1%
                  </p2>
                </div>
              </span>
            </div>
            <div className={Style['content-cell-blue']}>
              <span className={Style['value-show']}>
                <div className={Style['name']}>国际快递业务</div>
                <div className={Style['value']} style={classArray[1].colorStyle}>
                  3500<span className={Style['unit']}>亿</span>
                </div>
                <div className={Style['rate']}>
                  <p1>同比</p1>
                  <p2 className={Style['rate-value']} style={classArray[1].colorStyle}>
                    {1 > 0 ? classArray[1].img : classArray[1].imgRotate}
                    22%
                  </p2>
                </div>
              </span>
            </div>
          </span>
          <span className={Style['content-list-area']}></span>
        </div>
      </div>
    );
  }
}
