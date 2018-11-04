import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, Image, ImageBackground, Dimensions, StatusBar,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from '../../styles/layout';

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import ListItem from '../../components/ListItem/ListItem';

/** 全局工具方法的引用 */
import {Util} from "../../utils/util";

/** 声明常量 */
const {width, height} = Dimensions.get('window');//屏幕宽度

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true)
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <CNavigation
        LeftOrRight={'left'}
        leftButton={{
          isShowIcon: true,
          isShowTitle: false,
        }}
        isPaddingTop={false}
        isSafeArea={false}
      >
        <ScrollView style={styles.container}
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
                  {'柏运送fsdfhfdsfdsfdsfdsfdsfds'}
                </Text>
                <Text style={{fontSize: 14, color: Layout.color.white_bg}}>
                  {'158****4460'}
                </Text>
              </View>

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
          />
          <ListItem
            iconType={'MIF'}
            leftText={'用户反馈'}
            isService={true}
          />
          <ListItem
            iconType={'MIA'}
            leftText={'关于币下分期'}
          />
          <ListItem
            iconType={'MIS'}
            leftText={'设置'}
          />



        </ScrollView>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red'
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