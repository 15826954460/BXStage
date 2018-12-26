/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView,
  Text, Image,
  View,TouchableWithoutFeedback,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {Layout} from "../../../styles/layout";

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import ListItem from '../../../components/ListItem/ListItem';
import HOCTouchable from '../../../components/HOC/CTouchable';

const CTouchableWithoutFeedback = HOCTouchable(TouchableWithoutFeedback)

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
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        centerTitle={{
          title: '设置',
          titleStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          },
        }}
      >
        <ScrollView style={styles.scrollViewWrapper}>

            <View style={{marginTop: 15}}>
              <ListItem
                leftText={'修改登录密码'}
                handle={()=> this.props.navigation.navigate('ModifyLoginPassword')}
              />
            </View>

          <CTouchableWithoutFeedback
            handle={()=> this.props.navigation.navigate('LoginOutPage')}
          >
            <View style={[Layout.layout.ccc, {height: 44, backgroundColor: Layout.color.white_bg, marginTop: 15,}]}>
              <Text style={{color: Layout.color.black, fontSize: 16}}>{'退出登录'}</Text>
            </View>
          </CTouchableWithoutFeedback>

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
    backgroundColor: Layout.color.light_gray,
  },

});