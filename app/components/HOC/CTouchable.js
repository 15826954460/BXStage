/** react 组建的引用 */
import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";

/** 第三方依赖库的引用 */
import PropTypes from "prop-types";

export default function HOCTouchable(TagComponent) {
  class CTouchable extends Component {
    static propTypes = {
      disabled: PropTypes.bool,
      onPress: PropTypes.func
    };
    static defaultProps = {
      disabled: false,
      onPress: null
    };

    constructor(props) {
      super(props);
      this.timer = null;
      this.isJump = true;
    }

    /** 判断是否允许进行页面的跳转 */
    _isAllowToJump = () => {
      if (this.isJump) {
        this._changeJump();
        return true;
      } else {
        return false;
      }
    };

    /** 通过定时器来控制页面的跳转，防止react-navigation连续快速点击会导致页面多次跳转 */
    _changeJump = () => {
      this.isJump = false;
      this.timer = setTimeout(() => {
        this.isJump = true;
        clearTimeout(this.timer);
        this.timer = null;
      }, 500);
    };

    _onPress = () => {
      const { handle } = this.props;
      this._isAllowToJump() && handle instanceof Function && handle();
    };

    render() {
      return <TagComponent {...this.props} onPress={this._onPress} />;
    }
  }
  return CTouchable;
}
