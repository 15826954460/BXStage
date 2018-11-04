/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, Dimensions, Image,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../styles/layout";
import {Size} from '../../styles/size';

/** 第三方依赖库的引用 */
import PropTypes from 'prop-types';

/** 自定义组建的引用 */

/** 工具类的引用 */

/** 常量声明 */
const {width, height} = Dimensions.get('window');//屏幕宽度
const RIGHT_ICON = require('../../images/common/common_img_arrow.png');

export default class ListItem extends Component {

  static propTypes = {
    isService: PropTypes.bool,
    wrapperStyle: PropTypes.object,
    leftText: PropTypes.string,
    rightText: PropTypes.string,
    iconType: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isService: false,
    wrapperStyle: {
      height: 50,
      paddingHorizontal: 14,
      marginTop: 0,
    },
    leftText: '',
    rightText: '',
  }

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

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _getImagePath(res) {
    let path = null
    switch (res) {
      // 我的借款
      case 'MIB':
        path = require('../../images/me/me_img_borrowing.png')
        break
      // 交易记录
      case 'MIT':
        path = require('../../images/me/me_img_transaction.png')
        break
      // 常见问题
      case 'MIQ':
        path = require('../../images/me/me_img_qa.png')
        break
      // 联系客服
      case 'MIC':
        path = require('../../images/me/me_img_customer.png')
        break
      // 用户反馈
      case 'MIF':
        path = require('../../images/me/me_img_feedback.png')
        break
      // 关于币下分期
      case 'MIA':
        path = require('../../images/me/me_img_about.png')
        break
      // 设置
      case 'MIS':
        path = require('../../images/me/me_img_setting.png')
        break

    }
    return path;
  }

  render() {
    const {isService, wrapperStyle, leftText, rightText, iconType} = this.props
    return (
      <View style={[styles.container, wrapperStyle]}>
        <View style={[styles.iconAndTextWrapper]}>
          <Image
            style={styles.leftIconStyle}
            source={this._getImagePath(iconType)}
          />
          <Text
            style={styles.leftText}
          >
            {leftText}
          </Text>
        </View>

        <View style={[styles.iconAndTextWrapper]}>
          <Text
            style={styles.rightText}
          >
            {rightText}
          </Text>
          {
            isService ? <View style={[
              styles.circleStyle,
              Layout.layout.rcc
            ]}>
              <Text style={{fontSize: 12, color: Layout.color.white_bg}}>{'1'}</Text>
            </View> : null
          }

          <Image
            style={styles.rightIconStyle}
            source={RIGHT_ICON}
          />
        </View>

        <View style={styles.borderBottomLine}>

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width,
    ...Layout.layout.rsbc,
    position: 'relative'
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
  borderBottomLine: {
    borderBottomWidth: Size.screen.pixel,
    borderBottomColor: Layout.color.gray_line,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width * 331 / 375
  }
});