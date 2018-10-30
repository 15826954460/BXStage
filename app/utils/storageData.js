/** react 组建的引用 */
import React, {Component} from "react";
import {
  AsyncStorage
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

class StorageData extends Component {
  // setItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
  static saveUserInfo = async (data) => {
    await StorageData.mergeUserInfo('userInfo', data)
    await AsyncStorage.setItem('userInfo', JSON.stringify(data), (error) => {
      window.console.log(`请使用正确的数据格式，错误信息为${error}`)
    });
  }

  // static getItem(key: string, [callback]: ?(error: ?Error, result: ?string) => void)
  static getUserInfo = async (key) => {
    await AsyncStorage.getItem(key, (error, result) => {
      if (result) {
        return result
      } else {
        window.console.log(error)
      }
    });
  }

  // static mergeItem(key: string, value: string, [callback]: ?(error: ?Error) => void
  static mergeUserInfo = async (key, data) => {
    AsyncStorage.mergeItem(key, JSON.stringify(data), (error, result) => {
      if (result) {

      }
      else if (error) {
        window.console.log()
      }
    });
  }
}

export {StorageData}
