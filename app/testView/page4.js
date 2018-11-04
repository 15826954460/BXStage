'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Routers from '../stores/routers';

import NavActivity from '../components/C_NavActivity';

export default class TestPage4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false
    }
  }

  render() {
    return (
      <View style={Styles.wrap}>
        <NavActivity
          navigator={this.props.navigation}
          title={{title: '测试页面4'}}
          leftButton={{disabled: false, title: '返回'}}/>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => {
            this.props.navigation.popToTop()
          }}>
          <Text>{'pop to page 1'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => {
            Routers.navRoot.dispatch(
              NavigationActions.navigate({
                routeName: 'Login',
                params: {logout: true}
              })
            )
          }}>
          <Text>{'退出登录'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: '#ffe341',
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
