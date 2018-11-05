import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, Image, ImageBackground, Dimensions, StatusBar,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from '../../styles/layout';

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import CTouchableWithoutFeedback from '../../components/CTouchableWithoutFeedback';
import ListItem from '../../components/ListItem/ListItem';
import withFocus from '../../components/HOC/HOCNavigationEvents';
import withCNavigation from '../../components/HOC/HOCCNavigation';


/** 全局工具方法的引用 */
import {Util} from "../../utils/util";
import StorageData from "../../store/storageData";

/** 声明常量 */
const {width, height} = Dimensions.get('window');//屏幕宽度
const
  STATUS_BAR_LIGHT_THEME = 'light-content',
  STATUS_BAR_DARK_THEME = 'dark-content';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteName: '这个骚年很懒，没有备注名', // 备注名
      tel: '' // 手机号
    };
  }

  componentWillMount() {
  }

  componentDidFocus() {
    console.log(11111, '------获取焦点-------')
  }

  componentWillBlur() {
    console.log(11111, '------失去焦点-------')
  }

  componentDidMount() {
    /**
     * 为了演示效果，这里获取本地数据
     * 实际开发中根据接口返回的用户信息进行配置
     * */
    StorageData.getData('userInfo').then(res => {
      if (res) {
        let {tel, noteName} = res
        this.setState({
          tel: tel, noteName: noteName || this.state.noteName
        })
      }
    })
  }

  componentWillUnmount() {
  }

  _onScroll = (e) => {
    console.log(111111, e.nativeEvent)
  }

  render() {
    return (
      <ScrollView style={styles.container}
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
                {Util.takeSensitive(this.state.tel)}
              </Text>
            </View>

            <CTouchableWithoutFeedback
              handle={() => this.props.navigation.navigate('UserInfo')}>
              <View style={{
                width: 116, height: 116,
                position: 'relative',
                marginLeft: 23,
                justifyContent: 'flex-end'
              }}>
                <ImageBackground
                  fadeDuration={0}
                  style={[styles.avatarbg, styles.imgPos]}
                  source={require('../../images/common/common_shadow_abatar.png')}>
                  <View style={styles.avatarbg_ar_wrap}>
                    <Image
                      fadeDuration={0}
                      style={[styles.avatarbg_ar, {borderRadius: 50}]}
                      source={require('../../images/me/index_icon_bixia.png')}/>
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

        <ListItem
          iconType={'MIB'}
          leftText={'我的借款'}
        />
        <ListItem
          iconType={'MIT'}
          leftText={'交易记录'}
        />
        <ListItem
          iconType={'MIQ'}
          leftText={'常见问题'}
        />
        <ListItem
          iconType={'MIC'}
          leftText={'联系客服'}
          rightText={'工作日9:00-18:00'}
        />
        <ListItem
          iconType={'MIF'}
          leftText={'用户反馈'}
          isService={true}
          rightText={'客服回复你啦'}
        />
        <ListItem
          iconType={'MIA'}
          leftText={'关于币下分期'}
          rightText={'0.1.0'}
        />
        <ListItem
          iconType={'MIS'}
          leftText={'设置'}
        />


        {/*测试列表*/}
        <ListItem
          iconType={'MIB'}
          leftText={'我的借款'}
        />
        <ListItem
          iconType={'MIT'}
          leftText={'交易记录'}
        />
        <ListItem
          iconType={'MIQ'}
          leftText={'常见问题'}
        />
        <ListItem
          iconType={'MIC'}
          leftText={'联系客服'}
          rightText={'工作日9:00-18:00'}
        />
        <ListItem
          iconType={'MIF'}
          leftText={'用户反馈'}
          isService={true}
          rightText={'客服回复你啦'}
        />
        <ListItem
          iconType={'MIA'}
          leftText={'关于币下分期'}
          rightText={'0.1.0'}
        />
        <ListItem
          iconType={'MIS'}
          leftText={'设置'}
        />
      </ScrollView>
    );
  }
}

withFocus(Main)

export default withCNavigation(Main, {
  LeftOrRight: 'left',
  leftButton: {
    isShowIcon: true,
    isShowTitle: false,
  },
  theme: 'light',
  barStyle: STATUS_BAR_LIGHT_THEME,
  isPaddingTop: false,
  isSafeArea: false
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoWrapper: {
    width: width,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 88,
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