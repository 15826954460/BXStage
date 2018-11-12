/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ImageBackground, Animated,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import RootSiblings from 'react-native-root-siblings';

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */
import {Util} from "../utils/util"
import {Layout} from "../styles/layout";

/** 常量声明 */
const
  OPACITY_DURATION = 200, //
  TAANSLATEY_DURATION = 280, // notice 动画执行时间为 0.4 秒
  NOTICE_WAIT = 1500; // notice 动画停留时间为 2.5 秒

class CToast extends Component {

  _waitTimer = null;

  constructor(props) {
    super(props);
    this.state = {
      transY: new Animated.Value(20),
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: OPACITY_DURATION,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.transY, {
      toValue: 0,
      duration: TAANSLATEY_DURATION,
      useNativeDriver: true
    }).start(() => {
      this._clearAndReHide()
    });
  }


  componentWillUnmount() {
    clearTimeout(this._waitTimer);
  }

  _clearAndReHide = () => {
    clearTimeout(this._waitTimer);
    this._waitTimer = setTimeout(() => {
      Animated.timing(this.state.transY, {
        toValue: 20,
        duration: OPACITY_DURATION,
        useNativeDriver: true
      }).start();

      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: TAANSLATEY_DURATION,
        delay: 80,
        useNativeDriver: true
      }).start(() => {
        SiblingsToast.hideSiblings();
      });
    }, NOTICE_WAIT);
  };

  componentWillMount() {
  }


  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  render() {
    const {params} = this.props
    return (
      <Animated.View
        pointerEvents={'box-none'}
        style={[styles.wrap, {
          opacity: this.state.opacity,
          transform: [{
            translateY: this.state.transY
          }]
        }]}>
        <ImageBackground
          source={require('../images/common/index_img_toastshadow.png')}
          resizeMode={'stretch'}
          style={styles.toastBG}
          fadeDuration={0}>
          <View style={styles.container}>
            <Text numberOfLines={2} style={styles.font}>
              {params.content}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  }
}

export default class SiblingsToast extends Component {
  static siblingInstance = null;

  // 创建及显示
  static showSiblings = (params) => {
    SiblingsToast.siblingInstance = new RootSiblings(<CToast params={params}/>)
  };

  // 销毁及隐藏
  static hideSiblings = () => {
    SiblingsToast.siblingInstance && SiblingsToast.siblingInstance.destroy();
  };

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...Layout.layout.cfec
  },
  toastBG: {
    paddingHorizontal: 6,
    paddingVertical: 11,
    marginBottom: Util.isIPhoneX() ? (77 + 43) : 77,
  },
  container: {
    minWidth: 128,
    maxWidth: 250,
    paddingVertical: 18,
    paddingHorizontal: 12,
    ...Layout.layout.ccc,
    backgroundColor: Layout.color.gray_press,
    borderRadius: 8,
  },
  font: {
    fontSize: Layout.font.Subtle2,
    color: Layout.color.wgray_bar,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    backgroundColor: 'transparent'
  }
});