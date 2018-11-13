/**
 * Created by hebao on 2017/2/10.
 */


'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  BackHandler,
  Easing,
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

import Size from '../../utility/size';
import Util from '../../utility/util'
import BXStandard from '../../styles/standard';

import WebAPI from '../../utility/webAPI';

const {width, height, pixel, iPhoneXHomeIndicatorAreaHeight} = Size.screen
const debugKeyWord = '[FaqDetailPage]';

const TOAST_ANIMATION_DURATION = 250;
const _transY = 460;

let faq_siblingHandle = null;

class FaqDetailMain extends Component {
  _hardwareBackHandle = null;//物理返回键监听句柄
  _imgRef = null;

  static defaultProps = {
    FaqID: null,
    FaqTitle: '',
    FaqContent: '',
  }

  constructor(props) {
    super(props);
    this.state = {

      unResolved: false,
      resolved: false,
      clicked: false,

      imageFitWidth: 0,//远程网络图片的宽
      imageFitHeight: 0,//远程网络图片的高
      imageMarginTop: 0,//图片距离上边补白
      imageInitWidth: 0,//图片全屏查看时的宽
      imageInitHeight: 0,//图片全屏查看时的高

      opacity: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this._hardwareBackHandle = BackHandler.addEventListener('hardwareBackPress', this.props.hardwareBackPress || this._hardwareBackPress);
    this._show();
  }

  componentWillUnmount() {
    this._hardwareBackHandle.remove();
  }

  _hardwareBackPress = () => {
    this._hide();
    return true;
  };

  _show = (show) => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: TOAST_ANIMATION_DURATION,
      easing: Easing.out(Easing.ease)
    }).start(() => {
      this.props.onShow instanceof Function && this.props.onShow();
      show instanceof Function && show();
    });
  };

  _hide = (hide) => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: TOAST_ANIMATION_DURATION,
      easing: Easing.in(Easing.ease)
    }).start(() => {
      FaqDetail.instanceShow = false;
      FaqDetail.destroy(faq_siblingHandle);
      this.props.onHide instanceof Function && this.props.onHide();
      hide instanceof Function && hide();
    });
  };

  _feedBack = (isResolved) => {
    if (this.state.clicked)
      return
    WebAPI.my.starUseful({id: this.props.FaqID, label: isResolved ? 1 : 0}, (data) => {
      Util.toast.show('感谢反馈');
      this.setState({
        unResolved: !isResolved,
        resolved: isResolved,
        clicked: true
      });
    })
  }

  _checkButton = (url) => {
    if (url.indexOf('http') !== -1 && url.indexOf('fid') !== -1) {
      let _fid = url.split('=')[1];
      this._hide(() => {
        setTimeout(() => FaqDetail.show({FaqID: _fid}), 300);//需要延迟，否则destroy之后马上show会出问题
      });
    }
    else {
    }
  }

  render() {
    let {unResolved, resolved,} = this.state;
    return (
      <Animated.View
        style={[
          Styles.wrap,
          {
            backgroundColor: this.state.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,.6)']
            })
          }
        ]}>
        <TouchableOpacity
          style={Styles.backCloseBtn}
          activeOpacity={1}
          onPress={this._hide}/>

        <Animated.View
          style={[
            Styles.container,
            {
              transform: [{
                translateY: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [_transY, 0]
                })
              }]
            }
          ]}>
          <View style={Styles.titleWrap}>
            <Text
              numberOfLines={1}
              style={Styles.titleFont}>
              {this.props.FaqTitle || '问题详情'}
            </Text>
            <TouchableOpacity
              style={Styles.titleCloseBtn}
              activeOpacity={1}
              onPress={this._hide}>
              <Image
                style={Styles.titleCloseIcon}
                resizeMode={'cover'}
                fadeDuration={0}
                source={require('../../res/common_img_closewindow.png')}/>
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}>
            <View style={Styles.detailZone}>
              <Text style={Styles.detailFont}>
                {this.props.FaqContent || ''}
              </Text>
            </View>
          </ScrollView>

          <View style={[Styles.toolBtnWrap]}>
            <Text style={[Styles.toolFont, {marginRight: 10}]}>{'是否对你有帮助:'}</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this._feedBack(true)}
              style={Styles.toolBtnFeed}>
              <Image
                source={resolved ? require('../../res/faq_img_help_down.png') : require('../../res/faq_img_help.png')}
                resizeMode={'cover'}
                style={Styles.feedBackIcon}/>
              <Text
                style={[Styles.toolFont, {color: resolved ? BXStandard.color.worange : BXStandard.color.wgray_main}]}>
                {'有帮助'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this._feedBack(false)}
              style={Styles.toolBtnFeed}>
              <Image
                source={unResolved ? require('../../res/faq_img_nohelp_down.png') : require('../../res/faq_img_nohelp.png')}
                resizeMode={'cover'}
                style={Styles.feedBackIcon}/>
              <Text
                style={[Styles.toolFont, {color: unResolved ? BXStandard.color.worange : BXStandard.color.wgray_main}]}>
                {'没帮助'}
              </Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </Animated.View>
    );
  }
}

export default class FaqDetail extends Component {
  static instanceShow = false;

  static show = (option) => {
    if (!FaqDetail.instanceShow) {
      FaqDetail.instanceShow = true;
      faq_siblingHandle = new RootSiblings(<FaqDetailMain {...option}/>);
    }
  };

  static destroy = (siblingHandle) => {
    if (siblingHandle instanceof RootSiblings) {
      siblingHandle.destroy();
    }
    else {
      console.warn(`Sibling.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof siblingHandle}\` instead.`);
    }
  };

  render() {
    return null;
  }
}

const Styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0,0,0,.6)',
    ...BXStandard.layout.cfec
  },
  backCloseBtn: {
    flex: 1,
    width
  },
  container: {
    width,
    height: 460 + (Size.isIPhoneX ? iPhoneXHomeIndicatorAreaHeight : 0),
    backgroundColor: BXStandard.color.white_bg,
    ...BXStandard.layout.cfsc,
  },
  titleWrap: {
    width,
    height: 44,
    paddingLeft: BXStandard.gap.gap_edge,
    borderTopWidth: pixel,
    borderBottomWidth: pixel,
    borderColor: BXStandard.color.gray_line,
    ...BXStandard.layout.rsbc
  },
  titleFont: {
    flex: 1,
    fontSize: BXStandard.font.SL1,
    color: BXStandard.color.wblack,
  },
  titleCloseBtn: {
    width: 15 + 2 * BXStandard.gap.gap_edge,
    height: 44,
    paddingHorizontal: BXStandard.gap.gap_edge,
    ...BXStandard.layout.ccc
  },
  titleCloseIcon: {
    width: 15,
    height: 15,
  },
  detailZone: {
    width,
    paddingHorizontal: BXStandard.gap.gap_edge,
    marginBottom: 20,
    ...BXStandard.layout.cfsfs
  },
  detailFont: {
    fontSize: BXStandard.font.Body1,
    color: BXStandard.color.wblack,
    marginTop: 20,
    lineHeight: Math.ceil(18),
  },
  detailBtnWrap: {
    borderWidth: 0.5,
    borderColor: BXStandard.color.yellow_main,
    marginTop: 44,
  },
  detailBtnFont: {
    fontSize: BXStandard.font.btn_m,
    color: BXStandard.color.yellow_main,
  },
  toolBtnWrap: {
    width,
    height: 44,
    marginBottom: Size.isIPhoneX ? iPhoneXHomeIndicatorAreaHeight : 0,
    paddingHorizontal: BXStandard.gap.gap_edge,
    borderTopWidth: pixel,
    borderTopColor: BXStandard.color.gray_line,
    ...BXStandard.layout.rfsc,
  },
  toolFont: {
    fontSize: BXStandard.font.Body1,
    color: BXStandard.color.wgray_main,
  },
  toolBtnFeed: {
    marginRight: 20,
    ...BXStandard.layout.rfsc,
  },
  feedBackIcon: {
    width: 20,
    height: 20,
    marginRight: 5
  }
});
