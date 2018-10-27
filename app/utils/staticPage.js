/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,Image,
  Text,
  View,
} from "react-native";
import {Layout} from "../styles/layout";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
export default class StaticPages extends Component {
  static LoginAndRegisterHeader = (text) => {
    return  <View style={styles.registerHeader}>
      <Image
        style={styles.logo}
        resizeMode={'contain'}
        fadeDuration={0}
        source={require('../images/login/login_img_logo.png')}
      />
      <Text style={styles.title}>{text}</Text>
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
});