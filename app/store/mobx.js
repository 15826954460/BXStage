import {observable, action} from "mobx";

export const UserImageList = observable({
  @observable data: {
    selectNumber: 0,
    selectImgList: [],
  },

  @action
  update(data) {
    UserImageList.data = {
      ...UserImageList.data,
      ...data
    }
  }
})