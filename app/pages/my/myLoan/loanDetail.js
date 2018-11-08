/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";
import {Size} from "../../../styles/size";
import {Util} from "../../../utils/util";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import CGradientButton from '../../../components/CGradientButton';


/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

class LoanDetailListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{
        backgroundColor: Layout.color.white_bg,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        height: 60,
        borderBottomColor: Layout.color.gray_line,
        borderBottomWidth: Size.screen.pixel,
        flexDirection: 'row'
      }}>

        <View style={{
          justifyContent: 'center',
          borderRightWidth: Size.screen.pixel,
          borderRightColor: Layout.color.gray_line,
          height: '100%',
          width: 48,
        }}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.2)', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems:'center'}}>
            <Text style={{color: Layout.color.white_bg, fontSize: 14}}>{'1期'}</Text>
          </View>

        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1,paddingLeft: 12}}>
          <View>
            <Text style={{color: Layout.color.wgray_main, fontSize: 16}}>{'¥186.77'}</Text>
            <Text style={{color: Layout.color.wgray_main, fontSize: 14}}>{'已结清'}</Text>
          </View>
          <View style={{flexDirection: 'row',}}>
            <Text>{'5月13日'}</Text>
            <Image style={{width: 14, height: 14}}
              source={require('../../../images/common/common_img_arrow.png')}/>
          </View>
        </View>

      </View>
    )
  }
}

export default class LoanDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  render() {
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        rightButton={{
          isShowTitle: true,
          title: '更多详情',
          handle: () => this.props.navigation.navigate('MoreDetail'),
        }}
        centerTitle={{
          title: '借款详情',
          titleStyle: {
            fontSize: 18,
          }
        }}
        isSafeAreaBottom={false}
      >
        <ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    contentContainerStyle={{paddingBottom: Util.isIPhoneX() ? 74 : 44}}
                    showsVerticalScrollIndicator={false}
        >
          <View style={styles.headWrapper}>
            <Text style={{fontSize: 13, color: Layout.color.wgray_bar}}>{'2018-05-13 借款(元)'}</Text>
            <Text style={{fontSize: 40, color: Layout.color.black,}}>
              {'1,000.00'}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 33}}>
              <View style={{alignItems: 'center', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    fontSize: 13,
                    color: Layout.color.wgray_bar,
                    marginRight: 5,
                    marginBottom: 3
                  }}>{'应还合计(元)'}</Text>
                  <Image style={{width: 12, height: 12}}
                         source={require('../../../images/me/loan/loan_img_details.png')}/>
                </View>
                <Text style={{color: Layout.color.black, fontSize: 16}}>{'1120.67'}</Text>
              </View>

              <View style={{
                alignItems: 'center',
                borderLeftWidth: Size.screen.pixel,
                borderRightWidth: Size.screen.pixel,
                borderLeftColor: Layout.color.gray_line,
                borderRightColor: Layout.color.gray_line,
                flex: 1
              }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    fontSize: 13,
                    color: Layout.color.wgray_bar,
                    marginRight: 5,
                    marginBottom: 3
                  }}>{'待还期数(期)'}</Text>
                </View>
                <Text style={{color: Layout.color.black, fontSize: 16}}>{'3 / 6'}</Text>
              </View>

              <View style={{alignItems: 'center', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    fontSize: 13,
                    color: Layout.color.wgray_bar,
                    marginRight: 5,
                    marginBottom: 3
                  }}>{'待还合计(元)'}</Text>
                </View>
                <Text style={{color: Layout.color.black, fontSize: 16}}>{'560.31'}</Text>
              </View>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Layout.color.white_bg,
            height: 44,
            paddingHorizontal: 12,
            borderBottomWidth: Size.screen.pixel,
            borderBottomColor: Layout.color.gray_line
          }}>
            <Text style={{fontSize: 16, color: Layout.color.black}}>{'还款计划'}</Text>
            <Text style={{fontSize: 14, color: Layout.color.wgray_bar}}>{'你有逾期请尽快还款'}</Text>
          </View>


          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
          <LoanDetailListItem/>
        </ScrollView>

        <View style={{position: 'absolute', bottom: 0}}>
          <CGradientButton
            isGradientButton={true}
            gradientType={'btn_bottom'}
            contentText={'结清借款(560.31元)'}
            contentTextStyle={{
              color: Layout.color.white_bg,
              fontSize: 17,
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
    backgroundColor: Layout.color.gray_line,
  },
  headWrapper: {
    paddingBottom: 24,
    paddingTop: 20,
    marginBottom: 26,
    backgroundColor: Layout.color.white_bg,
    alignItems: 'center',
    paddingHorizontal: 12,
  }
});