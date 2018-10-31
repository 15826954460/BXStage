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
    let idCardLegal = Util.idCardIsLegal(this.state.idCode)
    if (!idCardLegal) {
      bouncedUtils.notices.show({
        type: 'warning', content: '请输入有效的身份证号'
      })
      return
    }
    if (idCardLegal) {

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

          {StaticPages.validationAndSetting('身份验证', '身份验证是为了确保本人操作')}

          <BXTextInput
            placeholder={'输入身份证号码'}
            keyboardType={'default'}
            maxLength={18}
            clearInputValue={() => this.setState({disabled: true, idCode: ''})}
            handle={this._onChangeText}
          />


          <View style={{marginTop: 40}}>
            <CGradientButton
              gradientType={'btn_l'}
              contentText={'下一步'}
              textStyle={styles.buttonStyle}
              disabled={this.state.disabled}
              onPress={this._validationIdCard}
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
  buttonStyle: {
    fontSize: 17,
    color: '#fff'
  },
});