/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

/** 全局样式的引用 */
import {Layout, CommonStyle} from "../../styles/layout";

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

/** 自定义组建的引用 */
export default class BottomText extends Component {
  static propTypes = {
    normalText: PropTypes.string,
    clickText: PropTypes.string,
    handle: PropTypes.func,
  }
  static defaultProps = {
    normalText:'', // 还没有账号？
    clickText: '', // 注册
    handle: null,
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

  _goToOtherPage=() =>{
    this.props.handle instanceof Function && this.props.handle()
  }
  render() {
    const {normalText, clickText} = this.props
    return (
      <Text style={styles.bottomText}>
        {normalText}
        <Text style={styles.bottomTextRightColor}
              onPress={this._goToOtherPage}>
          {clickText}
        </Text>
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  bottomText: {
    ...CommonStyle.bottomTextSize,
  },
  bottomTextRightColor: {
    color: Layout.color.worange,
  }
});