/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView, Keyboard, View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import BXTextInput from '../../components/CTextInput';
import CGradientButton from '../../components/CGradientButton';

/** 获取自定义的静态方法 */
import StaticPages from '../../utils/staticPage';
import StorageData from '../../store/storageData';
import {bouncedUtils} from '../../utils/bouncedUtils';

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      disabled: true,
      telephoneNumber: '',
    };
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

  /** 验证手机号 */
  _validationTelephoneNumber = () => {
    Keyboard.dismiss()
    StorageData.getData('registerInfo').then(res => {
      let {phoneNumber} = res
      if (phoneNumber !== this.state.telephoneNumber) {
        bouncedUtils.notices.show({
          type: 'warning', content: '手机号输入有误，请重新输入'
        })
      }
      else {
        this.props.navigation.navigate('ValidationCodePage',{
          title: '安全验证',
          from: 'forgetPassword',
          telephoneNumber: this.state.telephoneNumber,
        })
      }
    }).catch(() => {

    })
  }

  /** 监听手机号的输入 **/
  _getTel = (val) => {
    this.state.telephoneNumber = val
    if (val.length >= 11) {
      this.setState({disabled: false})
    }
    else if (val.length < 11) {
      this.setState({disabled: true})
    }
  }

  _clearInputTel = () => {
    this.setState({
      telephoneNumber: '',
      disabled: true,
    })
  }

  render() {
    return (
      <CNavigation
        leftorright={'left'}
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
      >

        <ScrollView style={styles.container}
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps={'handled'}>

          {StaticPages.validationAndSetting('输入手机号码', '')}

          <BXTextInput
            placeholder={'请输入手机号码'}
            keyboardType={'numeric'}
            maxLength={11}
            handle={this._getTel}
            clearInputValue={this._clearInputTel}
          />


          <View style={{marginTop: 40}}>
            <CGradientButton
              gradientType={'btn_l'}
              contentText={'下一步'}
              textStyle={{
                fontSize: 17,
                color: '#fff'
              }}
              disabled={this.state.disabled}
              onPress={this._validationTelephoneNumber}
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
    paddingHorizontal: 12,
  },
});