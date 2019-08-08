import React,{Component} from 'react';
import {Row,Col,Input,Select,InputNumber,Button,Icon,Form,Modal,message} from 'antd';
import styles from './HighSearch.less'
import { connect } from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({enforcementRecord,loading}) => {
  const {pageSize,page}=enforcementRecord;
  return{
    pageSize,page,
    loading:loading.effects['enforcementRecord/AddOrEdit'],
  }
})


@Form.create()
export default class EditModal extends Component{
  constructor(props){
    super(props);
  }

  handleSearch = (e) => {
    let data;
    if(this.props.getSearch){
      data=this.props.getSearch();
    }
    const {page,pageSize}=this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch,setEditModal,rowData } = this.props;
        // console.log('Received values of form: ', values);
        values.opType="edit";
        values.id=rowData.id;
        values.token=sessionStorage.getItem('sys-token');
        dispatch({
          type: 'enforcementRecord/AddOrEdit',
          payload:values,
          callback: ()=>{
            dispatch({
              type:'enforcementRecord/List',
              payload:{
                ...data,
                page:page,
                pageSize:pageSize
              }
            });
            if(this.props.setSelectedRowKeys){
              this.props.setSelectedRowKeys()
            }
            if(setEditModal){
              setEditModal(false)
            }
            message.success("修改成功");
          }
        });
      }
    });
  };

  handleEditCancel = () => {
    if(this.props.setEditModal){
      this.props.setEditModal(false)
    }
  };

  render(){
    const {rowData, loading,editVisible}=this.props;
    console.log(rowData)
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14},
      },
    };
    return(
      <Modal
        title="修改执法检查备案信息"
        visible={editVisible}
        width={1100}
        style={{top:10}}
        destroyOnClose={true}
        maskClosable={true}
        onOk={this.handleSearch}
        onCancel={this.handleEditCancel}
        footer={[
          <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
          <Button key="submit" type="primary" onClick={this.handleSearch}>
            确定
          </Button>,
        ]}
      >
        <div className={styles.wrap}>
          <Form onSubmit={this.handleSearch}>
            <Row>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="统计编码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("statisticsCode", {
                    initialValue:rowData.statisticsCode,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入统计编码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="案件来源"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("lawCaseSource", {
                    initialValue:rowData.lawCaseSource,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案件来源"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="检查对象"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("checkObject", {
                    initialValue:rowData.checkObject,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入检查对象"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="企业名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("companyName", {
                    initialValue:rowData.companyName,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入企业名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="品牌"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("brand", {
                    initialValue:rowData.brand,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入品牌"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="当事人姓名"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyName", {
                    initialValue:rowData.partyName,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人姓名"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="当事人身份证号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyIdNumber", {
                    initialValue:rowData.partyIdNumber,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人身份证号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="当事人联系电话"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partTel", {
                    initialValue:rowData.partTel,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人联系电话"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="当事人住址"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyAddress", {
                    initialValue:rowData.partyAddress,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人住址"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="当事人单位"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyUnit", {
                    initialValue:rowData.partyUnit,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人单位"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="当事人邮编"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyPostcode", {
                    initialValue:rowData.partyPostcode,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人邮编"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="业务类别"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("professionalWorkType", {
                    initialValue:rowData.professionalWorkType,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入业务类别"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="案情"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("sachverhalt", {
                    initialValue:rowData.sachverhalt,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案情"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="案由"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("caseAction", {
                    initialValue:rowData.caseAction,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案由"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="案件类别"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("caseType", {
                    initialValue:rowData.caseType,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案件类别"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="案发地"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("caseAddress", {
                    initialValue:rowData.caseAddress,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案发地"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="备注"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("remarks", {
                    initialValue:rowData.remarks,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入备注"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="受理时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("processingTime", {
                    initialValue:rowData.processingTime,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入受理时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="受理机构"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("processingAddress", {
                    initialValue:rowData.processingAddress,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入受理机构"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="受理人员"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("processingPeople", {
                    initialValue:rowData.processingPeople,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入受理人员"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="立案案号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("registerCode", {
                    initialValue:rowData.registerCode,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入立案案号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="立案时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("registerTime", {
                    initialValue:rowData.registerTime,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入立案时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="案件终结时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("registerOverTime", {
                    initialValue:rowData.registerOverTime,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案件终结时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="处罚决定书送达时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("penalizeDecisionBookTime", {
                    initialValue:rowData.penalizeDecisionBookTime,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入处罚决定书送达时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="案件执行完成时间"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("caseExecuteOverTime", {
                    initialValue:rowData.caseExecuteOverTime,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入案件执行完成时间"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="办案人员"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("transactionPeople", {
                    initialValue:rowData.transactionPeople,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入办案人员"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="执法证号"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enforceCode", {
                    initialValue:rowData.enforceCode,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入执法证号"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="主要违法事实证据"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("illegalEvidence", {
                    initialValue:rowData.illegalEvidence,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入主要违法事实证据"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="引用法条"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("quoteLaw", {
                    initialValue:rowData.quoteLaw,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入引用法条"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="执法单位"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("enforceUnit", {
                    initialValue:rowData.enforceUnit,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入执法单位"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="处罚种类"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("penaltyType", {
                    initialValue:rowData.penaltyType,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入处罚种类"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="罚款金额"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("punishMoney", {
                    initialValue:rowData.punishMoney,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入罚款金额"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="罚款缴纳方式"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("punishType", {
                    initialValue:rowData.punishType,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入罚款缴纳方式"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="强制措施生效日期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("effectiveTime", {
                    initialValue:rowData.effectiveTime,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入强制措施生效日期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="执行情况"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("executiveSituation", {
                    initialValue:rowData.executiveSituation,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入执行情况"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="强制措施种类"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("measureType", {
                    initialValue:rowData.measureType,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入强制措施种类"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="是否结案"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("isSettle", {
                    initialValue:rowData.isSettle,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入是否结案"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="结案日期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("settleTime", {
                    initialValue:rowData.settleTime,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入结案日期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="结案原因"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("settleCause", {
                    initialValue:rowData.settleCause,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入结案原因"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="是否简易程序"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("isSimpleProcedure", {
                    initialValue:rowData.isSimpleProcedure,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入是否简易程序"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="涉嫌违反法律条文"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("breakArticle", {
                    initialValue:rowData.breakArticle,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入涉嫌违反法律条文"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="是否立案"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("isRegister", {
                    initialValue:rowData.isRegister,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入是否立案"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="处罚决定生效日期"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("punishDecisionTime", {
                    initialValue:rowData.punishDecisionTime,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入处罚决定生效日期"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="主管机构名称"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("organizationName", {
                    initialValue:rowData.organizationName,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入主管机构名称"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="省份"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("province", {
                    initialValue:rowData.province,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入省份"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="当事人单位品牌代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partyPeopleBrandCode", {
                    initialValue:rowData.partyPeopleBrandCode,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人单位品牌代码"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={{ span: 24 }} lg={{ span: 8 }}>
                <Form.Item
                  label="当事人单位机构代码"
                  {...formItemLayout}
                  style={{ width:"100%"}}
                >
                  {getFieldDecorator("partUnitOrganizationCode", {
                    initialValue:rowData.partUnitOrganizationCode,
                    rules: [{ required: false }]
                  })(
                    <Input
                      className={styles.formItemWidth}
                      placeholder="请输入当事人单位机构代码"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    )
  }
}