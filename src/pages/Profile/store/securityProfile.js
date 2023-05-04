import { profileApiService, userApiService } from '@/common/services/apiServices'

export default {
  namespaced: true,
  state: {
    login: '',
    password: ''
  },
  getters: {},
  mutations: {
    setLogin (state, { login }) {
      state.login = login
    },
    setPassword (state, { password }) {
      state.password = password
    }
  },
  actions: {
    changePassword (store, { password, oldPassword }) {
      return userApiService.changePassword(password, oldPassword)
    },
    setNewPasswordByToken (store, { password, token }) {
      return userApiService.setNewPasswordByToken(password, token)
    },
    async createLocalAccount (store, { login, password }) {
      return profileApiService.createLocalAccount(login, password)
    }
  }
}
