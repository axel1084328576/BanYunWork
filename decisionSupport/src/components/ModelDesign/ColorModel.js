import React,{Component} from 'react';
import { connect } from 'dva';
import { SketchPicker } from 'react-color'
import {Modal,Select,} from 'antd'
// import styles from './ModelDesign.less';

@connect(({modelDesign}) => {
    const {colorVisible}=modelDesign;
    return{
      colorVisible
    }
})

export default class ColorModel extends Component{


  handleChangeComplete = (color) => {
    // console.log(color.hex);
    if(this.props.getColorValue){
      this.props.getColorValue(color.hex)
    }
  };

  onCancel=()=>{
    this.props.dispatch({
      type:'modelDesign/setColorVisible',
      payload:false
    })
  };

  render(){
    return(
      <div>
        <Modal
          visible={this.props.colorVisible}
          onCancel={this.onCancel}
          footer={null}
          width={220}
          closable={false}
          bodyStyle={{
            padding:0
          }}
          maskStyle={{
            backgroundColor:'rgba(0,0,0,0.45)'
          }}
          style={{top:"16%",left:"14%"}}
        >
          <SketchPicker
            onChange={this.handleChangeComplete}
          />
        </Modal>
      </div>
    )
  }
}
