/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, FlatList, ScrollView,
} from "react-native";

/** 全局样式的引用 */
import {Size} from '../../../styles/size';
/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import ListItem from '../../../components/ListItem/ListItem';
import {Layout} from "../../../styles/layout";

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

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

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  render() {
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        centerTitle={{
          title: '更多详情',
          titleStyle: {
            fontSize: 18,
          }
        }}
      >
        <ScrollView
          style={styles.container}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: 15}}
        >
          <View style={{borderBottomWidth: Size.screen.pixel, borderBottomColor: Layout.color.gray_line}}>
            <ListItem
              leftText={'借款人姓名'}
              rightText={'卢晓龙'}
              isShowRightIcon={false}
              wrapperStyle={{
                height: 44,
                marginTop: 0,
                backgroundColor: '#fff'
              }}
            />
          </View>

        </ScrollView>


      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.light_gray,
  }
});