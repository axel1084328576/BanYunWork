import React,{Component} from 'react';
import { connect } from 'dva';
import {Modal,Row,Col,Icon,Button,Select,Input,Avatar,Form,Table,message} from 'antd'
import ColorModel from './ColorModel'
import IconModel from  './IconModel'
let person='http://192.168.96.120/images/person.png';
import styles from './all.less'

const { Option } = Select;

@connect(({modelDesign}) => {
  const {entityVisible,colorVisible,iconVisible,treeList,list,selectList}=modelDesign;
  return{
    entityVisible,
    colorVisible,
    iconVisible,
    treeList,
    selectList,
    list
  }
})

@Form.create()
export default class AddEntity extends Component{
  state={
    colorValue:'#000',
    iconPath:person,
    selectId:null,
    columns:[
      {
        title:'属性名称',
        dataIndex:'attributeName',
        key: 'attributeName',
      },
      {
        title:'中文描述',
        dataIndex:'attributeDesc',
        key:'attributeDesc',
      },
      {
        title:'属性类型',
        dataIndex:'attributeType',
        key:'attributeType',
      },
      {
        title:'属性默认值',
        dataIndex:'attributeValue',
        key:'attributeValue',
      },
      {
        title: "",
        dataIndex: "operation",
        key: "operation",

        render: (text, record) => {
          return (
            <Icon type="minus-circle" style={{color:"red"}} onClick={()=>{this.delSelectList(record)}}/>
          )
        }
      }
    ],
    data:[],
  };

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:'modelDesign/getTreeList'
    });
  }

  delSelectList=(value)=>{
    let listData=this.state.data;
    let index=listData.indexOf(value);
    if (index > -1) {
      listData.splice(index, 1);
    }
    this.setState({
      data:listData
    })
  };

  handleEntityOk=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.colorValue=this.state.colorValue;
      values.iconPath=this.state.iconPath;
      values.attribute=this.state.data;
      if (!err) {
        if(this.props.addEntity){
          this.props.addEntity(values);
        }
      }
    });

  };

  handleEntityCancel=()=>{
    this.props.dispatch({
      type:'modelDesign/setEntityVisible',
      payload:false
    });

  };

  showColor=()=>{
    this.props.dispatch({
      type:'modelDesign/setColorVisible',
      payload:true
    })
  };

  getColorValue=(value)=>{
    this.setState({
      colorValue:value
    })
  };

  showIconModel=()=>{
    this.props.dispatch({
      type:'modelDesign/setIconVisible',
      payload:true,
    })
  };

  getIconPath=(value)=>{
    this.setState({
      iconPath:value
    })
  };


  onSelectChange=(value)=>{
    this.setState({
      selectId:value,
    });
  };

  onSelectSearch=(value)=>{
    this.props.dispatch({
      type:'modelDesign/findAtr',
      payload:{
        attributeName:value,
      },
    })
  };


  addTableList=()=>{
    let _this=this;
    if(this.state.selectId!=undefined  &&  this.state.selectId!=null){
      this.props.dispatch({
        type:'modelDesign/getAtr',
        payload:{
          id:this.state.selectId,
        },
        callback:()=>{
          let dataList=this.state.data;
          let isPush=true;
          if(dataList.length==0){
            isPush=true;
          }else{
            dataList.forEach((item)=>{
              if(item.id==_this.props.selectList.id){
                isPush=false
              }
            });
          }
          if(isPush){
            dataList.push(_this.props.selectList);
          }else{
            message.warning("该属性值已存在!")
          }
          this.setState({
            data:dataList
          });
        }
      })
    }else{
      message.warning("请先输入需要搜索的内容")
    }
  };


  render(){
    const { getFieldDecorator } = this.props.form;
    const list=this.props.treeList.map((item,index)=>{
      return <Option key={index} value={item.id}>{item.name}</Option>;
    });
    const children=this.state.data.map((item,index)=>{
      return <Option key={index} value={item.id}>{item.attributeName}</Option>;
    });
    //
    // console.log("this.props.list",this.props.list);
    return(
      <Modal
        title="增加顶点"
        visible={this.props.entityVisible}
        onOk={this.handleEntityOk}
        onCancel={this.handleEntityCancel}
        maskStyle={{
          backgroundColor:'rgba(0,0,0,0.45)'
        }}
        bodyStyle={{
          padding:12
        }}
        style={{
          top:50
        }}
        // className={styles.ModalScroll}
      >
        {this.props.iconVisible?<IconModel  getIconPath={this.getIconPath} />:null}
        {this.props.colorVisible?<ColorModel getColorValue={this.getColorValue} />:null}
        <Form.Item
          label={<span style={{fontSize:12}}>归属基本类型</span>}
        >
          {getFieldDecorator('baseType', {
            initialValue:"2",
            rules: [{ required: true, message:'归属类型不能为空!'}],
          })(
            <Select  style={{width:"100%"}} placeholder="请选择归属基本类型">
              {list}
            </Select>
          )}
        </Form.Item>
        <Row gutter={12}>
          <Col span={12} >
            <Form.Item
              label={<span style={{fontSize:12}}>点类型英文名称</span>}
            >
              {getFieldDecorator('label', {
                rules: [{ required: true, message:'点类型英文名称不能为空!'}],
              })(
                <Input placeholder="请输入点类型英文名称" style={{width:"100%"}}/>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={<span style={{fontSize:12}}>点的中文描述</span>}
            >
              {getFieldDecorator('vertexDesc', {
                rules: [{ required: true, message:'点的中文描述不能为空!'}],
              })(
                <Input placeholder="请输入点的中文描述" style={{width:"100%"}}/>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row style={{fontSize:12}}>
          样式
        </Row>
        <Row type="flex" align="middle" gutter={6} style={{marginBottom:14,padding:4,borderWidth:1,borderStyle:"solid",borderColor:"#DCDCDC"}}>
          <Col span={3} style={{textAlign:"center"}}>
            {/*<div style={{width:36,height:36,borderRadius:20,background:this.state.colorValue,textAlign:"center"}}><img src={this.state.iconPath} style={{zIndex:99,width:24,marginTop:6}}/></div>*/}
            <img src={this.state.iconPath} style={{width:36,height:36,borderRadius:20,backgroundColor:this.state.colorValue}}/>
          </Col>
          <Col span={15}>
            <Input placeholder="请输入16进制色"  defaultValue="#000" style={{width:"100%"}} value={this.state.colorValue} onClick={this.showColor} />
          </Col>
          <Col span={6}>
            <Button style={{width:"100%"}} onClick={this.showIconModel}>选择图标</Button>
          </Col>
        </Row>
        <Row style={{fontSize:12}}>
          属性
        </Row>
        <Row style={{marginBottom:14,padding:4,borderWidth:1,borderStyle:"solid",borderColor:"#DCDCDC"}} gutter={12}>
          <Col span={22}>
            <Select
              style={{width:"100%"}}
              id="selectValue"
              showSearch
              allowClear={true}
              placeholder="请输入所需添加的属性值"
              optionFilterProp="children"
              onSearch={this.onSelectSearch}
              onChange={this.onSelectChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {this.props.list.map((item,index)=>{
                return(
                  <Option key={index} value={item.id}>{item.attributeName}</Option>
                )
              })}
            </Select>
          </Col>
          <Col span={2}>
            <Button  type="primary" shape="circle" icon="plus" onClick={this.addTableList}/>
          </Col>
        </Row>
        {this.state.data.length>0?<Row>
          <Table
            size="small"
            columns={this.state.columns}
            dataSource={this.state.data}
            key="attributeName"
            pagination={false}
          />
        </Row>:null}
      </Modal>
    )
  }
}
