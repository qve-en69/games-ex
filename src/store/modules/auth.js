import { authApiService } from '@/common/services/apiServices'
import { errorService } from '@/common/services/errorService'
import Auth2Fa from '@/modules/auth/components/auth/Auth2Fa'
import Vue from 'vue'
import { NOTIFICATION_LEVEL } from '@/common/constants'
import router from '@/router/router'
import { i18n } from '@/plugins/i18n/i18n'

export default {
  namespaced: true,
  state: {
    login: '',
    password: '',
    email: '',
    error: null
  },
  getters: {
    getLogin: (state) => state.login,
    getPassword: (state) => state.password,
    getEmail: (state) => state.email,
    getError (state) {
      return state.error
    }
  },
  mutations: {
    setLogin: (state, { login }) => { state.login = login },
    setPassword: (state, { password }) => { state.password = password },
    setEmail: (state, { email }) => { state.email = email },
    setAuth (state) {
      state.isAuth = true
    },
    setError (state, { message }) {
      state.error = message
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async showTfaModal (store, token) {
      Vue.prototype.$modal.show(Auth2Fa, token, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    },
    async loginByTfaToken (store, { token, code }) {
      try {
        await authApiService.loginByTfaToken({ token, code })
        store.dispatch('successLogin')
        router.push('/')
      } catch (e) {
        store.dispatch('notifications/addNotification', {
          level: NOTIFICATION_LEVEL.ERROR,
          text: i18n.t('errors.message_tf')
        }, { root: true })
      }
    },
    async initAuth (store) {
      await store.dispatch('user/me', null, { root: true })
    },
    async login (store, { login, password }) {
      try {
        store.commit('clearError')
        await authApiService.login(login, password)
        store.dispatch('successLogin')
        return true
      } catch (e) {
        if (e.response.status === 403) {
          store.dispatch('showTfaModal', { token: e.response.data.tfaToken })
        } else if (e.response) {
          store.commit('setError', { message: e.response.data.message })
        } else {
          errorService.catch(`Error login. ${e.message}`)
        }
        return false
      }
    },
    async telegramLogin (store, data) {
      return authApiService.oauthLogin(data, 'telegram')
        .then(() => {
          store.dispatch('successLogin')
        }).catch(e => {
          if (e.response.status === 403) {
            store.dispatch('showTfaModal', { token: e.response.data.tfaToken })
          }
        })
    },
    async googleLogin (store, { id, nick, email, token, avatar, connect }) {
      return authApiService.oauthLogin({ id, nick, email, token, avatar, connect }, 'google')
        .then(() => {
          store.dispatch('successLogin')
        }).catch(e => {
          if (e.response.status === 403) {
            store.dispatch('showTfaModal', { token: e.response.data.tfaToken })
          }
        })
    },

    async successLogin (store) {
      await store.dispatch('app/initAppAuth', null, { root: true })
      this.$socket.disconnect()
      this.$socket.connect()
      await store.dispatch('user/me', null, { root: true })
    },
    async logout (store) {
      return authApiService.logout().then(() => {
        store.dispatch('user/resetUser', null, { root: true })
        this.$socket.disconnect()
        this.$socket.connect()
      })
    }

  }
}
