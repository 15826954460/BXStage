/** react 组建的引用 */
import React, {Component} from "react";
import {
  StatusBar,Platform,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
class StatusBarUtil {
  // 初始化状态栏
  static initialStatusBar = () => {
    /**
     * 指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。
     * 常和带有半透明背景色的状态栏搭配使用。
     */
    Platform.OS === 'android' && StatusBar.setTranslucent(true)
    /**
     * 设置状态栏的背景色
     * color（字符串） - 背景色
     * [animated]（布尔类型） - 是否启用过渡动画
     */
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent')
    /**
     * 设置状态栏的样式
     * style（StatusBarStyle） - 将要设置的状态栏样式
     * [animated]（布尔类型） - 是否启用过渡动画
     */
    StatusBar.setBarStyle('dark-content', true)
    /**
     * 显示／隐藏状态栏
     * hidden（布尔类型） - 是否隐藏状态栏
     * [animation]（StatusBarAnimation） - 改变状态栏显示状态的动画过渡效果
     */
    StatusBar.setHidden(false, true)
  }
}
export {StatusBarUtil}