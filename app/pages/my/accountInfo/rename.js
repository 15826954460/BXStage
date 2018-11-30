/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, TextInput, Image, ScrollView,
} from "react-native";

/** 全局样式的引用 */
import Layout from "../../../styles/layout";
/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import CTouchableWithoutFeedback from '../../../components/CTouchableWithoutFeedback';
/** 页面的引入 */

/** 工具类的引用 */
import StorageData from "../../../store/storageData";
import bouncedUtils from "../../../utils/bouncedUtils";

/** 常量声明 */

export default class ReName extends Component {

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
    if (!val) {
      this.setState({
        isShowClearIcon: false
      })
    }
    this.setState({
      inputValue: val
    })
  }

  _clear = () => {
    this._inputInstance.clear()
    this.setState({
      isShowClearIcon: false,
      inputValue: ''
    })
  }

  _saveChange = () => {
    if (this.state.inputValue) {
      this.props.navigation.navigate('AccountInfo')
      StorageData.mergeData('userInfo', {nickName: this.state.inputValue})
    }
    else {
      bouncedUtils.notices.show({content: '请输入修改内容', type: 'warning'})
    }
  }

  render() {
    const {nickName} = this.props.navigation.state.params
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
          },
          handle: this._saveChange
        }}
        centerTitle={{
          title: '修改昵称',
          titleStyle: {
            fontSize: 18,
            color: '#000',
            fontWeight: 'bold',
          }
        }}
      >
        <ScrollView style={styles.container}
                    keyboardDismissMode={"on-drag"}
                    keyboardShouldPersistTaps={"handled"}
                    showsVerticalScrollIndicator={false}>

          <View style={styles.inputWrapper}>
            <TextInput
              ref={ref => this._inputInstance = ref}
              style={styles.input}
              value={this.state.inputValue}
              placeholder={`**` + nickName.slice(nickName.length - 1)}
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

        </ScrollView>

      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Layout.color.light_gray,
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