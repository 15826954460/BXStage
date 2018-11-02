/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,
  Text, Image,
  View, ScrollView, Dimensions, TextInput, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";

/** 工具方法的引用 */
import {Util} from '../../utils/util';
import {bouncedUtils} from '../../utils/bouncedUtils';

/** 第三方依赖库的引用 */
import { withNavigation } from 'react-navigation';

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

/** 自定义组建的引用 */
import BXTextInput from '../../components/CTextInput';
import BottomText from '../../components/BottomText/BottomText';
import StaticPages from '../../utils/staticPage';
import CGradientButton from '../../components/CGradientButton';

class Login extends Component {

  constructor(props) {
    super(props);
    this.isShowIcon = false;
    this.state = {
      secureTextEntry: true,
      telephoneNumber: '',
      password: '',
      disabled: true,
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

  /** 是否显示密码 */
  _changeSecure = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }

  // 跳转到币下分期服务协议
  _goToAgreement = () => {

  }

  /** 输入手机号 */
  _getTel = (val) => {
    const {password} = this.state
    this.state.telephoneNumber = val
    if (password.length > 6 && val.length >= 11) {
      this.setState({disabled: false})
    }
    else if (password.length < 6 || val.length < 11) {
      this.setState({disabled: true})
    }
  }

  /** 输入密码 */
  _getPassword = (val) => {
    const {telephoneNumber} = this.state
    this.state.code = val
    if (telephoneNumber.length >= 11 && val.length >= 6) {
      this.setState({disabled: false})
    }
    else if (telephoneNumber.length < 11 || val.length < 6) {
      this.setState({disabled: true})
    }
  }

  /** 输入验证 */
  _validation = () => {
    /** 这里会根据用户的操作进行一些本地数据的保存，方便后面做交互验证 */
    let passwordLegal = Util.idCardIsLegal(this.state.code)
    let telephoneLegal = Util.checkMobile(this.state.telephoneNumber)
    if (passwordLegal && telephoneLegal) {
      bouncedUtils.notices.show({
        type: 'success', content: '注册成功'
      })
      this.props.navigation.push('InstalmentPage')
      /** 储存用户信息 */
      // StorageData.saveUserInfo({
      //   tel: this.state.telephoneNumber, inviteCode: this.state.code
      // })
      return
    }
    if(!passwordLegal || !telephoneLegal) {
      bouncedUtils.notices.show({
        type: 'warning', content: '手机号或邀请码错误，请重新输入'
      })
      return
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollViewStyle}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
        >

          {StaticPages.LoginAndRegisterHeader('欢迎回来')}

          <BXTextInput
            placeholder={'请输入手机号'}
            keyboardType={'numeric'}
            maxLength={11}
            handle={this._getTel}
            clearInputValue={() => this.setState({telephoneNumber: '', disabled: true})}
          />

          <BXTextInput
            placeholder={'请输入密码'}
            keyboardType={'numeric'}
            maxLength={16}
            isShowPasswordIcon={true}
            secureTextEntry={this.state.secureTextEntry}
            changeSecureTextEntry={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}
            clearInputValue={() => this.setState({password: '', disabled: true})}
            handle={this._getPassword}
          />

          <TouchableWithoutFeedback
              onPress={() => this.props.navigation.push('ValidationTelephone')}
          >
            <View style={styles.invitationCodeWrapper}>
              <Text style={styles.invitationCode}>{'忘记密码？'}</Text>
            </View>
          </TouchableWithoutFeedback>

          <CGradientButton
            disabled={this.state.disabled}
            gradientType={'btn_l'}
            contentText={'登陆'}
            textStyle={styles.buttonStyle}
            onPress={this._validation}
          />

        </ScrollView>

        <BottomText
          normalText={'还没有账号？'}
          clickText={'注册'}
          handle={this.props.switchToRegister}
        />
      </View>

    );
  }
}

export default withNavigation(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.white_bg,
    position: 'relative',
  },
  scrollViewStyle: {
    flex: 1,
    width: width,
    paddingHorizontal: Layout.gap.gap_edge,
  },
  invitationCodeWrapper: {
    marginTop: 16,
    marginBottom: 30,
    flex: 1,
    ...Layout.layout.rfefe,
  },
  invitationCode: {
    fontSize: 14,
    color: Layout.color.worange,
  },

  linearGradient: {
    borderRadius: 22,
    flex: 1,
    height: 44,
    ...Layout.layout.rcc,
  },
  buttonStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0,
    textAlign: 'center',
  },
});