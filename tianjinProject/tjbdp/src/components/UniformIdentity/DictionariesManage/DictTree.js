import React,{Component} from 'react';
import { Tree,Button } from 'antd';
import { connect } from "dva/index";

const {TreeNode} = Tree;

@connect(({ dictionaries }) => {
  const { dictTreeList} = dictionaries;
  return {
    dictTreeList,
  };
})

class DictTree extends Component {
  state={
    selectKeys:null,
    loadedKeys:[],
  };

  componentDidMount(){
    // console.log("this.props.dictTreeList",this.props.dictTreeList)
    const {dispatch}=this.props;
    dispatch({
      type: "dictionaries/Tree",
      payload: {
        token: sessionStorage.getItem("sys-token")
      },
      callback:(values)=>{
       this.props.updataTreeData(values)
      }
    });
  }

  onLoadData = (treeNode) => {
    // console.log("触发了这里");
    // console.log("treeNode",treeNode)
    // props 中的数据源 unitTreeData
    const { dispatch} = this.props;
    // 调后台接口传递的参数
    // console.log("dictTreeList",dictTreeList);
    // console.log("treeNode.props.dataRef.id",treeNode.props);
    const params = {
      // 点击的节点Id
      pid: treeNode.props.dataRef.id
    };
    // 发送 action 请求
    return new Promise((resolve) => {
      // console.log("resolve",resolve);
      // console.log("treeNode.props.children",treeNode.props.children);
      if (treeNode.props.children) {
        resolve();
        return;
      }
      // unitTree为命名空间，fetch 为effects 中的方法
      dispatch({
        type: 'dictionaries/Tree',
        payload: params,
        // 回调函数，防止请求的数据不同步
        callback: (values) => {
          treeNode.props.dataRef.children =values;
          // treeData 为数据源
          this.props.updataTreeData([...this.props.treeData]);
          this.setState({loadedKeys:[]});
          // this.onLoadData(this.state.selectKeys[0]);
          resolve();
        }
      });
    });
  };

  renderTreeNodes = (data) => {
    // console.log("触发了哪里")
   // console.log("data",data);
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.text} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.text} key={item.id}  isLeaf={item.isLeaf} dataRef={item} />;
    });
  };

  selectMenu=(selectKeys,e) => {
    const {dispatch}=this.props;
    // console.log("selectKeys",selectKeys);
    // console.log("e",e);
    // console.log("e.node.props.dataRef.id",e.node.props.dataRef.id);
    if(this.state.selectKeys!=selectKeys  && selectKeys.length>=1){
      this.setState({
        selectKeys:selectKeys,
      });
      if(this.props.changeDel1){
        this.props.changeDel1(selectKeys)
      }
      if(this.props.setValue){
        this.props.setValue([])
      }
      this.props.dispatch({
        type:'dictionaries/setTreeData',
        payload:{
          treeId:selectKeys[0],
        }
      });
      dispatch({
        type: 'dictionaries/List',
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
        // multiple
        loadedKeys={this.state.loadedKeys}
        selectedKeys={this.state.selectKeys}
        // defaultExpandedKeys={["ec114bef-2706-4013-ae2a-ff996ce02f34"]}
        loadData={this.onLoadData}
        onSelect={this.selectMenu}
      >
        {this.renderTreeNodes(this.props.treeData)}
      </Tree>
    );
  }
}

export default DictTree;


