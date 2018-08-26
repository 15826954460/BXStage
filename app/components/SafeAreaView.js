import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import Util from "../utils/util";
import Size from '../styles/size';
import Layout from "../styles/Layout";

const {width, height, iPhoneXHomeIndicatorAreaHeight} = Size.screen

export default class SafeAreaView extends Component {
  static propTypes = {
    wrapStyle: ViewPropTypes.style,
    areaAspectMode: PropTypes.oneOf(['AreaTop', 'AreaBottom', 'AreaBoth', 'AreaNone']),
    isContainNav: PropTypes.bool
  }

  static defaultProps = {
    areaAspectMode: 'AreaBoth',
    isContainNav: false
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // const {statusBarStates, navigation, customizeStatusBar} = this.props
    // statusBarStates && (this._didBlurSubscription = Util.didFocus(navigation,customizeStatusBar))
  }

  componentWillUnmount() {
    const {statusBarStates} = this.props
    // statusBarStates && this._didBlurSubscription.remove()
  }

  _wrapStyle() {
    const {isContainNav, areaAspectMode, theme} = this.props || {
      isContainNav: false,
      areaAspectMode: 'AreaBoth',
      theme: 'default',
    }
    if (!Util.isAndroid) {
      // ios 手机的安全区域的配置
      if (areaAspectMode === 'AreaTop') {
        // 只有顶部安全区域
        return [Style.wrap, isContainNav ? Style.area_top_nav : Style.area_top]
      }
      else if (areaAspectMode === 'AreaBottom') {
        // 只有底部安全区域
        return [Style.wrap, Style.area_bottom]
      }
      else if (areaAspectMode === 'AreaBoth') {
        // 整个的安全区域
        return [Style.wrap, isContainNav ? Style.area_top_nav : Style.area_top, Style.area_bottom]
      }
    }
    return [Style.wrap, theme !== 'light' ? (isContainNav ? Style.area_top_nav : Style.area_top_android_translucent) : 0]//android
  }

  render() {
    const {wrapStyle} = this.props
    return (
      <View style={[this._wrapStyle(), wrapStyle]}>
        {this.props.children}
      </View>
    )
  }
}
const Style = StyleSheet.create({
  wrap: {
    flex: 1,
    width,
    backgroundColor: Layout.color.nav_bg,
    ...Layout.layout.cfsc
  },
  // 获取状态栏的高度，不存在 nav
  area_top: {
    paddingTop: Size.statusBar.height
  },
  // 存在导航的时候的高度为状态栏和导航栏的高度和
  area_top_nav: {
    // paddingTop: Size.navBar.navBarHeight
  },
  // 安卓手机的状态栏的高度
  area_top_android_translucent: {
    paddingTop: Size.apiLevel >= Size.translucentLevel ? Size.statusBar.height : 0
  },
  // 获取底部安全区域，根据是不是 iPhone 手机来做适配
  area_bottom: {
    paddingBottom: Util.isIPhoneX ? iPhoneXHomeIndicatorAreaHeight : 0
  }
})
