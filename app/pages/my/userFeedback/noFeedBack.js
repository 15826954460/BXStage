/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";

/** 第三方依赖库的引用 */
import Permissions from 'react-native-permissions'; // 判断是否有调用相机或照片权限的第三方库
import ImagePicker from 'react-native-image-picker'; // 访问相册的第三方库

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';

/** 页面的引入 */

/** 工具类的引用 */
import {bouncedUtils} from '../../../utils/bouncedUtils'

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度
const MAX_TEXT_LENGTH = 300;

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      allowSubmit: false,
      remainingText: '剩余 300 个字',
      imageList: [
        // {url: require('../../../images/common/test_four.jpg')},
        // {url: require('../../../images/common/test_three.jpg')},
        // {url: require('../../../images/common/test_two.jpg')},
        // {url: require('../../../images/common/test_one.png')}
      ]
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
    if (val && val.length >= 10 && !this.state.allowSubmit) {
      this.setState({allowSubmit: true})
    }
    else if (val.length < 10 && this.state.allowSubmit) {
      this.setState({allowSubmit: false})
    }
    this.setState({
      remainingText: `剩余 ${MAX_TEXT_LENGTH - val.length} 个字`
    })
    this.state.inputValue = val
  }

  /** 获取图片 */
  _addImage = () => {
    Keyboard.dismiss()
    bouncedUtils.actionSheet.show({
      buttons: [
        {title: '拍照', callback: () => this._chooseImg('take')},
        {title: '从相册选一张', callback: () => this._chooseImg('pick')},
      ]
    })
  }

  _chooseImg = (type) => {
    const {imageList} = this.state
    if (type === 'take') {
      /** 检测权限 */
      Permissions.request('camera').then(res => {
        switch (res) {
          case "authorized":
            /** 调用系统拍照功能 */
            ImagePicker.launchCamera({}, response => {
              if (response.didCancel) {
                window.console.log('User cancelled image picker');
              }
              else if (response.error) {
                window.console.log('ImagePicker Error: ', res.error);
              }
              else if (response.customButton) {
                window.console.log('User tapped custom button: ', response.customButton);
              }
              else {
                if (imageList.length < 4) {
                  imageList.push({url: response.uri})
                  this.setState({
                    imageList: imageList
                  })
                } else {
                  bouncedUtils.toast.show({
                    content: '最多只能选择四张图片', type: 'warning'
                  })
                }
              }
            })
            break;
          default:
            bouncedUtils.toast.show({
              content: '没有权限', type: 'warning'
            })
        }
      })
    }
    else if (type === 'pick') {
      this.props.navigation.navigate('PhotoStack')
      // ImagePicker.showImagePicker({
      //   title: '请选择',
      //   cancelButtonTitle: '取消',
      //   takePhotoButtonTitle: '拍照',
      //   chooseFromLibraryButtonTitle: '选择相册',
      //   quality: 0.75,
      //   allowsEditing: true,
      //   noData: false,
      //   storageOptions: {
      //     skipBackup: true,
      //     path: 'image'
      //   }
      // }, (response) => {
      //   if (response.didCancel) {
      //     window.console.log('User cancelled image picker');
      //   } else if (response.error) {
      //     window.console.log('ImagePicker Error: ', response.error);
      //   } else if (response.customButton) {
      //     window.console.log('User tapped custom button: ', response.customButton);
      //   } else {
      //     if (imageList.length < 4) {
      //       imageList.push({url: response.uri})
      //       this.setState({
      //         imageList: imageList
      //       })
      //     } else {
      //       bouncedUtils.toast.show({
      //         content: '最多只能选择四张图片', type: 'warning'
      //       })
      //     }
      //   }
      // });
    }
  }

  render() {
    const {imageList} = this.state
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        centerTitle={{
          title: '用户反馈',
          titleStyle: {
            color: Layout.layout.wblack,
            fontSize: 18,
            fontWeight: 'bold',
          }
        }}
        rightButton={{
          isShowTitle: true,
          title: '提交',
          titleStyle: {
            color: this.state.allowSubmit ? Layout.color.yellow_main : Layout.color.wgray_sub,
            fontSize: 16,
          },
          handle: () => {
          }
        }}
      >
        <ScrollView style={styles.container}
                    keyboardDismissMode={"on-drag"}
                    keyboardShouldPersistTaps={"handled"}
                    showsVerticalScrollIndicator={false}
        >

          <View style={styles.inputWrapper}>
            <TextInput
              style={{alignItems: 'center', fontSize: 15,}}
              maxLength={300}
              placeholder={'问题反馈，新功能建议都可以告诉我~'}
              placeholderTextColor={Layout.color.wgray_sub}
              multiline={true}
              keyboardType='default'
              underlineColorAndroid={'transparent'}
              value={this.state.inputValue}
              onChangeText={this._onChangeText}
            />

            <ImageBackground
              style={styles.bottomShadow}
              resizeMode={'stretch'}
              fadeDuration={0}
              source={require('../../../images/feedBack/feedback_img_textshadow.png')}
            >
              <View style={styles.remaining}>
                <Text
                  style={{fontSize: 12, color: Layout.color.wgray_main}}>{this.state.remainingText}</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              imageList.map((item, index) => {
                return <View style={styles.addImageWrapper}
                             key={index + ''}
                >
                  <Image style={[{position: 'absolute', bottom: 0, left: 0, width: 78, height: 78}]}
                         source={{uri: item.url}}/>

                  <TouchableWithoutFeedback
                    onPress={() => {
                      imageList.splice(index, 1)
                      this.setState({
                        imageList: this.state.imageList,
                      })
                    }}
                  >
                    <View>
                      <Image style={[{position: 'absolute', top: 0, right: 0}]}
                             source={require('../../../images/feedBack/feedback_img_deleteimg_pre.png')}/>
                    </View>

                  </TouchableWithoutFeedback>
                </View>
              })
            }

            {
              imageList.length < 4 ?

                <TouchableWithoutFeedback
                  onPress={this._addImage}
                  onPressIn={() => this._addImgIcon.setNativeProps({style: {opacity: 0}})}
                  onPressOut={() => this._addImgIcon.setNativeProps({style: {opacity: 1}})}
                >

                  <View style={styles.addImageWrapper}>
                    <Image style={[{position: 'absolute', bottom: 0, left: 0,}]}
                           source={require('../../../images/feedBack/feedback_img_addimg_pre.png')}/>

                    <Image ref={ref => this._addImgIcon = ref}
                           style={[{position: 'absolute', bottom: 0, left: 0,}]}
                           source={require('../../../images/feedBack/feedback_img_addimg.png')}/>
                  </View>
                </TouchableWithoutFeedback> : null
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
    backgroundColor: Layout.color.white_bg,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 5,
    marginRight: (width - 24) / 4 - 87.75,
  },
  bottomShadow: {
    width: '100%',
    height: 35,
    position: 'absolute',
    bottom: 0,
  },
  remaining: {
    width: width - 24,
    height: '100%',
    ...Layout.layout.rfec,
    paddingRight: 12,
  },
  addImageWrapper: {
    width: 87.75,
    height: 93,
    position: 'relative',
  }
});