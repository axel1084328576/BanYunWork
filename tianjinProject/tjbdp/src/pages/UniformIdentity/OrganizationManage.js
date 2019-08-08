import React,{Component} from 'react';
import {Card,Row,Col} from 'antd';
import {connect} from 'dva';
import OrganizationEditTable from '@/components/UniformIdentity/OrganizationManage/OrganizationEditTable';
import OrganizationSearchOrAdd from '@/components/UniformIdentity/OrganizationManage/OrganizationSearchOrAdd';
import OrganizationTree from '@/components/UniformIdentity/OrganizationManage/OrganizationTree';
import styles from './allLine.less'

@connect(({ organizationmanage,loading,getPagePage}) => {
  const {pagePath}=getPagePage;
  const {controlList}=organizationmanage;
  return{
    pagePath,
    controlList,
    organizationmanage,
    tableLoading: loading.effects['organizationmanage/selectOrganization'],
    partDeleteLoading: loading.effects['organizationmanage/deletePartOrganization'],
    addBtnLoading: loading.effects['organizationmanage/addOrganization'],
    modifyBtnLoading: loading.effects['organizationmanage/modifyOrganization'],
    searchBtnLoading: loading.effects['organizationmanage/searchOrganization'],
  }
})

class OrganizationManage extends Component{
  state={
    selectedRowKeys: [],
    value:{}
  };

  componentWillMount(){
    // console.log("this.props.pagePath",this.props.pagePath);
    const { dispatch } = this.props;
    // console.log("this.props.pagePath",this.props.pagePath)
    dispatch({
      type:"organizationmanage/Control",
      payload:{
        menuCode:this.props.pagePath,
        token:sessionStorage.getItem('sys-token'),
      }
    })
  }

  componentDidMount(){
    this.props.dispatch({
      type:'organizationmanage/selectOrganization',
      payload:{
        page:1,
        pageSize:10,
      },
    });
    this.props.dispatch({
      type:'organizationmanage/getPartTreeInit',
      payload:{
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
      organization,
      organizationTree,
      addModifyOrganizationTree,
      selectOrganizationKeys,
      selectOrganizationTitle,
      rootKey,
      addModalVisible,
      modifyModalVisible,
      current,
      pageSize,
      total,
    } = this.props.organizationmanage;

    const {
      searchBtnLoading,
      addBtnLoading,
      partDeleteLoading,
      modifyBtnLoading,
      tableLoading,
      dispatch,
      controlList,
    } = this.props;

    const OrganizationEditTableProps = {
      organization,
      selectOrganizationKeys,
      addModifyOrganizationTree,
      modifyModalVisible,
      current,
      pageSize,
      total,
      modifyBtnLoading,
      tableLoading,
      dispatch,
      controlList,
      value,
    };

    const OrganizationSearchOrAddProps = {
      addModalVisible,
      selectOrganizationKeys,
      addModifyOrganizationTree,
      searchBtnLoading,
      addBtnLoading,
      partDeleteLoading,
      pageSize,
      dispatch,
      controlList,
    };

    const OrganizationTreeProps = {
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
            <OrganizationTree {...OrganizationTreeProps}  setValue={this.setValue}/>
          </Col>
          <Col
            xs={{span: 24}} sm={{ span: 24 }} lg={{ span: 20 }}
            className={styles.allLine}
          >
            <OrganizationSearchOrAdd {...OrganizationSearchOrAddProps} selectedRowKeys={this.state.selectedRowKeys} getValue={this.getValue} setSelectedRowKeys={this.setSelectedRowKeys}/>
            <OrganizationEditTable {...OrganizationEditTableProps} setValue={this.setValue} selectedRowKeys={this.state.selectedRowKeys} setSelectedRowKeys={this.setSelectedRowKeys}/>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default OrganizationManage;

