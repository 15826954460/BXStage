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

import {observable, computed, action, decorate} from "mobx";
import {observer} from 'mobx-react';

class Timer {
  @observable number = 0;

  @action
  tick() {
    console.log(this.number)
    this.number += 1;
    console.log(this.number)
  }
}

const store = new Timer()

// console.log(store.number)

@observer
export default class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {viewRef: null};
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => store.tick()} style={{fontSize: 50}}>{99999}</Text>
        <Text>{store.number}</Text>
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