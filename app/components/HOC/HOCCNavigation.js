/** react 相关引用 */
import React from 'react';

/** 自定义组件以及高阶组件的引用 */
import CNavigation from '../CNavigation';
import {Provider} from './HOCcontext';

/** 通过  Provider 进行组件的包装 */
export default function withCNavigation(TargetComponent) {

  class ComponentCNavigation extends TargetComponent {
    _getCNav = () => this._CNavInstance
     // 返回导航组件的实例

    _getNavProps = () => {
      if (this.navConfig) {
        return this.navConfig
      } else {
        return null
      }
    }

    render() {
      return (
        /** 坑： getNav: this._getCNav 只能使用行数引用的命名，
         *  getNav: this._getCNav() 生成者是全局的
         *  消费者可以多个，所以实例需要在每一个生产者中自行创建，负责会出现意想不到的 bug
         * */
        <Provider value={{getNav: this._getCNav}}>
          <CNavigation {...this._getNavProps()}
                       getRef={ref => this._CNavInstance = ref}>
            {super.render()}
          </CNavigation>
        </Provider>
      );
    }
  }

  return ComponentCNavigation;
}