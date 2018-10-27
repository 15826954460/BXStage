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
import {Layout} from  './app/styles/layout';

/** 第三方依赖库的引用 */
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from 'react-navigation';

/** 页面以及自定义组件的引用 */
import RegisterPage from './app/pages/register';
import LoginPage from './app/pages/login';
import InstalmentPage from './app/pages/instalment';
import LoginOutPage from './app/pages/loginOut';

/** 工具类的引用 */
import {StatusBarUtil} from './app/utils/statusBar';

const Stack = createStackNavigator(
  {
    LoginPage: { screen: LoginPage },
    LoginOutPage: {screen:LoginOutPage},
    RegisterPage: { screen: RegisterPage },
    InstalmentPage: { screen: InstalmentPage },
  },
  {
    initialRouteName: 'RegisterPage',
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false, // 默认不启用滑动手势(ios手机默认启用，android手机默认关闭)
    },
    // 路由配置
    onTransitionStart: (res) => {},
    // 动画配置
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
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
    SplashScreen.hide()
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