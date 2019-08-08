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
export default class ExImportModal extends Component{
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
          type:"expressNetwork/upload",
          payload: formdata,
          callback:(value)=>{
            if(value){
              this.props.dispatch({
                type:"expressNetwork/List",
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
        title='导入快递网点信息'
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
            <Col span={24} >
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
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="开始行"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('start', {*/}
          {/*        rules: [{*/}
          {/*          required: true,*/}
          {/*          message: "开始行不能为空！"*/}
          {/*        }]*/}
          {/*      })(*/}
          {/*        <Input className={styles.formItemWidth}/>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="结束行"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('end', {*/}
          {/*        rules: [{*/}
          {/*          required: true,*/}
          {/*          message: "结束行不能为空！"*/}
          {/*        }]*/}
          {/*      })(*/}
          {/*        <Input  className={styles.formItemWidth}/>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="企业"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('compNo', {*/}
          {/*        initialValue:this.props.compList.length==1?this.props.compList[0].code:null,*/}
          {/*        rules: [{*/}
          {/*          required: true,*/}
          {/*          message: "企业名称不能为空！"*/}
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
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="经营管理企业"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('enterprise', {*/}
          {/*        initialValue:"B"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="网点编号"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('statCode', {*/}
          {/*        initialValue:"C"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="网点名称"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('statName', {*/}
          {/*        initialValue:"D"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="网点地址"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('address', {*/}
          {/*        initialValue:"E"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="经度"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('longitude', {*/}
          {/*        initialValue:"F"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="纬度"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('latitude', {*/}
          {/*        initialValue:"G"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="网点联系人"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('contact', {*/}
          {/*        initialValue:"H"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="联系人电话"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('tel', {*/}
          {/*        initialValue:"I"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="排序"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('norder', {*/}
          {/*        initialValue:"J"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
          {/*          {hanList}*/}
          {/*        </Select>*/}
          {/*      )}*/}
          {/*    </FormItem>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col sm={{ span: 24 }} lg={{ span: 12 }}>*/}
          {/*    <FormItem*/}
          {/*      label="备注"*/}
          {/*      {...formItemLayout}*/}
          {/*      style={{width:"100%"}}*/}
          {/*    >*/}
          {/*      {getFieldDecorator('notes', {*/}
          {/*        initialValue:"K"*/}
          {/*      })(*/}
          {/*        <Select*/}
          {/*          className={styles.formItemWidth}*/}
          {/*          placeholder="请选择"*/}
          {/*          allowClear={true}*/}
          {/*        >*/}
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