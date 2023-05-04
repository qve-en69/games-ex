import { errorService } from '@/common/services/errorService'
import { profileApiService } from '@/common/services/apiServices'
export default {
  namespaced: true,
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,
    email: '',
    emailVerified: false
  },
  getters: {
    getProfileEmail (state) {
      return state.email
    },
    getEmailVerified (state) {
      return state.emailVerified
    }
  },
  mutations: {
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setErrorStatus (state, { errorStatus }) {
      state.errorStatus = errorStatus
    },
    setProfileEmail (state, { email, emailVerified }) {
      state.email = email
      state.emailVerified = emailVerified
    }
  },
  actions: {
    initEmail (store) {
      if (store.rootState.user.user.profiles) {
        const findLocal = store.rootState.user.user.profiles.find(p => p.type.id === 'local')
        store.commit('setProfileEmail', { email: findLocal.email, emailVerified: findLocal.emailVerified })
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    },
    async confirmEmail (store, email) {
      store.commit('setProfileEmail', { email })
      try {
        const { email } = store.state
        await profileApiService.confirmEmail(email)
      } catch (e) {
        errorService.catch(`Error confirmEmail ${e.message}`)
        throw Error(e)
      }
    }
  }
}
