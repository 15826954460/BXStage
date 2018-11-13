/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ImageBackground, Text, View, Animated,
} from "react-native";
import {Layout} from "../styles/layout";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';
import RootSiblings from 'react-native-root-siblings';

/** 自定义组建的引用 */
import CGradientButton from './CGradientButton';

/** 自定义工具方法的使用 */
import {bouncedUtils} from '../utils/bouncedUtils';
import {easeInOut} from '../utils/curve';

/** 声明一些常量 */
const TOAST_ANIMATION_DURATION = 200;

class CToast extends Component {
  static propTypes = {
    params: PropTypes.shape({
      borderRadius: PropTypes.number,
      isOnlyOneBtn: PropTypes.bool,
      title: PropTypes.string,
      contentText: PropTypes.string.isRequired,
    })
  }
  constructor(props) {
    super(props);
    this.defaultParams = {
      title: '', // 默认不显示
      isOnlyOneBtn: true, // 默认是一个按钮
      borderRadius: 12, // 圆角默认取值 12
      contentText: '',
    }
    this.state = {
      scaleAni: new Animated.Value(0.1),
      opacity: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this._startAnimated() // 执行开启动画
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this._endAnimated()
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _startAnimated = () => {
    Animated.timing(this.state.scaleAni, {
      toValue: 1.1,
      duration: TOAST_ANIMATION_DURATION,
      easing: easeInOut(),
      useNativeDriver: true
    }).start(() => {
      Animated.timing(this.state.scaleAni, {
        toValue: 1,
        duration: TOAST_ANIMATION_DURATION,
        easing: easeInOut(),
        useNativeDriver: true
      }).start();
    });
  }

  _endAnimated = () => {
    Animated.timing(this.state.scaleAni, {
      toValue: 1.1,
      duration: 100,
      easing: easeInOut(),
      useNativeDriver: true
    }).start(() => {
      Animated.timing(this.state.scaleAni, {
        toValue: 0.01,
        duration: TOAST_ANIMATION_DURATION,
        easing: easeInOut(),
        useNativeDriver: true
      }).start();
    });
  };


  render() {
    const {title, isOnlyOneBtn, borderRadius, contentText} = Object.assign(this.defaultParams, this.props.params)
    return (
      <Animated.View
        style={[styles.container,
          {
            opacity: this.state.scaleAni.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }
        ]}
        pointerEvents={'box-none'}
      >

        <Animated.View
           style={
             {transform: [{scale: this.state.scaleAni}]}
           }
        >
          <ImageBackground
            source={require('../images/common/index_img_toastshadow.png')}
            resizeMode={'stretch'}
            style={styles.toastBG}
          >
            <View style={[styles.wrapper, {borderRadius: borderRadius}]}>

              {/*只有在有标题的情况下才显示*/}

              {
                title.length ? <Text style={{
                  fontSize: Layout.font.Title3,
                  fontFamily: 'PingFangSC-Medium',
                  color: Layout.color.wblack,
                  marginBottom: 10,
                  lineHeight: 20,
                }}>
                  {title}
                </Text> : null
              }

              {/*通用文案部分*/}
              <View style={{paddingHorizontal: 14}}>
                <Text style={{
                  fontSize: Layout.font.Subtle2,
                  color: Layout.color.wblack,
                  lineHeight: 20,
                }}>
                  {contentText}
                </Text>
              </View>

              {/*根据时间情况来判断显示按钮的个数*/}
              <View style={{marginTop: 30, width: '100%', ...Layout.layout.rcc}}>
                {
                  isOnlyOneBtn ? <CGradientButton
                    disabled={false}
                    gradientType={'btn_m'}
                    contentText={'我知道了'}
                    textStyle={{
                      color: Layout.color.white_bg,
                      fontSize: Layout.font.Subtle1,
                      fontFamily: 'PingFangSC-Regular',
                    }}
                    onPress={() => {bouncedUtils.toast.hide()}}
                  /> : <View style={{
                    ...Layout.layout.rsbc,
                    width: '100%',
                    paddingHorizontal: 12
                  }}>
                    <CGradientButton
                      colorsArray={[Layout.color.white_bg, Layout.color.white_bg]}
                      gradientType={'btn_xs'}
                      isGradientButton={false}
                      contentText={'取消'}
                      colorsPressArray={[Layout.color.gray_press, Layout.color.gray_press]}
                      additionalStyle={{
                        borderWidth: 1,
                        borderColor: Layout.color.gray_line,
                      }}
                      textStyle={{
                        fontSize: Layout.font.Subtle1,
                        fontFamily: 'PingFangSC-Regular',
                        color: Layout.color.wgray_main,
                      }}
                    />
                    <CGradientButton
                      gradientType={'btn_xs'}
                      contentText={'去还款'}
                      textStyle={{
                        color: Layout.color.white_bg,
                        fontSize: Layout.font.Subtle1,
                        fontFamily: 'PingFangSC-Regular',
                      }}
                    />
                  </View>
                }
              </View>

            </View>
          </ImageBackground>
        </Animated.View>

      </Animated.View>
    );
  }
}

export default class SiblingsAlert extends Component {
  static siblingInstance = null;

  // 创建及显示
  static showSiblings = (params) => {
    SiblingsAlert.siblingInstance = new RootSiblings(<CToast params={params}/>)
  };

  // 销毁及隐藏
  static hideSiblings = () => {
    SiblingsAlert.siblingInstance && SiblingsAlert.siblingInstance.destroy();
  };

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...Layout.layout.ccc,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  wrapper: {
    width: 280,
    paddingTop: 30,
    paddingBottom: 15,
    backgroundColor: '#fff',
    ...Layout.layout.ccc,
  },
  toastBG: {
    paddingHorizontal: 6,
    paddingVertical: 11,
  },
});