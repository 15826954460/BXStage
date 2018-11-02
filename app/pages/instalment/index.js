/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import {Layout} from "../../styles/layout";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */

/** 全局公用方法的引用 */
import StorageData  from '../../store/storageData';

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /** 获取本地的用户信息 */
    StorageData.getData('userInfo').then((res) => {
      if (res) {
        this.setState({userInfo: res})
      }
    }).catch((error) => {
      console.log(`获取信息---【userInfo】----失败，失败信息为【${error}】!!!!!!`)
    })
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => {
          this.props.navigation.navigate('LoginOutPage')
        }}>
          {'退出登陆'}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layout.layout.ccc,
  }
});