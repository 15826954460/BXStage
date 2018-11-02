/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, Image, View, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import {Layout} from "../../styles/layout";

/** 全局样式的引用 */

/** 工具方法的引用 */
import {Util} from '../../utils/util';
import {bouncedUtils} from '../../utils/bouncedUtils';
import StaticPages from '../../utils/staticPage';
import StorageData from '../../store/storageData';

/** 第三方依赖库的引用 */
import {withNavigation} from 'react-navigation';

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

/** 自定义组建的引用 */
import BXTextInput from '../../components/CTextInput';
import BottomText from '../../components/BottomText/BottomText';
import CGradientButton from '../../components/CGradientButton';

/** 高阶组件的引用 */
// import HOCNavigationFocus from '../../components/HOC/HOCNavigationEvents';


// @HOCNavigationFocus
class Register extends Component {
  _userInfo = null

  constructor(props) {
    super(props);
    this.isShowIcon = false;
    this.state = {
      disabled: true,
      secureTextEntry: true,
      agreement: true,
      code: '',
      telephoneNumber: ''
    };
  }

  componentDidMount() {
    StorageData.getData('userInfo').then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(`获取信息---【${key}】----失败，失败信息为【${error}】!!!!!!`)
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  // 输入手机号
  _getTel = (val) => {
    const {code} = this.state
    this.state.telephoneNumber = val
    if (code.length >= 6 && val.length >= 11) {
      this.setState({disabled: false})
    }
    else if (code.length < 6 || val.length < 11) {
      this.setState({disabled: true})
    }
  }

  // 输入验证码
  _getCode = (val) => {
    const {telephoneNumber} = this.state
    this.state.code = val
    if (telephoneNumber.length >= 11 && val.length >= 6) {
      this.setState({disabled: false})
    }
    else if (telephoneNumber.length < 11 || val.length < 6) {
      this.setState({disabled: true})
    }
  }

  /** 跳转到币下分期服务协议 后期再补充 */
  _goToAgreement = () => {

  }


  /** 输入验证 */
  _validation = () => {
    /** 这里会根据用户的操作进行一些本地数据的保存，方便后面做交互验证 */
    let codeLegal = Util.checkPureNumber(this.state.code)
    let telephoneLegal = Util.checkMobile(this.state.telephoneNumber)

    /** 判断用户是否已经注册 */
    StorageData.getData('userInfo').then(res => {
      if (res && res.hasRegister) {
        Keyboard.dismiss()
        bouncedUtils.notices.show({
          type: 'warning', content: '您已注册，请登录'
        })
      } else {
        if (codeLegal && telephoneLegal && this.state.agreement) {
          Keyboard.dismiss()
          this.props.navigation.navigate('ValidationCodePage', {
            title: '输入验证码',
          })
          /** 储存用户信息 */
          StorageData.saveData('userInfo', {
            tel: this.state.telephoneNumber,
          })
          return
        }
        /** 手机号或者注册码错误提示 */
        if (!codeLegal || !telephoneLegal) {
          bouncedUtils.notices.show({
            type: 'warning', content: '手机号或邀请码错误，请重新输入'
          })
          return
        }
        /** 用户协议提示 */
        if (!this.state.agreement) {
          bouncedUtils.notices.show({
            type: 'warning', content: '请阅读并同意用户协议'
          })
        }
      }
    }).catch(error => {
      /****/
    })

    /** 查看如何获取邀请码为嵌入网页，后期再补充 */
    _toWebView = () => {

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
          {StaticPages.LoginAndRegisterHeader('注册账号')}

          <BXTextInput
            placeholder={'请输入手机号'}
            keyboardType={'numeric'}
            maxLength={11}
            handle={this._getTel}
            clearInputValue={() => this.setState({telephoneNumber: '', disabled: true})}
          />

          <BXTextInput
            placeholder={'请输入邀请码'}
            keyboardType={'numeric'}
            maxLength={6}
            isShowPasswordIcon={true}
            secureTextEntry={this.state.secureTextEntry}
            changeSecureTextEntry={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}
            clearInputValue={() => this.setState({code: '', disabled: true})}
            handle={this._getCode}
          />

          <TouchableWithoutFeedback handle={this._toWebView}>
            <View style={styles.forgetSecret}>
              <Text style={styles.forgetSecretCode}>{'如何获取邀请码'}</Text>
            </View>
          </TouchableWithoutFeedback>

          <CGradientButton
            disabled={this.state.disabled}
            gradientType={'btn_l'}
            contentText={'注册'}
            textStyle={styles.buttonStyle}
            onPress={this._validation}
          />

          <View style={styles.agreementWrapper}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({agreement: !this.state.agreement})}
            >
              <Image
                style={styles.agreementIcon}
                source={this.state.agreement ? require('../../images/login/login_img_check_pre.png') : require('../../images/login/login_img_check_un.png')}/>
            </TouchableWithoutFeedback>

            <Text style={styles.agreementText}>
              {'已阅读并同意协议'}
            </Text>

            <TouchableWithoutFeedback handle={this._goToAgreement}>
              <View>
                <Text style={styles.agreementText}>
                  《<Text style={{textDecorationLine: 'underline'}}>{'币下分期服务协议'}</Text>》
                </Text>
              </View>
            </TouchableWithoutFeedback>

          </View>

        </ScrollView>

        <BottomText
          normalText={'已有账号？'}
          clickText={'登陆'}
          handle={this.props.switchToLogin}
        />

      </View>
    );
  }
}

export default withNavigation(Register)
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
  agreementWrapper: {
    marginTop: 18,
    flex: 1,
    ...Layout.layout.rfsc,
  },
  agreementIcon: {
    width: 14,
    height: 14,
    marginRight: 7,
  },
  agreementText: {
    color: Layout.color.wgray_main,
    fontSize: 14,
  },
  forgetSecret: {
    marginTop: 16,
    marginBottom: 30,
    flex: 1,
    ...Layout.layout.rfefe,
  },
  forgetSecretCode: {
    fontSize: 14,
    color: Layout.color.worange,
  },

  linearGradient: {
    borderRadius: 22,
    flex: 1,
    height: 44,
  },
  buttonStyle: {
    fontSize: 17,
    color: '#fff'
  },
});
