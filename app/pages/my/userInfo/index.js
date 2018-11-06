/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, StatusBar,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

export default class UserInfo extends Component {

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
    return true
  }

  render() {
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        LeftOrRight={'left'}
      >
        <View style={styles.container}>
          <Text>Vue2.0</Text>
        </View>
      </CNavigation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layout.layout.ccc,
  }
});