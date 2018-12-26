/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView,
  Keyboard,
  Text,
  View,TouchableWithoutFeedback,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from '../../styles/layout';

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import BXTextInput from '../../components/CTextInput';
import CGradientButton from '../../components/CGradientButton';
import HOCTouchable from '../../components/HOC/CTouchable';

/** 获取自定义的静态方法 */
import StaticPages from '../../utils/staticPage';
import StorageData from '../../store/storageData';
import {bouncedUtils} from '../../utils/bouncedUtils';
import {Util} from '../../utils/util';

const CTouchableWithoutFeedback = HOCTouchable(TouchableWithoutFeedback)

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
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
    Keyboard.dismiss()
    StorageData.getData('registerInfo').then(res => {
      let {password} = res
      if (password === this.state.password) {
        /** 跳转设置登陆密码页面 */
        this.props.navigation.navigate('SettingLoginPassword', {
          from: 'resetPassword',
          password: this.state.password
        })
        return
      }
      bouncedUtils.notices.show({
        type: 'warning', content: '密码错误请重新输入'
      })
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

          {StaticPages.validationAndSetting('输入旧密码', '需输入原登录密码后才能修改')}

          <BXTextInput
            ref={ref => this._inputInstance = ref}
            placeholder={'请属于原登录密码'}
            keyboardType={'default'}
            maxLength={16}
            isShowPasswordIcon={true}
            secureTextEntry={this.state.secureTextEntry}
            changeSecureTextEntry={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}
            clearInputValue={() => this.setState({disabled: true, password: ''})}
            handle={this._onChangeText}
          />


          <CTouchableWithoutFeedback handle={() => this.props.navigation.navigate("ValidationTelephone")}>
            <View style={styles.invitationCodeWrapper}>
              <Text style={styles.invitationCode}>{"忘记密码？"}</Text>
            </View>
          </CTouchableWithoutFeedback>

          <View style={{marginTop: 40}}>
            <CGradientButton
              gradientType={'btn_l'}
              contentText={'下一步'}
              textStyle={{
                fontSize: 17,
                color: '#fff'
              }}
              disabled={this.state.disabled}
              onPress={this._validationPassword}
            >
            </CGradientButton>
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
  invitationCodeWrapper: {
    marginTop: 16,
    marginBottom: 30,
    flex: 1,
    ...Layout.layout.rfefe
  },
  invitationCode: {
    fontSize: 14,
    color: Layout.color.worange
  },
});