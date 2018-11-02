/** react 组建的引用 */
import React from "react";
import { AsyncStorage } from "react-native";

export default class StorageData {
  static saveData = async (key, data) => {
    await AsyncStorage.setItem(key, JSON.stringify(data), (error) => {
      if (error) {
        window.console.log(`储存信息---【${key}】----失败，失败信息为【${error}】!!!!!!`)
      }
      else {
        window.console.log(`储存信息---【${key}---】----成功！！！！`)
      }
    });
  }

  static getData = (key) => {
    return new Promise((resolve, reject) =>{
      AsyncStorage.getItem(key, (error, result) => {
        if (result) {
          return resolve(JSON.parse(result))
        } else {
          window.console.log(`获取信息---【${key}】----失败，失败信息为【${error}】!!!!!!`)
          return reject(error)
        }
      })
    });
  }

  static mergeData = async (key, data) => {
    await AsyncStorage.mergeItem(key, JSON.stringify(data), (error, result) => {
      if (!error) {
        window.console.log(`合并数据---【${key}】----成功！！！！`)
      }
      else if (error) {
        window.console.log(`合并数据---【${key}】----失败！！！！`)
      }
    });
  }

  static removeData = async (key) => {
    await AsyncStorage.removeItem(key, (error, result) => {
      if (result) {
        window.console.log(`删除数据---【${key}】----成功！！！！`)
      }
      else if (error) {
        window.console.log(`删除本地数据出现异常，异常信息为${error}！！！！！`)
      }
    });
  }
}
