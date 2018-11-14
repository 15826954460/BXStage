/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View,Image,Alert,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import Permissions from 'react-native-permissions'
/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photoPermission: null,
    };
  }
  componentWillMount() {
  }

  componentDidMount() {
    Permissions.check('photo').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      console.log(response)
      this.setState({ photoPermission: response })
    })
  }

  _requestPermission = () => {
    Permissions.request('photo').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    })
  }

  _checkCameraAndPhotos = () => {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      //response is an object mapping type to permission
      this.setState({
        cameraPermission: response.camera,
        photoPermission: response.photo,
      })
    })
  }

  _alertForPhotosPermission() {
    Alert.alert(
      'Can we access your photos?',
      'We need access so you can set your profile pic',
      [
        {
          text: 'No way',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        this.state.photoPermission == 'undetermined'
          ? { text: 'OK', onPress: this._requestPermission }
          : { text: 'Open Settings', onPress: Permissions.openSettings },
      ],
    )
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});