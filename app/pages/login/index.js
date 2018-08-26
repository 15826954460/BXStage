import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import Login from './login';

import {createStackNavigator} from 'react-navigation';


const LoginStackRoot = createStackNavigator({
  Login: {screen: Login}
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
})

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

  render() {
    return <LoginStackRoot ref={ref => {this.LoginStackRoot = ref}}/>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});