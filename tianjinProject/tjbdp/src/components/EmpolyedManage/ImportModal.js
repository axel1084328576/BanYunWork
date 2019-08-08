import React,{Component} from 'react';
import {Form,Input,Button,Modal,Row,Col,Select,Upload,Icon,message} from 'antd'
import styles from './HighSearch.less'
import { connect } from "dva/index";

const Option = Select.Option;

@connect(({expressBox,infoSafeGuard}) => {
  const { pageSize,page } = infoSafeGuard;
  const {compList}=expressBox;
  return{
    pageSize,page,
    compList,
  }
})

@Form.create()
export default class ImportModal extends Component{
  state={
    importVisible:this.props.visible,
  };

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'expressBox/compList',
    });
  }

  handleImportCancel=()=>{
    this.setState({
      importVisible:false
    });
    if(this.props.changeVisible){
      this.props.changeVisible(false)
    }
  };

  ImportSubmit=(e)=>{
    e.preventDefault();
    let searchItem;
    if(this.props.getSearch){
      searchItem=this.props.getSearch()
    }
    const {page,pageSize}=this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data={};
        for(let key in values){
          if(values[key]!=undefined){
            data[key]=values[key];
          }
        }
        let formdata=new FormData();
        if(document.getElementById("importExcel4").files[0]!=undefined){
          formdata.append('file',document.getElementById("importExcel4").files[0]);
        }
        for(let key in data){
          formdata.append(key,data[key]);
        }
        console.log("searchItem",searchItem);
        this.props.dispatch({
          type:"infoSafeGuard/upload",
          payload: formdata,
          callback:(value)=>{
            this.props.dispatch({
              type:"infoSafeGuard/List",
              payload:{
                ...searchItem,
                page:page,
                pageSize:pageSize,
              },
            });
            if(value){
              this.setState({
                importVisible:false
              });
              if(this.props.changeVisible){
                this.props.changeVisible(false)
              }
            }
          }
        });
        if(this.props.setSelectedRowKeys){
          this.props.setSelectedRowKeys()
        }
      }
    });
  };

  render(){
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span:13},
      },
    };

    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;

    let arr=["A","B","C","D","E","F","G","H","I","J","K","L","M",'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const hanList=arr.map((item)=>{
      return <Option key={item} value={item}>{item}</Option>;
    });
    // console.log("this.props.compList",this.props.compList);
    const companyList=this.props.compList.map((item)=>{
      return <Option key={item.code} value={item.code}>{item.name}</Option>;
    });

    return(
      <Modal
        title='导入从业人员信息'
        visible={this.state.importVisible}
        centered={true}
        destroyOnClose={true}
        maskClosable={true}
        onOk={this.ImportSubmit}
        onCancel={this.handleImportCancel}
        footer={[
          <Button key="back" onClick={this.handleImportCancel}>取消</Button>,
          <Button key="submit" type="primary" onClick={this.ImportSubmit}>
            提交
          </Button>,
        ]}
      >
        <Form onSubmit={this.ImportSubmit} className={styles.wrap}>
          <Row>
            <Col span={24} >
            {/*<Col sm={{ span: 24 }} lg={{ span: 8 }}>*/}
              <FormItem
                label="选择文件"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                <input
                  type="file"
                  name="importExcel"
                  id="importExcel4"
                  accept="application/vnd.ms-excel"
                  style={{lineHeight:1,marginTop:12,width:300}}
                  className={styles.formItemWidth}
                />
              </FormItem>
            </Col>
            {/*<Col sm={{ span: 24 }} lg={{ span: 8 }}>*/}
            {/*  <FormItem*/}
            {/*    label="开始行"*/}
            {/*    {...formItemLayout}*/}
            {/*    style={{width:"100%"}}*/}
            {/*  >*/}
            {/*    {getFieldDecorator('start', {*/}
            {/*      rules: [{*/}
            {/*        required: true,*/}
            {/*        message: "开始行不能为空！"*/}
            {/*      }]*/}
            {/*    })(*/}
            {/*      <Input className={styles.formItemWidth}/>*/}
            {/*    )}*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}
            {/*<Col sm={{ span: 24 }} lg={{ span: 8 }}>*/}
            {/*  <FormItem*/}
            {/*    label="结束行"*/}
            {/*    {...formItemLayout}*/}
            {/*    style={{width:"100%"}}*/}
            {/*  >*/}
            {/*    {getFieldDecorator('end', {*/}
            {/*      rules: [{*/}
            {/*        required: true,*/}
            {/*        message: "结束行不能为空！"*/}
            {/*      }]*/}
            {/*    })(*/}
            {/*      <Input  className={styles.formItemWidth}/>*/}
            {/*    )}*/}
            {/*  </FormItem>*/}
            {/*</Col>*/}
          </Row>
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="快递企业"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('compNo', {*/}
          {/*        initialValue:this.props.compList.length==1?this.props.compList[0].code:null,*/}
          {/*        rules: [{*/}
          {/*          required: true,*/}
          {/*          message: "快递企业不能为空！"*/}
          {/*        }]*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={this.props.compList.length==1?false:true}*/}
          {/*        >*/}
          {/*          {companyList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="公司名称"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('enterpriseName', {*/}
          {/*        initialValue:"B"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="归属网点"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('stationCode', {*/}
          {/*        initialValue:"C"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8 }}>*/}
          {/*    <FormItem*/}
          {/*      label="职员ID"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('emplNo', {*/}
          {/*        initialValue:"D"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8 }}>*/}
          {/*    <FormItem*/}
          {/*      label="职员姓名"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('emplName', {*/}
          {/*        initialValue:"E"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="联系电话"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('mobile', {*/}
          {/*        initialValue:"F"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="从业资格级别"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('level', {*/}
          {/*        initialValue:"G"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="证件类型"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('idType', {*/}
          {/*        initialValue:"H"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="证件号"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('idcard', {*/}
          {/*        initialValue:"I"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="雇佣状态"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('status', {*/}
          {/*        initialValue:"J"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="入职时间"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('entryTime', {*/}
          {/*        initialValue:"K"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="离职时间"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('departureTime', {*/}
          {/*        initialValue:"L"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 8}}>*/}
          {/*    <FormItem*/}
          {/*      label="住址"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('address', {*/}
          {/*        initialValue:"M",*/}
          {/*        rules: [{*/}
          {/*          required: false,*/}
          {/*          message: "住址不能为空！"*/}
          {/*        }]*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span:8 }}>*/}
          {/*    <FormItem*/}
          {/*      label="籍贯"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('nativePlace', {*/}
          {/*        initialValue:"N"*/}
          {/*      })(*/}
          {/*        <Select className={styles.formItemWidth}>*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
        </Form>
      </Modal>
    )
  }
}