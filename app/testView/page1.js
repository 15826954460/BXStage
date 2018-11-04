import {TestData} from '../stores/TestPage'

import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {observer} from 'mobx-react/native'

import NavActivity from '../components/C_NavActivity'

@observer
export default class TestPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false
    }
  }

  render() {
    let {wifiName} = TestData.state;
    return (
      <View style={Styles.wrap}>
        <NavActivity
          navigator={this.props.navigation}
          title={{title: '测试页面1'}}
          leftButton={{disabled: false, title: '返回'}}/>
        <Text>{`wifi is: ${wifiName}`}</Text>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => {
            this.state.change = !this.state.change;
            TestData.updateState({
              wifiName: this.state.change ? 'CMCC-Web' : 'CMCC-Net'
            })
          }}>
          <Text>{'toggle wifi name'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => {
            this.props.navigation.navigate('Page2')
          }}>
          <Text>{'路由'}</Text>
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
