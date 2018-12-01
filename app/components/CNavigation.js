/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Dimensions, Text, View, Image, Platform, StatusBar, NetInfo
} from "react-native";

/** 全局样式的引用 */
import Layout from "../styles/layout";
import Size from "../styles/size";

/** 第三方依赖库的引用 */
import {SafeAreaView, withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import DeviceInfo from "react-native-device-info";

/** 自定义组建的引用 */
import CTouchableWithoutFeedback from './CTouchableWithoutFeedback';
import CStatusBar from './CStatusBar';
import Util from "../utils/util";

/** 自定义工具方法的引用 */

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽高
const
  LEFT_ICON_BLACK = require('../images/common/navig_img_back_black.png'),
  LEFT_ICON_WHITE = require('../images/common/navig_img_back_white.png'),
  RIGHT_ICON_BLACK = require('../images/common/navig_img_back_black.png'),
  RIGHT_ICON_WIGHT = require('../images/common/navig_img_back_white.png'),
  NAV_HEIGHT = 44,
  IPHONEX_NAV_HEIGHT = 44,
  WHITE_COLOR = Layout.color.white_bg,
  BLACK_COLOR = Layout.color.black;

@withNavigation
class ButtonItem extends Component {
  static propTypes = {
    options: PropTypes.object,
    leftOrRight: PropTypes.string,
  }

  static defaultProps = {
    options: {},
    leftOrRight: ''
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  _navigate = () => {
    const {handle} = this.props.options
    /** 执行特定的事件 */
    if (handle && handle instanceof Function) {
      handle()
      return
    }
    this.props.navigation.pop()
  }

  render() {
    const {title, Icon, disabled, color, fontSize, opacity} = this.props.options
    const {leftOrRight} = this.props
    return (
      <CTouchableWithoutFeedback handle={this._navigate}>
        <View style={[styles.btn, leftOrRight === 'right' ? styles.rightButtonStyle : styles.leftButtonStyle]}>
          {
            title ? <Text
              numberOfLines={1}
              style={[{color: color, fontSize: fontSize, opacity: opacity}]}
            > {title} </Text> : !disabled ? <Image source={Icon}/> : null
          }
        </View>
      </CTouchableWithoutFeedback>
    )
      ;
  }
}


@withNavigation
class TitleItem extends Component {

  static propTypes = {
    centerTitle: PropTypes.object,
  }

  static defaultProps = {
    centerTitle: {},
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title, handle, color, fontSize, opacity} = this.props.centerTitle
    return (
      <CTouchableWithoutFeedback onPress={handle}>
        <View style={[Layout.layout.rcc, {flex: 5}]}>
          <Text numberOfLines={1}
                style={[{color: color, fontSize: fontSize, opacity: opacity, fontWeight: 'bold'}]}
          >{title}</Text>
        </View>
      </CTouchableWithoutFeedback>
    );
  }
}

@withNavigation
export default class CNavigation extends Component {

  static propTypes = {
    getRef: PropTypes.func,
    commonBackgroundColor: PropTypes.string,
    navBackgroundColor: PropTypes.string,
    isSafeAreaTop: PropTypes.bool,
    isSafeAreaBottom: PropTypes.bool,
    isNavContent: PropTypes.bool,
    theme: PropTypes.oneOf(['dark', 'light', 'variable']),
    barStyle: PropTypes.string,
    translucent: PropTypes.bool,
    whiteOrBlack: PropTypes.string,
  }

  static defaultProps = {
    getRef: null,
    commonBackgroundColor: Layout.color.white_bg, // 视图的背景颜色 默认白色
    navBackgroundColor: Layout.color.white_bg, // 导航的背景颜色 默认白色
    isSafeAreaTop: true, // 顶部安全区域
    isSafeAreaBottom: true, // 底部安全区域
    isNavContent: true, // 是否需要导航
    theme: 'dark', // 导航的主题颜色
    barStyle: 'dark-content', // 状态栏的颜色
    translucent: false, // 是否是沉浸式状态
    whiteOrBlack: 'black',
  }

  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme, // 主题
      commonBackgroundColor: props.commonBackgroundColor, // 背景色
      barStyle: props.barStyle, // 状态栏样式
      // 导航样式
      navStyle: {
        backgroundColor: Layout.color.white_bg,
        ...props.navStyle,
      },
      // 中间文字
      centerTitle: {
        handle: null,
        title: '',
        color: Layout.color.black,
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 1,
        ...props.centerTitle,
      },
      // 左边按钮
      leftButton: {
        title: '',
        Icon: props.whiteOrBlack === 'white' ? LEFT_ICON_WHITE : LEFT_ICON_BLACK,
        color: Layout.color.black,
        fontSize: 14,
        opacity: 1,
        disabled: false,
        ...props.leftButton,
      },
      // 右边按钮
      rightButton: {
        title: '',
        Icon: props.whiteOrBlack === 'white' ? LEFT_ICON_WHITE : LEFT_ICON_BLACK,
        disabled: true,
        color: Layout.color.black,
        fontSize: 14,
        opacity: 1,
        ...props.rightButton,
      },
    };
    props.getRef instanceof Function && props.getRef(this)
  }

  /** 根据滚动动态修改导航以及状态栏的样式 */
  _fadeInNavStyle = (p) => {
    const {theme} = this.props
    /** 渐变导航 */
    if (theme === 'variable') {
      let _navBackgroundColor, _borderBottomWidth, _barStyle, _Icon, _opacity
      _navBackgroundColor = p ? (p >= 0.5 ? `rgba(255,255,255,${p})` : 'transparent') : 'transparent'
      _borderBottomWidth = p ? (p > 0.5 ? Size.screen.pixel : 0) : 0
      _barStyle = p ? (p >= 0.5 ? 'dark-content' : 'light-content') : 'light-content'
      _Icon = (p >= 0.5) ? LEFT_ICON_BLACK : LEFT_ICON_WHITE
      _opacity = (p >= 0.5) ? (p >= 1 ? 1 : p) : 0
      this.setState({
        navBackgroundColor: _navBackgroundColor,
        barStyle: _barStyle,
        leftButton: {
          Icon: _Icon,
        },
        centerTitle: {
          ...this.state.centerTitle,
          opacity: Number(_opacity),
        },
        navStyle: {
          ...this.state.navStyle,
          backgroundColor: _navBackgroundColor,
          borderBottomWidth: _borderBottomWidth,
        }
      })
    }
    else if (theme === 'light') {

    }
    else {
      /** 底部下滑线的显示 */
      let _navBackgroundColor, _borderBottomWidth
      _navBackgroundColor = p ? (p > 0.2 ? `rgba(255,255,255,1)` : 'transparent') : 'transparent'
      _borderBottomWidth = p ? (p > 0.2 ? Size.screen.pixel : 0) : 0
      this.setState({
        navStyle: {
          ...this.state.navStyle,
          backgroundColor: _navBackgroundColor,
          borderBottomWidth: _borderBottomWidth,
        }
      })
    }
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  _handleFirstConnectivityChange = (isConnected) => {
    // window.console.log(`-------- 当前联网状态为 '${isConnected}-------`);
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps) {
    /** 针对不需要导航的页面阻止该组件没必要的render */
    return true
  }

  componentWillUnmount() {
  }

  render() {
    const {isSafeAreaTop, isNavContent, isSafeAreaBottom, translucent} = this.props
    const {theme, commonBackgroundColor, navStyle, centerTitle, leftButton, rightButton, barStyle} = this.state
    return (

      <SafeAreaView
        ref={ref => this._CNavInstance = ref}
        forceInset={{top: isSafeAreaTop ? 'always' : 'never', bottom: isSafeAreaBottom ? 'always' : 'never'}}
        style={[{
          flex: 1, backgroundColor: commonBackgroundColor,
        }]}>

        <CStatusBar ref={ref => this._statusBarInstance = ref} barStyle={barStyle}/>

        <View style={[styles.container,
          {paddingTop: translucent ? 0 : (isSafeAreaTop ? NAV_HEIGHT : (Size.screen.statusBarHeight + NAV_HEIGHT))}
        ]}>
          {
            isNavContent ? <View
              ref={ref => this._navWrapperInstance = ref}
              style={[styles.buttonWrapper,
                {height: (isSafeAreaTop ? NAV_HEIGHT : (Size.screen.statusBarHeight + NAV_HEIGHT))},
                {paddingTop: !isSafeAreaTop ? Size.screen.statusBarHeight : 0},
                {...navStyle}
              ]}>
              <ButtonItem theme={theme} options={leftButton} leftOrRight={'left'}/>
              <TitleItem theme={theme} centerTitle={centerTitle}/>
              <ButtonItem theme={theme} options={rightButton} leftOrRight={'right'}/>
            </View> : null
          }
          {this.props.children}
        </View>
      </SafeAreaView>

    );
  }
}

const
  styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      width: Size.screen.width,
    },
    buttonWrapper: {
      position: 'absolute',
      width: width,
      zIndex: 999,
      top: 0,
      ...Layout.layout.rsbc,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 2,
    },
    leftButtonStyle: {
      justifyContent: 'flex-start',
      paddingLeft: 12,
    },
    rightButtonStyle: {
      justifyContent: 'flex-end',
      paddingRight: 12
    }
  });