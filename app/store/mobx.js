import {observable, action} from 'mobx';

export const UserInfo = observable({
  // 用户信息
  @observable
  data: {
    userInfo: {
      "headPicture": "",
      "realName": "童书文",
      "replyCount": 0,
      "hasFeedback": true,
      "nickName": "童书文",
      "idCard": "34************2384",
      "phoneNumber": ""
    }
  },

  // 修改用户信息
  @action
  updateData(data) {
    UserInfo.data = {
      ...UserInfo.data,
      ...data
    };
  },

  // 重置用户信息
  resetData() {
    UserInfo.data = {
      userInfo: {
        headPicture: null, // 用户头像
        realName: null, // 用户姓名
        replyCount: 0, // 反馈信息
        hasFeedback: false, // 是否反馈
        nickName: null, // 用户昵称
        idCard: '',
        mobile: ''
      },
    };
  },
});

export const bankInfo = observable({
  // 用户信息
  @observable
  data: {
    bankInfo: {
      "bankCardNo": "4652",
      "bankName": "招商银行",
      "bankIcon": ""
    }
  },

  // 修改用户信息
  updateData(data) {
    bankInfo.data = {
      ...UserInfo.data,
      ...data
    };
  },

  // 重置用户信息
  resetData() {
    bankInfo.data = {
      // 银行信息
      bankInfo: {
        bankCardNo: '',
        bankName: '',
        bankIcon: null
      }
    };
  },
})