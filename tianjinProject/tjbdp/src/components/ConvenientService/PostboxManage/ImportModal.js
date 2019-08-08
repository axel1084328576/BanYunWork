import React,{Component} from 'react';
import {Form,Input,Button,Modal,Row,Col,Select,Upload,Icon,message} from 'antd'
import styles from './HighSearch.less'
import { connect } from "dva/index";

const Option = Select.Option;

@connect(({expressBox}) => {
  const {compList}=expressBox;
  return{
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
        this.props.dispatch({
          type:"postboxManage/upload",
          payload: formdata,
          callback:(value)=>{
            if(value){
              this.props.dispatch({
                type:"postboxManage/List",
                payload:searchItem,
              });
              this.setState({
                importVisible:false
              });
              if(this.props.changeVisible){
                this.props.changeVisible(false)
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
        title='导入信筒信箱信息'
        visible={this.state.importVisible}
        centered={true}
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
            {/*<Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
            <Col span={24}>
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
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="开始行"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('start', {
                  rules: [{
                    required: true,
                    message: "开始行不能为空！"
                  }]
                })(
                  <Input className={styles.formItemWidth}/>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="结束行"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('end', {
                  rules: [{
                    required: true,
                    message: "结束行不能为空！"
                  }]
                })(
                  <Input  className={styles.formItemWidth}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="信筒信箱编号"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('boxNo', {
                  initialValue:"B"
                })(
                  <Select
                    className={styles.formItemWidth}
                    placeholder="请选择"
                    allowClear={true}
                  >
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="地址"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('address', {
                  initialValue:"C"
                })(
                  <Select
                    className={styles.formItemWidth}
                    placeholder="请选择"
                    allowClear={true}
                  >
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="经度"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('longitude', {
                  initialValue:"D"
                })(
                  <Select
                    className={styles.formItemWidth}
                    placeholder="请选择"
                    allowClear={true}
                  >
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="纬度"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('latitude', {
                  initialValue:"E"
                })(
                  <Select
                    className={styles.formItemWidth}
                    placeholder="请选择"
                    allowClear={true}
                  >
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="收信时间"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('collectionTime', {
                  initialValue:"F"
                })(
                  <Select
                    className={styles.formItemWidth}
                    placeholder="请选择"
                    allowClear={true}
                  >
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="维护人信息"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('contact', {
                  initialValue:"G"
                })(
                  <Select
                    className={styles.formItemWidth}
                    placeholder="请选择"
                    allowClear={true}
                  >
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 12 }}>
              <FormItem
                label="类别"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('category', {
                  initialValue:"H"
                })(
                  <Select
                    className={styles.formItemWidth}
                    placeholder="请选择"
                    allowClear={true}
                  >
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}