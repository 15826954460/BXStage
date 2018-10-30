/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,
  Text, Image,
  View, ScrollView, Dimensions, TextInput, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";

/** 第三方依赖库的引用 */

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

/** 自定义组建的引用 */
import BXTextInput from '../../components/CTextInput';
import BottomText from '../../components/BottomText/BottomText';
import StaticPages from '../../utils/staticPage';
import CGradientButton from '../../components/CGradientButton';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.isShowIcon = false;
    this.state = {
      secureTextEntry: true,
      agreement: true,
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

  }
  // 是否显示密码
  _changeSecure = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }

  // 跳转到币下分期服务协议
  _goToAgreement = () => {

  }

  render() {
    const {agreement} = this.state
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
            />

            <BXTextInput
              placeholder={'请输入密码'}
              isShowPasswordIcon={true}
              secureTextEntry={this.state.secureTextEntry}
              handle={this._changeSecure}
            />

            <TouchableWithoutFeedback>
              <View style={styles.invitationCodeWrapper}>
                <Text style={styles.invitationCode}>{'忘记密码？'}</Text>
              </View>
            </TouchableWithoutFeedback>

            <CGradientButton
              gradientStyle={styles.linearGradient}
              contentText={'登陆'}
              textStyle={styles.buttonStyle}
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