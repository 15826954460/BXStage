/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Dimensions, Image,
} from "react-native";

/** 全局样式的引用 */
import Layout from "../../styles/layout";
import Size from '../../styles/size';

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

/** 自定义组建的引用 */
import CTouchableWithoutFeedback from '../../components/CTouchableWithoutFeedback';

/** 工具类的引用 */
import StorageData from '../../store/storageData';

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度
const RIGHT_ICON = require('../../images/common/common_img_arrow.png');

export default class ListItem extends Component {

  static propTypes = {
    isDot: PropTypes.bool, // 红点提示
    wrapperStyle: PropTypes.object, // 样式
    leftText: PropTypes.string, // 左边文案
    leftTextBottom: PropTypes.string, // 左边文案
    rightText: PropTypes.string, // 右边文案
    rightTextStyle: PropTypes.object, // 右边文案
    leftIconType: PropTypes.string, // icon 标识
    isShowRightIcon: PropTypes.bool, // 是否显示右边icon
    hasBottomLine: PropTypes.bool, // 是否有底部线
    hasAllBottomLine: PropTypes.bool, // 是否有完整的底部线
    borderAllBottomLineStyle: PropTypes.object,
    specialIconType: PropTypes.string, // 一些特殊用途的logo
    numberOfLines: PropTypes.number,
    handle: PropTypes.func,
  }

  static defaultProps = {
    isDot: false,
    wrapperStyle: {
      height: 50,
      marginTop: 0,
      backgroundColor: '#fff'
    },
    leftIconType: '',
    leftText: '',
    leftTextBottom: '',
    rightText: '',
    isShowRightIcon: true,
    hasBottomLine: false,
    specialIconType: '',
    hasAllBottomLine: false,
    numberOfLines: 0,
    rightTextStyle: {},
    borderAllBottomLineStyle: {
      left: 0,
      right: 0,
    },
    handle: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      headPicture: {},
    };
  }

  componentDidMount() {
    StorageData.getData('userInfo').then((res)=> {
      if (res && res.headPicture) {
        this.setState({
          headPicture: res.headPicture
        })
      }
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _getLeftIconPath(type) {
    let actions = new Map([
      ['MIB', require('../../images/me/me_img_borrowing.png')],
      ['MIT', require('../../images/me/me_img_transaction.png')],
      ['MIQ', require('../../images/me/me_img_qa.png')],
      ['MIC', require('../../images/me/me_img_customer.png')],
      ['MIF', require('../../images/me/me_img_feedback.png')],
      ['MIA', require('../../images/me/me_img_about.png')],
      ['MIS', require('../../images/me/me_img_setting.png')],
    ])
    return actions.get(type)
  }

  _getSpecialIconPath(type) {
    let actions = new Map([
      ['ZSYH', require('../../images/me/accountInfo/bank_img_default.png')],
      ['WRANING', require('../../images/common/index_img_warning.png')],
    ])
    return actions.get(type)
  }

  _onPress = () => {
    this.props.handle instanceof Function && this.props.handle()
  }

  render() {
    const {isDot, leftText, rightText, leftIconType, isShowRightIcon, hasBottomLine, specialIconType, wrapperStyle, leftTextBottom, hasAllBottomLine, numberOfLines, rightTextStyle, borderAllBottomLineStyle} = this.props
    return (
      <CTouchableWithoutFeedback handle={this._onPress}>
        <View style={[styles.container, wrapperStyle]}>

          <View style={[styles.iconAndTextWrapper]}>
            {
              leftIconType ? <Image
                style={styles.leftIconStyle}
                source={this._getLeftIconPath(leftIconType)}
              /> : null
            }
            <View style={styles.leftTextWrapper}>
              {
                leftText ? <Text style={[styles.leftText, {marginBottom: leftTextBottom ? 3 : 0}]}>
                  {leftText}
                </Text> : null
              }
              {
                leftTextBottom ? <Text style={styles.leftTextBottom}>
                  {leftTextBottom}
                </Text> : null
              }
            </View>

          </View>

          <View style={[styles.iconAndTextWrapper]}>
            {
              specialIconType ? <Image
                style={{width: 22, height: 22, borderRadius: 11,}}
                source={this._getSpecialIconPath(specialIconType)}
              /> : null
            }
            {
              rightText ? <Text style={[styles.rightText, rightTextStyle]} numberOfLines={numberOfLines}>
                {rightText}
              </Text> : null
            }
            {
              isDot ? <View style={[
                styles.circleStyle,
                Layout.layout.rcc
              ]}>
                <Text style={{fontSize: 12, color: Layout.color.white_bg}}>{'1'}</Text>
              </View> : null
            }
            {
              isShowRightIcon ? <Image
                style={styles.rightIconStyle}
                source={RIGHT_ICON}
              /> : null
            }

          </View>

          {
            hasBottomLine ? <View style={[styles.borderBottomLine, styles.bottomLine]}>
            </View> : null
          }

          {
            hasAllBottomLine ? <View style={[borderAllBottomLineStyle, styles.bottomLine, {width: width,}]}>
            </View> : null
          }
        </View>
      </CTouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    ...Layout.layout.rsbc,
    position: 'relative',
    paddingHorizontal: 12,
  },
  iconAndTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftIconStyle: {
    marginRight: 12,
    width: 20,
    height: 20,
  },
  rightIconStyle: {
    width: 14,
    height: 14,
  },
  leftText: {
    color: Layout.color.wblack,
    fontSize: 16,
  },
  rightText: {
    color: Layout.color.wgray_main,
    fontSize: 14,
  },
  circleStyle: {
    width: 20,
    height: 20,
    backgroundColor: Layout.color.circle,
    borderRadius: 10,
    marginHorizontal: 10
  },
  bottomLine: {
    borderBottomWidth: Size.screen.pixel,
    borderBottomColor: Layout.color.gray_line,
    position: 'absolute',
    bottom: 0,
  },
  borderBottomLine: {
    width: width * 331 / 375,
    right: 0,
  },
  leftTextWrapper: {
    flexDirection: 'column',
  },
  leftTextBottom: {
    fontSize: 14,
    color: Layout.color.wgray_main,
  },
});