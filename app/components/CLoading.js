/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Animated, Easing, Dimensions,
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

export default class CLoading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
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

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: width, height: 200, ...Layout.layout.ccc}}>
          <LottieView style={{width: 200, height: 100}}
                      source={require('../json/full_loading.json')}
                      progress={this.state.progress}/>
        </View>
      </View>
    );
  }
}

class SiblingsLoading extends Component {
  static siblingInstance = null;

  // 创建及显示
  static showSiblings = (params) => {
    SiblingsLoading.siblingInstance = new RootSiblings(<CLoading params={params}/>)
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
    flex: 1,
    width: width,
    ...Layout.layout.ccc,
    backgroundColor: 'pink'
  }
});