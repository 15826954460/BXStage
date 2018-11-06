/** react 相关引用 */
import React, {Component} from 'react';

/** 自定义组件以及高阶组件的引用 */
import CNavigation from '../CNavigation';
import {Provider} from './HOCcontext';


/** 通过  Provider 进行组件的包装 */
export default function withCNavigation(TargetComponent, otherProps) {
  _getCNav = () => {
    return this._CNavInstance // 返回导航组件的实例
  }

  class ComponentCNavigation extends Component {
    render() {
      return (
        <Provider value={{getNav: this._getCNav}}>
          <CNavigation {...otherProps}
                       ref={ref => this._CNavInstance = ref}>
            <TargetComponent {...this.props} />
          </CNavigation>
        </Provider>
      );
    }
  }
  return ComponentCNavigation;
}