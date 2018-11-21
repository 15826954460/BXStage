/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView,
  Keyboard,
  Text,
  View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {NavigationActions, StackActions} from 'react-navigation';

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import BXTextInput from '../../components/CTextInput';
import CGradientButton from '../../components/CGradientButton';

/** 获取自定义的静态方法 */
import StaticPages from '../../utils/staticPage';
import StorageData from '../../store/storageData';
import {Routers} from '../../store/routes';
import {Util} from '../../utils/util';
import {bouncedUtils} from '../../utils/bouncedUtils';

export default class SettingLoginPassword extends Component {

  constructor(props) {
    super(props);
    let {params} = props.navigation.state
    this.from = params && params.from || false
    this.state = {
      password: '',
      disabled: true,
      secureTextEntry: true,
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

  /** 监听用户输入 */
  _onChangeText = (val) => {
    /** 假设验证码都是 4 位数字 */
    this.state.password = val
    if (val.length >= 6) {
      this.setState({disabled: false})
    }
    else if (val.length < 6) {
      this.setState({disabled: true})
    }
  }

  /** 验证验证码, 实际开发中自行获取接口, 这里为了演示效果还是前端来做校验  */
  _validationPassword = () => {
    let passwordLegal = Util.checkPassword(this.state.password)

    if (passwordLegal) {
      Keyboard.dismiss()
      // 不是 android 手机的情况下才调用 notice (各种不同厂家的状态栏不一样没法统一处理)
      !this.from ? bouncedUtils.notices.show({
        type: 'success', content: '注册成功'
      }) : bouncedUtils.notices.show({
        type: 'success', content: '修改成功'
      })


      /** 跳转到首页,是否需要清空用户上次的输入信息，根据实际自行补充 */
      Routers.stackRoots.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'MainStack'})
            // NavigationActions.navigate({routeName: 'InstalmentPage'})
          ]
        })
      )


      /** 储存用户登陆密码，到达这里，用户已经注册成功 */
      if (!this.from) {
        StorageData.mergeData('registerInfo', {
          password: this.state.password,
          hasRegister: true,
          hasLogin: true,
          ...this.props.navigation.state.params,
        })
      }
      else if (this.from === 'resetPassword') {
        StorageData.mergeData('registerInfo', {
          password: this.state.password,
        })
      }
      else {
        StorageData.mergeData('registerInfo', {
          phoneNumber: this.props.navigation.state.params.telephoneNumber,
          password: this.state.password,
        })
      }


      /** 重置数据状态进行重置 */
      // this._inputInstance._inputInstance.clear()
      // this.state.password = ''
      // this.setState({
      //   disabled: true,
      //   secureTextEntry: true,
      // })

      return
    }

    if (!passwordLegal) {
      bouncedUtils.notices.show({
        type: 'warning', content: '请输入数字、字母组合密码'
      })
    }
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

          {StaticPages.validationAndSetting('设置登陆密码', '请设置6~16位数字、字母组合密码')}

          <BXTextInput
            ref={ref => this._inputInstance = ref}
            placeholder={'请设置登陆密码'}
            keyboardType={'default'}
            maxLength={16}
            isShowPasswordIcon={true}
            secureTextEntry={this.state.secureTextEntry}
            changeSecureTextEntry={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}
            clearInputValue={() => this.setState({disabled: true, password: ''})}
            handle={this._onChangeText}
          />

          <View style={{marginTop: 40}}>
            <CGradientButton
              gradientType={'btn_l'}
              contentText={'确定'}
              textStyle={{
                fontSize: 17,
                color: '#fff'
              }}
              disabled={this.state.disabled}
              onPress={this._validationPassword}
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