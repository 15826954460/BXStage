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

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.isShowIcon = false;
    this.state = {
      secureTextEntry: true,
    };
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  // 是否显示密码
  _changeSecure=() => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollViewStyle}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.registerHeader}>
            <Image
              style={styles.logo}
              resizeMode={'contain'}
              fadeDuration={0}
              source={require('../../images/login/login_img_logo.png')}
            />
            <Text style={styles.title}>{'注册账号'}</Text>
          </View>

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

        </ScrollView>
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
  registerHeader: {
    flex: 1,
    height: 42,
    lineHeight: 42,
    marginTop: 20,
    marginBottom: 35,
    ...Layout.layout.rfsc,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  title: {
    fontSize: Layout.font.Title1,
    color: Layout.color.wblack,
    lineHeight: 42,
    fontWeight: Layout.fontWeight.Semibold
  },
});