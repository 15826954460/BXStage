/** 页面生命周期的高阶函数 */
import React, {Component} from 'react';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default function withFocus(TargetComponent) {
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
        /** 你可以在这里做一些事件拦截处理，甚至修改父组件的props属性 */
        <View style={{flex:1}}>
          <NavigationEvents
            onWillFocus={payload => this._componentWillFocus(payload)}
            onDidFocus={payload => this._componentDidFocus(payload)}
            onWillBlur={payload => this._componentWillBlur(payload)}
            onDidBlur={payload => this._componentDidBlur(payload)}/>
          <TargetComponent {...this.props} />
        </View>
      );
    }
  }
  return ComponentWithFocus;
}