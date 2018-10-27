/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, TouchableWithoutFeedback, Image, TextInput, View, Keyboard,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../styles/layout";

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

/** 自定义组建的引用 */
export default class BXTextInput extends Component {

  /** 属性检测 */
  static propTypes = {
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,
    isShowPasswordIcon: PropTypes.bool,
    maxLength: PropTypes.number,
    secureTextEntry: PropTypes.bool,
    handle: PropTypes.func,
    keyboardAppearance: PropTypes.oneOf(['default', 'light', 'dark']),
    autoFocus: PropTypes.bool,
  }
  /** 设置默认属性，底层也是通过this.props.xxx 来设置 */
  static defaultProps = {
    keyboardType: 'default',
    secureTextEntry: false,
    isShowPasswordIcon: false,
    placeholder: '',
    handle: null,
    keyboardAppearance: 'default',
    autoFocus: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputFocus: false,
      inputBlur: true,
      inputValue: '',
      isShowClearIcon: false,
      isShowPasswordIcon: props.isShowPasswordIcon,
    };
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  /** 当props发生变化时执行，初始化render时不执行，在这个回调函数里面，你可以根据属性的变化，通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用*/
  componentWillReceiveProps(nextProps) {
    if (nextProps.secureTextEntry) {
      this.setState({
        inputValue: this.state.inputValue
      })
    }
  }

  // 失去焦点
  _onBlur = () => {
    this.setState({
      inputFocus: false,
      inputBlur: true,
    })
  }

  // 获取焦点
  _onFocus = () => {
    this.isShowIcon = false
    if (this.state.inputValue.length > 0) {
      this.setState({
        inputFocus: true,
        inputBlur: false,
        isShowClearIcon: true,
        isShowPasswordIcon: true,
      })
    }
    else {
      this.setState({
        inputFocus: true,
        inputBlur: false,
      })
    }
  }

  _onChangeText = (text) => {
    if (text.length > 0 && !this.isShowIcon) {
      this.isShowIcon = true
      this.setState({isShowClearIcon: true, isShowPasswordIcon: true})
    }
    else if (text.length === 0) {
      this.isShowIcon = false
      this.setState({isShowClearIcon: false, isShowPasswordIcon: false})
    }
    this.setState({
      inputValue: text
    }, ()=>{
      console.log(2222,this.state.inputValue)
    })

  }


  _clear = () => {
    this.inputInstance.clear()
    this.isShowIcon = false
    this.setState({
      inputValue: '',
      isShowClearIcon: false,
      isShowPasswordIcon: false,
    })
  }

  _onPressSecure = () => {
    this.props.handle instanceof Function && this.props.handle()
  }

  render() {
    const {isShowPasswordIcon, secureTextEntry, placeholder, keyboardType, maxLength, autoFocus} = this.props
    const {isShowClearIcon, inputValue} = this.state
    return (
      <View style={[styles.inputWrapper, this.state.inputFocus ? styles.inputFocus : styles.inputBlur]}>

        <TextInput
          ref={(ref) => this.inputInstance = ref}
          style={styles.input}
          underlineColorAndroid={'transparent'}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          selection={{start:inputValue.length , end:inputValue.length}}
          placeholderTextColor={Layout.color.wgray_sub}
          value={inputValue}
          enablesReturnKeyAutomatically={true}
          autoFocus={autoFocus}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChangeText={this._onChangeText}
        />

        <View
          style={[styles.iconWrapper, isShowPasswordIcon ? styles.iconWrapperSpaceBetween : styles.iconWrapperFlexEnd]}
        >
          {/*这里可以继续天加View来包裹一个小icon eg: 手机或者密码的icon*/}
          {
            isShowClearIcon ? <TouchableWithoutFeedback
              onPress={this._clear}>
              <Image
                style={styles.iconStyle}
                source={require('../images/login/login_img_clear.png')}/>
            </TouchableWithoutFeedback> : null
          }
          {
            isShowClearIcon && isShowPasswordIcon ? <TouchableWithoutFeedback
              onPress={this._onPressSecure}>
              <Image
                style={[styles.iconStyle]}
                source={secureTextEntry ? require('../images/login/login_img_showpsw.png') : require('../images/login/login_img_hidepsw.png')
                }/>
            </TouchableWithoutFeedback> : null
          }
        </View>

      </View>

    );
  }
}
const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  input: {
    flex: 1,
    fontSize: 20,
    height: 60,
    color: Layout.color.wblack,
    borderBottomColor: Layout.color.gray_line,
    marginRight: 10,
  },
  inputFocus: {
    borderBottomColor: Layout.color.yellow_main,
  },
  inputBlur: {
    borderBottomColor: Layout.color.gray_line,
  },
  iconWrapper: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapperSpaceBetween: {
    justifyContent: 'space-between',
    width: 68,
  },
  iconWrapperFlexEnd: {
    justifyContent: 'flex-end',
    width: 24,
  },
  iconStyle: {
    height: 24,
    width: 24,
  }
});