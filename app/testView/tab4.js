import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'

import CGradient from '../components/C_Gradient'

import Util from '../utility/util'

class Attach extends Component {
  render() {
    return (
      <View style={Styles.wrap}>
        <Text>{'tab4!!!'}</Text>
        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_m'} contentText={'title多行撑开'} onPress={() => {
          Util.alert.show({
            title: '终于革命忠于党',//标题
            content: '终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党',//中间主体部分文字
            buttons: [{title: '取消'}, {title: '去还款'}],
          })
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'多行撑开'} onPress={() => {
          Util.alert.show({
            content: '终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党',//中间主体部分文字
            buttons: [{title: '取消'}, {title: '去还款'}],
          })
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'toast 短行'} onPress={() => {
          Util.toast.show('学习雷锋')
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'toast 一行'} onPress={() => {
          Util.toast.show('学习雷锋好榜样啊')
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'toast两行'} onPress={() => {
          Util.toast.show('你有一笔还款正在处理中\n为防止重复提交，请稍后再试')
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'toast多行'} onPress={() => {
          Util.toast.show('终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠，终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠于党终于革命忠')
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'loading'} onPress={() => {
          Util.loading.show({detail: '请稍后...'});
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'顶部toast praise'} onPress={() => {
          Util.notice.show({
            theme: 'praise',
            title: '好赞！本期账单已还清',
            content: '下个还款日为6月26号',
          })
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'顶部toast wait'} onPress={() => {
          Util.notice.show({
            theme: 'wait',
            title: '好赞！本期账单已还清',
            content: '下个还款日为6月26号',
          })
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'顶部toast success'} onPress={() => {
          Util.notice.show({
            theme: 'success',
            title: '好赞！本期账单已还清',
          })
        }}/>

        <CGradient wrapStyle={{marginBottom: 10}} btnType={'btn_s'} contentText={'顶部toast warning'} onPress={() => {
          Util.notice.show({
            theme: 'warning',
            title: '好赞！本期账单已还清',
          })
        }}/>
      </View>
    )
  }
}

export default Attach;

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: '#ffe341',
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
