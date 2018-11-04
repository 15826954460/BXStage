import React, {Component} from 'react';
import {
  Image, StyleSheet
} from 'react-native';

export default class CTabIcon extends Component {
  render() {
    const {focused, focusImage, blurImage} = this.props
    return (
      <Image
        source={focused ? focusImage : blurImage}
        style={[
          // {marginBottom: focused ? 40 : 0,},
          // {width: focused ? 60 : 20, height: focused ? 60 : 20},
          {tintColor: this.props.tintColor},
          {width: 20, height: 20},
        ]}
      />
    )
  }
}