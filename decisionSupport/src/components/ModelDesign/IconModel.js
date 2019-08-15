import React,{Component} from 'react';
import { connect } from 'dva';
import {Modal,Row,Col,Icon,Button,Select,Input,Avatar} from 'antd';

let people='http://192.168.96.120/images/person.png';
let place='http://192.168.96.120/images/place.png';
let caseA='http://192.168.96.120/images/case.png';
let matter='http://192.168.96.120/images/matter.png';
let org='http://192.168.96.120/images/org.png';

@connect(({modelDesign}) => {
  const {iconVisible}=modelDesign;
  return{
    iconVisible
  }
})

export default class AddEntity extends Component{
  state={
    iconArr:[{
      title:"人",
      path:people,
    },{
      title:"地",
      path:place,
    },{
      title:"案",
      path:caseA,
    },{
      title:"物",
      path:matter,
    },{
      title:"组织",
      path:org,
    }]
  };

  handleEntityCancel=()=>{
    this.props.dispatch({
      type:'modelDesign/setIconVisible',
      payload:false,
    })
  };

  render(){
    return(
      <Modal
        title="图标选择"
        visible={this.props.iconVisible}
        onCancel={this.handleEntityCancel}
        footer={null}
        bodyStyle={{
          backgroundColor:"#DCDCDC"
        }}
        maskStyle={{
          backgroundColor:'rgba(0,0,0,0.45)'
        }}
        // footer={}
        // style={{top:"20%",left:"26%"}}
      >
        <Row>
          {this.state.iconArr.map((item,index)=>{
            return <Col span={4} style={{marginBottom:10}} key={index}>
              <Row type="flex" justify="center" key={index}>
                <img
                  src={item.path}
                  style={{backgroundColor:"#000",borderRadius:"50%",width:36,height:36}}
                  onClick={
                    ()=>{
                      if(this.props.getIconPath){this.props.getIconPath(item.path)}
                      this.props.dispatch({
                        type:'modelDesign/setIconVisible',
                        payload:false
                      })
                    }
                  }
                />
              </Row>
              <Row type="flex" justify="center" key={index}>
                <span style={{fontSize:12,fontWeight:"bold"}}>{item.title}</span>
              </Row>
            </Col>
          })}
        </Row>
      </Modal>
    )
  }
}
