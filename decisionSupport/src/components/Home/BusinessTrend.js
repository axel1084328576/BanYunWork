
import React from 'react'
import { Col, Button, Radio } from 'antd'
import Style from './BusinessTrend.css'
// 主页左上业务趋势

class BusinessTrend extends React.Component {
    constructor(props) {
        super(props);
        const { value } = props;
        this.state = {
            ...value,
            Check: 'day'
        }
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
        const data = value[value.Check];
        let tag = value.Check == 'day' ? '日' : '月';
        if (type == 0) {
            return (
                <div>
                    <Col span={6} className={Style['value-show']}>
                        <div>{tag}均业务量</div>
                        {data.dayAvg[0]}
                        <div>同比 {data.dayAvg[1]}%</div>
                    </Col>
                    <Col span={6} className={Style['value-show']}>
                        <div>工作日{tag}均业务量</div>
                        {data.workAvg[0]}
                        <div>同比 {data.workAvg[1]}%</div>
                    </Col>
                    <Col span={6} className={Style['value-show']}>
                        <div>周末{tag}均业务量</div>
                        {data.weekendAvg[0]}
                        <div>同比 {data.weekendAvg[1]}%</div>
                    </Col>
                    <Col span={6} className={Style['value-show']}>
                        <div>节日{tag}均业务量</div>
                        {data.holidayAvg[0]}
                        <div>同比 {data.holidayAvg[1]}%</div>
                    </Col>
                </div>
            )
        } else {
            return (
                <div>
                    <Col span={8} className={Style['value-show']}>
                        <div>全国快递业务量</div>
                        {data.holidayAvg[0]}
                        <div>同比 {data.holidayAvg[1]}%</div>
                    </Col>
                    <Col span={8} className={Style['value-show']}>
                        <div>实名业务量</div>
                        {data.holidayAvg[0]}
                        <div>同比 {data.holidayAvg[1]}%</div>
                    </Col>
                    <Col span={8} className={Style['value-show']}>
                        <div>电商业务量</div>
                        {data.holidayAvg[0]}
                        <div>同比 {data.holidayAvg[1]}%</div>
                    </Col>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className={Style['component-title-background']}>
                    <Col span={12} className={Style['component-title']}>业务趋势 </Col>
                    <Col span={12}>
                        <Button ghost className={Style['float-right-el']} onClick={this.typeClick.bind(this, 1)} > 业务总览 </Button>
                        <Button ghost className={Style['float-right-el']} onClick={this.typeClick.bind(this, 0)} > 业务统计 </Button>
                    </Col>
                </div>
                <div>
                    {this.state.type === 0 ?
                        <Col span={24}>
                            <Button ghost className={Style['float-right-el']} onClick={this.onClick.bind(this, 'day')} >按日</Button>
                            <Button ghost className={Style['float-right-el']} onClick={this.onClick.bind(this, 'month')} >按月</Button>
                        </Col> : null
                    }
                </div>
                <this.Show value={this.state} />
            </div>
        )
    }

}

export default BusinessTrend;