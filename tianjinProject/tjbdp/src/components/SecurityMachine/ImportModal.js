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
          type:"replayCheck/upload",
          payload: formdata,
          callback:(value)=>{
            if(value){
              this.props.dispatch({
                type:"replayCheck/List",
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
        title='导入安检机联网信息'
        visible={this.state.importVisible}
        width={820}
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
            {/*<Col sm={{ span: 24 }} lg={{ span: 8 }}>*/}
            <Col sm={{ span: 24 }} >
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
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="快递企业"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('compNo', {
                  initialValue:this.props.compList.length==1?this.props.compList[0].code:null,
                  rules: [{
                    required: true,
                    message: "快递企业不能为空！"
                  }]
                })(
                  <Select
                    className={styles.formItemWidth}
                    placeholder="请选择"
                    allowClear={this.props.compList.length==1?false:true}
                  >
                    {companyList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="公司名称"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('enterpriseName', {
                  initialValue:"B"
                })(
                  <Select className={styles.formItemWidth}>
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="归属网点"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('stationCode', {
                  initialValue:"C"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="安检机编号"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('machNo', {
                  initialValue:"D"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="安检机名称"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('machName', {
                  initialValue:"E"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="安检数量"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('amount', {
                  initialValue:"F"
                })(
                  <Select className={styles.formItemWidth}>
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="安检机型号"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('model', {
                  initialValue:"G"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="安检机品牌"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('brand', {
                  initialValue:"H"
                })(
                  <Select className={styles.formItemWidth}>
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="安检机厂家"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('producter', {
                  initialValue:"I"
                })(
                  <Select className={styles.formItemWidth}>
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="纬度"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('latitude', {
                  initialValue:"J"
                })(
                  <Select className={styles.formItemWidth}>
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="经度"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('longitude', {
                  initialValue:"K"
                })(
                  <Select className={styles.formItemWidth}>
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="状态"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('status', {
                  initialValue:"L"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="牌照"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('licencePlate', {
                  initialValue:"M"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="地址"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('address', {
                  initialValue:"N"
                })(
                  <Select className={styles.formItemWidth}>
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="使用年限"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('serviceLife', {
                  initialValue:"O"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="购买时间"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('buyDate', {
                  initialValue:"P"
                })(
                  <Select className={styles.formItemWidth}>
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="联系人"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('contact', {
                  initialValue:"Q"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
                    {hanList}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={{ span: 24 }} lg={{ span: 8 }}>
              <FormItem
                label="联系电话"
                {...formItemLayout}
                style={{width:"100%"}}
              >
                {getFieldDecorator('tel', {
                  initialValue:"R"
                })(
                  <Select className={styles.formItemWidth}  placeholder="请选择">
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