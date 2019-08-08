import React,{Component} from 'react';
import {connect} from 'dva';
import {Card} from 'antd';
import BusinessInfoTable from '@/components/BusinessInfo/BusinessInfoTable';
import BusinessInfoSearch from '@/components/BusinessInfo/BusinessInfoSearch';

@connect(({ businessinfo, loading }) => ({
  businessinfo,
  tableLoading:loading.effects['businessinfo/getBusinessInfo'],
  simpleLoading:loading.effects['businessinfo/simpleSearch'],
  highLoading:loading.effects['businessinfo/highSearch'],
}))

class BusinessInfo extends Component{
  state={
    values:{}
  };

  componentDidMount(){
    setTimeout(()=>{
      const {values}=this.state;
      this.props.dispatch({
        type:'businessinfo/getBusinessInfo',
        payload:{
          page:1,
          pageSize:10,
          ...values,
        },
      });
    },1000);
    this.props.dispatch({
      type:'businessinfo/companyList',
      callback:(value)=>{
        if(value.length==1){
          this.setState({compNo:value[0].compNo})
        }
      }
    });
  }

  getValues=(values)=>{
    this.setState({
      values:values
    })
  };

  render(){
    const {
      businessInfo,
      showHighSearch,
      LPIDSelect,
      current,
      pageSize,
      total,
      spent,
      companyList,
    } = this.props.businessinfo;

    // console.log("this.props.companyList11111",this.props.companyList);

    const {
      tableLoading,
      highSearch,
      simpleLoading,
      dispatch,
    } = this.props;
    // console.log(this.props);

    const BusinessInfoTableProps = {
            businessInfo,
            current,
            pageSize,
            total,
            tableLoading,
            highSearch,
            simpleLoading,
            dispatch,
            spent,
    };
    const BusinessInfoSearchProps = {
          LPIDSelect,
          pageSize,
          highSearch,
          simpleLoading,
          showHighSearch,
          dispatch,
          companyList,
    };

    return (
      <Card bordered={false}>
        <BusinessInfoSearch {...BusinessInfoSearchProps} getValues={this.getValues} />
        <BusinessInfoTable {...BusinessInfoTableProps} value={this.state.values} />
      </Card>
    );
  }
}

export default BusinessInfo;
