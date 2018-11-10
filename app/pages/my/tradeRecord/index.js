/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import ListItem from '../../../components/ListItem/ListItem';
import CNavigation from '../../../components/CNavigation';
import {Layout} from "../../../styles/layout";

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

export default class TradRecord extends Component {

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
      >
        <ScrollView style={styles.container}>
          <View style={[{
            paddingVertical: 30,
            backgroundColor: Layout.color.white_bg,
            marginBottom: 15
          }, styles.paddingHorizontal]}>
            <Text style={{fontSize: 30}}>{'交易记录'}</Text>
          </View>

          <ListItem
            leftText={'还款'}
            leftTextBottom={'5月15日 21:00:00'}
            rightText={'-100.00'}
            isShowRightIcon={false}
            hasAllBottomLine={true}
            wrapperStyle={{
              height: 60,
              marginTop: 0,
              backgroundColor: '#fff'
            }}
          />
          <ListItem
            leftText={'还款'}
            leftTextBottom={'5月15日 21:00:00'}
            rightText={'-100.00'}
            isShowRightIcon={false}
            hasAllBottomLine={true}
            wrapperStyle={{
              height: 60,
              marginTop: 0,
              backgroundColor: '#fff'
            }}
          />
          <ListItem
            leftText={'还款'}
            leftTextBottom={'5月15日 21:00:00'}
            rightText={'-100.00'}
            isShowRightIcon={false}
            hasAllBottomLine={true}
            wrapperStyle={{
              height: 60,
              marginTop: 0,
              backgroundColor: '#fff'
            }}
          />

          <View style={[{height: 70, justifyContent: 'center'}, styles.paddingHorizontal]}>
            <Text style={{color: Layout.color.wgray_main, fontSize: 13, marginBottom: 3}}>
              {'交易编号'}
            </Text>
            <Text style={{color: Layout.color.black, fontSize: 13,}}>
              {'220201805150000019729'}
            </Text>
          </View>

          <ListItem
            leftText={'还款'}
            leftTextBottom={'5月15日 21:00:00'}
            rightText={'-100.00'}
            isShowRightIcon={false}
            hasAllBottomLine={true}
            wrapperStyle={{
              height: 60,
              marginTop: 0,
              backgroundColor: '#fff'
            }}
          />
        </ScrollView>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.light_gray,
  },
  paddingHorizontal: {
    paddingHorizontal: 12,
  }
});