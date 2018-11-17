/**
 * ui 设计基准, iphone 6
 * width: 750
 * height: 1334
 */

/**
 * 设备的像素密度，例如：
 * PixelRatio.get() === 1    mdpi Android 设备 (160 dpi)
 * PixelRatio.get() === 1.5  hdpi Android 设备 (240 dpi)
 * PixelRatio.get() === 2    iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Andro id 设备 (320 dpi)
 * PixelRatio.get() === 3    iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 * PixelRatio.get() === 3.5  Nexus 6
 */

/** react-native 组件的引用 */
import {
  Dimensions, StyleSheet,
  PixelRatio, Platform,
} from 'react-native';

/** 第三方库的引用 */
import DeviceInfo from "react-native-device-info";
import dateFormat from 'dateformat';

/** 引入工具方法 */
import {IdCardUtils} from './aboutIdCard';

/**  声明一些常量 */
const [defaultPixel, defaultWidth, defaultHeight] = [2, 750, 1334];  // iphone6的像素密度, 这个可以根据你实际的设计稿来定义
const {width, height} = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale(); // 获取字体大小缩放比例
const pixelRatio = PixelRatio.get();  // 当前设备的像素密度

/**  px 转换成 dp */
const w2 = defaultWidth / defaultPixel;
const h2 = defaultHeight / defaultPixel;
const scale = Math.min(width / w2, height / h2);   // 获取缩放比例,去较小的比列值

const Util = {
  /**  获取当前平台最细的线标准 */
  pixel() {
    if (pixelRatio > 2 && pixelRatio < 3 && Platform.OS === 'android') return 0.5
    return StyleSheet.hairlineWidth
  },
  /**  字体的缩放方法: 根据手机屏幕的大小进行字体缩放 */
  fontScale(size) {
    size = Math.round((size * scale + 0.5) * (pixelRatio / fontScale));
    return size / defaultPixel;
  },
  // 判断是否是 iphoneX 手机
  isIPhoneX() {
    const {getDeviceId} = DeviceInfo
    if (Platform.OS === 'ios' && (getDeviceId() === 'iPhone10,6' || getDeviceId() === 'iPhone10,3')) {
      return true
    } else {
      return false
    }
  },
  /**  判断是不是 android */
  isAndroid() {
    return (Platform.OS === 'android') ? true : false
  },
  /** 金额做千位符格式化并保留两位小数
   * 如果是数字就直接做千位符格式化，不保留两位小数
   */
  toThousands(amount, type) {
    let result = ''
    if (amount) {
      // 如果是 number 类型，不保留两位小数
      if (type === 'number') {
        let numStr = amount.toString()
        while (numStr.length > 3) {
          result = ',' + numStr.slice(-3) + result
          numStr = numStr.slice(0, numStr.length - 3)
        }
        result = numStr + result
      } else {
        // 否则就进行， 保留两位小数
        amount = Number(amount.toString() || 0).toFixed(2)
        let numAry = amount.toString().split('.')
        let preNum = numAry[0]
        let lastNum = numAry[1]
        while (preNum.length > 3) {
          result = ',' + preNum.slice(-3) + result
          preNum = preNum.slice(0, preNum.length - 3)
        }
        if (preNum) {
          result = preNum + result
        }
        result = result + '.' + lastNum
      }
    } else {
      if (amount === 0 && type === 'number') {
        result = 0
      } else {
        result = '0.00'
      }
    }
    return result
  },
  /** 日期格式化 */
  formatDate: (date, format) => {
    if (!isNaN(Date.parse(date))) {
      return dateFormat(date, 'UTC:' + format)
    }
    return null
  },
  /** 检测手机号 */
  checkMobile: (mobile) => {
    return /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/.test(Number(mobile));
  },
  /**  验证纯数字 */
  checkPureNumber: (num) => {
    return /^[0-9]*$/.test(Number(num));
  },
  checkPassword: (val) => {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(val);
  },
  /** 敏感信息的脱敏处理，暂时只针对手机号：保留前三位和后四位 */
  takeSensitive(value) {
    if (!value) return
    let newValue = value.toString()
    value = newValue.replace(newValue.slice(3, newValue.length - 4), '****')
    return value
  },
  /** baiyunsong 验证邮箱的邮箱性 */
  isEmail(str) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  },
  /** 身份证的有效性验证 */
  idCardIsLegal(idCardNum) {
    return IdCardUtils.validateIdCard(idCardNum)
  }
}
export {Util}