import SiblingsNotice from '../components/CNotice';
import SiblingsToast from '../components/CToast';
const bouncedUtils = {
  /**
   * params 参数分别对应的 {content, type} 提示文案和提示类型
   * 提示类型: warning, success,
   * 提示文案根据设计原型：eg: '邀请码错误，请重新输入', '请阅读并同意用户协议'
   * eg: { content : '', type: 'success'}
   */
  notices: {
    show: (params) => SiblingsNotice.showSiblings instanceof Function && SiblingsNotice.showSiblings(params),
    hide: () => SiblingsNotice.hideSiblings instanceof Function && SiblingsNotice.hideSiblings(),
  },
  /**
   * params 格式如下，具体参数详见 CToast 说明
   * { title: false, isOnlyOneBtn: true,borderRadius: 12,contentText: ''} ,
   * */
  toast: {
    show: (params) => SiblingsToast.showSiblings instanceof Function && SiblingsToast.showSiblings(params),
    hide: () => SiblingsToast.hideSiblings instanceof Function && SiblingsToast.hideSiblings(),
  }
}
export {bouncedUtils}