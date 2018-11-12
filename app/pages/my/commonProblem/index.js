/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View,ScrollView,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import {Layout} from "../../../styles/layout";

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

export default class CommonProblem extends Component {

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
        centerTitle={{
          title: '用户反馈',
          titleStyle: {
            color: Layout.color.black,
            fontSize: 18,
            fontWeight: 'bold',
          }
        }}
      >
        <ScrollView >
          <View style={styles.container}>
            <Text>Vue2.0</Text>
          </View>
        </ScrollView>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.white_bg
  }
});