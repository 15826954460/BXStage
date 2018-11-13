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

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arr: [1,1,3,3]
    };
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
        {
          this.state.arr.map((item, index) => {
            return <Text key={index} onPress={() => {
              this.setState({
                arr: this.state.arr.concat([7,8,8,8,8])
              })
            }}>{item}</Text>
          })
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});