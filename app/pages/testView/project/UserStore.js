import {observable, computed, action} from 'mobx'

const AUTH_USER_KEY = '@authUser'

class UserStore {
  @observable userList = [
    {
      "id": 1,
      "name": "Alex"
    },
    {
      "id": 2,
      "name": "Amos"
    },
    {
      "id": 3,
      "name": "Holden"
    }
  ]
}

const store = new UserStore()
export default store