/** react 组建的引用 */
import React, {Component} from 'react';
import {
  Text, ViewPropTypes,
} from 'react-native';

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import CTouchableWithoutFeedback from './CTouchableWithoutFeedBack'

/** app的按钮颜色 */


const {btno_start, btno_end, btno_p_start, btno_p_end, btno_d_start, btno_d_end} = BtnStyle.color

// btno_start: '#ffaf0a',//橙色按钮普通状态渐变色起始色
//   btno_end: '#ff4631',//橙色按钮普通状态渐变色结束色
//   btno_p_start: '#ffa100',//橙色按钮按下状态渐变色起始色
//   btno_p_end: '#ff3820',//橙色按钮按下状态渐变色结束色
//   btno_d_start: '#ffd785',//橙色按钮不可点渐变色起始色
//   btno_d_end: '#ffa398',//橙色按钮不可点渐变色结束色

export default class CGradient extends Component {
  //渐变按钮可点击
  colorsCommon = [btno_start, btno_end];

  //渐变按钮按下效果
  colorsPressIn = [btno_p_start, btno_p_end];

  //渐变按钮不可点击
  colorsDisabled = [btno_d_start, btno_d_end];

  static propTypes = {
    wrapStyle: ViewPropTypes.style,
    gradientStyle: ViewPropTypes.style,
    btnType: PropTypes.oneOf(['btn_bottom', 'btn_l', 'btn_m', 'btn_xs', 'btn_s', 'btn_input', 'btn_list']),
    contentText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    start: PropTypes.object,
    end: PropTypes.object,
    locations: PropTypes.array,
    colorsStyle: PropTypes.array,
    numberOfLines: PropTypes.number,
  };
  static defaultProps = {
    contentText: '',
    disabled: false,
    start: {x: 0.0, y: 1.0},
    end: {x: 1.0, y: 1.0},
    locations: [0, 1.0],
    numberOfLines: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      pressDown: false,
    }
  }
  render() {
    let {btnType, contentText, disabled, onPress, start, end, locations, numberOfLines} = this.props;
    let {gradientStyle, textStyle, colorsStyle} = this.props
    let {pressDown} = this.state;
    return (
      <CTouchableWithoutFeedback
        disabled={disabled}
        delayPressIn={0}
        onPressIn={() => (!disabled && this.setState({pressDown: true}))}
        onPress={onPress}
        onPressOut={() => (!disabled && this.setState({pressDown: false}))}>
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          colors={colorsStyle || (disabled ? this.colorsDisabled : pressDown ? this.colorsPressIn : this.colorsCommon)}
          style={[
            gradientStyle || BtnStyle.button[btnType],
            {justifyContent: 'center', alignItems: 'center'}
          ]}>
          {
            contentText ? <Text
              numberOfLines={numberOfLines}
              style={textStyle || [{fontSize: BtnStyle.font[btnType]}, {color: BtnStyle.color.wwhite}]}>
              {contentText}
            </Text> : null
          }
        </LinearGradient>
      </CTouchableWithoutFeedback>
    )
  }
}