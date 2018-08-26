import React, {Component} from "react";
import {
  StyleSheet, Text, View,
} from "react-native";
import Layout from '../../styles/layout';
export default class Vue2 extends Component {

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

  render() {
    return (
      <View style={styles.container}>
        <Text>{'order'}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Layout.layout.ccc,
    backgroundColor: Layout.color.gray_bg,
  }
});