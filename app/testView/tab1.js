/**
 * 数据库
 */
import {UserInfo} from '../stores/UserInfo'

/**
 * 依赖库
 */
import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {observer} from 'mobx-react/native'

/**
 * 工具包
 */
import Util from '../utility/util';
import BXStandard from "../styles/standard";

import BXTextInput from '../components/BXTextInput/BXTextInput'
import BXItemEntry from  '../components/BXItemEntry/BXItemEntry'

@observer
class Home extends Component {
  render() {
    return (
      <View style={Styles.wrap}>
          <BXItemEntry title="测试" style={'multi-item-dot'} subTitle="10:00" left={'MIB'}/>

        {/*<BXTextInput placeholder={'请输入手机号码'} style={'CODE'} authCodeClick={(ref, callback)=>{*/}
            {/*Util.log('ref ' + ref.getText())*/}
            {/*setTimeout(()=>callback(),2000)*/}
        {/*}}/>*/}

        <TouchableOpacity
          style={Styles.btn}
          onPress={() => {
            Util.loading.show();
          }}>
          <Text>{'loading'}</Text>
        </TouchableOpacity>
        <View style={{
          backgroundColor: '#feafea',
          ...BXStandard.layout.cfsfs
        }}>
          <Text
            style={{fontSize: 18, lineHeight: 20, color: '#eaeaea'}}>{'学习雷锋好榜样，学习雷锋好榜样，学习雷锋好榜样，学习雷锋好榜样，学习雷锋好榜样，学习雷锋好榜样，学习雷锋好榜样，学习雷锋好榜样'}</Text>
        </View>
      </View>
    )
  }
}

export default Home;

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
      backgroundColor:'#feafea',
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
