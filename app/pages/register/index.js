/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,
  Text, Image,
  View, ScrollView, Dimensions, TextInput, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity
} from "react-native";
import {Layout} from "../../styles/layout";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {SafeAreaView} from 'react-navigation';

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

/** 自定义组建的引用 */
import BXTextInput from '../../components/TextInput';
import BottomText from '../../components/BottomText/BottomText';
import StaticPages from '../../utils/staticPage';

export default class Register extends Component {

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
      <SafeAreaView style={styles.container}>
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
          />

          <BXTextInput
            placeholder={'请输入邀请码'}
            isShowPasswordIcon={true}
            secureTextEntry={this.state.secureTextEntry}
            handle={this._changeSecure}
          />

          <TouchableWithoutFeedback>
            <View style={styles.forgetSecret}>
              <Text style={styles.forgetSecretCode}>{'如何获取邀请码'}</Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{
            borderRadius: 22,
            flex: 1,
            height: 44,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'pink'
          }}>
            <Text>{'下一步'}</Text>
          </View>

          <View style={styles.agreementWrapper}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({agreement: !agreement})}
            >
              <Image
                style={styles.agreementIcon}
                source={agreement ? require('../../images/login/login_img_check_pre.png') : require('../../images/login/login_img_check_un.png')}/>
            </TouchableWithoutFeedback>

            <Text style={styles.agreementText}>
              {'已阅读并同意协议'}
            </Text>

            <TouchableWithoutFeedback onPress={this._goToAgreement}>
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
          handle={() => {
            this.props.navigation.navigate({
              routeName: 'LoginPage',
              params: {
                // url: serviceContract,
                // title: '币下分期注册协议'
              }
            })
          }}
        />

      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.white_bg,
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
});
