/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView,
  Text,
  View,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';

/** 全局公用方法的引用 */
import StorageData from '../../store/storageData';

export default class Vue2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headPicture: '', // 用户头像那
    };
  }

  componentDidMount() {
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
     <ScrollView>

     </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layout.layout.ccc,
  }
});