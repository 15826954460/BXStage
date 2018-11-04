import React, {Component} from "react";
import {
  StyleSheet, Text, View,ScrollView,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from '../../styles/layout';

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';

/** 全局公用方法的引用 */

export default class Vue2 extends Component {

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
        isNeedNav={false}
      >
        <ScrollView
          style={{flex:1, borderWidth:1, borderColor: 'red'}}
        >
          <View style={styles.container}>
            <Text onPress={() => {
              this.props.navigation.navigate('LoginOutPage')
            }}>
              {'为爱debug'}
            </Text>
          </View>
        </ScrollView>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layout.layout.ccc,
    borderWidth: 1,
    borderColor: 'red'
  }
});