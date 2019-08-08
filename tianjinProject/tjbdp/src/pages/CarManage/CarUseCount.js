import React,{Component} from 'react';
import {Card} from 'antd';
import {connect} from 'dva';
import CarUseCountEditTable from '@/components/CarManage/CarUseCount/CarUseCountEditTable';
import CarUseCountSearchOrAdd from '@/components/CarManage/CarUseCount/CarUseCountSearchOrAdd';
 
@connect(({ carusecount, loading,getPagePage}) => {
  const {pagePath}=getPagePage;
  const {controlList}=carusecount;
  return{
    pagePath,
    controlList,
    carusecount,
    loading,
  }
})

class CarUseCount extends Component{
  state={
    value:{}
  }

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    // console.log("this.props.pagePath",this.props.pagePath)
    dispatch({
      type:"carusecount/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount(){
    setTimeout(()=>{
      this.props.dispatch({
        type:'carusecount/getCarUseCount',
        payload:{
          page:1,
          pageSize:10,
          ...this.state.value,
          token:sessionStorage.getItem('sys-token'),
        },
      });
    },1000)
  }

  getValue=(value)=>{
    this.setState({value:value})
  };
  
  render(){
    const {
      carUseCount,
      addModalVisible,
      modifyModalVisible,
      selectedRowKeys,
      tableLoading,
      showHighSearch,
      controlList,
    } = this.props.carusecount;


    const CarUseCountEditTableProps = {
      carUseCount,
      selectedRowKeys,
      modifyModalVisible,
      tableLoading,
      controlList,
      dispatch:this.props.dispatch
    };

    const CarUseCountSearchOrAddProps = {
      addModalVisible,
      selectedRowKeys,
      showHighSearch,
      controlList,
      dispatch:this.props.dispatch
    };
    return (
      <Card
        bordered={false}
      >
        <CarUseCountSearchOrAdd {...CarUseCountSearchOrAddProps} getValue={this.getValue} />
        <CarUseCountEditTable {...CarUseCountEditTableProps} />  
      </Card>
    );
  }
}

export default CarUseCount;
