/** react 组建的引用 */
import React, {Component} from "react";
import {
  Dimensions,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */
import {withHandlers, compose} from 'recompact'; // 高阶组件的第三方库
import hoistStatics from 'hoist-non-react-statics'; // 获取上下文静态方法的组件

/**
 * 自定义组件以及高阶组件的引用
 */
import {Consumer} from './HOCcontext';

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度

/** 通过 Consumer 获取 Provider 传递过来的导航的实例 */
const withScrollComponent = (ScrollComponent) => {
  class ComponentWithNav extends Component {
    render() {
      return (
        <Consumer>
          {
            ({getNav}) => <ScrollComponent {...this.props} getNav={getNav}/>
          }
        </Consumer>
      )
    }
  }

  return hoistStatics(ComponentWithNav, ScrollComponent);
}

/** 返回加工后的onScroll组件，其实就是抽离出了 onScroll 方法 */
export default function withOnScroll(ScrollComponent) {

  const onScrollWithHandler = withHandlers({
    onScroll: props => e => {
      let {y} = e.nativeEvent.contentOffset
      let {contentSize, layoutMeasurement} = e.nativeEvent
      let maxOffsetY = contentSize.height - layoutMeasurement.height
      maxOffsetY = Math.min(Math.floor(maxOffsetY), height * 0.1);
      maxOffsetY <= 0 && (maxOffsetY = height * 0.1)
      let alpha = (y / maxOffsetY).toFixed(2)
      let nav = props.getNav()
      nav && nav._fadeInNavStyle(alpha)
    }
  })

  /**
   * compose(onScrollWithHandler)(ScrollComponent)
   * 将onScroll方法绑定到 onScroll 组件中，通过 withScrollComponent 获取导航组件的实例
   * */

  return withScrollComponent(compose(onScrollWithHandler)(ScrollComponent))
}