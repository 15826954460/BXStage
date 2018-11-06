/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Dimensions, Text, View, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../styles/layout";

/** 第三方依赖库的引用 */
import {SafeAreaView, withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

/** 自定义组建的引用 */
import CTouchableWithoutFeedback from './CTouchableWithoutFeedback';
import CStatusBar from './CStatusBar';
import {Size} from "../styles/size";

/** 自定义工具方法的引用 */

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽高
const
  LEFT_ICON_BLACK = require('../images/common/navig_img_back_black.png'),
  LEFT_ICON_WHITE = require('../images/common/navig_img_back_white.png'),
  RIGHT_ICON = require('../images/common/common_img_arrow.png'),
  WHITE_COLOR = Layout.color.white_bg,
  BLACK_COLOR = Layout.color.black;

class LeftButtonItem extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['dark', 'light', 'variable']),
    leftButton: PropTypes.shape({
      isShowTitle: PropTypes.bool,
      title: PropTypes.string,
      isShowIcon: PropTypes.bool,
      iconStyle: PropTypes.object,
      handle: PropTypes.func,
      titleStyle: PropTypes.object,
    }),
  }

  static defaultProps = {
    theme: 'dark', // 导航的主题颜色
  }

  constructor(props) {
    super(props);
    this.defaultLeftButton = {
      isShowTitle: false,
      title: '左',
      isShowIcon: false,
      handle: null,
      iconStyle: {
        width: 23,
        height: 23,
      }, // 默认icon样式
      titleStyle: {
        fontSize: 16,
      }, // 默认文案的样式
    };
    this.state = {};
  }

  componentDidMount() {
  }

  _navigate = () => {
    const {handle} = Object.assign(this.defaultLeftButton, this.props.leftButton)
    /** 执行特定的事件 */
    if (handle && handle instanceof Function) {
      handle()
    }
    /** 左边按钮默认返回上一页 */
    else {
      this.props.navigation.pop()
    }
  }

  render() {
    const {isShowTitle, title, titleStyle, iconStyle, isShowIcon} = Object.assign(this.defaultLeftButton, this.props.leftButton)
    const {theme} = this.props
    return (
      <CTouchableWithoutFeedback handle={this._navigate}>
        <View style={styles.btn}>
          {
            isShowTitle ? <Text
                style={[titleStyle, {color: theme === 'light' ? WHITE_COLOR : BLACK_COLOR}]}
                numberOfLines={1}> {title} </Text>
              : isShowIcon ?
              <Image source={theme === 'dark' ? LEFT_ICON_BLACK : LEFT_ICON_WHITE} style={iconStyle}/> : null
          }
        </View>
      </CTouchableWithoutFeedback>
    );
  }
}

withNavigation(LeftButtonItem)

class RightButtonItem extends Component {
  static propTypes = {
    // theme: PropTypes.oneOf(['dark', 'light', 'variable']),
    rightButton: PropTypes.shape({
      isShowTitle: PropTypes.bool,
      title: PropTypes.string,
      isShowIcon: PropTypes.bool,
      iconStyle: PropTypes.object,
      handle: PropTypes.func,
      titleStyle: PropTypes.object,
    }),
  }

  static defaultProps = {
    // theme: 'dark', // 导航的主题颜色
  }

  constructor(props) {
    super(props);
    this.defaultRightButton = {
      isShowTitle: false,
      title: '右',
      isShowIcon: false,
      handle: null,
      iconStyle: {
        width: 23,
        height: 23,
      }, // 默认icon样式
      titleStyle: {
        color: '#000'
      }, // 默认文案的样式
    };
    this.state = {};
  }

  _navigate = () => {
    const {handle} = Object.assign(this.defaultRightButton, this.props.rightButton)
    /** 执行特定的事件 */
    if (handle && handle instanceof Function) {
      handle()
    }
  }

  render() {
    const {isShowTitle, title, titleStyle, iconStyle, isShowIcon} = Object.assign(this.defaultRightButton, this.props.rightButton)
    const {theme} = this.props
    return (
      <CTouchableWithoutFeedback handle={this._navigate}>
        <View style={[styles.btn, {justifyContent: 'flex-end',}]}>
          {
            isShowTitle ? <Text
                style={[titleStyle, {color: theme === 'light' ? WHITE_COLOR : BLACK_COLOR}]}
                numberOfLines={1}> {title} </Text>
              : isShowIcon ?
              <Image source={theme === 'dark' ? RIGHT_ICON : RIGHT_ICON} style={iconStyle}/> : null
          }
        </View>
      </CTouchableWithoutFeedback>
    );
  }
}

withNavigation(RightButtonItem)

class TitleItem extends Component {
  static propTypes = {
    // theme: PropTypes.toString,
    titleStyle: PropTypes.object,
    centerTitle: PropTypes.shape({
      title: PropTypes.string,
      handle: PropTypes.func,
    })
  }

  static defaultProps = {
    // theme: 'dark'
  }

  constructor(props) {
    super(props);
    this.defaultcenterTitle = {
      handle: null,
      title: '',
      titleStyle: {
        color: '#000',
      }, // 导航文字样式
    };
    this.state = {};
  }

  render() {
    const {title, titleStyle, handle} = Object.assign(this.defaultcenterTitle, this.props.centerTitle)
    const {theme} = this.props
    return (
      <CTouchableWithoutFeedback onPress={handle}>
        <View>
          <Text
            style={[titleStyle, {color: theme === 'light' ? WHITE_COLOR : BLACK_COLOR}]}
            numberOfLines={1}>
            {title ? title : null}
          </Text>
        </View>
      </CTouchableWithoutFeedback>
    );
  }
}

withNavigation(TitleItem)

class CNavigation extends Component {

  static propTypes = {
    getRef: PropTypes.func,
    LeftOrRight: PropTypes.string,
    commonBackgroundColor: PropTypes.string,
    navBackgroundColor: PropTypes.string,
    isPaddingTop: PropTypes.bool,
    isSafeArea: PropTypes.bool,
    isNavContent: PropTypes.bool,
    theme: PropTypes.oneOf(['dark', 'light', 'variable']),
    barStyle: PropTypes.string,
  }

  static defaultProps = {
    getRef: null,
    commonBackgroundColor: Layout.color.white_bg, // 视图的背景颜色
    navBackgroundColor: Layout.color.white_bg, // 导航的背景颜色
    LeftOrRight: 'all',
    isPaddingTop: true, // 默认有paddingTop
    isSafeArea: true, // 是否设置安全区域
    isNavContent: true, // 是否需要导航
    theme: 'dark', // 导航的主题颜色
    barStyle: 'dark-content',
  }

  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme,
      barStyle: props.barStyle,
      navBackgroundColor: props.navBackgroundColor,
    };
    props.getRef instanceof Function && props.getRef(this)
  }
  componentWillMount() {
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

  /** 修改导航以及状态栏的样式 */
  _fadeInBottomLine = (p) => {
    const {theme} = this.props
    let _navBackgroundColor, _barStyle, _theme
    if (theme === 'variable') {
      _navBackgroundColor = p ? ( p >= 0.8 ? `rgba(255,255,255,${p})` : 'transparent') : 'transparent'
      _barStyle = (p >= 0.8) ? 'light-content' : 'dark-content'
      _theme = (p >= 0.8) ? 'transparent' : '#fff'
    }
    else if (theme === 'light') {
      _navBackgroundColor = 'transparent'
      _barStyle = 'light-content'
      _theme='light'
    }
    else {
      _navBackgroundColor = WHITE_COLOR
      _barStyle = 'dark-content'
      _theme='dark'
    }
    this.setState({
      navBackgroundColor: _navBackgroundColor,
      barStyle: _barStyle,
      theme: _theme,
    })
  }

  render() {
    const {LeftOrRight, commonBackgroundColor, isPaddingTop, isSafeArea, isNavContent} = this.props
    const {barStyle, navBackgroundColor, theme} = this.state
    return (

      <SafeAreaView
        ref={ref => this._CNavInstance = ref}
        forceInset={{top: isSafeArea ? 'always' : 'never'}}
        style={[{
          flex: 1, backgroundColor: commonBackgroundColor
        }]}>

        <CStatusBar ref={ref => this._statusBarInstance = ref}
                    barStyle={barStyle}/>

        <View style={[styles.container, {paddingTop: isPaddingTop ? 44: 0}]}>
          {
            isNavContent ? <View style={[
              styles.navContainer,
              {backgroundColor: navBackgroundColor},
            ]}>
              <View style={styles.buttonWrapper}>
                {
                  LeftOrRight === 'left' || 'all' ? <LeftButtonItem {...this.props} theme={theme}/> : <View/>
                }
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <TitleItem {...this.props} theme={theme}/>
                </View>
                {
                  LeftOrRight === 'right' || 'all' ? <RightButtonItem {...this.props} theme={theme}/> : <View/>
                }
              </View>
            </View> : null
          }

          {this.props.children}

        </View>
      </SafeAreaView>

    );
  }
}

export default withNavigation(CNavigation)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  navContainer: {
    position: 'absolute',
    width: width,
    height: 44,
    zIndex: 10000,
    paddingHorizontal: Layout.gap.gap_edge,
    top: Size.screen.statusBarHeight
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    width: 60
  }
});