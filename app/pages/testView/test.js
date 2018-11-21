/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

class ChildCom extends Component {

  constructor(props) {
    super(props);
    this.state = {viewRef: null};
    props.getRef instanceof Function && props.getRef(this)  // 父组件获取子组件实例
  }

  _con = () => {
  }

  render() {
    return (
      <Text onPress={() => store.tick()} style={{fontSize: 50}}>{'我是子组件'}</Text>
    );
  }
}

export default class ParentCom extends Component {

  constructor(props) {
    super(props);
    this.state = {viewRef: null};
  }


  render() {
    return (
      <View style={styles.container}
            >
        <Text onPress={() => this._childInstance._con()} style={{fontSize: 50, color: 'red'}}>{'我是父组件11111'}</Text>
        <ChildCom getRef={ref => this._childInstance = ref}/>
        <ChildCom ref={ref => this._childInstanceTwo = ref}/>
        <Text onPress={() => this._childInstanceTwo._con()} style={{fontSize: 50, color: 'red'}}>{'我是父组件2222'}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
});