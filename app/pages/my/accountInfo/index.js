/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, StatusBar, ScrollView,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import ListItem from '../../../components/ListItem/ListItem';
import withFocus from '../../../components/HOC/HOCNavigationEvents';

/** 页面的引入 */

/** 工具类的引用 */
import StorageData from "../../../store/storageData";
import {bankInfo} from "../../../store/data";

/** 常量声明 */

class AccountInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.navigation.state.params,
      bankInfo: {}, // 银行卡信息
    };
  }

  componentDidMount() {
  }

  componentWillFocus() {
    StorageData.getData('userInfo').then(res => {
      if (res) {
        this.setState({userInfo: res})
      }
    })
  }

  componentWillMount() {
    StorageData.getData('bankInfo').then(res => {
      if (res) {
        this.setState({bankInfo: res})
      }
    })
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  render() {
    const {headPicture, realName, replyCount, hasFeedback, nickName, idCard, phoneNumber} = this.state.userInfo
    const {bankCardNo, bankName, bankIcon} = this.state.bankInfo
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        LeftOrRight={'left'}
        centerTitle={{
          title: '账户信息',
          titleStyle: {
            fontSize: 18,
            color: '#000',
            fontWeight: 'bold',
          }
        }}

      >
        <ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
        >
          <ListItem
            leftText={'头像'}
            isShowUserImg={true}
            isShowRightIcon={false}
            wrapperStyle={{
              height: 80,
              marginTop: 15,
              backgroundColor: Layout.color.white_bg,
            }}
            hasBottomLine={true}
          />

          <ListItem
            handle={() => this.props.navigation.navigate('ReName', {nickName: nickName})}
            leftText={'昵称'}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={nickName}
            rightTextStyle={{
              width: 100,
              textAlign: 'right'
            }}
            numberOfLines={1}
          />

          <Text style={{
            color: Layout.color.wgray_main,
            fontSize: 14,
            marginTop: 15,
            marginBottom: 6,
            paddingHorizontal: 14
          }}>{'真实姓名'}</Text>

          <ListItem
            leftText={'姓名'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={realName}
            hasBottomLine={true}
          />

          <ListItem
            leftText={'省份证号'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={idCard}
            hasBottomLine={true}
          />

          <ListItem
            leftText={'手机号'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={phoneNumber}
            hasBottomLine={true}
          />

          <ListItem
            leftText={'银行卡'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={`${bankName}(尾号)${bankCardNo}`}
            specialIconType={'ZSYH'}
          />
        </ScrollView>
      </CNavigation>
    );
  }
}

export default withFocus(AccountInfo)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.light_gray,
  }
});