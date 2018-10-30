import SiblingsNotice from '../components/CNotice';
const bouncedUtils = {
  /**
   * params 参数分别对应的 {content, type} 提示文案和提示类型
   * 提示类型: warning, success,
   * 提示文案根据设计原型：eg: '邀请码错误，请重新输入', '请阅读并同意用户协议'
   * eg: { content : '', type: 'success'}
   *
   */
  notices: {
    show: (params) => SiblingsNotice.showSiblings instanceof Function && SiblingsNotice.showSiblings(params),
    hide: () => SiblingsNotice.hideSiblings instanceof Function && SiblingsNotice.showSiblings(),
  }
}
export {bouncedUtils}