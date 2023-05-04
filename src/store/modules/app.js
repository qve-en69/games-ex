import Vue from 'vue'
import { NOTIFICATION_LEVEL } from '@/common/constants'
export default {
  namespaced: true,
  state: {
    online: 0,
    lang: { name: 'English', 'code': 'en' },
    connected: false,
    init: false,
    serverTime: new Date().getTime(),
    langs: [
      { name: 'English', 'code': 'en' },
      { name: 'Türkçe', 'code': 'tr' },
      { name: 'Русский', 'code': 'ru' },
      { name: 'Український', 'code': 'ua' }
    ]

  },
  getters: {
    getConnected: state => state.connected,
    isLang: state => state.langs,
    online (state) {
      return state.online
    },
    serverTime (state) {
      return state.serverTime
    },
    getInit (state) {
      return state.init
    },
    getLangs (state) {
      return state.langs
    },
    getLang (state) {
      return state.lang
    }
  },
  mutations: {
    setConnected (state) {
      state.connected = true
    },
    online (state, data) {
      state.online = data
    },
    setInit (state, init) {
      state.init = init
    },
    socketConnect (state) {
      state.connected = true
    },
    socketDisconnect (state) {
      state.connected = false
    },
    setLanguage (state, data) {
      state.lang = { code: data }
    },
    setServerTime (state, data) {
      state.serverTime = data
    }
  },
  actions: {
    async initApp (store) {
      console.log('start init')
      await store.dispatch('auth/initAuth', null, { root: true })
      await store.dispatch('game/getGamesByLists', null, { root: true })
      await store.dispatch('currency/initCurrency', null, { root: true }) // check

      console.log(store.state.langs)
      if (store.rootGetters['user/auth']) {
        await store.dispatch('initAppAuth')
      }
      this.$i18n.locale = store.state.lang.code
      console.log('stop init')
      store.commit('setInit', true)
    },
    async initAppAuth (store) {
      await store.dispatch('currency/initCurrency', null, { root: true }) // check
    },
    async setLang (store, lang) {
      this.$i18n.locale = lang.code
      store.commit('setLanguage', lang.code)
      localStorage.setItem('lang', lang.code)
    },
    setConnected (store) {
      store.commit('setConnected')
    },
    serverTime (store, data) {
      store.commit('serverTime', data)
    },
    socket_connect (store) {
      store.commit('socketConnect')
    },
    socket_disconnect (store) {
      store.commit('socketDisconnect')
    },
    socket_refererinfo (store, [event, data]) {
      switch (data.type) {
        case 'response':
          localStorage.setItem('refId', data.id)
          break
        default:
          break
      }
    },
    socket_app (store, [event, data]) {
      switch (event) {
        case 'serverTime':
          store.commit('setServerTime', data)
          break
        case 'error':
          this.$noty.error(data)
          store.dispatch('notifications/addNotification', {
            level: NOTIFICATION_LEVEL.ERROR,
            text: data
          }, { root: true })
          break
        case 'online':
          store.commit('online', data)
          break
        case 'clearRef':
          localStorage.removeItem('refId')
          break
      }
    },
    openChatra (store, data) {
      Vue.prototype.$chatra('show')
      Vue.prototype.$chatra('openChat', true)
      const user = store.rootState.user.user
      console.info(store.rootState)
      console.info(user)
      if (user.id) {
        Vue.prototype.$chatra('setIntegrationData', {
          name: user.nick,
          email: user.profiles.find(p => p.email) || null,
          userID: user.id
        })
        Vue.prototype.$chatra('updateIntegrationData', {
          name: user.nick,
          email: user.profiles.find(p => p.email) || null,
          userID: user.id
        })
      } else {
        Vue.prototype.$chatra('updateIntegrationData', {
          name: 'GUEST'
        })
      }
    }
  }
}
