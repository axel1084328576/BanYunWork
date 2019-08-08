import React,{Component} from 'react';
import {Card} from 'antd';
import {connect} from 'dva';
import OutsideInterfaceTable from '@/components/OutsideInterface/OutsideInterfaceTable';
import PerInterfaceTable from '@/components/OutsideInterface/PerInterfaceTable';
import InterfaceParamsTable from '@/components/OutsideInterface/InterfaceParamsTable';

@connect(({ outsideinterface, loading }) => ({
  outsideinterface,
  loading,
}))

class OutsideInterface extends Component{
  
  componentWillMount(){
  	this.props.dispatch({
  		type:'outsideinterface/setShowState',
  		payload:{
  			interfaceListShow:true,
		    interfaceParamsShow:false,
		    perInterfaceListShow:false,
  		},
  	});
  }

  componentDidMount(){
  	this.props.dispatch({
  		type:'outsideinterface/getOutsideInterface',
  		payload:{
  			
  		},
  	});
  }

  render(){
  	const {
  		interfaceList,
	    perInterfaceList,
	    paramsFormatContent,
	    interfaceListShow,
	    interfaceParamsShow,
	    perInterfaceListShow,
	} = this.props.outsideinterface;

  	const OutsideInterfaceTableProps={
  		interfaceList,
	    perInterfaceList,
	    paramsFormatContent,
	    dispatch:this.props.dispatch,
  	};

  	const PerInterfaceTableProps={
  		perInterfaceList,
	    dispatch:this.props.dispatch,
  	}

  	const InterfaceParamsTableProps={
	    paramsFormatContent,
	    dispatch:this.props.dispatch,
  	}

    return (
      <Card
        bordered={false}
      >
      	{
      		interfaceListShow && <OutsideInterfaceTable {...OutsideInterfaceTableProps} />
      	}
      	{
      		perInterfaceListShow && <PerInterfaceTable {...PerInterfaceTableProps} />
      	}
      	{
      		interfaceParamsShow && <InterfaceParamsTable {...InterfaceParamsTableProps} />
      	}
      </Card>
    );
  }
}

export default OutsideInterface;
