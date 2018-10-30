/** react 组建的引用 */
import React, {Component} from "react";
import {
  TouchableWithoutFeedback
} from "react-native";

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

export default class CTouchableWithoutFeedback extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
  }
S
  static defaultProps = {
    disabled: false,
    onPress: null,
  }

  constructor(props) {
    super(props);
    this.timer = null;
    this.isJump = true;
  }

  /** 判断是否允许进行页面的跳转 */
  _isAllowToJump = () => {
    if (this.isJump) {
      this._changeJump()
      return true
    } else {
      return false
    }
  }

  /** 通过定时器来控制页面的跳转，防止react-navigation连续快速点击会导致页面多次跳转 */
  _changeJump = () => {
    this.isJump = false
    this.timer = setTimeout(() => {
      this.isJump = true
      clearTimeout(this.timer)
      this.timer = null
    }, 500)
  }

  _onPress = () => {
    const {onPress} = this.props
    console.log(1111, '=======')
    this._isAllowToJump() && onPress instanceof Function && onPress()
  }

  render() {
    return (
      <TouchableWithoutFeedback
        {...this.props}
        onPress={this._onPress}
      >
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }
}