import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Provider } from 'mobx-react';
import UserStore from './UserStore'
import UserList from './UserList'

export default class App extends Component {
  render() {
    return (
      <Provider UserStore={UserStore}>
        <View style={styles.container}>
          <UserList/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
  },
});