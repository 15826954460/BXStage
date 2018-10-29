/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView,
  Text, Image,
  View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {Layout} from "../../styles/layout";

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';

export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <CNavigation
        rightButton={{
          isShowTitle: true,
          title: '注册'
        }}
      >
        <ScrollView style={styles.scrollViewWrapper}>

          <View>
            <Text>6666</Text>
          </View>

        </ScrollView>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollViewWrapper: {
    flex: 1,
    backgroundColor: 'red'
  },

});