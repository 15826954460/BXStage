/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, TouchableHighlight, Easing, BackHandler,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../styles/layout";
import {Size} from "../styles/size";

/** 第三方依赖库的引用 */
import RootSiblings from 'react-native-root-siblings';
import PropTypes from 'prop-types';

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */
import {Util} from '../utils/util';


/** 常量声明 */
const {width, height} = Dimensions.get('window');
const TRANSLATE_Y = height * 2 / 3;
const TOAST_ANIMATION_DURATION = 200;

class CActionSheet extends Component {
  static propTypes = {
    buttons: PropTypes.array,
  }

  static defaultProps = {
    buttons: [
      {title: '拍照', callback: null},
      {title: '从相册选一张', callback: null},
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this._hardwareBackHandle = BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: TOAST_ANIMATION_DURATION,
      easing: Easing.easeInEaseOut,
      useNativeDriver: true
    }).start();
  }

  _hardwareBackPress = () => {
    this._clearAndReHide();
    return true;
  };

  componentWillUnmount() {
    this._hardwareBackHandle.remove();
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _clearAndReHide = (item) => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: TOAST_ANIMATION_DURATION,
      easing: Easing.easeInEaseOut,
      useNativeDriver: true
    }).start(() => {
      item.callback instanceof Function && item.callback()
      SiblingsActionSheet.hideSiblings();
    });
  }

  _itemSelect = (item) => {
    this._clearAndReHide(item)
    // this._callBack = item.callback
  }

  render() {
    const {buttons} = this.props.params
    return (
      <Animated.View style={[
        styles.container,
        {
          backgroundColor: 'rgba(0,0,0,.65)',
          opacity: this.state.opacity
        }
      ]}>

        <TouchableOpacity
          style={{flex: 1, width}}
          activeOpacity={1}
          onPress={() => this._clearAndReHide()}/>

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{
                translateY: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [TRANSLATE_Y, 0]
                })
              }]
            }
          ]}>
          {
            buttons.map((item, index) => {
              return (
                <TouchableHighlight
                  key={'sheet_' + index}
                  activeOpacity={1}
                  onPress={() => this._itemSelect(item, index)}
                  underlayColor={Layout.color.gray_press}
                  style={[
                    styles.item,
                    {
                      borderBottomWidth: index === buttons.length - 1 ? 0 : Size.screen.pixel,
                      marginBottom: index === buttons.length - 1 ? 15 : 0
                    }
                  ]}>
                  <Text style={styles.font}>{item.title}</Text>
                </TouchableHighlight>
              )
            })
          }

          <TouchableHighlight
            activeOpacity={1}
            onPress={() => this._clearAndReHide()}
            delayPressIn={0}
            underlayColor={Layout.color.gray_press}
            style={[styles.cancel]}>
            <Text style={styles.font}>{'取消'}</Text>
          </TouchableHighlight>

        </Animated.View>

      </Animated.View>
    );
  }
}

export default class SiblingsActionSheet extends Component {
  static siblingInstance = null;

  // 创建及显示
  static showSiblings = (params) => {
    SiblingsActionSheet.siblingInstance = new RootSiblings(<CActionSheet params={params}/>)
  };

  // 销毁及隐藏
  static hideSiblings = () => {
    SiblingsActionSheet.siblingInstance && SiblingsActionSheet.siblingInstance.destroy();
  };

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    marginBottom: Util.isIPhoneX() ? 34 : 0,
  },
  sheet: {
    ...Layout.layout.cfsc,
    width,
    backgroundColor: Layout.color.gray_bg,
    borderTopWidth: Size.screen.pixel,
    borderTopColor: Layout.color.gray_line,
  },
  item: {
    ...Layout.layout.rcc,
    width,
    height: 44,
    backgroundColor: Layout.color.white_bg,
    borderBottomWidth: Size.screen.pixel,
    borderBottomColor: Layout.color.gray_line,
  },
  cancel: {
    ...Layout.layout.rcc,
    width,
    height: 44,
    backgroundColor: Layout.color.white_bg,
  },
  font: {
    color: Layout.color.wblack,
    fontSize: Layout.font.Subtle1,
    lineHeight: 21
  }
});