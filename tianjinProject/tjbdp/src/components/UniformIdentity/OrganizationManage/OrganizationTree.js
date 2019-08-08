import React,{Component} from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

class OrganizationTree extends Component {
  state={
    selected:null
  };

  componentDidMount(){
    this.props.dispatch({
      type:'organizationmanage/getPartOrganizationTree',
      payload:{
        pid:1,
      },
    });
  }
  
  onExpand = (expandedKeys, {expanded,node}) => {
    // console.log(node); 树节点
    // console.log(expandedKeys); //树节点keys
    // console.log(expanded); //树节点展开状态 true/false
    if(expanded){
      return new Promise((resolve,reject) => {
        this.props.dispatch({
          type:'organizationmanage/getPartOrganizationTree',
          payload:{
            pid:node.props.dataRef.key,
          },
        });
        resolve();
        return;
      });
    }
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode {...item} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  };

  selectOrganization = (selectKeys,e) => {  
    const {dispatch,rootKey,current,pageSize} = this.props;
    // console.log(selectKeys);
    // console.log(e);
    // console.log(e.node.props.dataRef.key);
    // console.log(rootKey);
    // if(this.state.selected!=selectKeys && selectKeys.length>=1){
    //
    // }
    //
    // if(e.node.props.dataRef.key !== rootKey && !e.selected && selectKeys.length>=1){
    //   return false;
    // }else{
    if(this.state.selected!=selectKeys && selectKeys.length>=1){
        this.setState({selected:selectKeys});
          if(this.props.setValue){
            this.props.setValue([])
          }
        dispatch({
          type:'organizationmanage/selectOrganization',
          payload:{
            pid: selectKeys[0],
            page:1,
            pageSize,
          }
        });
       
        dispatch({
          type:'organizationmanage/setSelectOrganization',
          payload:{
            selectOrganizationKeys: selectKeys,
          }
        });
      }
  }

  render() {
    return (
      <Tree
        onExpand={this.onExpand}  
        selectedKeys={this.state.selected}
        onSelect={this.selectOrganization}
      >
        {this.renderTreeNodes(this.props.organizationTree)}
      </Tree>
    );
  }
}

export default OrganizationTree;