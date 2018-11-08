/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, StatusBar,ScrollView,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import ListItem from '../../../components/ListItem/ListItem';

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

export default class AccountInfo extends Component {

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
        LeftOrRight={'left'}
        centerTitle={{
          title: '账户信息'
        }}
        titleStyle={{
          fontSize: 18,
          color: '#000',
          fontFamily: ' PingFangSC-Medium',
        }}
      >
        <ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
        >
          <ListItem
            leftText={'头像'}
            isShowUserImg={true}
            wrapperStyle={{
              height: 80,
              marginTop: 15,
              backgroundColor: Layout.color.white_bg,
            }}
            hasBottomLine={true}
          />

          <ListItem
            handle={() => this.props.navigation.navigate('ReName')}
            leftText={'昵称'}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={'*娜'}
          />

          <Text style={{color: Layout.color.wgray_main, fontSize: 14, marginTop:15, marginBottom: 6, paddingHorizontal:14}}>{'真实姓名'}</Text>

          <ListItem
            leftText={'姓名'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={'*娜'}
            hasBottomLine={true}
          />

          <ListItem
            leftText={'省份证号'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={'423423423******534534'}
            hasBottomLine={true}
          />

          <ListItem
            leftText={'手机号'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={'423******534534'}
            hasBottomLine={true}
          />

          <ListItem
            leftText={'银行卡'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={'招商银行(尾号9401)'}
            specialIconType={'ZSYH'}
          />
        </ScrollView>
      </CNavigation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Layout.color.light_gray,
  }
});