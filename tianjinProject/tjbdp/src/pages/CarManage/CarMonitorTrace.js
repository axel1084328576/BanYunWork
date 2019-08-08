import React,{Component} from 'react';
import {Card,Row,Col} from 'antd';
import {connect} from 'dva';
import CarMonitorTraceList from '@/components/CarManage/CarMonitorTrace/CarMonitorTraceList';
import CarTraceMap from '@/components/CarManage/CarMonitorTrace/CarTraceMap';

@connect(({ carmonitortrace, loading }) => ({
  carmonitortrace,
  loading,
}))

class CarMonitorTrace extends Component{
  componentDidMount(){
    // this.props.dispatch({
    //   type:'carmonitortrace/getCarMonitorTrace',
    // });

    this.props.dispatch({
      type:'carmonitortrace/getCarData',
    });
  }

  render(){
    const {
      carTrace,
      perCarTrace,
      selectCarKey,
      center,
      carData,
    }=this.props.carmonitortrace;

    const CarMonitorTraceListProps = {
      carData,
      carTrace,
      selectCarKey,
      dispatch:this.props.dispatch
    };
    const CarTraceMapProps = {
      carData,
      carTrace,
      perCarTrace,
      selectCarKey,
      center,
      dispatch:this.props.dispatch
    };

    return (
      <Card >
        <Row gutter={32}>
          <Col span={19}>
            <CarTraceMap {...CarTraceMapProps} />
          </Col>
          <Col span={5}>
            <CarMonitorTraceList {...CarMonitorTraceListProps} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default CarMonitorTrace;
