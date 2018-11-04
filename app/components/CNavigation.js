/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../styles/layout";

/** 第三方依赖库的引用 */
import {SafeAreaView, withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

/** 自定义组建的引用 */
import CTouchableWithoutFeedback from './CTouchableWithoutFeedback';

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽高
const LEFT_ICON_BLACK = require('../images/common/navig_img_back_black.png');
const LEFT_ICON_WHITE = require('../images/common/navig_img_back_white.png');
const RIGHT_ICON = require('../images/common/common_img_arrow.png');

class LeftButtonItem extends Component {
  static propTypes = {
    leftButton: PropTypes.shape({
      isShowTitle: PropTypes.bool,
      title: PropTypes.string,
      titleStyle: PropTypes.object,
      isShowIcon: PropTypes.bool,
      iconStyle: PropTypes.object,
      handle: PropTypes.func,
      theme:  PropTypes.oneOf(['dark', 'light']),
    }),
  }

  constructor(props) {
    super(props);
    this.defaultLeftButton = {
      isShowTitle: false,
      title: '左',
      isShowIcon: false,
      handle: null,
      titleStyle: {
        fontSize: 16,
        color: '#000'
      }, // 默认文案的样式
      iconStyle: {
        width: 23,
        height: 23,
      }, // 默认icon样式
      theme: 'dark', // 导航的主题颜色
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
    const {isShowTitle, title, titleStyle, iconStyle, isShowIcon, theme} = Object.assign(this.defaultLeftButton, this.props.leftButton)
    return (
      <CTouchableWithoutFeedback handle={this._navigate}>
        <View style={styles.btn}>
          {
            isShowTitle ? <Text style={titleStyle}
                                numberOfLines={1}> {title} </Text> : isShowIcon ?
              <Image source={theme === 'dark' ? LEFT_ICON_BLACK : LEFT_ICON_WHITE} style={iconStyle}/>
              : null
          }
        </View>
      </CTouchableWithoutFeedback>
    );
  }
}

withNavigation(LeftButtonItem)

class RightButtonItem extends Component {
  static propTypes = {
    rightButton: PropTypes.shape({
      isShowTitle: PropTypes.bool,
      title: PropTypes.string,
      titleStyle: PropTypes.object,
      isShowIcon: PropTypes.bool,
      iconStyle: PropTypes.object,
      handle: PropTypes.func,
      theme:  PropTypes.oneOf(['dark', 'light']),
    }),
  }

  constructor(props) {
    super(props);
    this.defaultRightButton = {
      isShowTitle: false,
      title: '右',
      isShowIcon: false,
      handle: null,
      titleStyle: {
        fontSize: 16,
        color: '#000'
      }, // 默认文案的样式
      iconStyle: {
        width: 23,
        height: 23,
      }, // 默认icon样式
      theme: 'dark', // 导航的主题颜色
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
    const {isShowTitle, title, titleStyle, iconStyle, isShowIcon, theme} = Object.assign(this.defaultRightButton, this.props.rightButton)
    return (
      <CTouchableWithoutFeedback handle={this._navigate}>
        <View style={[styles.btn, {justifyContent: 'flex-end',}]}>
          {
            isShowTitle ? <Text style={titleStyle}
                                numberOfLines={1}> {title} </Text> : isShowIcon ?
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
    centerTitle: PropTypes.shape({
      title: PropTypes.string,
      titleStyle: PropTypes.object,
      handle: PropTypes.func,
    })
  }

  constructor(props) {
    super(props);
    this.defaultcenterTitle = {
      handle: null,
      title: '',
      titleStyle: {
        fontSize: 16,
        color: '#000',
      },
    };
    this.state = {};
  }

  render() {
    const {title, titleStyle, handle} = Object.assign(this.defaultcenterTitle, this.props.centerTitle)
    return (
      <CTouchableWithoutFeedback onPress={handle}>
        <View>
          <Text style={[titleStyle]} numberOfLines={1}>
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
    LeftOrRight: PropTypes.string,
    commonBackgroundColor: PropTypes.string,
    navBackgroundColor: PropTypes.string,
    isPaddingTop: PropTypes.bool,
    isSafeArea: PropTypes.bool,
  }

  static defaultProps = {
    commonBackgroundColor: Layout.color.white_bg,
    navBackgroundColor: Layout.color.white_bg,
    LeftOrRight: 'all',
    isPaddingTop: true,
    isSafeArea: true, // 是否设置安全区域
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

  render() {
    const {LeftOrRight, commonBackgroundColor, navBackgroundColor, isPaddingTop, isSafeArea} = this.props
    return (
      <SafeAreaView
        forceInset={{top: isSafeArea ? 'always' : 'never'}}
        style={[{
          flex: 1, backgroundColor: commonBackgroundColor
        }]}>

        <View style={[styles.container, {paddingTop: isPaddingTop ? 44 : 0}]}>
          <View style={[styles.navContainer, {backgroundColor: navBackgroundColor}, {top: isPaddingTop ? 0 : 44}]}>
            <View style={styles.buttonWrapper}>
              {
                LeftOrRight === 'left' || 'all' ? <LeftButtonItem {...this.props}/> : <View/>
              }
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TitleItem {...this.props}/>
              </View>
              {
                LeftOrRight === 'right' || 'all' ? <RightButtonItem {...this.props}/> : <View/>
              }
            </View>
          </View>

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