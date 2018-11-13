/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Image, Text, Dimensions, Animated, Easing, TouchableOpacity, ScrollView, View, BackHandler,
} from "react-native";


/** 全局样式的引用 */
import {Layout} from "../styles/layout";
import {Util} from "../utils/util";
import {Size} from "../styles/size";

/** 第三方依赖库的引用 */
import RootSiblings from 'react-native-root-siblings';
import PropTypes from 'prop-types';

/** 自定义组建的引用 */
import {bouncedUtils} from '../utils/bouncedUtils';

/**  声明一些常量 */
const {width, height} = Dimensions.get('window');
const TRANSLATE_Y = Util.isIPhoneX() ? 484 : 460;

const TOAST_ANIMATION_DURATION = 250;

class CNoticeBottom extends Component {
  static propTypes = {
    params: PropTypes.object,
  }

  static defaultProps = {
    params: {
      title: '',
      content: '',
    }
  }

  _waitTimer = null; // 事件执行句柄

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      unResolved: false,
      resolved: false,
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this._hardwareBackHandle = BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
    /** 显示动画 */
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: TOAST_ANIMATION_DURATION,
      easing: Easing.out(Easing.ease)
    }).start();
  }

  _hardwareBackPress = () => {
    this._clearAndReHide();
    return true;
  };

  componentWillUnmount() {
    this._hardwareBackHandle.remove()
    clearTimeout(this._waitTimer);
    this._waitTimer = null
  }

  _clearAndReHide = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: TOAST_ANIMATION_DURATION,
      easing: Easing.in(Easing.ease)
    }).start(() => {
      SiblingsNoticeBottom.hideSiblings()
    });
  };

  _feedBack = (isResolved) => {
    if (this.state.clicked) return
    bouncedUtils.toast.show({content: '感谢反馈'});
    this.setState({
      unResolved: !isResolved,
      resolved: isResolved,
      clicked: true
    });
  }

  render() {
    let {unResolved, resolved,} = this.state;
    const {title, content} = this.props.params
    return (
      <Animated.View style={[
        styles.container,
        {
          backgroundColor: this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,.6)']
          })
        }
      ]}>

        <TouchableOpacity
          style={styles.backCloseBtn}
          activeOpacity={1}
          onPress={this._clearAndReHide}/>

        <Animated.View
          style={[
            styles.noticeWrapper,
            {
              transform: [{
                translateY: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [TRANSLATE_Y, 0]
                })
              }]
            }
          ]}
        >
          <View style={styles.noticeTop}>
            <Text style={{fontSize: 16}}>{title}</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this._clearAndReHide}
            >
              <Image source={require('../images/common/common_img_closewindow.png')}/>
            </TouchableOpacity>
          </View>

          <ScrollView style={{flex: 1, width: width}} showsVerticalScrollIndicator={false}>
            <View style={styles.detailZone}>
              <Text style={styles.detailFont}>
                <Text>{content}</Text>
              </Text>
            </View>
          </ScrollView>

          <View style={[styles.toolBtnWrap]}>
            <Text style={[styles.toolFont, {marginRight: 10}]}>{'是否对你有帮助:'}</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this._feedBack(true)}
              style={styles.toolBtnFeed}>
              <Image
                source={resolved ? require('../images/faq/faq_img_help_down.png') : require('../images/faq/faq_img_help.png')}
                resizeMode={'cover'}
                style={styles.feedBackIcon}/>
              <Text
                style={[styles.toolFont, {color: resolved ? Layout.color.worange : Layout.color.wgray_main}]}>
                {'有帮助'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this._feedBack(false)}
              style={styles.toolBtnFeed}>
              <Image
                source={unResolved ? require('../images/faq/faq_img_nohelp_down.png') : require('../images/faq/faq_img_nohelp.png')}
                resizeMode={'cover'}
                style={styles.feedBackIcon}/>
              <Text
                style={[styles.toolFont, {color: unResolved ? Layout.color.worange : Layout.color.wgray_main}]}>
                {'没帮助'}
              </Text>
            </TouchableOpacity>
          </View>

        </Animated.View>

      </Animated.View>
    );
  }
}

export default class SiblingsNoticeBottom extends Component {
  static siblingInstance = null;

  // 创建及显示
  static showSiblings = (params) => {
    SiblingsNoticeBottom.siblingInstance = new RootSiblings(<CNoticeBottom params={params}/>)
  };

  // 销毁及隐藏
  static hideSiblings = () => {
    SiblingsNoticeBottom.siblingInstance && SiblingsNoticeBottom.siblingInstance.destroy();
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
  noticeWrapper: {
    width,
    height: TRANSLATE_Y,
    backgroundColor: Layout.color.white_bg,
    ...Layout.layout.cfsc,
  },
  backCloseBtn: {
    flex: 1,
    width: width,
  },
  toastContainer: {
    width: width,
    flex: 1,
    paddingHorizontal: 12,
    opacity: 0.96,
    ...Layout.layout.rfsc,
  },
  noticeTop: {
    width: width,
    paddingHorizontal: 12,
    height: 44,
    ...Layout.layout.rsbc,
    borderBottomWidth: Size.screen.pixel,
    borderBottomColor: Layout.color.gray_line,
  },

  toolBtnWrap: {
    width,
    height: 44,
    paddingHorizontal: Layout.gap.gap_edge,
    borderTopWidth: Size.screen.pixel,
    borderTopColor: Layout.color.gray_line,
    ...Layout.layout.rfsc,
  },
  toolFont: {
    fontSize: Layout.font.Body1,
    color: Layout.color.wgray_main,
  },
  toolBtnFeed: {
    marginRight: 20,
    ...Layout.layout.rfsc,
  },
  feedBackIcon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  detailZone: {
    width,
    paddingHorizontal: Layout.gap.gap_edge,
    marginBottom: 20,
    ...Layout.layout.cfsfs
  },
  detailFont: {
    fontSize: Layout.font.Body1,
    color: Layout.color.wblack,
    marginTop: 20,
    lineHeight: Math.ceil(18),
  },
});