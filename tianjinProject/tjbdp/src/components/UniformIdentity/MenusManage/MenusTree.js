import React,{Component} from 'react';
import { Tree,Button } from 'antd';
import { connect } from "dva/index";

const {TreeNode} = Tree;

class MenusTree extends Component {
  state={
    selectId:'',
    selectKeys:null,
  };

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.text} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.text} key={item.id} dataRef={item} />;
    });
  };

  selectMenu = (selectKeys,e) => {
    const {dispatch,selectKey,onChange}=this.props;
    // console.log("selectKeys",selectKeys);
    // // console.log("e",e);
    // console.log("e.node.props.dataRef.id",e.node.props.dataRef.id);
    if(this.state.selectKeys!=selectKeys && selectKeys.length>=1){
      // console.log("有执行");
      this.setState({
        selectKeys:selectKeys,
      });
      if(selectKey){
        selectKey(selectKeys[0])
      }
      if(onChange){
        onChange([],[])
      }
      dispatch({
        type: 'menusmanage/List',
        payload: {
          pid: selectKeys[0],
          token: sessionStorage.getItem('sys-token'),
        }
      });
    }
  };

  render() {
    return (
      <Tree
        // defaultExpandAll={true}
        selectedKeys={this.state.selectKeys}
        onSelect={this.selectMenu}
      >
        {this.renderTreeNodes(this.props.menuTree)}
      </Tree>
    );
  }
}

export default MenusTree;


