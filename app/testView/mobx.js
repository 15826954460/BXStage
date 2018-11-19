/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {observer} from 'mobx-react';

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

import {UserInfo} from '../pages/photo/mobx/mobx';

@observer
class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{UserInfo.realName}</Text>
        <Text>{666666}</Text>
      </View>
    );
  }
}

export default Vue2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});