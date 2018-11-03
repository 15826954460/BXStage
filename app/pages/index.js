/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, View, AppState
} from "react-native";

/** 全局样式的引用 */
import {Layout} from '../styles/layout';

/** 第三方依赖库的引用 */
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator, StackActions, NavigationActions} from 'react-navigation';

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
import {Horizontal_RToL_TranslateX, IOS_Default} from "../utils/transitionconfig";
import StorageData from '../store/storageData';
import {Routers} from '../store/routes';

const Stack = createStackNavigator(
  {
    AuthStatus: {screen: () => <View/>}, // 初始化空页面，根据用户是否已经登录进行判断首页为那个页面
    LoginAndRegister: {
      screen: LoginAndRegister, navigationOptions: {
        transitionConfig: IOS_Default, // 为该页面单独配置动画
      }
    },
    ValidationCodePage: {screen: ValidationCodePage},
    SettingLoginPassword: {screen: SettingLoginPassword},
    ValidationTelephone: {screen: ValidationTelephone},
    validationIdCard: {screen: validationIdCard},
    BXWebView: {screen: BXWebView},
    LoginOutPage: {screen: LoginOutPage},
    InstalmentPage: {screen: InstalmentPage},
    SettingPage: {screen: SettingPage},
    MorePerson: {screen: MorePerson},
    EmptyPage: {screen: EmptyPage},
    NetErrorPage: {screen: NetErrorPage},
  },
  {
    initialRouteName: 'AuthStatus',
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
    this.state = {
      appState: AppState.currentState // 保存当前app的状态
    };
    StatusBarUtil.initialStatusBar() // 初始化装填栏的样式
  }

  componentWillMount() {

  }

  componentDidMount() {
    /** 添加app状态改变事件监听 */
    AppState.addEventListener('change', this._handleAppStateChange);

    Routers.stackRoots = this._stackRoots
    /** 根据用户的状态判断进入那个页面, 实际开发中比这些要复杂
     *  请根据请求接口自行配置和处理
     *  eg: 判断是不是前后台运行来获取最新数据
     *      是否超过过期时间需重新登录
     *      版本是否有升级，是否清空本地缓存等等实际业逻辑这里就不再过多赘述
     * */
    StorageData.getData('userInfo').then((res) => {
      if (res) {
        let {hasLogin} = res
        let _initPage = hasLogin ? 'login' : 'register'
        /** 路由栈的重置 */
        this._stackRoots.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: 'LoginAndRegister', params: {initPage: _initPage}}),
            ]
          })
        )
      }
    })


    SplashScreen.hide() // 隐藏白屏
  }

  _handleAppStateChange = (nextAppState) => {
    /** app 从后台切换到前台运行 */
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      StatusBarUtil.initialStatusBar() // 初始化状态栏
      /**
       * 这里根据实际业务需求进行 一些数据的初始化或者数据跟新
       * 可以通过 mobx 或者事件 监听来刷新数据
       * */
    }
    this.state.appState = nextAppState;
  }

  componentWillUnmount() {

  }

  render() {
    return <Stack ref={ref => this._stackRoots = ref}/>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layout.layout.ccc,
  }
});