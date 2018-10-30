/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Vue2.0</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});