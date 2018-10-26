import React, {Component} from "react";
import {
  StyleSheet, Text, View,
} from "react-native";

import Layout from '../../styles/layout';

export default class Login extends Component {

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
        <Text style={{fontSize: 16}}>{'login  4444'}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...Layout.layout.ccc
  }
});