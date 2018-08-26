import React, {Component} from 'react';
import {
  Image, StyleSheet
} from 'react-native';

export default class TabBarItem extends Component {
  render() {
    const {focused, focusImage, blurImage} = this.props
    return (
      <Image
        source={focused ? focusImage : blurImage}
        style={{tintColor: this.props.tintColor, width: 25, height: 25}}
      />
    )
  }
}

const styles = StyleSheet.create({
  icon_style: {
    width: 25,
    height: 25
  }
});