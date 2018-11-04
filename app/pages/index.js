/** react 组建的引用 */
import React, {Component} from "react";
import {
  View, AppState, Image
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator, NavigationActions, StackActions, createBottomTabNavigator} from 'react-navigation';

/** 自定义组件的引用 */
import CTabIcon from '../components/CTabIcon';

/** 页面引入 */
import LoginAndRegister from './loginAndRegister'; // 登陆和注册
import ValidationCodePage from './loginAndRegister/validationCode'; // 获取验证码
import SettingLoginPassword from './loginAndRegister/settingLoginPassword'; // 设置登陆密码
import ValidationTelephone from './loginAndRegister/validationTelephone'; // 手机号验证(忘记密码后需要跳转到的页面)
import validationIdCard from './loginAndRegister/validationIdCard'; // 身份证验证
import BXWebView from './bxWebView';
import LoginOutPage from './loginOut/index'; // 退出登陆
import SettingPage from './setting/index'; // 设置
import MorePerson from './errorPage/morePerson'; // 人数较多的提示页面
import EmptyPage from './errorPage/empty'; // 人数较多的提示页面
import NetErrorPage from './errorPage/netError'; // 人数较多的提示页面

import InstalmentPage from './instalment/index'; // 分期还款

import My from './my'; // 我
import UserInfo from './my/userInfo'; // 用户信息


/** 工具类的引用 */
import {StatusBarUtil} from '../utils/statusBar';
import {Horizontal_RToL_TranslateX, IOS_Default} from "../utils/transitionconfig";
import {Routers} from '../store/routes';
import StorageData from '../store/storageData';
import {Layout} from "../styles/layout";

/** 我的页面栈 */
const MyStack = createStackNavigator(
  {
    My: {screen: My},
    // UserInfo: {screen: UserInfo},
  },
  {
    initialRouteName: 'My',
    headerMode: 'none',
    mode: 'none',
    navigationOptions: {
      gesturesEnabled: true, // 默认不启用滑动手势(ios手机默认启用，android手机默认关闭)
    },
    /** 路由动画相关，可以获取当前路由栈以及当前路由 */
    onTransitionStart: (transitionProps, prevTransitionProps) => {
      // console.log(4444, transitionProps, prevTransitionProps)
    },
    /** 动画配置 */
    transitionConfig: Horizontal_RToL_TranslateX,
  }
)

/** 主页面信息栈 */
const MainStack = createBottomTabNavigator(
  {
    '分期': {
      screen: InstalmentPage,
    },
    '我': {
      screen: MyStack
    },
  },
  {
    initialRouteName: '我',
    /** 配置导航的相关参数(这里针对全局配置，也可以放在单独配置) */
    tabBarOptions: {
      activeTintColor: Layout.color.red_main, // 文字激活的颜色
      inactiveTintColor: Layout.color.wgray_main, // 文字为激活颜色
      // 底部tab栏的配置项
      style: {
        borderTopWidth: 0.5,
        borderTopColor: Layout.color.wgray_main,
        backgroundColor: Layout.color.white_bg,
      },
      // 标签样式
      labelStyle: {
        fontSize: 14,
      },
      tabStyle: {
        /**  选项卡的样式自行配置 */
      }
    },
    /** 导航图标的配置(这里针对全局配置，也可以放在单独配置) */
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return <CTabIcon
          focused={focused}
          focusImage={require('../images/me/index_icon_bixia.png')}
          blurImage={require('../images/me/me_img_headmask.png')}
        />;
      },
    }),
    /** 页面动画的配置(这里针对全局配置，也可以放在单独配置) */
    transitionConfig: Horizontal_RToL_TranslateX,
  }
)

/** 登陆注册栈 */
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
    MainStack: {screen: MainStack},
    SettingPage: {screen: SettingPage},
    MorePerson: {screen: MorePerson},
    EmptyPage: {screen: EmptyPage},
    NetErrorPage: {screen: NetErrorPage},
    UserInfo: {screen: UserInfo},
  },
  {
    initialRouteName: 'AuthStatus',
    headerMode: 'none',
    mode: 'none',
    navigationOptions: {
      gesturesEnabled: true, // 默认不启用滑动手势(ios手机默认启用，android手机默认关闭)
    },
    /** 路由动画相关，可以获取当前路由栈以及当前路由 */
    onTransitionStart: (transitionProps, prevTransitionProps) => {
      // console.log(4444, transitionProps, prevTransitionProps)
    },
    /** 动画配置 */
    transitionConfig: Horizontal_RToL_TranslateX,
  }
)

/** 自定义组建的引用 */
export default class InitStack extends Component {

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
              NavigationActions.navigate({
                routeName: 'LoginAndRegister',
                params: {initPage: _initPage}
              }),
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
