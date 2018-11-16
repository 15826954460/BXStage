import SiblingsNotice from '../components/CNotice';
import SiblingsAlert from '../components/CAlert';
import SiblingsToast from '../components/CToast';
import SiblingsNoticeBottom from '../components/CNoticeBottom';
import SiblingsActionSheet from '../components/CActionSheet';
import SiblingsLoading from '../components/CLoading';

const bouncedUtils = {
  /** 顶部提示弹框
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
  alert: {
    show: (params) => SiblingsAlert.showSiblings instanceof Function && SiblingsAlert.showSiblings(params),
    hide: () => SiblingsAlert.hideSiblings instanceof Function && SiblingsAlert.hideSiblings(),
  },
  /**
   * params 格式如下
   * eg: {content: ''}
   * */
  toast: {
    show: (params) => SiblingsToast.showSiblings instanceof Function && SiblingsToast.showSiblings(params),
    hide: () => SiblingsToast.hideSiblings instanceof Function && SiblingsToast.hideSiblings(),
  },
  /**
   {"title": "","content": ""}
   */
  noticesBottom: {
    show: (params) => SiblingsNoticeBottom.showSiblings instanceof Function && SiblingsNoticeBottom.showSiblings(params),
    hide: () => SiblingsNoticeBottom.hideSiblings instanceof Function && SiblingsNoticeBottom.hideSiblings(),
  },
  /** 关于调用相册的弹框 */
  actionSheet: {
    show: (params) => SiblingsActionSheet.showSiblings instanceof Function && SiblingsActionSheet.showSiblings(params),
    hide: () => SiblingsActionSheet.hideSiblings instanceof Function && SiblingsActionSheet.hideSiblings(),
  },
  /** 加载动画 */
  loading: {
    show: () => SiblingsLoading.showSiblings instanceof Function && SiblingsLoading.showSiblings(),
    hide: () => SiblingsLoading.hideSiblings instanceof Function && SiblingsLoading.hideSiblings(),
  }
}
export {bouncedUtils}