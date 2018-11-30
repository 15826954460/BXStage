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
    handle && handle instanceof Function && handle()
  }

  render() {
    const {title, titleStyle, Icon} = this.props.options
    const {leftOrRight} = this.props
    return (
      <CTouchableWithoutFeedback handle={this._navigate}>
        <View style={[styles.btn, leftOrRight === 'right' ? styles.rightButtonStyle : styles.leftButtonStyle]}>
          {
            title ? <Text
              numberOfLines={1}
              style={[titleStyle]}
            > {title} </Text> : <Image source={Icon}/>
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
    const {title, titleStyle, handle} = this.props.centerTitle
    return (
      <CTouchableWithoutFeedback onPress={handle}>
        <View style={[Layout.layout.rcc, {flex: 5}]}>
          <Text numberOfLines={1}
                style={[titleStyle]}
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
  }

  constructor(props) {
    super(props);
    this.state = {
      // 主题
      theme: props.theme,
      // 背景色
      commonBackgroundColor: props.commonBackgroundColor,
      // 状态栏样式
      barStyle: props.barStyle,
      // 导航样式
      navStyle: {
        navBackgroundColor: props.navBackgroundColor,
        borderBottomColor: props.borderBottomColor,
      },
      // 中间文字
      centerTitle: {
        handle: null,
        title: '',
        titleStyle: {color: '#000', fontSize: 16, fontWeight: 'bold'},
        ...props.centerTitle,
      },
      // 左边按钮
      leftButton: {
        title: '',
        titleStyle: {color: '#000'},
        ...props.leftButton,
        Icon: LEFT_ICON_BLACK,
        ...props.leftButton,
      },
      // 右边按钮
      rightButton: {
        title: '',
        titleStyle: {color: '#000'},
        ...props.rightButton,
        Icon: RIGHT_ICON_BLACK,
        ...props.rightButton,
      },
    };
    props.getRef instanceof Function && props.getRef(this)
  }

  /** 根据滚动动态修改导航以及状态栏的样式 */
  _fadeInBottomLine = (p) => {
    const {theme} = this.props
    let _navBackgroundColor, _barStyle, _theme
    if (theme === 'variable') {
      _navBackgroundColor = p ? (p >= 0.5 ? `rgba(255,255,255,${p})` : 'transparent') : 'transparent'
      _barStyle = (p >= 0.5) ? 'dark-content' : 'light-content'
      _theme = (p >= 0.5) ? 'dark' : 'light'
      this.setState({
        navBackgroundColor: _navBackgroundColor,
        barStyle: _barStyle,
        theme: _theme,
      })
    }
    else if (theme === 'light') {

    }
    else {

    }
    this._navWrapperInstance.setNativeProps({
      borderBottomWidth: Size.screen.pixel,
    })
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  _handleFirstConnectivityChange = (isConnected) => {
    window.console.log(`-------- 当前联网状态为 '${isConnected}-------`);
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  componentDidMount() {
    this._fadeInBottomLine()
  }

  shouldComponentUpdate(nextProps) {
    /** 针对不需要导航的页面阻止该组件没必要的render */
    return true
  }

  componentWillUnmount() {
  }

  render() {
    const {commonBackgroundColor, isSafeAreaTop, isNavContent, isSafeAreaBottom} = this.props
    const {barStyle, navBackgroundColor, theme, centerTitle, leftButton, rightButton} = this.state
    return (

      <SafeAreaView
        ref={ref => this._CNavInstance = ref}
        forceInset={{top: isSafeAreaTop ? 'always' : 'never', bottom: isSafeAreaBottom ? 'always' : 'never'}}
        style={[{
          flex: 1, backgroundColor: commonBackgroundColor,
        }]}>

        <CStatusBar ref={ref => this._statusBarInstance = ref} barStyle={barStyle}/>

        <View style={[styles.container,
          {paddingTop: isSafeAreaTop ? NAV_HEIGHT : (Size.screen.statusBarHeight + NAV_HEIGHT)}
        ]}>
          {
            isNavContent ? <View ref={ref => this._navWrapperInstance = ref}
              style={[styles.buttonWrapper,
              {height: !isSafeAreaTop ? (Size.screen.statusBarHeight + IPHONEX_NAV_HEIGHT) : NAV_HEIGHT},
              {paddingTop: !isSafeAreaTop ? Size.screen.statusBarHeight : 0},
              {backgroundColor: navBackgroundColor},
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

const styles = StyleSheet.create({
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