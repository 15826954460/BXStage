/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, TextInput, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";
/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import CTouchableWithoutFeedback from '../../../components/CTouchableWithoutFeedback';
/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShowClearIcon: false,
      inputValue: ''
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

  _onChangeText = (val) => {
    if (val && val.length > 0 && !this.state.isShowClearIcon) {
      this.setState({
        isShowClearIcon: true
      })
    }
    this.state.inputValue = val
  }

  _clear = () => {
    this._inputInstance.clear()
    this.setState({
      isShowClearIcon: false,
      inputValue : ''
    })
  }

  render() {
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        rightButton={{
          isShowTitle: true,
          title: '保存',
          titleStyle: {
            color: Layout.color.worange,
          }
        }}
        centerTitle={{
          title: '修改昵称'
        }}
        titleStyle={{
          fontSize: 18,
          color: '#000',
          fontFamily: ' PingFangSC-Medium',
        }}
      >
        <View style={styles.container}>

          <View style={styles.inputWrapper}>
            <TextInput
              ref={ref => this._inputInstance = ref}
              style={styles.input}
              value={this.state.inputValue}
              placeholder={'***娜'}
              underlineColorAndroid={'transparent'}
              keyboardType={'default'}
              maxLength={15}
              autoFocus={true}
              placeholderTextColor={Layout.color.wgray_sub}
              onChangeText={this._onChangeText}
            />

            {
              this.state.isShowClearIcon ? <CTouchableWithoutFeedback handle={this._clear}>
                <Image style={styles.iconStyle}
                       source={require('../../../images/login/login_img_clear.png')}/>
              </CTouchableWithoutFeedback> : null
            }


          </View>


        </View>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Layout.color.gray_line,
    },
    inputWrapper: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 15,
      backgroundColor: Layout.color.white_bg,
      paddingHorizontal: 14,
    },
    input: {
      flex: 1,
      alignItems: 'center',
      height: 44,
      color: Layout.color.black,
      fontSize: 16,
    },
    iconStyle: {
      alignSelf: 'center',
      height: 24,
      width: 24,
    },
  })
;