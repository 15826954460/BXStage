// 账户信息
const userInfo = {
  "headPicture": null,
  "realName": "童书文",
  "replyCount": 0,
  "hasFeedback": true,
  "nickName": "童书文",
  "idCard": "34************2384",
  "phoneNumber": ""
}

/** 银行卡信息 */
const bankInfo = {
  "bankCardNo": "4652",
  "bankName": "招商银行",
  "bankIcon": ""
}

/** 注册信息已经保存到了本地 */
const registerInfo = {
  'phoneNumber': '', // 手机号 有效手机号即可
  'inviteCode': '', // 邀请码 6位数字即可
  'validationCode': '', // 验证码 4位有效数字
  'hasRegister': false, // 默认没有注册
  'password': '', // 密码 有效密码即可 6~16位数字、字母组合
  'idCard': '', // 有效身份证号即可
  'hasLogin': true
}


// 数据结构
const loanCardInfo = {
  "code": "0000",
  "message": "请求成功",
  "body": {
    "hasLoan": false,
    "billName": null,
    "dueDate": null,
    "shouldRepayAmount": null,
    "loanOrderNo": null,
    "repaidTerm": null,
    "term": null,
    "overdueDays": null,
    "overdueFee": null,
    "creditAmount": 10000.00,
    "loanTimes": 1,
    "phaseId": null,
    "onRepay": null
  }
}

// 分期页面数据
const loginSuccess = {
  // 登陆成功 => 获取分期页面数据
  "loanInfo": {
    "hasLoan": false,
    "billName": null,
    "dueDate": null,
    "shouldRepayAmount": null,
    "loanOrderNo": null,
    "repaidTerm": null,
    "term": null,
    "overdueDays": null,
    "overdueFee": null,
    "creditAmount": 10000.00,
    "loanTimes": 1,
    "phaseId": null,
    "onRepay": null
  },
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJqd3RJZFwiOlwiNDFmYWI0ZjktN2YwMS00NjI1LTlkNWUtOTkyYTczNjlhMWEwXCIsXCJvcGVuSWRcIjpcIjEwMjcwMDQyMjU0NjY1MzU5MzZcIn0iLCJvcGVuSWQiOiIxMDI3MDA0MjI1NDY2NTM1OTM2Iiwibmlja05hbWUiOm51bGwsImlzcyI6ImJpeGlhYXBwLmNvbSIsImV4cCI6MTU0MjM1OTA3OCwiaWF0IjoxNTQxNzU0Mjc4LCJqdGkiOiI0MWZhYjRmOS03ZjAxLTQ2MjUtOWQ1ZS05OTJhNzM2OWExYTAifQ.LiY9S5sIUuZsiV25sYWc-q7DA8o9XYQ5gGD82JD9QPc"
}

// 我的借款
const myLoan = {
  "totalpage": 1,
  "totalrecord": 1,
  "loanTimes": 1,
  "records": [
    {
      "amount": 10000.00,
      "loanTime": "2018-08-08T09:47:58",
      "releaseTime": "2018-08-05T13:35:40",
      "waitPayTerms": 0,
      "loanOrderNo": "2018080820201000014",
      "status": 7
    }
  ],
  "currentpage": 1,
  "pagecode": 10,
  "loanAmount": 10000.00,
  "maxresult": 20
}

// 借款详情里面的数据
const loanDetail = {
  "loanOrderNo": "2018080820201000014",
  "amount": 10000.00,
  "releaseTime": "2018-08-05T13:35:40",
  "shouldRepayAmount": 10891.97,
  "waitRepayAmount": 0.00,
  "waitRepayTerm": 0,
  "term": 6,
  "principal": 10000.00,
  "interest": 172.17,
  "serviceFee": 698.51,
  "overdueFee": 21.29,
  "repaidAmount": 10839.16,
  "remissionAmount": 52.81,
  "loanTime": "2018-08-08T09:47:58",
  "repaymentPlan": [
    {
      "shouldRepayAmount": 1657.61,
      "repaidAmount": 1657.61,
      "remissionAmount": 0.00, // 延期
      "waitRepayAmount": 0.00,
      "principal": 1547.92,
      "interest": 21.39,
      "serviceFee": 86.78,
      "overdueFee": 1.52,
      "overdueDays": 1,
      "phaseNum": 1,
      "dueDate": "2018-08-07T00:00:00",
      "state": 2
    }, {
      "shouldRepayAmount": 1844.48,
      "repaidAmount": 1844.48,
      "remissionAmount": 0.00,
      "waitRepayAmount": 0.00,
      "principal": 1593.59,
      "interest": 49.30,
      "serviceFee": 200.03,
      "overdueFee": 1.56,
      "overdueDays": 1,
      "phaseNum": 2,
      "dueDate": "2018-08-07T00:00:00",
      "state": 2
    }, {
      "shouldRepayAmount": 1844.53,
      "repaidAmount": 1844.53,
      "remissionAmount": 0.00,
      "waitRepayAmount": 0.00,
      "principal": 1640.59,
      "interest": 40.01,
      "serviceFee": 162.32,
      "overdueFee": 1.61,
      "overdueDays": 1,
      "phaseNum": 3,
      "dueDate": "2018-08-07T00:00:00",
      "state": 2
    }, {
      "shouldRepayAmount": 1859.52,
      "repaidAmount": 1859.52,
      "remissionAmount": 0.00,
      "waitRepayAmount": 0.00,
      "principal": 1688.99,
      "interest": 30.44,
      "serviceFee": 123.49,
      "overdueFee": 16.60,
      "overdueDays": 10,
      "phaseNum": 4,
      "dueDate": "2018-08-07T00:00:00",
      "state": 2
    }, {
      "shouldRepayAmount": 1842.92,
      "repaidAmount": 1842.92,
      "remissionAmount": 0.00,
      "waitRepayAmount": 0.00,
      "principal": 1738.81,
      "interest": 20.59,
      "serviceFee": 83.52,
      "overdueFee": 0.00,
      "overdueDays": 0,
      "phaseNum": 5,
      "dueDate": "2018-12-16T00:00:00",
      "state": 2
    }, {
      "shouldRepayAmount": 1842.91,
      "repaidAmount": 1790.10,
      "remissionAmount": 52.81,
      "waitRepayAmount": 0.00,
      "principal": 1790.10,
      "interest": 10.44,
      "serviceFee": 42.37,
      "overdueFee": 0.00,
      "overdueDays": 0,
      "phaseNum": 6,
      "dueDate": "2019-01-16T00:00:00",
      "state": 2
    }
  ]
}

// 更多详情数据
const moreDetail = {
  "realName": "童书文",
  "idCard": "34************2384",
  "amount": 10000.00,
  "term": 6,
  "loanTime": "2018-08-08T09:47:58",
  "releaseTime": "2018-08-05T13:35:40",
  "dueDate": "2019-01-16T00:00:00",
  "bankName": "招商银行",
  "bankIcon": "http://bixiabtest.bixiaapp.com/bankIcon/bank_img_zsyh.png",
  "bankNo": "4652",
  "paymentMethod": 1,
  "repaymentDate": 16,
  "agreements": []
}

// 交易记录数据
const tradeRecode = {
  "totalpage": 1,
  "totalrecord": 6,
  "records": [{
    "amount": 52.81,
    "tradTime": "2018-08-17T14:58:49",
    "tradeOrderNo": "250201808172000138006",
    "tradeType": 4
  }, {
    "amount": 5492.54,
    "tradTime": "2018-08-17T14:58:49",
    "tradeOrderNo": "230201808172000138005",
    "tradeType": 2
  }, {
    "amount": 1844.53,
    "tradTime": "2018-08-08T16:03:48",
    "tradeOrderNo": "230201808081000000164",
    "tradeType": 2
  }, {
    "amount": 1844.48,
    "tradTime": "2018-08-08T14:44:20",
    "tradeOrderNo": "240201808082000000105",
    "tradeType": 3
  }, {
    "amount": 1657.61,
    "tradTime": "2018-08-08T14:34:12",
    "tradeOrderNo": "240201808082000000098",
    "tradeType": 3
  }, {
    "amount": 52.81,
    "tradTime": "2018-08-17T14:58:49",
    "tradeOrderNo": "250201808172000138006",
    "tradeType": 4
  }, {
    "amount": 5492.54,
    "tradTime": "2018-08-17T14:58:49",
    "tradeOrderNo": "230201808172000138005",
    "tradeType": 2
  }, {
    "amount": 1844.53,
    "tradTime": "2018-08-08T16:03:48",
    "tradeOrderNo": "230201808081000000164",
    "tradeType": 2
  }, {
    "amount": 1844.48,
    "tradTime": "2018-08-08T14:44:20",
    "tradeOrderNo": "240201808082000000105",
    "tradeType": 3
  }, {
    "amount": 1657.61,
    "tradTime": "2018-08-08T14:34:12",
    "tradeOrderNo": "240201808082000000098",
    "tradeType": 3
  },
    {
      "amount": 52.81,
      "tradTime": "2018-08-17T14:58:49",
      "tradeOrderNo": "250201808172000138006",
      "tradeType": 4
    }, {
      "amount": 5492.54,
      "tradTime": "2018-08-17T14:58:49",
      "tradeOrderNo": "230201808172000138005",
      "tradeType": 2
    }, {
      "amount": 1844.53,
      "tradTime": "2018-08-08T16:03:48",
      "tradeOrderNo": "230201808081000000164",
      "tradeType": 2
    }, {
      "amount": 1844.48,
      "tradTime": "2018-08-08T14:44:20",
      "tradeOrderNo": "240201808082000000105",
      "tradeType": 3
    }, {
      "amount": 1657.61,
      "tradTime": "2018-08-08T14:34:12",
      "tradeOrderNo": "240201808082000000098",
      "tradeType": 3
    }, {
      "amount": 10000.0,
      "tradTime": "2018-08-08T09:49:31",
      "tradeOrderNo": "220201808082000000018",
      "tradeType": 1
    }],
  "currentpage": 1,
  "pagecode": 10,
  "maxresult": 20
}

// 账号问题
const accountProblem = [
  {
    "title": "登录收不到验证码怎么办？",
    "id": 6,
    "detail": {
      "title": "登录收不到验证码怎么办？",
      "content": "1.请确认短信是否被手机拦截、过滤\n2.请确认手机是否能够正常接收短信（信号问题、欠费、停机等）\n3.用户访问量过大的情况下，短信收发过程中可能会存在延迟，请耐心等待"
    }
  }, {
    "title": "登录密码忘记了如何找回？",
    "id": 3,
    "detail": {
      "title": "登录密码忘记了如何找回？",
      "content": "点击头像--【设置】--【修改登录密码】--点击【忘记密码】，按提示操作。"
    }
  }, {
    "title": "怎样更换绑定的银行卡？",
    "id": 5,
    "detail": {
      "title": "怎样更换绑定的银行卡？",
      "content": "暂不支持自助换卡。如需换卡，请联系币下客服。"
    }
  }, {
    "title": "怎样修改手机号码？",
    "id": 2,
    "detail": {
      "title": "怎样修改手机号码？",
      "content": "暂不支持修改手机号码。"
    }
  }, {
    "title": "为什么账号被冻结？",
    "id": 1,
    "detail": {
      "title": "为什么账号被冻结？",
      "content": "为保证用户账户安全，系统会不定期对账户安全监测，如监测到账户安全系数较低，系统会冻结您的账户。"
    }
  }, {
    "title": "登录账号支持注销吗？",
    "id": 18,
    "detail": {
      "title": "登录账号支持注销吗？",
      "content": "暂不支持注销登录账号。"
    }
  }
]

// 审批问题
const approvalProblem = [
  {
    "title": "审核流程是什么？",
    "id": 7,
    "detail": {
      "title": "审核流程是什么？",
      "content": "一般情况下，在您提交借款申请后：\n第一步：风控系统初审（5分钟内）\n第二步：信审人员致电核实身份（24小时内）\n第三步：终审并短信通知审核结果（5分钟内）"
    }
  }, {
    "title": "借款人需要提供什么资料？",
    "id": 21,
    "detail": {
      "title": "借款人需要提供什么资料？",
      "content": "以币下分期合作方（融360）借款认证材料信息为准，请进入融360查看。"
    }
  }, {
    "title": "审核时会不会给我打电话？",
    "id": 9,
    "detail": {
      "title": "审核时会不会给我打电话？",
      "content": "审核环节，会视情况给本人或者公司打电话。\n\n注：审核环节不收取任何形式的费用。任何要求转账才能完成审核的来电，都是诈骗电话，切勿相信。一旦遇到诈骗，请与币下分期官方客服联系，电话：4008301065。"
    }
  }, {
    "title": "提交审核后多久出结果？",
    "id": 8,
    "detail": {
      "title": "提交审核后多久出结果？",
      "content": "当日提交，当日审核，请留意短信通知。"
    }
  }, {
    "title": "为什么审核被拒绝？",
    "id": 10,
    "detail": {
      "title": "为什么审核被拒绝？",
      "content": "审核结果是由系统对您的资质进行综合评定给出的，审核被拒绝的原因是资质不符合产品要求。"
    }
  }]

// 放款问题
const lendingProblem = [
  {
    "title": "绑卡支持哪些银行？",
    "id": 11,
    "detail": {
      "title": "绑卡支持哪些银行？",
      "content": "目前支持的绑卡银行有：中国银行、工商银行、建设银行、兴业银行、中信银行、平安银行、浦发银行、广发银行、光大银行"
    }
  }, {
    "title": "审核通过后什么时候放款？",
    "id": 12,
    "detail": {
      "title": "审核通过后什么时候放款？",
      "content": "一般情况下，14:00前审核通过后当天放款，14:00后的次日12:00放款。"
    }
  }, {
    "title": "还款方式有哪些？",
    "id": 13,
    "detail": {
      "title": "还款方式有哪些？",
      "content": "1.代扣还款\n币下分期默认在每期还款日当天从您的借记卡扣除当期的应还金额\n\n2.主动还款\n登录APP进行手动还款\n\n3.对公还款\n将还款金额汇入以下账号内，并备注姓名+身份证后4位\n户名：淮南市汇民小额贷款有限责任公司\n开户行：工商银行深圳市工业区支行\n账号：9558 8540 0000 2627 664\n注：对公还款非实时到账，建议在工作日16点前完成汇款\n\n4.暂不支持微信、支付宝还款。"
    }
  }, {
    "title": "网银转账还款何时到账？",
    "id": 19,
    "detail": {
      "title": "网银转账还款何时到账？",
      "content": "网银转账还款非实时到账\n16点前转账成功的当日结算；\n16点后转账成功的，以财务结算时间为准。\n请留意短信通知。有问题请联系币下客服。"
    }
  }, {
    "title": "为什么会还款失败？",
    "id": 14,
    "detail": {
      "title": "为什么会还款失败？",
      "content": "常见的还款失败原因如下：\n1.银行卡信息变更、销户、冻结、挂失\n2.银行系统正在维护，暂时关闭了代扣通道\n3.银行卡金额不足"
    }
  }, {
    "title": "逾期了怎么办？费用怎么算？",
    "id": 16,
    "detail": {
      "title": "逾期了怎么办？费用怎么算？",
      "content": "还款日24点前未成功还清当期总欠款金额，视为逾期，并按日收取逾期管理费。\n\n逾期管理费=剩余应还本金×0.098%*逾期天数；"
    }
  }, {
    "title": "可以提前全额还款吗？费用怎么算？",
    "id": 15,
    "detail": {
      "title": "可以提前全额还款吗？费用怎么算？",
      "content": "可以提前全额还款，月借款费率2.95%\r\n一次性全部结清，只收当期息费，其他期次息费全部减免；\r\n如果只剩最后一期的情况下，一次清提前还清，不减免息费。"
    }
  }]

// 产品介绍
const productIntroduce = [
  {
    "title": "币下分期产品介绍",
    "id": 17,
    "detail": {
      "title": "币下分期产品介绍",
      "content": "产品名称：币下分期\n产品类别：现金借款产品\n业务模式：先授信再借款，循环额度，随借随还\n借款金额：1000~10000（最高由用户的额度决定）\n借款期限：3、6、9、12个月\n计息方式：按月等额本息还款，即每月偿还固定金额的月供\n还款方式：自动扣款、主动还款、对公还款\n额度恢复：整笔借款结清后恢复额度\n借款费率：年化利率：35.4% ；月利率：2.95%\n逾期费率：日费率：0.098%"
    }
  }]

// 用户反馈
const userFeedBack = [
  {
    "id": 67,
    "userId": 61,
    "realName": "童书文",
    "mobile": "17886521983",
    "content": "工地呢sjjdidikdkdk",
    "reply": '感谢反馈，我们将继续优化功能，为您带来更好的体验，感谢您的支持',
    "state": 0,
    "operatorId": null,
    "operator": null,
    "createTime": "2018-08-27T20:39:07",
    "updateTime": "2018-08-27T20:39:07",
    "feedbackImgs": [
      {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542175379691&di=73f04d1280a3c6103cbce95cf442dac7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa1ec08fa513d2697859a76665efbb2fb4316d844.jpg'},
      {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542175444576&di=95338fb1962fd14487a18a7cc6ff05e1&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4a36acaf2edda3cc0975750d0ae93901213f920e.jpg'},
      {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542175471083&di=e37a19084f4c4003a657b32ae5591ee6&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161024%2F4a685feaae2a497b85561c1f433b1a3f_th.jpeg'},
      {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542175495762&di=b91560fd530b443590c8024b6c9a8ef6&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1f178a82b9014a906ffc1386a2773912b21beecf.jpg'},
    ],
    "feedbackContent": "工地呢sjjdidikdkdk",
    "revert": false,
  },
  {
    "id": 67,
    "userId": 61,
    "realName": "童书文",
    "mobile": "17886521983",
    "content": "工地呢sjjdidikdkdk",
    "reply": '感谢反馈，我们将继续优化功能，为您带来更好的体验，感谢您的支持',
    "state": 0,
    "operatorId": null,
    "operator": null,
    "createTime": "2018-08-27T20:39:07",
    "updateTime": "2018-08-27T20:39:07",
    "feedbackImgs": [
      {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542184343057&di=b6ada4aa27afa853fff970b5739d8a66&imgtype=0&src=http%3A%2F%2Fimg18.3lian.com%2Fd%2Ffile%2F201710%2F27%2F6239258bb41622006605f967200b806b.jpg'},
      {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542184373334&di=8c3437d9c90aaafd2b34fc531c4ec422&imgtype=0&src=http%3A%2F%2F03.imgmini.eastday.com%2Fmobile%2F20171105%2F20171105231159_5e49acce6d64838d18d2ea5d79b751d0_1.jpeg'},
    ],
    "feedbackContent": "一天了，为什么还不理我啊，到底行不行啊，再不理我就要逾期了，逾期的钱不会算我的吧？赶紧给个答复啊，快快快！还有能不能把我的借款额度提高一点，我可是你们的忠实用户啊，提高为什么还不理我啊，到底行不行啊，再不理我就要逾期了，逾期的钱不会算我的吧？赶紧给个答复啊，快快快！还有能不能把我的借款额度提高一点。",
    "revert": true
  }
]

// app配置信息
const appConfig = {
  "code": "0000",
  "message": "请求成功",
  "body": {
    "repayInfoH5": "http://www.baidu.com", // 网银转账H5展示页
    "serviceContract": "http://www.baidu.com", // 服务协议地址H5地址
    "howToGetCode": "http://www.baidu.com", // 如何获得邀请码H5地址
    "toLoan": "http://www.baidu.com", // 去借款H5地址
  }
}


const photoListdata = {
  group_name: "壁纸",
  image: {
    filename: "IMG_0388.JPG",
    height: 1137,
    isStored: true,
    playableDuration: 0,
    uri: "assets-library://asset/asset.JPG?id=B3435448-CC2B-42D4-A6D8-C78A9CB4F4AD&ext=JPG",
    width: 640
  },
  location: {},
  timestamp: 1457505939,
  type: "ALAssetTypePhoto",
}

const camera = {
  data: "/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAA",
  fileSize: 219016,
  height: 3264,
  isVertical: true,
  uri: "file:///var/mobile/Containers/Data/Application/3CB3306A-8BF6-4F4B-8788-F829CAF3D54E/tmp/184E2255-E6F8-45AC-AC01-DC76B71268B1.jpg",
  width: 2448,
}

const pickData = {
  data: "/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAA",
  fileName: "IMG_0388.JPG",
  fileSize: 441410,
  height: 1137,
  isVertical: true,
  origURL: "assets-library://asset/asset.JPG?id=B3435448-CC2B-42D4-A6D8-C78A9CB4F4AD&ext=JPG",
  timestamp: "2016-03-09T06:45:39Z",
  uri: "file:///var/mobile/Containers/Data/Application/BCC22F47-E039-4995-BF83-0D2CC96F1371/tmp/332A420F-869A-43DC-B199-8AED2ED6BE81.jpg",
  width: 640
}

export {
  userInfo,
  registerInfo,
  bankInfo,
  loanCardInfo,
  myLoan,
  loanDetail,
  moreDetail,
  tradeRecode,
  userFeedBack,
  appConfig,
  accountProblem,
  approvalProblem,
  lendingProblem,
  productIntroduce
}