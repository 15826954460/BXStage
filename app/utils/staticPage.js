/** react 组建的引用 */
import React from "react";
import {
  StyleSheet, Image,
  Text,
  View,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
export default class StaticPages {
  // 登陆页面的头部
  static LoginAndRegisterHeader = (text) => {
    return <View style={styles.registerHeader}>
      <Image
        style={styles.logo}
        resizeMode={'contain'}
        fadeDuration={0}
        source={require('../images/login/login_img_logo.png')}
      />
      <Text style={styles.title}>{text}</Text>
    </View>
  }
  // 验证码和设置密码的头部
  static validationAndSetting = (title, text) => {
    return <View style={styles.entryWrapper}>
      <Text style={{fontSize: 30, marginBottom: 4, color: Layout.color.wblack, fontFamily: 'PingFangSC-Semibold'}}>
        {title}
      </Text>
      <Text style={{fontSize: 14, color: Layout.color.wgray_main}}>
        {text}
      </Text>
    </View>
  }
}
const styles = StyleSheet.create({
  registerHeader: {
    flex: 1,
    height: 42,
    lineHeight: 42,
    marginTop: 20,
    marginBottom: 35,
    ...Layout.layout.rfsc,
  },

  logo: {
    width: 29,
    height: 32,
    marginRight: 10,
  },
  title: {
    fontSize: Layout.font.Title1,
    color: Layout.color.wblack,
    lineHeight: 42,
    fontWeight: Layout.fontWeight.Semibold
  },
  entryWrapper: {
    flex: 1,
    marginTop: 20,
    marginBottom: 38,
  },
});