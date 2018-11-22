/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, PermissionsAndroid,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";
import {Size} from "../../../styles/size";

/** 第三方依赖库的引用 */
import Permissions from 'react-native-permissions'; // 判断是否有调用相机或照片权限的第三方库
import ImagePicker from 'react-native-image-picker'; // 访问相册的第三方库

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import ListItem from '../../../components/ListItem/ListItem';
import withFocus from '../../../components/HOC/HOCNavigationEvents';

/** 页面的引入 */

/** 工具类的引用 */
import StorageData from "../../../store/storageData";
import {bankInfo} from "../../../store/data";
import {bouncedUtils} from '../../../utils/bouncedUtils';
import {Util} from '../../../utils/util';

/** 常量声明 */

@withFocus
export default class AccountInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: props.navigation.state.params,
      bankInfo: {}, // 银行卡信息
      headPicture: '', // 头像信息
    };
  }

  componentDidMount() {
    StorageData.getData('registerInfo').then((res) => {
    })
  }

  componentWillFocus() {
    StorageData.getData('userInfo').then(res => {
      if (res) {
        this.setState({userInfo: res})
      }
    })
  }

  componentWillMount() {
    StorageData.getData('bankInfo').then(res => {
      if (res) {
        this.setState({bankInfo: res})
      }
    })
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  /** 修改用户图像 */
  _changeHeaderImg = () => {
    bouncedUtils.actionSheet.show({
      buttons: [
        {title: '拍照', callback: () => this._chooseImg('take')},
        {title: '从相册选一张', callback: () => this._chooseImg('pick')},
      ]
    })
  }

  /** 选择图片 */
  _chooseImg = (type) => {
    if (type === 'take') {
      /** 检测权限 */
      Permissions.request('camera').then(res => {
        switch (res) {
          case "authorized":
            /** 调用系统拍照功能 */
            ImagePicker.launchCamera({}, response => {
              if (response.didCancel) {
                // window.console.log('User cancelled image picker');
              }
              else if (response.error) {
                // window.console.log('ImagePicker Error: ', res.error);
              }
              else if (response.customButton) {
                // window.console.log('User tapped custom button: ', response.customButton);
              }
              else {
                this.setState({
                  headPicture: response.uri
                })
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
      ImagePicker.showImagePicker({
        title: '请选择',
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '选择相册',
        quality: 0.75,
        allowsEditing: true,
        noData: false,
        storageOptions: {
          skipBackup: true,
          path: 'image'
        }
      }, (response) => {
        if (response.didCancel) {
          // window.console.log('User cancelled image picker');
        } else if (response.error) {
          // window.console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // window.console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({
            headPicture: response.uri
          })
        }
      });
    }
  }

  render() {
    const {realName, nickName, idCard, phoneNumber} = this.state.userInfo
    const {bankCardNo, bankName} = this.state.bankInfo
    const {headPicture} = this.state
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        LeftOrRight={'left'}
        centerTitle={{
          title: '账户信息',
          titleStyle: {
            fontSize: 18,
            color: '#000',
            fontWeight: 'bold',
          }
        }}

      >
        <ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={this._changeHeaderImg}>
            <View style={{
              ...Layout.layout.rsbc,
              height: 80,
              marginTop: 15,
              backgroundColor: Layout.color.white_bg,
              borderBottomWidth: Size.screen.pixel,
              borderBottomColor: Layout.color.gray_line,
              paddingHorizontal: 12,
            }}>
              <Text>{'头像'}</Text>
              <Image
                style={{width: 60, height: 60, borderRadius: 30,}}
                source={headPicture ? {uri: headPicture} : require('../../../images/me/index_icon_bixia.png')}
              />
            </View>
          </TouchableWithoutFeedback>

          <ListItem
            handle={() => this.props.navigation.navigate('ReName', {nickName: nickName})}
            leftText={'昵称'}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={nickName}
            rightTextStyle={{
              width: 100,
              textAlign: 'right'
            }}
            numberOfLines={1}
          />

          <Text style={{
            color: Layout.color.wgray_main,
            fontSize: 14,
            marginTop: 15,
            marginBottom: 6,
            paddingHorizontal: 14
          }}>{'真实姓名'}</Text>

          <ListItem
            leftText={'姓名'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={realName}
            hasAllBottomLine={true}
          />

          <ListItem
            leftText={'省份证号'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={idCard}
            hasAllBottomLine={true}
          />

          <ListItem
            leftText={'手机号'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={phoneNumber}
            hasAllBottomLine={true}
          />

          <ListItem
            leftText={'银行卡'}
            isShowRightIcon={false}
            wrapperStyle={{
              backgroundColor: Layout.color.white_bg,
              height: 50,
            }}
            rightText={`${bankName}(尾号)${bankCardNo}`}
            specialIconType={'ZSYH'}
          />
        </ScrollView>
      </CNavigation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.light_gray,
  }
});