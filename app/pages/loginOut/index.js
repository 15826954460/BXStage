/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView, Text, Image, TouchableWithoutFeedback,
  View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {Layout} from "../../styles/layout";
import {SafeAreaView} from 'react-navigation';

/** 自定义组建的引用 */
import BXTextInput from '../../components/TextInput';
import BottomText from '../../components/BottomText/BottomText';
import CNavigation from '../../components/CNavigation';

export default class LoginOut extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <CNavigation isShowTitle={true}
                   RightTitle={'注册'}
                   LeftOrRight={'right'}
                   textStyle={{fontSize: 16, color: '#000'}}
      >
        <ScrollView
          style={styles.scrollViewWrapper}
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
            <Text style={styles.phoneNum}>{'158****4460'}</Text>

          </View>

          <BXTextInput
            placeholder={'请输入密码'}
            isShowPasswordIcon={true}
            secureTextEntry={this.state.secureTextEntry}
            handle={this._changeSecure}
          />

          <TouchableWithoutFeedback>
            <View style={styles.forgetSecretWrapper}>
              <Text style={styles.forgetSecret}>{'忘记密码？'}</Text>
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

        </ScrollView>

        <BottomText
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
    marginTop: 70
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
});