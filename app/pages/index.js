/** react 组建的引用 */
import React, {Component} from "react";
import {
  View, AppState, NetInfo,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator, NavigationActions, StackActions, createBottomTabNavigator} from 'react-navigation';

/** 自定义组件的引用 */
import CTabIcon from '../components/CTabIcon';

/** 工具类的引用 */
import {Horizontal_RToL_TranslateX, IOS_Default} from "../utils/transitionconfig";
import {Routers} from '../store/routes';
import StorageData from '../store/storageData';
import {Layout} from "../styles/layout";

/** 页面引入 */
import LoginAndRegister from './loginAndRegister'; // 登陆和注册
import ValidationCodePage from './loginAndRegister/validationCode'; // 获取验证码
import SettingLoginPassword from './loginAndRegister/settingLoginPassword'; // 设置登陆密码
import ValidationTelephone from './loginAndRegister/validationTelephone'; // 手机号验证(忘记密码后需要跳转到的页面)
import validationIdCard from './loginAndRegister/validationIdCard'; // 身份证验证
import ModifyLoginPassword from './modifyLoginPassword'; // 重置密码
import BXWebView from './bxWebView';
import LoginOutPage from './loginOut/index'; // 退出登陆
import MorePerson from './errorPage/morePerson'; // 人数较多的提示页面
import EmptyPage from './errorPage/empty'; // 人数较多的提示页面
import NetErrorPage from './errorPage/netError'; // 人数较多的提示页面
import HasFeedBack from './my/userFeedback/hasFeedBack'; // 人数较多的提示页面
import NoFeedBack from './my/userFeedback/noFeedBack'; // 人数较多的提示页面

import InstalmentPage from './instalment/index'; // 分期还款

/** 以下为我的页面的引用 */
import My from './my'; // 我
import AccountInfo from './my/accountInfo'; // 用户信息
import ReName from './my/accountInfo/rename'; // 修改昵称
import MyLoan from './my/myLoan'; // 我的借款
import LoanDetail from './my/myLoan/loanDetail'; // 借款详情
import MoreDetail from './my/myLoan/moreDetail'; // 更多详情
import TradeRecord from './my/tradeRecord'; // 交易记录
import CommonProblem from './my/commonProblem'; // 交易记录
import SettingPage from './my/setting/index'; // 设置

import Test from '../pages/testView/test';

/** 以下为相册相关页面的引用 */
import PhotoPage from '../pages/photo'; // 所有图片的分类
import ChoosePhoto from '../pages/photo/choose'; // 所有图片的分类

/** 获取一些本地数据 **/
import {
  userInfo,
  bankInfo,
  loanCardInfo,
  myLoan,
  loanDetail,
  moreDetail,
  tradeRecode,
  userFeedBack,
  appConfig,
  accountProblem,
  approvalProblem,
  lendingProblem,
  productIntroduce
} from '../store/data';

/** 主页面信息栈 */
const MainStack = createBottomTabNavigator(
  {
    '分期': {
      screen: InstalmentPage,
    },
    '我': {
      screen: My
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

/** 相册图库的栈 */
const PhotoStack = createStackNavigator(
  {
    PhotoPage: {screen: PhotoPage},
    ChoosePhoto: {screen: ChoosePhoto}
  },
  {
    initialRouteName: 'PhotoPage',
    headerMode: 'none',
    mode: 'none',
    navigationOptions: {
      gesturesEnabled: true, // 默认不启用滑动手势(ios手机默认启用，android手机默认关闭)
    },
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
    ModifyLoginPassword: {screen: ModifyLoginPassword},
    HasFeedBack: {screen: HasFeedBack},
    NoFeedBack: {screen: NoFeedBack},
    BXWebView: {screen: BXWebView},
    LoginOutPage: {screen: LoginOutPage},
    MainStack: {screen: MainStack},
    MorePerson: {screen: MorePerson},
    EmptyPage: {screen: EmptyPage},
    NetErrorPage: {screen: NetErrorPage},
    AccountInfo: {screen: AccountInfo},
    ReName: {screen: ReName},
    MyLoan: {screen: MyLoan},
    LoanDetail: {screen: LoanDetail},
    MoreDetail: {screen: MoreDetail},
    TradeRecord: {screen: TradeRecord},
    CommonProblem: {screen: CommonProblem},
    SettingPage: {screen: SettingPage},
    Test: {screen: Test},
    PhotoStack: {screen: PhotoStack},
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
      // console.log(transitionProps, prevTransitionProps)
    },
    onTransitionEnd: (transitionProps, prevTransitionProps) => {
      // console.log(transitionProps)
    },
    /** 动画配置 */
    transitionConfig: Horizontal_RToL_TranslateX,
  }
)

/** 自定义组建的引用 */
export default class InitStack extends Component {

  constructor(props) {
    super(props);
    this._isConnected = true;
    this.state = {
      appState: AppState.currentState // 保存当前app的状态
    };
  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleFirstConnectivityChange);
    /** 向本地储存一些数据,方便数据后面的展示，各模块的数据结构参考
     * store/data.js
     * */
    StorageData.saveData('userInfo', userInfo)
    StorageData.saveData('bankInfo', bankInfo)
    StorageData.saveData('loanCardInfo', loanCardInfo)
    StorageData.saveData('myLoan', myLoan)
    StorageData.saveData('loanDetail', loanDetail)
    StorageData.saveData('moreDetail', moreDetail)
    StorageData.saveData('tradeRecode', tradeRecode)
    StorageData.saveData('userFeedBack', userFeedBack)
    StorageData.saveData('appConfig', appConfig)

    StorageData.saveData('accountProblem', accountProblem)
    StorageData.saveData('approvalProblem', approvalProblem)
    StorageData.saveData('lendingProblem', lendingProblem)
    StorageData.saveData('productIntroduce', productIntroduce)

    // StorageData.removeData('userFeedBack')
  }

  _handleFirstConnectivityChange = (isConnected) => {
    window.console.log(`-------- 当前联网状态为 '${isConnected}-------`);
    this._isConnected = isConnected
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleFirstConnectivityChange);
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
     *
     *  演示效果仅仅判断用户是否已经注册
     * */
    if (this._isConnected) {
      StorageData.getData('registerInfo').then((res) => {
        if (res) {
          let {hasRegister} = res
          // 已经注册就到登陆，否则到注册页面
          let _initPage = hasRegister ? 'login' : 'register';
          /** 路由栈的重置 */
          this._stackRoots.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  // routeName: 'LoginAndRegister',
                  // routeName: 'HasFeedBack',
                  routeName: 'NoFeedBack',
                  // routeName: 'Test',
                  // routeName: 'PhotoStack',
                  params: {initPage: _initPage}
                }),
              ]
            })
          )
        }
      })
    }
    else {
      this._stackRoots.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'NetErrorPage'}),
          ]
        })
      )
    }
    SplashScreen.hide() // 隐藏白屏
  }

  _handleAppStateChange = (nextAppState) => {
    /** app 从后台切换到前台运行 */
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
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
