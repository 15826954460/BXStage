/** 页面生命周期的高阶函数 */
import React, {Component} from 'react';
import CNavigation from '../CNavigation';

const
  STATUS_BAR_LIGHT_THEME = 'light-content';

export default function withCNavigation(TargetComponent, otherProps) {

  class ComponentCNavigation extends Component {
    render() {
      return (
        <CNavigation {...otherProps}>
          <TargetComponent ref={ref => this._scrollInstance = ref}
                           {...this.props} />
        </CNavigation>
      );
    }
  }

  return ComponentCNavigation;
}