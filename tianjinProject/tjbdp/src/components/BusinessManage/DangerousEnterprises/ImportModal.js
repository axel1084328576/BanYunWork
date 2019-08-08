import React,{Component} from 'react';
import {Form,Input,Button,Modal,Row,Col,Select,Upload,Icon,message} from 'antd'
import styles from './HighSearch.less'
import { connect } from "dva/index";

const Option = Select.Option;

@connect(({dangerousEnterprises,loading}) => {
  const {pageSize,page}=dangerousEnterprises;
  return{
    pageSize,page,
    loading:loading.effects['dangerousEnterprises/AddOrEdit'],
  }
})

@Form.create()
export default class ImportModal extends Component{
  handleImportCancel=()=>{
    if(this.props.setImportModal){
      this.props.setImportModal(false)
    }
  };

  ImportSubmit=(e)=>{
    let data;
    if(this.props.getSearch){
      data=this.props.getSearch();
    }
    const {page,pageSize}=this.props;
    e.preventDefault();
    let _this=this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data={};
        for(let key in values){
          if(values[key]!=undefined){
            data[key]=values[key];
          }
        }
        let formdata=new FormData();
        if(document.getElementById("importExcel29").files[0]!=undefined){
          formdata.append('file',document.getElementById("importExcel29").files[0]);
        }
        for(let key in data){
          formdata.append(key,data[key]);
        }
        _this.props.dispatch({
          type:"dangerousEnterprises/Upload",
          payload: formdata,
          callback:(value)=>{
            if(value){
              _this.props.dispatch({
                type:'dangerousEnterprises/List',
                payload:{
                  ...data,
                  page:page,
                  pageSize:pageSize
                }
              });
              if(this.props.setSelectedRowKeys){
                this.props.setSelectedRowKeys()
              }
              if(this.props.setImportModal){
                this.props.setImportModal(false)
              }
            }
          }
        });
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


    return(
      <Modal
        title='导入危化品名录信息'
        visible={this.props.importVisible}
        centered={true}
        destroyOnClose={true}
        maskClosable={true}
        onOk={this.ImportSubmit}
        onCancel={this.handleImportCancel}
        footer={[
          <Button key="back" onClick={this.handleImportCancel}>取消</Button>,
          <Button key="submit" type="primary" onClick={this.ImportSubmit} loading={this.props.loading}>
            提交
          </Button>,
        ]}
      >
        <Form onSubmit={this.ImportSubmit} className={styles.wrap}>
          <Row>
            {/*<Col sm={{ span: 24 }} lg={{ span: 8 }}>*/}
            <Col span={24} >
              <FormItem
                label="选择文件"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                <input
                  type="file"
                  name="importExcel"
                  id="importExcel29"
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
        </Form>
      </Modal>
    )
  }
}