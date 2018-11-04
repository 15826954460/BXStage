/**
 * 依赖库
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Animated, Easing} from 'react-native'
// import LottieView from 'lottie-react-native'

class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    return (
      <View style={Styles.wrap}>
        <Text>{'tab2'}</Text>
      </View>
    )
  }
}

export default Mine;

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: 200,
    height: 20,
    backgroundColor: '#ffe341',
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
