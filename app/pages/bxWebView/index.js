/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, WebView,
  Text,
  View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import {Layout} from "../../styles/layout";

/** 配置信息的获取 */
// import {configData} from '../../store/configData';

export default class BXWebView extends Component {

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

  render() {
    return (
      <CNavigation
        leftorright={'left'}
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
      >
        {/*<WebView></WebView>*/}
        <View style={{flex: 1, ...Layout.layout.ccc}}>
          <Text style={{fontSize: 18}}>{"如何获取验证码的规则建议访问一个网页"}</Text>
        </View>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});