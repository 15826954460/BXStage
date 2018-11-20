/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView, Text, Image, View, TouchableWithoutFeedback, StatusBar, ImageBackground,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";

/** 第三方依赖库的引用 */
import DeviceInfo from "react-native-device-info";
import LinearGradient from 'react-native-linear-gradient';

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import ListItem from '../../components/ListItem/ListItem';
import CGradientButton from '../../components/CGradientButton';

/** 全局公用方法的引用 */
import {Util} from '../../utils/util';
import {Size} from "../../styles/size";

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headPicture: '', // 用户头像那
    };
  }

  componentDidMount() {
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <CNavigation
        isPaddingTop={false}
        isNavContent={false}
        isSafeAreaTop={false}
        isSafeAreaBottom={false}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: Util.isIPhoneX() ? 44 : (Number(DeviceInfo.getAPILevel()) >= 21 ? StatusBar.currentHeight : 20)
          }}
          style={styles.container}>

          <View style={styles.headerTopWrapper}>
            <Text style={styles.headerTitle}>{'逾期账单'}</Text>
            <TouchableWithoutFeedback>
              <View style={styles.headerPicWrapper}>
                <Image style={{width: 50, height: 50}}
                       source={require('../../images/me/index_icon_bixia.png')}/>
              </View>
            </TouchableWithoutFeedback>
          </View>


          <ImageBackground
            resizeMode={'stretch'}
            style={[styles.cardWrapper]}
            source={require('../../images/common/index_img_toastshadow.png')}
          >
            <LinearGradient
              style={[styles.bodyCardBG, {borderRadius: 10, paddingHorizontal: 15, paddingVertical: 34}]}
              start={{x: 0.0, y: 1.0}}
              end={{x: 1.0, y: 1.0}}
              locations={[0, 1.0]}
              colors={[Layout.color.btno_start, Layout.color.btno_end]}
            >

              <ImageBackground
                style={styles.bodyCardBG}
                resizeMode={'contain'}
                fadeDuration={0}
                source={require('../../images/common/index_img_cardbg.png')}>

                <View>
                  <Text style={{color: Layout.color.white_bg, fontSize: 13}}>{'5月26日应还(元）'}</Text>

                  <Text style={{fontSize: 42, color: Layout.color.white_bg}}>{'353.19'}</Text>

                  <Text style={{color: Layout.color.white_bg, fontSize: 13}}>{"从中国银行(1986)自动扣款"}</Text>
                </View>

              </ImageBackground>

            </LinearGradient>

          </ImageBackground>


          {/*<View style={styles.itemWrapper}>*/}
            <ListItem
              wrapperStyle={{
                height: 60,
                marginTop: 20,
              }}
              leftText={'你有逾期，请尽快还款'}
              leftTextBottom={'已逾期4天，逾期费6.81元'}
              specialIconType={'WRANING'}
              isShowRightIcon={false}
              AllBottomLine={true}
            />

            <ListItem
              wrapperStyle={{
                height: 60,
              }}
              leftText={'借款详情'}
              leftTextBottom={'已还0期，共6期'}
              rightText={'可结清全部'}
              rightTextStyle={{
                fontSize: 14,
                color: Layout.color.wgray_main,
              }}
              hasAllBottomLine={true}
            />
          {/*</View>*/}

        </ScrollView>

        <View style={styles.buttonBottomWrapper}>
          <CGradientButton
            contentText={'去还款'}
            gradientType={'btn_l'}
            contentTextStyle={{
              color: Layout.color.white_bg,
            }}
          />
        </View>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTopWrapper: {
    width:Size.screen.width,
    height: 74,
    marginBottom: 16,
    paddingHorizontal: 12,
    ...Layout.layout.rsbc,
  },
  headerPicWrapper: {
    width: 74,
    height: 74,
    ...Layout.layout.ccc,
  },
  headerTitle: {
    fontSize: 30,
    color: Layout.color.wblack,
    fontWeight: 'bold',
  },
  cardWrapper: {
    width: Size.screen.width,
    height: Size.screen.width / 375 * 181,
    paddingHorizontal: 12,
    marginTop: 16,
    ...Layout.layout.cfsc,
  },
  bodyCardBG: {
    width: Size.screen.width - Layout.gap.gap_edge * 2,
    height: (Size.screen.width - Layout.gap.gap_edge * 2) / 351 * 160,
    ...Layout.layout.ccfs,
  },
  itemWrapper: {
    marginTop: 19,
    borderWidth: 1,
  },
  buttonBottomWrapper: {
    position: 'absolute',
    width: Size.screen.width,
    paddingHorizontal: 12,
    bottom: 20,
  }
});