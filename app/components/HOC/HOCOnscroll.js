/** react 组建的引用 */
import React, {Component} from "react";
import {
  Dimensions,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {withHandlers, compose} from 'recompact';

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

export default function withOnScroll(TargetComponent) {

  const onScrollWithHandler = withHandlers({
    onScroll: props => e => {
      let {y} = e.nativeEvent.contentOffset
      let {contentSize, layoutMeasurement} = e.nativeEvent
      let maxOffsetY = contentSize.height - layoutMeasurement.height
      maxOffsetY = Math.min(Math.floor(maxOffsetY), height * 0.1);
      maxOffsetY <= 0 && (maxOffsetY = height * 0.1)
      let alpha = (y / maxOffsetY).toFixed(2)
      let nav = props.getNav()
      nav && nav.fadeInBottomLine(alpha)
      let statusBar = props.getStatusBar()
      statusBar && !statusBar.isStaticStyle() && statusBar.setBarStyle(alpha >= 0.8 ? STATUS_BAR_DARK_STYLE : STATUS_BAR_LIGHT_STYLE)
    }
  })

  return compose(onScrollWithHandler)(Component)
}