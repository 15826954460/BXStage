import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, Image, ImageBackground, Dimensions,Linking,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from '../../styles/layout';

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import CTouchableWithoutFeedback from '../../components/CTouchableWithoutFeedback';
import ListItem from '../../components/ListItem/ListItem';
// import withFocus from '../../components/HOC/HOCNavigationEvents';
// import withCNavigation from '../../components/HOC/HOCCNavigation';


/** 全局工具方法的引用 */
import {Util} from "../../utils/util";
import StorageData from "../../store/storageData";
import {bouncedUtils} from "../../utils/bouncedUtils";

import {configData} from '../../store/configData';

/** 声明常量 */
const {width, height} = Dimensions.get('window');//屏幕宽度
const
  STATUS_BAR_LIGHT_THEME = 'light-content',
  STATUS_BAR_DARK_THEME = 'dark-content';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteName: '这个骚年很懒，没有备注名', // 备注名
      phoneNumber: '', // 手机号
      userInfo: {}, // 账户信息
    };
  }

  componentWillMount() {
    StorageData.getData('userInfo').then(res => {
      if (res) {
        this.setState({
          userInfo: res
        })
      }
    })
  }

  componentDidMount() {
    /**
     * 为了演示效果，这里获取本地数据
     * 实际开发中根据接口返回的用户信息进行配置
     * */
    StorageData.getData('registerInfo').then(res => {
      if (res) {
        let {phoneNumber, noteName} = res
        this.setState({
          phoneNumber: phoneNumber, noteName: noteName || this.state.noteName
        })
      }
    })
  }

  componentWillUnmount() {
  }

  _onScroll = e => {
    /** 计算导航的透明度 */
    let {y} = e.nativeEvent.contentOffset
    let {contentSize, layoutMeasurement} = e.nativeEvent
    let maxOffsetY = contentSize.height - layoutMeasurement.height
    maxOffsetY = Math.min(Math.floor(maxOffsetY), height * 0.1);
    maxOffsetY <= 0 && (maxOffsetY = height * 0.1)
    let alpha = (y / maxOffsetY).toFixed(2)
    this._navInstance._fadeInBottomLine(alpha)
  }

  /** 版本检查【实际生产中调用后台接口】*/
  _checkVersion = () => {
    bouncedUtils.toast.show({content: '当前为最新版本'})
  }

  /** 调用打电话功能 */
  _canOpenURL = () => {
    let _url = 'tel: ' + configData.customNum;
    Linking.canOpenURL(_url).then(supported => {
      if (!supported) {
        bouncedUtils.toast.show({content: '您的应用还不支持次功能'})
      } else {
        return Linking.openURL(_url);
      }
    }).catch(err => window.console.error(`An error occurred, 错误信息为-----【${err}】------- `));
  }

  _goToFeedBack = () => {
    // 根据是否有反馈进行不同页面的跳转
    StorageData.getData('userFeedBack').then(res => {
      let {records} = res
      if (records.length) {
        this.props.navigation.navigate('HasFeedBack', {records: records})
      }
      else {
        this.props.navigation.navigate('NoFeedBack', {records: records})
      }
    })
  }

  render() {
    const {headPicture} = this.state.userInfo
    return (
      <CNavigation
        getRef={ref => this._navInstance = ref}
        LeftOrRight={'left'}
        leftButton={{
          isShowIcon: true,
          isShowTitle: false,
        }}
        theme={'variable'}
        barStyle={STATUS_BAR_LIGHT_THEME}
        isPaddingTop={false}
        isSafeArea={false}
        isSafeAreaBottom={false}
      >
        <ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    keyboardDismissMode={"on-drag"}
                    keyboardShouldPersistTaps={"handled"}
                    showsVerticalScrollIndicator={false}
                    onScroll={this._onScroll}
        >
          <ImageBackground
            resizeMode={'stretch'}
            fadeDuration={0}
            style={[
              {width: width, marginBottom: 15},
              {height: Util.isIPhoneX() ? width * 609 / 1125 : width * 358 / 750},
            ]}
            source={Util.isAndroid() ? require('../../images/me/me_img_bg.png') : require('../../images/me/me_img_bg_iPX.png')}
          >
            <View style={styles.userInfoWrapper}>

              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 30,
                    fontFamily: 'PingFangSC-Medium',
                    color: Layout.color.white_bg
                  }}>
                  {this.state.noteName}
                </Text>
                <Text style={{fontSize: 14, color: Layout.color.white_bg}}>
                  {Util.takeSensitive(this.state.phoneNumber)}
                </Text>
              </View>

              <CTouchableWithoutFeedback
                handle={() => {
                  this.props.navigation.navigate('AccountInfo', this.state.userInfo)
                }}>
                <View style={{
                  width: 116, height: 116,
                  position: 'relative',
                  marginLeft: 23,
                  justifyContent: 'flex-end',
                }}>
                  <ImageBackground
                    fadeDuration={0}
                    style={[styles.avatarbg, styles.imgPos]}
                    source={require('../../images/common/common_shadow_abatar.png')}>
                    <View style={styles.avatarbg_ar_wrap}>
                      <Image
                        fadeDuration={0}
                        style={[styles.avatarbg_ar, {borderRadius: 50}]}
                        source={headPicture ? {uri: headPicture} : require('../../images/me/index_icon_bixia.png')}/>
                    </View>
                  </ImageBackground>

                  <ImageBackground
                    fadeDuration={0}
                    style={[styles.imgPos, styles.avatarbg,]}
                    source={require('../../images/me/me_img_headmask.png')}
                  >
                  </ImageBackground>
                </View>
              </CTouchableWithoutFeedback>

            </View>
          </ImageBackground>

          <View>
            <ListItem
              leftIconType={'MIB'}
              leftText={'我的借款'}
              hasBottomLine={true}
              handle={() => this.props.navigation.navigate('MyLoan')}
            />
            <ListItem
              leftIconType={'MIT'}
              leftText={'交易记录'}
              hasBottomLine={true}
              handle={() => this.props.navigation.navigate('TradeRecord')}
            />
            <ListItem
              leftIconType={'MIQ'}
              leftText={'常见问题'}
              hasBottomLine={true}
            />
            <ListItem
              leftIconType={'MIC'}
              leftText={'联系客服'}
              rightText={'工作日9:00-18:00'}
              hasBottomLine={true}
              handle={() => this._canOpenURL()}
            />
            <ListItem
              leftIconType={'MIF'}
              leftText={'用户反馈'}
              isDot={true}
              rightText={'想问啥就问啥'}
              handle={this._goToFeedBack}
              hasBottomLine={true}
            />
            <ListItem
              leftIconType={'MIA'}
              leftText={'关于币下分期'}
              rightText={'0.1.0'}
              hasBottomLine={true}
              handle={this._checkVersion}
            />
            <ListItem
              leftIconType={'MIS'}
              leftText={'设置'}
              hasBottomLine={true}
              handle={() => this.props.navigation.navigate('SettingPage')}
            />


            <View>
              {/*以下为测试数据，为了可以使用视图滚动改变状态栏透明度演示效果*/}
              <ListItem
                leftIconType={'MIB'}
                leftText={'我的借款'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIT'}
                leftText={'交易记录'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIQ'}
                leftText={'常见问题'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIC'}
                leftText={'联系客服'}
                rightText={'工作日9:00-18:00'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIF'}
                leftText={'用户反馈'}
                isService={true}
                rightText={'客服回复你啦'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIA'}
                leftText={'关于币下分期'}
                hasBottomLine={true}
                rightText={'0.1.0'}
              />
              <ListItem
                leftIconType={'MIS'}
                leftText={'设置'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIB'}
                leftText={'我的借款'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIT'}
                leftText={'交易记录'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIQ'}
                leftText={'常见问题'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIC'}
                leftText={'联系客服'}
                rightText={'工作日9:00-18:00'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIF'}
                leftText={'用户反馈'}
                isService={true}
                rightText={'客服回复你啦'}
                hasBottomLine={true}
              />
              <ListItem
                leftIconType={'MIA'}
                leftText={'关于币下分期'}
                hasBottomLine={true}
                rightText={'0.1.0'}
              />
              <ListItem
                leftIconType={'MIS'}
                leftText={'设置'}
                hasBottomLine={true}
              />
            </View>
          </View>
        </ScrollView>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoWrapper: {
    width: width,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Util.isIPhoneX() ? 88 : 44,
  },
  avatarbg: {
    width: 116,
    height: 116,
    ...Layout.layout.csbc
  },
  imgPos: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  avatarbg_ar_wrap: {
    overflow: 'hidden',
    width: 102,
    height: 102,
    marginTop: 6,
    borderRadius: 51,
  },
  avatarbg_ar: {
    width: '100%',
    height: '100%',
  },
});