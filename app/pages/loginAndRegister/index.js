/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Dimensions, StatusBar,
  Text,
  View,
  Animated,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {SafeAreaView, withNavigation} from 'react-navigation';

/** 自定义组建的引用 */
import LoginPage from './login';
import RegisterPage from './register';
import {Layout} from "../../styles/layout";
import {Util} from "../../utils/util";

/** 声明一些常量 */
const {width, height} = Dimensions.get('window');
const ANDROID_STATUS_BAR_HEIGHT = StatusBar.currentHeight; // 获取当前设备状态栏的高度
const
  IPHONEX_STATUSBAR_HEIGHT = 44, /** iPhoneX 刘海状态栏高度 */
  IPHONEX_BOTTOM_AREA_HEIGHT = 34;
/** iPhoneX 底部 Home Indicator 横条安全区域高度 */

/** 获取页面安全区域可用高度,根据不同的手机做适配 */
const AVAILABLE_HEIGHT = Util.isAndroid() ? ANDROID_STATUS_BAR_HEIGHT : Util.isIPhoneX() ? (height - (IPHONEX_STATUSBAR_HEIGHT + IPHONEX_BOTTOM_AREA_HEIGHT)) : (height - 20);

export default class LoginAndRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginOpacity: new Animated.Value(0),
      registerOpacity: new Animated.Value(1),
      initialPage: 'register'
    };
  }

  componentDidMount() {
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  /** 跳转到注册页面 */
  _goToRegister = () => {
    Animated.timing(this.state.loginOpacity, {
      toValue: 0,
      duration: 320,
      useNativeDriver: true
    }).start()
    Animated.timing(this.state.registerOpacity, {
      toValue: 1,
      duration: 320,
      delay: 280,
      useNativeDriver: true
    }).start(() => {
      this._loginInstance.setNativeProps({style: {zIndex: 10,}})
      this._registerInstance.setNativeProps({style: {zIndex: 100,}})
    })
    this.setState({initialPage: 'register'})
  }

  /** 跳转到登陆页面 */
  _goToLogin = () => {
    Animated.timing(this.state.registerOpacity, {
      toValue: 0,
      duration: 320,
      useNativeDriver: true
    }).start()
    Animated.timing(this.state.loginOpacity, {
      toValue: 1,
      duration: 320,
      delay: 280,
      useNativeDriver: true
    }).start(() => {
      this._loginInstance.setNativeProps({style: {zIndex: 100,}})
      this._registerInstance.setNativeProps({style: {zIndex: 10,}})
    })
    this.setState({initialPage: 'login'})
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, position: 'relative'}}>
          {/*注册页*/}
          <Animated.View
            ref={ref => this._registerInstance = ref}
            style={[
              styles.animatedContainer,
              {
                opacity: this.state.registerOpacity,
                transform: [{
                  translateY: this.state.registerOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [60, 0]
                  })
                }],
                zIndex: this.state.initialPage === 'register' ? 100 : 10
              }
            ]}
          >
            <RegisterPage switchToLogin={this._goToLogin}/>
          </Animated.View>

          {/*登陆页*/}
          <Animated.View
            ref={ref => this._loginInstance = ref}
            style={[
              styles.animatedContainer,
              {
                opacity: this.state.loginOpacity,
                transform: [{
                  translateY: this.state.loginOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [60, 0]
                  })
                }],
                zIndex: this.state.initialPage === 'login' ? 100 : 10
              }
            ]}
          >
            <LoginPage switchToRegister={this._goToRegister}/>
          </Animated.View>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    backgroundColor: Layout.color.white_bg,
  },
  animatedContainer: {
    width: width,
    height: AVAILABLE_HEIGHT,
    position: 'absolute',
  },
});