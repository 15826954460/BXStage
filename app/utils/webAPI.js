import axios from 'axios'
import qs from 'qs' // 用来序列化请求参数

/** 域名的配置 */
const initConfig = {
  develop: true, // true 开发环境 false 正式环境
  development: 'https://cnodejs.org/api/v1/', // 开发环境主域名
  test: ''// 测试环境主域名
}

/**  获取域名地址 */
function getDomain() {
  const {develop, development, test} = initConfig
  let _domain = develop ? development : test
  return _domain
}

const webApiConfig = {
  requestInstanceStack: new Map(), // 请球拦截
  responseInstanceStack: new Map(), // 响应拦截
  /**  自定义一个 axios 实例 */
  instance: axios.create({
    baseURL: getDomain(), // 配置基础路径
    timeout: 10000, // 默认请求超时时间
    // 设置请求头格式：用自定义的覆盖 axios 自带的 'Content-Type': 'application/json; charset=UTF-8'
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': '' // 权限鉴别字段默认为空
    },
    withCredentials: false, // 表示跨域请求时是否需要使用凭证
    // 使用自定义的验签头
    auth: {
      username: '',
      password: ''
    },
    responseType: 'json', // 默认的
  }),
  /**  post 传参序列化  (添加请求拦截器) */
  setRequestInterceptors: (interfaceKey) => {
    let _requestInstance = webApiConfig.instance.interceptors.request.use((config) => {
      /**  针对部分特殊的请求进行参数 序列化 */
      if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        if (config.data) {
          // 参数序列化
          config.data = qs.stringify(config.data)
        }
      }
      // 如果有权限鉴别，就加上请求头的taken字段 token 初始话获取本地生成的，实际项目中建议使用 第三方库生成
      if (window.localStorage.token) {
        config.headers.Authorization = localStorage.token
      }
      return config
    }, (error) => {
      return Promise.reject(error)
    })
    /** 将请求拦截放到拦截栈中 */
    webApiConfig.requestInstanceStack.set(interfaceKey, _requestInstance)
  },
  /**  移除请求拦截器 */
  removeRequestInterceptors: (interfaceKey) => {
    webApiConfig.instance.interceptors.request.eject(webApiConfig.requestInstanceStack.get(interfaceKey))
  },
  setResponseInterceptors: (interfaceKey) => {
    /** 返回状态判断  (添加响应拦截器) */
    let _responseInstance = webApiConfig.instance.interceptors.response.use((res) => {
      // 针对响应返回的数据进行操作
      if (res.status === 404) return
      if (res.status === 200 || res.status === 304 || res.status === 400) {
        let data = res.data
        /**
         * 这里可以进行一些数据渲染前的处理，比如后台的超时重定向 具体的 code(返回码) 根据实际开发后台定义的接口来定
         * 案列为 510
         */
        if (data.success && data.success === 510) {
          /* 这里可以进行页面的超时重定向 */
        } else {
          return res
        }
      }
    }, (error) => {
      return Promise.reject(error)
    })
    /** 将响应拦截放到拦截栈中 */
    webApiConfig.responseInstanceStack.set(interfaceKey, _responseInstance)
  },
  /**  移除响应拦截器 */
  removeResponseInterceptors: (interfaceKey) => {
    webApiConfig.instance.interceptors.response.eject(webApiConfig.responseInstanceStack.get(interfaceKey))
  }
}

/** 启用拦截 */
function startInterceptors(interfaceKey) {
  webApiConfig.setRequestInterceptors(interfaceKey)
  webApiConfig.setResponseInterceptors(interfaceKey)
}

/** 删除拦截和改拦截实例 */
function deleteInterceptors(interfaceKey) {
  webApiConfig.requestInstanceStack.delete(interfaceKey)
  webApiConfig.removeRequestInterceptors(interfaceKey)
  webApiConfig.removeResponseInterceptors(interfaceKey)
}

/** 关于取消请求的相关方法 */
function cancelFetch(cancel, interfaceKey) {
  /** 保存取消请求的实例对象 */
  let _cancelObj = {}
  if (!_cancelObj.cancel) {
    _cancelObj = {
      key: interfaceKey,
      cancel: null
    }
  }
  /** 取消请求,并重置数据 */
  else if (_cancelObj.cancel) {
    _cancelObj.cancel()
    _cancelObj = {}
  }
  return _cancelObj
}

// 对 get 请求简易封装
export function getFetch(url, params, interfaceKey, cancel) {
  !cancel && startInterceptors(interfaceKey) // 开启请求拦截
  if (cancelFetch(cancel, interfaceKey).cancel) return
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    webApiConfig.instance({
      method: 'get',
      url: url,
      params: params,
      cancelToken: cancel && webApiConfig.instance.CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        cancelFetch(cancel, interfaceKey).cancel = c;
      }) || '',
    }).then(response => {
      // response 数据机构 {data: {}, status: 200, statusText: 'OK', headers:{}, config: {} }
      deleteInterceptors(interfaceKey)// 删除拦截器以及其实例
      if (response.status === 200) {
        return resolve(response.data)
      } else {
        /** 这里的数据处理请根据实际业务来操作 */
      }
    }).catch((error) => {
      /** 这里可以配置一些关于操作失败的提示信息：比如获取数据失败等等*/
      reject(`请求接口出错，错误信息为 -----【${error}】---------`)
    })
  })
}

// 对 post 请求简易封装
export function postFetch(url, params, interfaceKey, cancel) {
  !cancel && startInterceptors(interfaceKey) // 开启请求拦截
  /** 针对可以取消请求的操作做一些响应的处理 */
  if (cancelFetch(cancel, interfaceKey).cancel) return
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    webApiConfig.instance({
      method: 'post',
      url: url,
      data: params,
      cancelToken: cancel && webApiConfig.instance.CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        cancelFetch(cancel, interfaceKey).cancel = c;
      }) || '',
    }).then(response => {
      deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
      if (response.status === 200) {
        return resolve(response.data)
      } else {
        /** 这里的数据处理请根据实际业务来操作 */
      }
    }).catch(error => {
      /** 这里可以配置一些关于操作失败的提示信息：比如获取数据失败等等
       * reject 方法的参数会传到外部的catch方法，建议关于提示信息统一封装在这里处理，不要放到业务层
       * */
      reject(`请求接口出错，错误信息为 -----【${error}】---------`)
    })
  })
}

/**
 *  针对每个页面的接口进行 请求 api 的配置
 *  cancel 参数用来配置改接口是否支持 取消请求操作(其实不是真的取消了接口的请求，而是将then转为了cache操作)
 * */
export const WebAPI = {
  // 主题页面
  topics: {
    topic: (url, params, cancel = false,) => {
      return getFetch(url, params, 'topic', cancel)
    }
  }
}