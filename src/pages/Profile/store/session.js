import { errorService } from '@/common/services/errorService'
import { profileApiService } from '@/common/services/apiServices'

export default {
  namespaced: true,
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,
    currency: null,
    sessions: []
  },
  getters: {
    getFetchStatus (state) {
      return state.fetchStatus
    },
    getErrorStatus (state) {
      return state.errorStatus
    },
    getSessions (state) {
      return state.sessions
    },
    getCurrency (state) {
      return state.currency
    }
  },
  mutations: {
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setErrorStatus (state, { errorStatus }) {
      state.errorStatus = errorStatus
    },
    setSessions (state, { sessions }) {
      state.sessions = sessions
    },
    setCurrency (state, { currency }) {
      state.currency = currency
    }
  },
  actions: {
    async initSession (store) {
      store.commit('setFetchStatus', { fetchStatus: 'FETCH' })
      try {
        const { paginationSize, paginationPage } = store.state
        let { currency } = store.state

        if (!currency) {
          store.commit('setCurrency', {
            currency: store.rootState.currency.currencyList[0]
          })
          currency = store.rootState.currency.currencyList[0]
        }

        const sessions = await profileApiService.getAuthSessions(
          paginationSize,
          paginationSize * (paginationPage - 1),
          currency.id
        )

        store.commit('setSessions', { sessions })
      } catch (e) {
        errorService.catch(`Error initSessions. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    },
    changeCurrency (store, { currency }) {
      const { fetchStatus } = store.state

      if (fetchStatus === 'FETCHED') {
        store.commit('setCurrency', { currency })
        store.dispatch('initSession')
      }
    }
  }
}
