import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import Register from './register';

import {createStackNavigator} from 'react-navigation';

const RegisterStackRoot = createStackNavigator({
  Login: {screen: Register}
}, {
  initialRouteName: 'Register',
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
    return <RegisterStackRoot ref={ref => {this.RegisterStackRoot = ref}}/>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});