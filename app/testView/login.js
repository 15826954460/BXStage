/**
 * 依赖库
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import {StackNavigator, NavigationActions} from 'react-navigation'

/**
 * 工具包
 */
import Routers from '../stores/routers'
import {UserInfo} from '../stores/UserInfo'
import {FadeToTheLeft} from '../utility/transitionConfig'

class SureToLogin extends Component {
  _login = () => {
    AsyncStorage.mergeItem('User', JSON.stringify({login: true}))
    UserInfo.updateData({login: true})

    Routers.navRoot.dispatch(
      NavigationActions.back({key: null})
    )
  }

  render() {
    return (
      <View style={Styles.wrap}>
        <Text>{'确认!!!'}</Text>
        <TouchableOpacity
          style={Styles.btn}
          onPress={this._login}>
          <Text>{'路由'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Verify extends Component {
  render() {
    return (
      <View style={Styles.wrap}>
        <Text>{'验证!!!'}</Text>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => {
            this.props.navigation.navigate('SureToLogin')
          }}>
          <Text>{'路由'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Register extends Component {
  render() {
    return (
      <View style={Styles.wrap}>
        <Text>{'注册'}</Text>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => {
            this.props.navigation.navigate('Verify')
          }}>
          <Text>{'路由'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Login extends Component {
  render() {
    return (
      <View style={Styles.wrap}>
        <Text>{'登录'}</Text>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => {
            this.props.navigation.navigate('Register')
          }}>
          <Text>{'路由'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const LoginStack = StackNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  Verify: {screen: Verify},
  SureToLogin: {screen: SureToLogin},
}, {
  headerMode: 'none',
  navigationOptions: {gesturesEnabled: true},
  transitionConfig: FadeToTheLeft
})

export default class LoginPage extends Component {
  componentDidMount() {
    AsyncStorage.mergeItem('User', JSON.stringify({login: false}))
    UserInfo.updateData({login: false})

    const {params} = this.props.navigation.state
    if (params && params.logout) {
      Routers.navMain.dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'TabStack'})],
        })
      )
    }
  }

  render() {
    return <LoginStack/>
  }
}


const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
})
