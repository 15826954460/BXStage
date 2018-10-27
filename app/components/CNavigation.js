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


/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽高
const LEFT_ICON = require('../images/common/navig_img_back_black.png');
const RIGHT_ICON = require('../images/common/navig_img_back_black.png');

class ButtonItem extends Component {
  static propTypes = {
    LeftOrRight: PropTypes.string,
    LeftTitle: PropTypes.string,
    RightTitle: PropTypes.string,
    isShowTitle: PropTypes.bool,
    leftIcon: PropTypes.bool,
    isShowIcon: PropTypes.bool,
    handle: PropTypes.func,
    textStyle: PropTypes.object,
    iconStyle: PropTypes.object,
  }
  static defaultProps = {
    LeftTitle: '左',
    RightTitle: '右',
    isShowTitle: false,
    leftIcon: false,
    isShowIcon: false,
    LeftOrRight: 'left',
    handle: null,
    textStyle: {
      fontSize: 12,
      color: '#000'
    },
    iconStyle: {
      width: 46,
      height: 46,
    },
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {LeftTitle, RightTitle, leftIcon, isShowIcon, isShowTitle, textStyle, iconStyle} = this.props
    return (
      <View>
        {
          isShowTitle ? <Text style={textStyle}>
            {LeftTitle ? LeftTitle : RightTitle}
          </Text> : isShowIcon ? <TouchableWithoutFeedback>
              <Image source={leftIcon ? LEFT_ICON : RIGHT_ICON}
                     style={iconStyle}/>
            </TouchableWithoutFeedback> :
            null
        }
      </View>
    );
  }
}

class TitleItem extends Component {
  static propTypes = {
    centerTitle: PropTypes.string,
    textStyle: PropTypes.object,
  }
  static defaultProps = {
    centerTitle: '',
    textStyle: '',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(11111, this.props.textStyle)
    const {centerTitle, textStyle} = this.props
    return (
      <View>
        <Text style={textStyle}>
          {centerTitle.length ? centerTitle : null}
        </Text>
      </View>
    );
  }
}

class CNavigation extends Component {

  static propTypes = {
    commonBackgroundColor: PropTypes.string,
    navBackgroundColor: PropTypes.string,
  }

  static defaultProps = {
    commonBackgroundColor: Layout.color.white_bg,
    navBackgroundColor: Layout.color.white_bg,
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
      <SafeAreaView style={[styles.container,
        {backgroundColor: commonBackgroundColor}
      ]}>
        <View style={{position: 'relative', flex: 1}}>

          <View style={[styles.navContainer, {backgroundColor: navBackgroundColor}]}>
            {
              LeftOrRight === 'left' ? <ButtonItem {...this.props}/> : <View/>
            }
            <TitleItem {...this.props}/>
            {
              LeftOrRight === 'right' ? <ButtonItem {...this.props}/> : <View/>
            }
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
    flex: 1,
  },
  navContainer: {
    width: width,
    height: 44,
    paddingHorizontal: Layout.gap.gap_edge,
    ...Layout.layout.rsbc,
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
    top: 0,
    zIndex: 10000,
  },
  buttonStyle: {
    borderWidth: 1,
  },
});