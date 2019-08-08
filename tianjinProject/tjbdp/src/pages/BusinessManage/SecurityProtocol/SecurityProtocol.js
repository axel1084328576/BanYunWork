import React,{Component} from 'react'
import Company from '../../../components/BusinessManage/SecurityProtocol/Company/Company'
import Agreement from '../../../components/BusinessManage/SecurityProtocol/Agreement/Agreement'

export default class SecurityProtocol extends Component{
  state={
    status:true
  };

  setStatus=(value)=>{
    this.setState({
      status:value,
    })
  }

  render(){
    const {status}=this.state;
    return(
      status?<Company setStatus={this.setStatus} />:<Agreement setStatus={this.setStatus}/>
    )
  }
}