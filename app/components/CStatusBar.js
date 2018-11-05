/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, StatusBar,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */
const
  STATUS_BAR_LIGHT_THEME = 'light-content',
  STATUS_BAR_DARK_THEME = 'dark-content';

export default class Vue2 extends Component {

  static propTypes = {
    barStyle: PropTypes.string,
  }

  static defaultProps = {
    barStyle: STATUS_BAR_LIGHT_THEME,
  }

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
    const {barStyle} = this.props
    return (
      <StatusBar
        animated={false} // 是否启用动画
        hidden={false} // 是否隐藏状态栏
        backgroundColor={'transparent'} // 状态栏的背景色(android平台特有属性)
        translucent={true} // 是否沉浸式绘制(android平台特有属性)
        barStyle={barStyle} // 设置状态栏文本的颜色 'default', 'light-content', 'dark-content'
        showHideTransition={'fade'} // 显示或隐藏状态栏时所使用的动画效果(ios特有属性: 'slide' , 'fade')
        networkActivityIndicatorVisible={true} // 指定是否显示网络活动提示符。
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});