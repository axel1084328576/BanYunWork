import React,{Component} from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

class UserOrganizationTree extends Component {
  state={
    selected:null,
  }
  
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }

  selectOrganization = (selectKeys,e) => { 
    const {rootKey, 
          dispatch,
          current,
          pageSize,} = this.props;
     if(this.state.selected!=selectKeys && selectKeys.length>=1){
        // console.log("执行了");
        this.setState({selected:selectKeys});
        if(this.props.setValue){
          this.props.setValue([])
        }
        dispatch({
          type:'usermanage/getUserData',
          payload:{
            orgId: e.node.props.dataRef.key,
            page:1,
            pageSize
          }
        });
        dispatch({
          type:'usermanage/setSelectOrganization',
          payload:{
            selectOrganizationKeys: selectKeys,
          }
        });
      }
  }

  render() {
    return (
      <Tree
        // defaultExpandAll={true}
        selectedKeys={this.state.selected}
        onSelect={this.selectOrganization}
      >
        {this.renderTreeNodes(this.props.organizationTree)}
      </Tree>
    );
  }
}

export default UserOrganizationTree;