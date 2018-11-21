/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView, Text, Image, TouchableWithoutFeedback,
  View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {Layout} from "../../styles/layout";

/** 自定义组建的引用 */
import BXTextInput from '../../components/CTextInput';
import BottomText from '../../components/BottomText/BottomText';
import CNavigation from '../../components/CNavigation';
import CGradientButton from '../../components/CGradientButton';

/** 工具方法的引用 */
import {Util} from '../../utils/util';
import StorageData from '../../store/storageData';
import {Routers} from '../../store/routes';
import {bouncedUtils} from '../../utils/bouncedUtils';
import {StackActions, NavigationActions} from 'react-navigation';

export default class LoginOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      disabled: true,
      userInfo: {}, // 保存用户信息的变量
      password: '', // 用户登陆密码
    };
  }

  componentDidMount() {
    /** 获取本地的用户信息 */
    StorageData.getData('registerInfo').then((res) => {
      if (res) {
        this.setState({userInfo: res})
      }
    }).catch((error) => {
      console.log(`获取信息---【${key}】----失败，失败信息为【${error}】!!!!!!`)
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
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

  /** 登陆验证 */
  _loginValidation = () => {
    StorageData.getData('registerInfo').then(res => {
      let {password} = res
      this._judgePassword(this.state.password, password)
    }).catch((res) => {
      /** **/
    })
  }

  /** 将用户的输入的密码和存储在本地的做比较 */
  _judgePassword = (password, storePassword) => {
    if (password === storePassword) {

      // this.props.navigation.navigate('MainStack')
      Routers.stackRoots.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'MainStack'})
          ]
        })
      )

      StorageData.mergeData('userInfo', {
        phoneNumber: this.state.userInfo.phoneNumber
      })
      StorageData.mergeData('registerInfo', {hasLogin: true})

      return
    }
    if (password !== storePassword) {
      bouncedUtils.notices.show({
        type: 'warning', content: '密码错误，请重新输入'
      })
    }

    /** 跳转到首页,是否需要清空用户上次的输入信息，根据实际自行补充 */
  }

  /** 重置路由跳转到注册页 */
  _goToRegister = (page) => {
    Routers.stackRoots.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'LoginAndRegister', params: {initPage: page}}),
        ]
      })
    )
  }

  render() {
    return (
      <CNavigation
        leftorright={'right'}
        rightButton={{
          isShowTitle: true,
          title: '注册',
          handle: () => this._goToRegister('register'),
        }}
      >
        <ScrollView
          style={styles.scrollViewWrapper}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={styles.logoIconWrapper}>

            <View style={{position: 'relative'}}>
              <Image
                style={styles.logoIcon}
                source={require('../../images/loginOut/common_img_avatar.png')}
              />
              <Image
                style={styles.logoIconBackground}
                source={require('../../images/loginOut/sign_img_mask.png')}/>
            </View>
            <Text style={styles.phoneNum}>
              {this.state.userInfo.phoneNumber ? Util.takeSensitive(this.state.userInfo.phoneNumber) : ''}
            </Text>

          </View>

          <BXTextInput
            placeholder={'请输入密码'}
            keyboardType={'default'}
            maxLength={16}
            isShowPasswordIcon={true}
            secureTextEntry={this.state.secureTextEntry}
            changeSecureTextEntry={() => this.setState({secureTextEntry: !this.state.secureTextEntry})}
            clearInputValue={() => this.setState({disabled: true, password: ''})}
            handle={this._onChangeText}
          />

          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ValidationTelephone')}>
            <View style={styles.forgetSecretWrapper}>
              <Text style={styles.forgetSecret}>{'忘记密码？'}</Text>
            </View>
          </TouchableWithoutFeedback>

          <CGradientButton
            gradientType={'btn_l'}
            contentText={'登陆'}
            textStyle={{
              fontSize: 17,
              color: '#FFFFFF',
              letterSpacing: 0,
              textAlign: 'center',
            }}
            disabled={this.state.disabled}
            onPress={this._loginValidation}
          />

        </ScrollView>

        <BottomText
          handle={() => this._goToRegister('login')}
          clickText={'切换账号'}
        />
      </CNavigation>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,
    paddingHorizontal: Layout.gap.gap_edge,
  },
  logoIconWrapper: {
    flex: 1,
    ...Layout.layout.ccc,
    marginTop: 26
  },
  logoIcon: {
    width: 90,
    height: 90,
  },
  phoneNum: {
    marginTop: 14,
    marginBottom: 20,
    fontSize: Layout.font.Subtle1,
  },
  forgetSecretWrapper: {
    marginTop: 16,
    marginBottom: 30,
    flex: 1,
    ...Layout.layout.rfefe,
  },
  forgetSecret: {
    fontSize: 14,
    color: Layout.color.worange,
  },
  logoIconBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  linearGradient: {
    borderRadius: 22,
    flex: 1,
    height: 44,
    ...Layout.layout.rcc,
  },
});