import React,{Component} from 'react';
import {Card,Row,Col} from 'antd';
import {connect} from 'dva';
import UserEditTable from '@/components/UniformIdentity/UserManage/UserEditTable';
import UserSearchOrAdd from '@/components/UniformIdentity/UserManage/UserSearchOrAdd';
import UserOrganizationTree from '@/components/UniformIdentity/UserManage/UserOrganizationTree';
import styles from './allLine.less'

class UserManage extends Component{
  state={
    selectedRowKeys: [],
    values:{},
  };

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    // console.log("this.props.pagePath",this.props.pagePath)
    dispatch({
      type:"usermanage/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount(){
    this.props.dispatch({
      type:'usermanage/getAllOrganizationTree',
      payload:{
        token:sessionStorage.getItem('sys-token'),
      },
    }); 

    this.props.dispatch({
      type:'usermanage/getRoleSelect',
      payload:{
        token:sessionStorage.getItem('sys-token'),
      },
    }); 
    setTimeout(()=>{
      this.props.dispatch({
        type:'usermanage/getUserData',
        payload:{
          page:1,
          pageSize:10,
          ...this.state.values,
          token:sessionStorage.getItem('sys-token'),
        },
      });
    },1000)
  }

  setSelectedRowKeys=()=>{
    this.setState({selectedRowKeys:[]})
  };

  setValue=(value)=>{
    // console.log("value",value);
    this.setState({selectedRowKeys:value})
  }

  getValues=(values)=>{
    this.setState({
      values:values
    })
  };

  render(){
    const {values}=this.state;
    const {
      organizationTree, 
      userData, 
      roleSelect, 
      addModalVisible,
      modifyModalVisible,
      authorityModalVisible,
      selectedRowKeys,
      selectOrganizationKeys,
      rootKey,
      showHighSearch,
      current,
      pageSize,
      total,
    } = this.props.usermanage;

    const {
      modifyBtnLoading,
      tableLoading,
      addBtnLoading,
      partDeleteLoading,
      highSearchLoading,
      simpleSearchLoading,
      authorityBtnLoading,
      dispatch,
      controlList,
    } = this.props;

    const UserEditTableProps = {
      organizationTree,
      userData,
      roleSelect,
      modifyModalVisible,
      authorityModalVisible,
      authorityBtnLoading,
      current,
      pageSize,
      total,
      modifyBtnLoading,
      tableLoading,
      dispatch,
      controlList,
      values,
    };

    const UserSearchOrAddProps = {
      organizationTree,
      userData,
      roleSelect,
      addModalVisible,
      showHighSearch,
      addBtnLoading,
      partDeleteLoading,
      highSearchLoading,
      simpleSearchLoading,
      selectOrganizationKeys,
      pageSize,
      dispatch,
      controlList,
    };

    const UserOrganizationTreeProps = {
      organizationTree,
      selectOrganizationKeys,
      rootKey,
      current,
      pageSize,
      dispatch,
    };



    return (
      <Card
        bordered={false} className={styles.wrap}
      >
        <Row>
          <Col
            xs={{span: 24}} sm={{ span: 24 }} lg={{ span: 4 }}
          >
            <UserOrganizationTree {...UserOrganizationTreeProps} setValue={this.setValue}/>
          </Col>
          <Col
            xs={{span: 24}} sm={{ span: 24 }} lg={{ span: 20 }}
            className={styles.allLine}
          >
            <UserSearchOrAdd {...UserSearchOrAddProps} selectedRowKeys={this.state.selectedRowKeys} getValues={this.getValues} setSelectedRowKeys={this.setSelectedRowKeys}/>
            <UserEditTable {...UserEditTableProps} setValue={this.setValue} selectedRowKeys={this.state.selectedRowKeys} setSelectedRowKeys={this.setSelectedRowKeys} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(({ usermanage, loading ,getPagePage}) => {
  const {pagePath}=getPagePage;
  const {controlList}=usermanage;
  return{
    controlList,
    pagePath,
    usermanage,
    simpleSearchLoading: loading.effects['usermanage/simpleSearchUser'],
    highSearchLoading: loading.effects['usermanage/highSearchUser'],
    partDeleteLoading: loading.effects['usermanage/deletePartUser'],
    addBtnLoading: loading.effects['usermanage/addUser'],
    modifyBtnLoading: loading.effects['usermanage/modifyUser'],
    authorityBtnLoading: loading.effects['usermanage/setUserAuthority'],
    tableLoading: loading.effects['usermanage/getUserData'],
  }
})(UserManage);
