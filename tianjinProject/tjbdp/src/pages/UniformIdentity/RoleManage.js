import React,{Component} from 'react';
import {Card} from 'antd';
import {connect} from 'dva';
import RoleEditTable from '../../components/UniformIdentity/RoleManage/RoleEditTable';
import RoleSearchOrAdd from '../../components/UniformIdentity/RoleManage/RoleSearchOrAdd';

@connect(({ rolemanage,menusmanage, loading ,getPagePage }) => {
  const {pagePath}=getPagePage;
  const {controlList}=rolemanage;
  return{
    rolemanage,
    menusmanage,
    controlList,
    pagePath,
    tableLoading: loading.effects['rolemanage/getRoles'],
    partDeleteLoading: loading.effects['rolemanage/deletePartRoles'],
    addBtnLoading: loading.effects['rolemanage/addRole'],
    modifyBtnLoading: loading.effects['rolemanage/modifyRole'],
    searchLoading: loading.effects['rolemanage/searchRole'],
  }
})

class RoleManage extends Component{
  state={
    selectedRowKeys: [],
    value:{},
  };

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    // console.log("this.props.pagePath",this.props.pagePath)
    dispatch({
      type:"rolemanage/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount(){
    setTimeout(()=>{
      this.props.dispatch({
        type:'rolemanage/getRoles',
        payload:{
          page:1,
          pageSize:10,
          ...this.state.value,
          token:sessionStorage.getItem('sys-token'),
        },
      });
    },1000);
    this.props.dispatch({
      type:'menusmanage/getPartTree',
      payload:{
        token:sessionStorage.getItem('sys-token'),
      },
    });
  }

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  setValue=(value)=>{
    // console.log("value",value);
    this.setState({selectedRowKeys:value})
  }

  getValue=(value)=>{
    this.setState({value:value})
  }

  render(){
    const {value}=this.state;
    const {
      roles,
      addModalVisible,
      modifyModalVisible,
      current,
      pageSize,
      total,
    } = this.props.rolemanage;

    const {
      menuTree,
    } = this.props.menusmanage;

    const {
      dispatch,
      tableLoading,
      modifyBtnLoading,
      searchLoading,
      partDeleteLoading,
      addBtnLoading,
      controlList,
    } = this.props;

    const RoleEditTableProps = {
      roles,
      modifyModalVisible,
      current,
      pageSize,
      total,
      tableLoading,
      modifyBtnLoading,
      dispatch,
      menuTree,
      controlList,
      value,
    };

    const RoleSearchOrAddProps = {
      addModalVisible,
      searchLoading,
      partDeleteLoading,
      addBtnLoading,
      pageSize,
      dispatch,
      controlList,
    };

    return (
      <Card
        bordered={false}
      >
        <RoleSearchOrAdd {...RoleSearchOrAddProps} selectedRowKeys={this.state.selectedRowKeys} getValue={this.getValue} setSelectedRowKeys={this.setSelectedRowKeys}/>
        <RoleEditTable {...RoleEditTableProps} setValue={this.setValue} selectedRowKeys={this.state.selectedRowKeys} setSelectedRowKeys={this.setSelectedRowKeys}/>
      </Card>
    );
  }
}

export default RoleManage;
