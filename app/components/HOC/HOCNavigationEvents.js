/**
 * Created by bird-mac on 2018/8/22.
 */
import React, {Component} from 'react';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default function HOCNavigationFocus(Component, mutableStatusBar) {
  class ComponentWithFocus extends Component {

    _componentWillFocus(res) {
      super.componentWillFocus instanceof Function && super.componentWillFocus(res)
    }
    _componentDidFocus(res) {
      super.componentDidFocus instanceof Function && super.componentDidFocus(res)
    }
    _componentWillBlur(res) {
      super.componentWillBlur instanceof Function && super.componentWillBlur(res)
    }
    _componentDidBlur(res) {
      super.componentDidBlur instanceof Function && super.componentDidBlur(res)
    }
    render() {
      return (
        <View style={{flex:1}}>
          <NavigationEvents
            onWillFocus={payload => this._componentWillFocus(payload)}
            onDidFocus={payload => this._componentDidFocus(payload)}
            onWillBlur={payload => this._componentWillBlur(payload)}
            onDidBlur={payload => this._componentDidBlur(payload)}/>
          {
            super.render()
          }
        </View>
      );
    }
  }
  return ComponentWithFocus;
}