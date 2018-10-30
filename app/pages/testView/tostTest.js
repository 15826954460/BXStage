/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Dimensions,TouchableHighlight,
  Text,
  View,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import RootSiblings from 'react-native-root-siblings';

/** 自定义组建的引用 */
let id = 0;
let elements = [];

export default class Toast extends Component {

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

  addSibling = () => {
    let sibling = new RootSiblings(
      <View
        style={[styles.sibling, {top: id * 20}]}
      >
        <Text>I`m No.{id}</Text>
      </View>
    );
    id++;
    elements.push(sibling);
  };

  destroySibling = () => {
    let lastSibling = elements.pop();
    lastSibling && lastSibling.destroy();
  };

  updateSibling = () => {
    let lastId = elements.length - 1;
    lastId >= 0 && elements[lastId].update(
      <View
        style={[styles.sibling, {top: lastId * 20}]}
      >
        <Text>I`m No.{lastId} : {Math.random()}</Text>
      </View>
    );
  };

  render() {
    return (<View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.addSibling}
        >
          <Text style={styles.buttonText}>Add element</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.destroySibling}
        >
          <Text style={styles.buttonText}>Destroy element</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.updateSibling}
        >
          <Text style={styles.buttonText}>Update element</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  button: {
    borderRadius: 4,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ccc',
    borderColor: '#333',
    borderWidth: 1,
  },
  buttonText: {
    color: '#000'
  },
  sibling: {
    left: 0,
    height: 20,
    width: Dimensions.get('window').width / 2,
    backgroundColor: 'blue',
    opacity: 1,
    position: 'absolute',
    zIndex: 10000,
  }
});