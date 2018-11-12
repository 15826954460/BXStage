/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, ImageBackground, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';


/** 页面的引入 */
import ProblemList from './problemType';

/** 工具类的引用 */

/** 常量声明 */

export default class CommonProblem extends Component {

  _contentWidth = 0;

  constructor(props) {
    super(props);
    this.state = {
      defaultType: 1,
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
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        centerTitle={{
          title: '常见问题',
          titleStyle: {
            color: Layout.color.black,
            fontSize: 18,
            fontWeight: 'bold',
          }
        }}
      >
        <ScrollView
          style={styles.container}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <ProblemList/>

          <ScrollView>

          </ScrollView>

        </ScrollView>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
});