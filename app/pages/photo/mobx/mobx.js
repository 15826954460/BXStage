import {observable, action} from "mobx";

class Data {
  @observable selectNumber = 0; // 选则图片的数量
  @action
  updateSelectNumber(num) {
    this.selectNumber += num
  }

  @action
  resetSelectNumber(num) {
    this.selectNumber = num || 0
  }

  @observable selectImgList = []; // 选择图片的列表
  @action
  updateSelectImgList(imgList) {
    this.selectImgList = imgList
  }

  @action
  resetSelectImgList() {
    this.selectImgList = []
  }

  @observable photoImgList = []; // 相册列表
  @action
  updatePhotoImgList(photoList) {
    this.photoImgList = photoList
  }

  @action
  resetPhotoImgList() {
    this.photoImgList = []
  }

  @observable preViewPhotoList = []; // 预览图片列表
  @action
  updatePreViewPhotoList(List) {
    this.preViewPhotoList = List
  }

  @action
  resetPreViewPhotoList() {
    this.preViewPhotoList = []
  }
}

export const ImageData = new Data()