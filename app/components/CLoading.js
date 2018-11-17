/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Animated, Easing, Dimensions, BackHandler,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../styles/layout";

/** 第三方依赖库的引用 */
import RootSiblings from 'react-native-root-siblings';
import LottieView from 'lottie-react-native';


/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */
const {width, height} = Dimensions.get('window');
const DURATION = 200;

class CLoading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: DURATION,
      easing: Easing.linear,
    }).start();
    this._lottieInstance.play()
    this._hardwareBackHandle = BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
  }

  _hardwareBackPress = () => {
    SiblingsLoading.hideSiblings()
    return true
  }

  componentWillUnmount() {
    this._hardwareBackHandle.remove()
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  render() {
    return (
      <Animated.View
        style={[styles.container,
          {opacity: this.state.opacity}
        ]}
      >
        <View style={styles.lottieWrapper}>
          <LottieView
            style={{width: 52, height: 52}}
            ref={ref => this._lottieInstance = ref}
            source={require('../json/full_loading.json')}
            loop={true}
          />
          <Text style={styles.bottomText}>{'加载中...'}</Text>
        </View>
      </Animated.View>
    );
  }
}

export default class SiblingsLoading extends Component {
  static siblingInstance = null;

  // 创建及显示
  static showSiblings = (params) => {
    SiblingsLoading.siblingInstance = new RootSiblings(<CLoading/>)
  };

  // 销毁及隐藏
  static hideSiblings = () => {
    SiblingsLoading.siblingInstance && SiblingsLoading.siblingInstance.destroy();
  };

  render() {
    return null;
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...Layout.layout.ccc,
    backgroundColor: Layout.color.white_bg,
    opacity: 0.3,
  },
  lottieWrapper: {
    width: 115,
    height: 118,
    backgroundColor: 'rgba(240,240,240,0.8)',
    borderRadius: 8,
    ...Layout.layout.ccc
  },
  bottomText: {
    fontSize: Layout.font.Body1,
    color: Layout.color.wgray_main,
    marginTop: 6
  }
});