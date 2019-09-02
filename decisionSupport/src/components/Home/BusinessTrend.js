import React from 'react';
// import { Col, Button, Radio } from 'antd'
import { numberSimplify } from '@/utils/numberUtils';
import Style from './BusinessTrend.less';
import HomeStyle from './HomeGeneral.less';
// 主页左上业务趋势

class BusinessTrend extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      type: 0,
      ...value,
      Check: 'day',
    };
  }

  onClick(val) {
    this.setState({ Check: val });
  }

  typeClick(val) {
    this.setState({ type: val });
  }

  Show(props) {
    const value = props.value;
    const { type } = value;
    let tag = value.Check == 'day' ? '日' : '月';
    if (type == 0) {
      const data = value[value.Check];
      return (
        <div className={HomeStyle['component-content-business-trend']}>
          <span className={Style['value-show']} style={{ width: '24%' }}>
            <div className={Style['name']}>{tag}均业务量</div>
            <div className={Style['value']}>{numberSimplify(data.dayAvg[0], 100000000)}</div>
            <div className={Style['unit']}>亿件</div>
            <div className={Style['rate']}>
              <p1>同比</p1>
              <p2 className={Style['rate-value']}>
                {data.dayAvg[1] > 0 ? (
                  <img src={require('../../assets/Home/arrowOrange.png')} />
                ) : (
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={require('../../assets/Home/arrowOrange.png')}
                  />
                )}
                {data.dayAvg[1]}%
              </p2>
            </div>
          </span>
          <span className={Style['line']}></span>
          <span className={Style['value-show']} style={{ width: '24%' }}>
            <div className={Style['name']}>工作日{tag}均业务量</div>
            <div className={Style['value']}>{numberSimplify(data.workAvg[0], 100000000)}</div>
            <div className={Style['unit']}>亿件</div>
            <div className={Style['rate']}>
              <p1>同比</p1>
              <p2 className={Style['rate-value']}>
                {data.workAvg[1] > 0 ? (
                  <img src={require('../../assets/Home/arrowOrange.png')} />
                ) : (
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={require('../../assets/Home/arrowOrange.png')}
                  />
                )}
                {data.workAvg[1]}%
              </p2>
            </div>
          </span>
          <span className={Style['line']}></span>
          <span className={Style['value-show']} style={{ width: '24%' }}>
            <div className={Style['name']}>周末{tag}均业务量</div>
            <div className={Style['value']}>{numberSimplify(data.weekendAvg[0], 100000000)}</div>
            <div className={Style['unit']}>亿件</div>
            <div className={Style['rate']}>
              <p1>同比</p1>
              <p2 className={Style['rate-value']}>
                {data.weekendAvg[1] > 0 ? (
                  <img src={require('../../assets/Home/arrowOrange.png')} />
                ) : (
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={require('../../assets/Home/arrowOrange.png')}
                  />
                )}
                {data.weekendAvg[1]}%
              </p2>
            </div>
          </span>
          <span className={Style['line']}></span>
          <span className={Style['value-show']} style={{ width: '24%' }}>
            <div className={Style['name']}>节日{tag}均业务量</div>
            <div className={Style['value']}>{numberSimplify(data.holidayAvg[0], 100000000)}</div>
            <div className={Style['unit']}>亿件</div>
            <div className={Style['rate']}>
              <p1>同比</p1>
              <p2 className={Style['rate-value']}>
                {data.holidayAvg[1] > 0 ? (
                  <img src={require('../../assets/Home/arrowOrange.png')} />
                ) : (
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={require('../../assets/Home/arrowOrange.png')}
                  />
                )}
                {data.holidayAvg[1]}%
              </p2>
            </div>
          </span>
        </div>
      );
    } else {
      const data = value['value'];
      return (
        <div className={HomeStyle['component-content']}>
          <span className={Style['value-show']} style={{ width: '32%' }}>
            <div className={Style['name']}>全国快递业务量</div>
            <div className={Style['value']}>{numberSimplify(data.ywl, 100000000)}</div>
            <div className={Style['unit']}>亿件</div>
            <div className={Style['rate']}>
              <p1>同比</p1>
              <p2 className={Style['rate-value']}>
                {data.ywlRate > 0 ? (
                  <img src={require('../../assets/Home/arrowOrange.png')} />
                ) : (
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={require('../../assets/Home/arrowOrange.png')}
                  />
                )}
                {data.ywlRate}%
              </p2>
            </div>
          </span>
          <span className={Style['line']}></span>
          <span className={Style['value-show']} style={{ width: '32%' }}>
            <div className={Style['name']}>实名业务量</div>
            <div className={Style['value']}>{numberSimplify(data.sm, 100000000)}</div>
            <div className={Style['unit']}>亿件</div>
            <div className={Style['rate']}>
              <p1>同比</p1>
              <p2 className={Style['rate-value']}>
                {data.smRate > 0 ? (
                  <img src={require('../../assets/Home/arrowOrange.png')} />
                ) : (
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={require('../../assets/Home/arrowOrange.png')}
                  />
                )}
                {data.smRate}%
              </p2>
            </div>
          </span>
          <span className={Style['line']}></span>
          <span className={Style['value-show']} style={{ width: '32%' }}>
            <div className={Style['name']}>电商业务量</div>
            <div className={Style['value']}>{numberSimplify(data.ds, 100000000)}</div>
            <div className={Style['unit']}>亿件</div>
            <div className={Style['rate']}>
              <p1>同比</p1>
              <p2 className={Style['rate-value']}>
                {data.dsRate > 0 ? (
                  <img src={require('../../assets/Home/arrowOrange.png')} />
                ) : (
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src={require('../../assets/Home/arrowOrange.png')}
                  />
                )}
                {data.dsRate}%
              </p2>
            </div>
          </span>
        </div>
      );
    }
  }

  render() {
    const typeClass = [HomeStyle['float-right-el'], HomeStyle['float-right-el']];
    typeClass[this.state.type] = HomeStyle['float-right-el-selected'];

    const dayClass = [Style['float-right-el'], Style['float-right-el']];
    this.state.Check == 'day'
      ? (dayClass[0] = Style['float-right-el-day'])
      : (dayClass[1] = Style['float-right-el-day']);

    return (
      <div className={HomeStyle['background-image-normal']}>
        <div className={HomeStyle['component-title']}>
          <span className={HomeStyle['component-title-name']}>业务趋势</span>
          <span className={typeClass[1]}>
            {' '}
            <a onClick={this.typeClick.bind(this, 1)}>业务总览</a>
          </span>
          <span className={typeClass[0]}>
            {' '}
            <a onClick={this.typeClick.bind(this, 0)}>业务统计</a>
          </span>
        </div>
        {this.state.type === 0 ? (
          <div className={Style['day-select']}>
            <a className={dayClass[1]} onClick={this.onClick.bind(this, 'month')}>
              按月
            </a>
            <a className={dayClass[0]} onClick={this.onClick.bind(this, 'day')}>
              按日
            </a>
          </div>
        ) : null}
        <this.Show value={this.state} />
      </div>
    );
  }
}

export default BusinessTrend;
