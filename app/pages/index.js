/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from '../styles/layout';

/** 第三方依赖库的引用 */
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from 'react-navigation';

/** 页面以及自定义组件的引用 */
import LoginAndRegister from './loginAndRegister'; // 登陆和注册
import ValidationCodePage from './loginAndRegister/validationCode'; // 获取验证码
import SettingLoginPassword from './loginAndRegister/settingLoginPassword'; // 设置登陆密码
import ValidationTelephone from './loginAndRegister/validationTelephone'; // 手机号验证(忘记密码后需要跳转到的页面)
import validationIdCard from './loginAndRegister/validationIdCard'; // 身份证验证
import BXWebView from './bxWebView';
import InstalmentPage from './instalment/index'; // 分期还款
import LoginOutPage from './loginOut/index'; // 退出登陆
import SettingPage from './setting/index'; // 设置
import MorePerson from './errorPage/morePerson'; // 人数较多的提示页面
import EmptyPage from './errorPage/empty'; // 人数较多的提示页面
import NetErrorPage from './errorPage/netError'; // 人数较多的提示页面

/** 工具类的引用 */
import {StatusBarUtil} from '../utils/statusBar';
import {Horizontal_RToL_TranslateX} from "../utils/transitionconfig";

const Stack = createStackNavigator(
  {
    LoginAndRegister: { screen: LoginAndRegister },
    ValidationCodePage: { screen: ValidationCodePage },
    SettingLoginPassword: { screen: SettingLoginPassword },
    ValidationTelephone: { screen: ValidationTelephone },
    validationIdCard: { screen: validationIdCard },
    BXWebView: { screen: BXWebView },
    LoginOutPage: {screen:LoginOutPage},
    InstalmentPage: { screen: InstalmentPage },
    SettingPage: { screen: SettingPage },
    MorePerson: { screen: MorePerson },
    EmptyPage: { screen: EmptyPage },
    NetErrorPage: { screen: NetErrorPage },
  },
  {
    initialRouteName: 'LoginAndRegister',
    headerMode: 'none',
    mode: 'none',
    navigationOptions: {
      gesturesEnabled: true, // 默认不启用滑动手势(ios手机默认启用，android手机默认关闭)
    },
    // 路由动画相关，可以获取当前路由栈以及当前路由
    onTransitionStart: (transitionProps, prevTransitionProps) => {
      // console.log(4444, transitionProps, prevTransitionProps)
    },
    // 动画配置
    transitionConfig: Horizontal_RToL_TranslateX,
  }
)

/** 自定义组建的引用 */
export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    StatusBarUtil.initialStatusBar() // 初始化装填栏的样式
  }

  componentDidMount() {
    SplashScreen.hide() // 隐藏白屏
    // 为了效果，向本地存储一些验证数据的信息
  }

  componentWillMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return <Stack/>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layout.layout.ccc,
  }
});