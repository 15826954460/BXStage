import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, Image, Animated, Easing, RefreshControl} from 'react-native'
import Permissions from 'react-native-permissions'
import {getApplicationName} from 'react-native-device-info'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-picker'
import RNShakeEvent from 'react-native-shake-event'
import ViewShot from "react-native-view-shot"
import FingerprintScanner from 'react-native-fingerprint-scanner'
import Contacts from 'react-native-contacts'
import {zip, unzip, unzipAssets, subscribe} from 'react-native-zip-archive'

import Gradient from '../components/C_Gradient'
import Util from '../utility/util'
import AniSvgAndD3 from '../components/gradientCircle/aniSvgAndD3'

const MyAniSvg = Animated.createAnimatedComponent(AniSvgAndD3)

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      applicationName: '',
      fetchBlobPath: '',
      takePhotoUri: '',
      selectPhotoUri: '',
      shakeEvent: false,
      captureUri: '',
      currAngle: new Animated.Value(0),
      currTickPos: new Animated.Value(0),
      refreshing: false,
      contacts: null
    }
  }

  componentDidMount() {
    Animated.timing(this.state.currAngle, {
      toValue: 300,
      duration: 2000,
      easing: Easing.ease,
    }).start(() => {
      Animated.timing(this.state.currTickPos, {
        toValue: 50,
        duration: 1000,
        easing: Easing.ease,
      }).start()
    });
  }

  componentWillMount() {
    RNShakeEvent.addEventListener('shake', () => {
      this.setState({shakeEvent: true})
    })
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake', null)
    FingerprintScanner.release()
  }

  _onRefresh() {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 3000)
  }

  render() {
    const {applicationName, fetchBlobPath, takePhotoUri, selectPhotoUri, shakeEvent, captureUri, currAngle, currTickPos, refreshing, contacts} = this.state
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        style={Styles.wrap}>
        <ViewShot
          ref={ref => this.viewShot = ref}
          options={{format: "jpg", quality: 0.9}}
          style={{width: '100%', height: 200, backgroundColor: '#ffffff'}}>
          <MyAniSvg currAngle={currAngle} currTickPos={currTickPos}/>
        </ViewShot>

        <Text style={{marginTop: 15}}>{applicationName ? applicationName : 'react-native-device-info'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-device-info'} onPress={() => {
          let _applicationName = getApplicationName()
          this.setState({applicationName: _applicationName})
        }}/>

        <Text style={{marginTop: 15}}>{fetchBlobPath ? fetchBlobPath : 'react-native-fetch-blob'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-fetch-blob'} onPress={() => {
          RNFetchBlob
            .config({
              // add this option that makes response data to be stored as a file,
              // this is much more performant.
              fileCache: true,
            })
            .fetch('GET', 'https://github.com/mockingbot/react-native-zip-archive/archive/master.zip', {
              //some headers ..
            })
            .progress((received, total) => {
              this.setState({fetchBlobPath: 'received:' + received + ';total:' + total})
            })
            .then((res) => {
              // the temp file path
              const _path = res.path()
              this.setState({fetchBlobPath: _path}, () => {
                Util.toast.show('解压中。。。')
                const _i = _path.lastIndexOf('/') === -1 ? _path.lastIndexOf('\\') : _path.lastIndexOf('/')
                const targetPath = _path.slice(0, _i)

                unzip(_path, targetPath)
                  .then((path) => {
                    Util.toast.show('解压成功')
                  })
                  .catch((error) => {
                    Util.toast.show('解压失败')
                  })
              })
            })
        }}/>

        <Text style={{marginTop: 15}}>{contacts ? contacts : 'react-native-contacts'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-contacts'} onPress={() => {
          Permissions.request('contacts').then(res => {
            switch (res) {
              case 'authorized':
                Contacts.getAll((err, contacts) => {
                  if (err) {
                    this.setState({contacts: '没有权限'})
                    return;
                  }
                  // contacts returned
                  this.setState({contacts: JSON.stringify(contacts[0])})
                })
                break;
              default:
                this.setState({contacts: '没有权限'})
            }
          })
        }}/>

        <Text style={{marginTop: 15}}>{takePhotoUri ? takePhotoUri : 'take photo'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-image-picker'} onPress={() => {
          Permissions.request('camera').then(res => {
            switch (res) {
              case 'authorized':
                ImagePicker.launchCamera({quality: 0.5}, response => {

                  if (response.didCancel) {
                  }
                  else if (response.error) {
                  }
                  else if (response.customButton) {
                  }
                  else {
                    let source = {uri: response.uri};

                    // You can also display the image using data:
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                    this.setState({
                      takePhotoUri: response.uri
                    });
                  }
                })
                break;
              default:
                this.setState({takePhotoUri: '没有权限'})
            }
          })
        }}/>

        <Text style={{marginTop: 15}}>{selectPhotoUri ? selectPhotoUri : 'selected photo'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-image-picker'} onPress={() => {
          Permissions.request('photo').then(res => {
            switch (res) {
              case 'authorized':
                ImagePicker.launchImageLibrary({}, response => {
                  console.log('Response = ', response);

                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  }
                  else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  }
                  else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                  }
                  else {
                    let source = {uri: response.uri};

                    // You can also display the image using data:
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                    this.setState({
                      selectPhotoUri: response.uri
                    });
                  }
                })
                break;
              default:
                this.setState({selectPhotoUri: '没有权限'})
            }
          })
        }}/>

        <Text style={{marginTop: 15}}>{'react-native-root-siblings'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-root-siblings'} onPress={() => {
          Util.toast.show('这是个toast')
        }}/>

        <Text style={{marginTop: 15}}>{shakeEvent ? '摇动设备' : 'react-native-shake-event'}</Text>

        <Text style={{marginTop: 15}}>{captureUri ? captureUri : 'react-native-view-shot'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-view-shot'} onPress={() => {
          this.viewShot.capture().then(uri => {
            console.log("do something with ", uri);
            this.setState({captureUri: uri})
          })
        }}/>

        <Text style={{marginTop: 15}}>{'react-native-fingerprint-scanner ios'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-fingerprint-scanner'} onPress={() => {
          FingerprintScanner
            .authenticate({description: '验证你的指纹', fallbackEnabled: false})
            .then(() => {
              Util.toast.show('验证成功')
            })
            .catch((error) => {
              FingerprintScanner.release()
              Util.toast.show(error.name)
            })
        }}/>

        <Text style={{marginTop: 15}}>{'react-native-fingerprint-scanner android'}</Text>
        <Gradient btnType={'btn_l'} contentText={'react-native-fingerprint-scanner'} onPress={() => {
          Util.toast.show('请验证你的指纹')
          FingerprintScanner
            .authenticate({onAttempt: (err) => Util.toast.show(err)})
            .then(() => {
              Util.toast.show('验证成功')
            })
            .catch((error) => {
              FingerprintScanner.release()
              Util.toast.show(error.name)
            });
        }}/>
      </ScrollView>
    )
  }
}

export default Setting;

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: '#ffe341',
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
