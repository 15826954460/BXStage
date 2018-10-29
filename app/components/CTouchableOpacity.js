/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, View, ViewPropTypes, TouchableOpacity
} from "react-native";

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

/** 全局样式的引用 */

export default class CTouchableOpacity extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    // getRef: PropTypes.func,
    activeOpacity: PropTypes.number,
    wrapperStyle: PropTypes.object,
  };

  static defaultProps = {
    disabled: false,
    onPress: null,
    activeOpacity: 1
  }

  constructor(props) {
    super(props);
    this.isJump = true;
    this.timer = null;
    // props.getRef instanceof Function && props.getRef(this)
  }

  /** 判断是否允许进行页面的跳转 */
  _isAllowToJump() {
    if (this.isJump) {
      this._changeJump()
      return true
    } else {
      return false
    }
  }

  /** 通过定时器来控制页面的跳转，防止react-navigation连续快速点击会导致页面多次跳转 */
  _changeJump() {
    this.isJump = false
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.timer = null
      this.isJump = true
    }, 1000)
  }

  _opPress() {
    const {disabled, onPress} = this.props
    !disabled && this._isAllowToJump() && onPress instanceof Function && onPress()
  }
  render() {
    const {wrapperStyle, activeOpacity} = this.props
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        delayPressIn={0}
        delayPressOut={0}
        onPress={() => this._opPress()}
      >
        <View style={[wrapperStyle]}>
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}