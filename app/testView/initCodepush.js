import React, {Component} from 'react'
import {ActivityIndicator, View, StyleSheet, Text, NativeModules, ImageBackground, Dimensions} from 'react-native'
import codePush from 'react-native-code-push'
import SplashScreen from 'react-native-splash-screen'

const {width} = Dimensions.get('window')

class AppClient extends Component {
  showHandle = -1

  constructor(props) {
    super(props)
    this.state = {
      bgURI: '',
      totalBytes: 0,
      receivedBytes: 0,
      showLoading: false,
      cacheError: false
    }
  }

  componentWillMount() {
    NativeModules.RNBridge.getLaunchImageName((uri) => {
      this.setState({
        bgURI: uri
      })
    })
  }

  componentDidMount() {
    SplashScreen.hide()
    this.showHandle = setTimeout(() => {
      this.setState({showLoading: true})
    }, 1200)
    codePush.checkForUpdate().then(remotePackage => {
      clearTimeout(this.showHandle)
      if (remotePackage) {
        remotePackage.download(({totalBytes, receivedBytes}) => {
          this.setState({totalBytes, receivedBytes, showLoading: true})
        }).then(localPackage => {
          setTimeout(() => localPackage.install(codePush.InstallMode.IMMEDIATE), 3000)
        }).catch(error => {
          this.setState({showLoading: false, cacheError: true}, () => {
            setTimeout(() => NativeModules.RNBridge.toNativeApp(), 3000)
          })
        })
      }
      else {
        NativeModules.RNBridge.toNativeApp()
      }
    })
  }

  componentWillUnmount() {
    clearTimeout(this.showHandle)
  }

  render() {
    const {bgURI, totalBytes, receivedBytes, showLoading, cacheError} = this.state;
    const progress = totalBytes ? Math.ceil(receivedBytes / totalBytes * 100) + '%' : ''
    if (!bgURI) return null;
    return (
      <ImageBackground source={{uri: bgURI}} style={Styles.wrapper}>
        {showLoading ?
          <View style={Styles.loadingWrapper}>
            <ActivityIndicator size={'large'} color={'#ffffff'}/>
            <Text style={Styles.loadingFont}>{'加载中...' + progress}</Text>
          </View> : null}
        {cacheError ?
          <View style={Styles.errorWrap}>
            <Text style={Styles.errorFont}>{'网络异常'}</Text>
          </View> : null}
      </ImageBackground>
    )
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL
})(AppClient);

const Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingWrapper: {
    width: 120,
    height: 100,
    backgroundColor: 'rgba(0,0,0,.65)',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingFont: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 5
  },
  errorWrap: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,.65)',
  },
  errorFont: {
    fontSize: 16,
    color: '#ffffff',
  }
})
