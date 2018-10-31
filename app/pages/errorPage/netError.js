/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,Image, Text, View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import CGradientButton from '../../components/CGradientButton';
import {Layout} from "../../styles/layout";

export default class NetErrorPage extends Component {

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
        leftorright={'left'}
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        centerTitle={{
          title: '币下分期',
          titleStyle: {
            fontSize: 18,
            fontFamily: 'PingFangSC-Medium',
            color: '#000'
          }
        }}
      >
        <View style={styles.container}>

          <View style={styles.wrapper}>
            <Image
              style={styles.imgStyle}
              source={require('../../images/errorPage/image_network_error.png')}
            />
            <Text style={styles.textStyle}>{"网络开小差了"}</Text>
          </View>

          <View style={styles.btnWrapper}>

            <CGradientButton
              colorsArray={[Layout.color.white_bg, Layout.color.white_bg]}
              gradientType={'btn_xs'}
              isGradientButton={false}
              contentText={'点击刷新'}
              colorsPressArray={[Layout.color.gray_press, Layout.color.gray_press]}
              additionalStyle={{
                borderWidth: 0.5,
                borderColor: Layout.color.gray_line,
              }}
              textStyle={{
                fontSize: 16,
                fontFamily: 'PingFangSC-Regular',
                color: Layout.color.wgray_main,
              }}
            >

            </CGradientButton>

          </View>


        </View>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    ...Layout.layout.ccc,
  },
  imgStyle: {
    marginTop: 65,
    marginBottom: 30,
    width: 195,
    height: 195,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'PingFangSC-Regular',
    color: '#B8B8B8',
  },
  btnWrapper: {
    marginTop: 51,
    ...Layout.layout.ccc,
  },
});