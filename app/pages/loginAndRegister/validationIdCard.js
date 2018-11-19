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

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import BXTextInput from '../../components/CTextInput';
import CGradientButton from '../../components/CGradientButton';

/** 获取自定义的静态方法 */
import StaticPages from '../../utils/staticPage';
import {Util} from '../../utils/util';
import {bouncedUtils} from '../../utils/bouncedUtils';

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idCode: '',
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
    this.state.idCode = val
    if (val.length >= 18) {
      this.setState({disabled: false})
    }
    else if (val.length < 18) {
      this.setState({disabled: true})
    }
  }

  /** 验证验证码, 实际开发中自行获取接口, 这里为了演示效果还是前端来做校验  */
  _validationIdCard = () => {
    Keyboard.dismiss()
    /** 实际开发中这里根据后台接口返回的数据进行验证
     * 为了演示效果，这里只做格式验证
     * */
    let idCardLegal = Util.idCardIsLegal(this.state.idCode)
    if (!idCardLegal) {
      bouncedUtils.notices.show({
        type: 'warning', content: '请输入有效的身份证号'
      })
      return
    }
    /** 跳转到登陆页 */
    if (idCardLegal) {
      this.props.navigation.navigate('SettingLoginPassword', {
        idCard: this.state.idCode,
        from: 'forgetPassword',
        telephoneNumber: this.props.navigation.state.params.telephoneNumber,
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
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
        >

          {StaticPages.validationAndSetting('身份验证', '身份验证是为了确保本人操作')}

          <BXTextInput
            placeholder={'输入身份证号码'}
            keyboardType={Util.isAndroid ? 'numeric' : 'numbers-and-punctuation'}
            maxLength={18}
            clearInputValue={() => this.setState({disabled: true, idCode: ''})}
            handle={this._onChangeText}
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
              onPress={this._validationIdCard}
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