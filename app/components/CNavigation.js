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
const LEFT_ICON = require('../images/common/navig_img_back_black.png');
const RIGHT_ICON = require('../images/common/navig_img_back_black.png');

class LeftButtonItem extends Component {
  static propTypes = {
    leftButton: PropTypes.shape({
      isShowTitle: PropTypes.bool,
      title: PropTypes.string,
      titleStyle: PropTypes.object,
      isShowIcon: PropTypes.bool,
      iconStyle: PropTypes.object,
      handle: PropTypes.func,
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
        width: 46,
        height: 46,
      }, // 默认icon样式
    };
    this.state = {};
    console.log(5555, props.navigation)
  }

  _onBackPress = () => {
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
    return (
      <View>
        {
          isShowTitle ? <Text style={titleStyle}> {title} </Text> : isShowIcon ?
            <CTouchableWithoutFeedback onPress={this._onBackPress}>
              <Image source={LEFT_ICON} style={iconStyle}/>
            </CTouchableWithoutFeedback> : null
        }
      </View>
    );
  }
}

class RightButtonItem extends Component {
  static propTypes = {
    rightButton: PropTypes.shape({
      isShowTitle: PropTypes.bool,
      title: PropTypes.string,
      titleStyle: PropTypes.object,
      isShowIcon: PropTypes.bool,
      iconStyle: PropTypes.object,
      handle: PropTypes.func,
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
        width: 46,
        height: 46,
      }, // 默认icon样式
    };
    this.state = {};
  }

  render() {
    const {isShowTitle, title, titleStyle, iconStyle, isShowIcon, handle} = Object.assign(this.defaultRightButton, this.props.rightButton)
    return (
      <View>
        {
          isShowTitle ? <Text style={titleStyle}> {title} </Text> : isShowIcon ?
            <CTouchableWithoutFeedback onPress={handle}>
              <Image source={RIGHT_ICON} style={iconStyle}/>
            </CTouchableWithoutFeedback> : null
        }
      </View>
    );
  }
}

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
      <View>
        <CTouchableWithoutFeedback onPress={handle}>
          <View>
            <Text style={titleStyle}>
              {title ? title : null}
            </Text>
          </View>
        </CTouchableWithoutFeedback>
      </View>
    );
  }
}

class CNavigation extends Component {

  static propTypes = {
    LeftOrRight: PropTypes.string,
    commonBackgroundColor: PropTypes.string,
    navBackgroundColor: PropTypes.string,
  }

  static defaultProps = {
    commonBackgroundColor: Layout.color.white_bg,
    navBackgroundColor: Layout.color.white_bg,
    LeftOrRight: 'all'
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
    const {LeftOrRight, commonBackgroundColor, navBackgroundColor} = this.props
    return (
      <SafeAreaView style={[{flex: 1, backgroundColor: commonBackgroundColor}]}>
        <View style={styles.container}>
          <View style={[styles.navContainer, {backgroundColor: navBackgroundColor}]}>
            <View style={styles.buttonWrapper}>
              {
                LeftOrRight === 'left' || 'all' ? <LeftButtonItem {...this.props}/> : <View/>
              }
              {
                LeftOrRight === 'right' || 'all' ? <RightButtonItem {...this.props}/> : <View/>
              }
            </View>
            <View style={styles.titleItemWrapper}>
              <TitleItem {...this.props}/>
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
    paddingTop: 44,
  },
  navContainer: {
    width: width,
    height: 44,
    paddingHorizontal: Layout.gap.gap_edge,
    position: 'absolute',
    top: 0,
    zIndex: 10000,
  },
  buttonWrapper: {
    flex: 1,
    ...Layout.layout.rsbc,
  },
  titleItemWrapper: {
    position: 'absolute',
    top: 0,
    height: 44,
    width: width,
    lineHeight: 44,
    ...Layout.layout.rcc,
  },
});