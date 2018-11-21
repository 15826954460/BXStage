/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Image, Text, View,NetInfo,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {StackActions, NavigationActions} from 'react-navigation';

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import CGradientButton from '../../components/CGradientButton';
import {Layout} from "../../styles/layout";
import {Routers} from '../../store/routes';

/** 自定义工具方法的使用 */
import StorageData from '../../store/storageData';

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

  _isConnected = () => {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleFirstConnectivityChange);
  }

  _handleFirstConnectivityChange = (isConnected) => {
    window.console.log(`-------- 当前联网状态为 '${isConnected}-------`);
    isConnected && StorageData.getData('registerInfo').then((res) => {
      if (res) {
        let {hasRegister} = res
        // 已经注册就到登陆，否则到注册页面
        let _initPage = hasRegister ? 'login' : 'register';
        /** 路由栈的重置 */
        Routers.stackRoots.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'LoginAndRegister',
                params: {initPage: _initPage}
              }),
            ]
          })
        )
      }
    })
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
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
              onPress={this._isConnected}
              textStyle={{
                fontSize: 16,
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
    color: '#B8B8B8',
  },
  btnWrapper: {
    marginTop: 51,
    ...Layout.layout.ccc,
  },
});