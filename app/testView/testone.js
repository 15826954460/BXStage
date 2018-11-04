/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */

/** 工具类的引用 */

/** 常量声明 */
const AuthenticationNavigator = createStackNavigator({
  SignIn: SignInScreen,
  ForgotPassword: ForgotPasswordScreen,
});

class AuthenticationScreen extends React.Component {
  static router = AuthenticationNavigator.router;

  render() {
    return (
      <AuthenticationNavigator navigation={this.props.navigation} />
    );
  }
}

const AppNavigator = createSwitchNavigator({
  Auth: AuthenticationScreen, // This screen renders a navigator!
  Home: HomeScreen,
});

export default class Vue2 extends Component {

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
    return <AppNavigator />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});