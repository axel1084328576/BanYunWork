
import React from 'react';
import { Col } from 'antd';
import { numberToShow } from '@/utils/numberUtils'

import Style from './FTipsComponent.css';

// 大屏中上四类数据

class FTips extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
    }

    render() {
        return (
            <div>
                <Col span={6}>
                    <div className={Style['ftips-name']}>今日业务量</div>
                    <div className={Style['ftips-value']}>{numberToShow(this.state.value.current)}</div>
                </Col>
                <Col span={6}>
                    <div className={Style['ftips-name']}>昨日业务量</div>
                    <div className={Style['ftips-value']}>{numberToShow(this.state.value.yesterday)}</div>
                </Col>
                <Col span={6}>
                    <div className={Style['ftips-name']}>本月累计业务量</div>
                    <div className={Style['ftips-value']}>{numberToShow(this.state.value.month)}</div>
                </Col>
                <Col span={6}>
                    <div className={Style['ftips-name']}>本年累计业务量</div>
                    <div className={Style['ftips-value']}>{numberToShow(this.state.value.year)}</div>
                </Col>
            </div>
        )
    }

}

export default FTips;