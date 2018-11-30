/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, ImageBackground, Image,
} from "react-native";

/** 全局样式的引用 */
import Layout from "../../../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';


/** 页面的引入 */
import ProblemType from './problemType';
import ProblemList from './problemList';

/** 工具类的引用 */
/** 常量声明 */

export default class CommonProblem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      typeID: 1,
    };
  }

  componentDidMount() {
    // bouncedUtils.noticesBottom.show()
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

  _selectType = (typeID) => {
    this.setState({typeID: typeID})
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
          <ProblemType selectProblemType={this._selectType}/>

          <ProblemList typeID={this.state.typeID}/>

        </ScrollView>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});