
import React from 'antd';
import echarts from 'echarts';
import Style from './QualitySupervision.css'


// 大屏右中 质量监督

class QualitySupervision extends React.Comment {

    constructor(props) {
        super(props);
        this.state = {
            type: 0
        }
    }

    change(val) {
        this.setState({ type: val });
    }

    initOption(){
        
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className={Style['component-title-background']}>
                    <Col span={12} className={Style['component-title']}>质量监管</Col>
                    <Col span={12}>
                        <Button ghost className={Style['float-right-el']} onClick={this.change.bind(this, 1)} > 申诉处置 </Button>
                        <Button ghost className={Style['float-right-el']} onClick={this.change.bind(this, 0)} > 安全监管 </Button>
                    </Col>
                </div>
                {this.state.type == 0 ?
                    <div id='QSoption' style={{ height: '80%' }} />
                    : null}

            </div>
        );
    }
}

export default QualitySupervision;
