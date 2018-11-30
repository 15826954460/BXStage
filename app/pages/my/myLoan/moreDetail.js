/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, FlatList, ScrollView,
} from "react-native";

/** 全局样式的引用 */
import Size from '../../../styles/size';
/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import ListItem from '../../../components/ListItem/ListItem';
import Layout from "../../../styles/layout";

/** 页面的引入 */

/** 工具类的引用 */
import StorageData from '../../../store/storageData';
import Util from '../../../utils/util';

/** 常量声明 */

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moreDetail: {}
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
    StorageData.getData('moreDetail').then(res => {
      if (res) {
        this.setState({moreDetail: res})
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
    const {moreDetail} = this.state
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
            fontWeight: 'bold',
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
              rightText={moreDetail.realName}
              isShowRightIcon={false}
              wrapperStyle={{
                height: 44,
                marginTop: 0,
                backgroundColor: '#fff'
              }}
              hasAllBottomLine={true}
            />
            <ListItem
              leftText={'借款人身份证'}
              rightText={moreDetail.idCard}
              isShowRightIcon={false}
              wrapperStyle={{
                height: 44,
                marginTop: 0,
                backgroundColor: '#fff'
              }}
              hasAllBottomLine={true}
            />
            <ListItem
              leftText={'借款金额'}
              rightText={Util.toThousands(moreDetail.amount)}
              isShowRightIcon={false}
              wrapperStyle={{
                height: 44,
                marginTop: 0,
                backgroundColor: '#fff'
              }}
              hasAllBottomLine={true}
            />
            <ListItem
              leftText={'借款期数'}
              rightText={`${moreDetail.term}期`}
              isShowRightIcon={false}
              wrapperStyle={{
                height: 44,
                marginTop: 0,
                backgroundColor: '#fff'
              }}
              hasAllBottomLine={true}
            />
            <ListItem
              leftText={'起止时间'}
              rightText={`${Util.formatDate(moreDetail.releaseTime, 'y/m/d')}-${Util.formatDate(moreDetail.dueDate, 'y/m/d')}`}
              isShowRightIcon={false}
              wrapperStyle={{
                height: 44,
                marginTop: 0,
                backgroundColor: '#fff'
              }}
              hasAllBottomLine={true}
            />
            <ListItem
              leftText={'收款银行卡'}
              rightText={`${moreDetail.bankName}(${moreDetail.bankNo})`}
              isShowRightIcon={false}
              wrapperStyle={{
                height: 44,
                marginTop: 0,
                backgroundColor: '#fff'
              }}
              hasAllBottomLine={true}
            />
            <ListItem
              leftText={'还款方式'}
              rightText={'等额本息'}
              isShowRightIcon={false}
              wrapperStyle={{
                height: 44,
                marginTop: 0,
                backgroundColor: '#fff'
              }}
              hasAllBottomLine={true}
            />

            <ListItem
              leftText={'还款日'}
              rightText={'每月16号'}
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