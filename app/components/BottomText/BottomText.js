/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Dimensions,
  Text,
  View,
} from "react-native";

/** 全局样式的引用 */
import Layout from "../../styles/layout";

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

/** 自定义组建的引用 */
export default class BottomText extends Component {
  static propTypes = {
    normalText: PropTypes.string,
    clickText: PropTypes.string,
    handle: PropTypes.func,
  }
  static defaultProps = {
    normalText: '', // 还没有账号？
    clickText: '', // 注册
    handle: null,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillMount() {}

  componentWillUnmount() {}

  /** 页面切换 */
  _goToOtherPage = () => {
    this.props.handle instanceof Function && this.props.handle()
  }

  render() {
    const {normalText, clickText} = this.props
    return (
      <View style={styles.bottomTextWrapper}>
        <Text style={styles.bottomText}>
          {normalText}
          <Text style={styles.bottomTextRightColor}
                onPress={this._goToOtherPage}>
            {clickText}
          </Text>
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bottomTextWrapper: {
    // position: 'absolute',
    bottom: 23,
    width: width,
    ...Layout.layout.rcc,
  },
  bottomText: {
    fontSize: Layout.font.Subtle2,
    color: Layout.color.wgray_main,
    height: 20,
    lineHeight: 20,
  },
  bottomTextRightColor: {
    color: Layout.color.worange,
  }
});