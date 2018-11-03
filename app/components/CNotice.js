/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Image,
  Text, Dimensions, StatusBar, Animated, Easing,
  View,
} from "react-native";


/** 全局样式的引用 */
import {Layout} from "../styles/layout";
import {Util} from "../utils/util"

/** 第三方依赖库的引用 */
import RootSiblings from 'react-native-root-siblings';

/** 自定义组建的引用 */

/**  声明一些常量 */
const {width, height} = Dimensions.get('window');
const TRANSLATE_Y = Util.isIPhoneX() ? 84 : 60;
const
  NOTICE_DURATION = 400, // notice 动画执行时间为 0.4 秒
  NOTICE_WAIT = 1500; // notice 动画停留时间为 2.5 秒
const
  WARN_BACKGROUND_COLOR = '#ff6446',
  SUCCESS_BACKGROUND_COLOR = '#41c557';

class CNotice extends Component {
  _waitTimer = null; // 事件执行句柄

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: null,
      shadowColor: null,
      icon: null,
      text: null,
      translateY: new Animated.Value(-TRANSLATE_Y)
    };
  }

  componentDidMount() {
    this._promit(this.props.params)
    StatusBar.setHidden(true, true) // 显示动画的时候隐藏状态栏
    /** 显示动画 */
    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: NOTICE_DURATION,
      easing: Easing.easeInEaseOut,
      useNativeDriver: true
    }).start(() => {
      this._clearAndReHide();
    });
  }

  /** 调用了 render() 更新完成界面之后，会调用  */
  componentDidUpdate() {
    // this._clearAndReHide()
  }

  componentWillUnmount() {
    clearTimeout(this._waitTimer);
    this._waitTimer = null
  }

  /** 显示 notice 显示状态栏， 执行按钮渐变动画，跟新本地 借款信息数据 动画结束后隐藏 notice */
  _clearAndReHide = () => {
    /** 2500 ms 后notice回滚 */
    this._waitTimer = setTimeout(() => {
      Animated.timing(this.state.translateY, {
        toValue: -TRANSLATE_Y,
        duration: NOTICE_DURATION,
        easing: Easing.easeInEaseOut,
        useNativeDriver: true
      }).start(() => {
        StatusBar.setHidden(false, true) // 显示状态栏
        SiblingsNotice.hideSiblings(); // 销毁notice
      });
      clearTimeout(this._waitTimer);
      this._waitTimer = null;
    }, NOTICE_WAIT);
  };


  // 获取父组件传进来的参数，并做响应的处理
  _promit = (params) => {
    const {type, content} = params
    let {backgroundColor, shadowColor, icon, text} = this.state;
    switch (type) {
      case 'warning':
        backgroundColor = WARN_BACKGROUND_COLOR;
        text = content;
        icon = require('../images/common/index_img_toasterror.png')
        shadowColor = require('../images/common/index_img_toast_redshadow.png')
        this.setState({backgroundColor, shadowColor, icon, text})
        break;
      case 'success':
        backgroundColor = SUCCESS_BACKGROUND_COLOR;
        text = content;
        icon = require('../images/common/index_img_toastsuccess.png')
        shadowColor = require('../images/common/index_img_toast_greenshadow.png')
        this.setState({backgroundColor, shadowColor, icon, text})
        break;
      default :
        break
    }
  }

  render() {
    const {backgroundColor, text, icon, shadowColor} = this.state
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            {
              width: width,
              transform: [{translateY: this.state.translateY}],
            }
          ]}
        >
          <View style={[
            styles.toastContainer, {
              paddingTop: Util.isIPhoneX() ? 24 : 0,
              height: Util.isIPhoneX() ? 84 : 60,
              backgroundColor: backgroundColor,
            }]
          }>
            <Image source={icon}
                   style={[styles.iconStyle]}/>
            <Text style={{color: '#fff', fontSize: 16}}>{text}</Text>
          </View>

          <Image source={shadowColor}
                 resizeMode={'stretch'}
                 style={[styles.bottomShadow]}/>
        </Animated.View>

      </View>
    );
  }
}

export default class SiblingsNotice extends Component {
  static siblingInstance = null;

  // 创建及显示
  static showSiblings = (params) => {
    SiblingsNotice.siblingInstance = new RootSiblings(<CNotice params={params}/>)
  };

  // 销毁及隐藏
  static hideSiblings = () => {
    SiblingsNotice.siblingInstance && SiblingsNotice.siblingInstance.destroy();
  };

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 10000,
    width: width,
    flex: 1, // toast 弹框的颜色和底部阴影的颜色
  },
  toastContainer: {
    width: width,
    flex: 1,
    paddingHorizontal: 12,
    opacity: 0.96,
    ...Layout.layout.rfsc,
  },
  iconStyle: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  bottomShadow: {
    height: 20,
    width: width,
  }
});