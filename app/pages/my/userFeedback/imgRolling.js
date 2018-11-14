/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View,Modal,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import ImageViewer from 'react-native-image-zoom-viewer';

/** 自定义组建的引用 */

/** 页面的引入 */

/** 工具类的引用 */

/** 常量声明 */

export default class ImageRolling extends Component {

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

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  render() {
    return (
      <Modal visible={true}
             transparent={true}>
        <ImageViewer imageUrls={require('../../../images/common/test_one.png')}/>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});