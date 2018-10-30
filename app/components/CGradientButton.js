/** react 组建的引用 */
import React, {Component} from 'react';
import {
  Text, Dimensions,
} from 'react-native';

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CTouchableWithoutFeedback from './CTouchableWithoutFeedback';

/** 一些常量的声明 */
const {width, height} = Dimensions.get('window');

/** 一些自定义工具的引用 */
import {bouncedUtils} from '../utils/bouncedUtils';

/** 按钮的颜色 */
const
  BTN_DEFAULT_START = '#ffaf0a', // 橙色按钮普通状态渐变色起始色
  BTN_DEFAULT_END = '#ff4631', // 橙色按钮普通状态渐变色结束色
  BTN_ON_PRESS_START = '#ffa100',// 橙色按钮按下状态渐变色起始色
  BTN_ON_PRESS_END = '#ff3820',// 橙色按钮按下状态渐变色结束色
  BTN_DISABLE_START = '#ffd785',//橙色按钮不可点渐变色起始色
  BTN_DISABLED_END = '#ffa398';//橙色按钮不可点渐变色结束色

/** 按钮的大小 */
const BUTTON_STYLE = {
  btn_bottom: {
    width: width,
    // height: 44 + (CommonSize.isIPhoneX ? CommonSize.screen.iPhoneXHomeIndicatorAreaHeight:0),
    // paddingBottom: CommonSize.isIPhoneX ? CommonSize.screen.iPhoneXHomeIndicatorAreaHeight:0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_l: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_m: {
    width: 160,
    height: 36,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_xs: {
    width: 123,
    height: 36,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_s: {
    width: 115,
    height: 34,
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_input: {
    width: 60,
    height: 28,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default class CGradientButton extends Component {
  //渐变按钮可点击
  _defaultColorArray = [BTN_DEFAULT_START, BTN_DEFAULT_END];

  //渐变按钮按下效果
  _onPressInColorArray = [BTN_ON_PRESS_START, BTN_ON_PRESS_END];

  //渐变按钮不可点击
  _disabledColorArray = [BTN_DISABLE_START, BTN_DISABLED_END];

  static propTypes = {
    wrapStyle: PropTypes.object,
    gradientType: PropTypes.string,
    textStyle: PropTypes.object,
    onPress: PropTypes.func,
    colorsArray: PropTypes.array, // 父组件传进来的默认按钮颜色数组
    colorsPressArray: PropTypes.array, // 父组件传进来的按钮点击的颜色数组
    colorsDisableArray: PropTypes.array, // 父组件传进来的按钮的禁用颜色数组
    contentText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    start: PropTypes.object,
    end: PropTypes.object,
    locations: PropTypes.array,
    numberOfLines: PropTypes.number,
  };

  static defaultProps = {
    contentText: '',
    dynamic: false,
    start: {x: 0.0, y: 0.0}, // 关于渐变动画的初始值
    end: {x: 1.0, y: 0.0}, // 关于渐变动画的初始值
    locations: [0, 1.0], // 关于渐变动画的初始值（location 要和 colors 长度对应）
    numberOfLines: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      pressDown: false,
    };
    props.getCGradientInstance instanceof Function && props.getCGradientInstance(this)
  }

  /** 自定义组件是否进行重新render的时机 */
  shouldComponentUpdate(nextProps, nextState) {
    /** 只有当父组件传过来的是禁用属性发生变化或者state发生变化是，才会重新 render, 避免每一次父组件的render都导致子组件的render而带来的性能损耗,虽然render的性能开销比较少，但是作为一个优秀的码农，我们必须尽一切办法去做到尽可能的极致 */
    if (typeof nextProps.disabled === 'boolean' || this.state.pressDown !== nextState) return true
    return false
  }

  componentDidMount() {
    
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const {pressDown} = this.state
    const {contentText, disabled, start, end, locations, numberOfLines, gradientType, textStyle} = this.props
    const {colorsArray, colorsPressArray, colorsDisableArray, onPress} = this.props
    return (
      <CTouchableWithoutFeedback
        delayPressIn={0}
        onPressIn={() => this.setState({pressDown: true})}
        onPress={!disabled ? onPress : null}
        onPressOut={() => this.setState({pressDown: false})}
      >
        <LinearGradient
          start={start}
          end={end}
          colors={disabled ? (colorsDisableArray || this._disabledColorArray) : (pressDown ? (colorsPressArray || this._onPressInColorArray) : (colorsArray || this._defaultColorArray))}
          locations={locations}
          style={BUTTON_STYLE[gradientType]}>
          <Text style={textStyle}
                numberOfLines={numberOfLines}>
            {contentText}
          </Text>
        </LinearGradient>
      </CTouchableWithoutFeedback>
    );
  }
}