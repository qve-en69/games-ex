import { errorService } from '@/common/services/errorService'
import { cashApiService } from '@/common/services/apiServices'

import { INVEST_PAGES } from '@/modules/cash/constants'

// получение данных по вкладам пользователя и подставление их
// реализовать эндпоинты
// создать окошко с ошибкой и вывести его в случае проблемы
export default {
  namespaced: true,
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,
    currency: null,
    currencyValue: '0',
    investPage: INVEST_PAGES.SEND
  },
  getters: {
    getFetchStatus (state) {
      return state.fetchStatus
    },
    getErrorStatus (state) {
      return state.errorStatus
    },
    getCurrency (state) {
      console.log('state.currency.id = ', state.currency.id)
      return state.currency
    },
    getCurrencyValue (state) {
      return state.currencyValue
    },
    getInvestPage (state) {
      return state.investPage
    }
  },
  mutations: {
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setErrorStatus (state, { errorStatus }) {
      state.errorStatus = errorStatus
    },
    setCurrency (state, { currency }) {
      state.currency = currency
    },
    setCurrencyValue (state, { currencyValue }) {
      state.currencyValue = currencyValue
    },
    setInvestPage (state, { investPage }) {
      state.investPage = investPage
    }
  },
  actions: {
    initInvest (store) {
      try {
        if (store.rootState.currency.currencyList.length === 0) {
          throw new Error(`Currency not found.`)
        }
        store.dispatch('changeCurrency', { currencyId: store.rootState.currency.currencyList[0].id })
      } catch (e) {
        errorService.catch(`Error initInvest. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    },
    changeCurrency (store, { currencyId }) {
      try {
        const currency = store.rootState.currency.currencyList.find(currency => currency.id === currencyId)
        if (!currency) {
          throw new Error(`Currency not found with id ${currencyId}`)
        }
        store.commit('setCurrency', { currency })
      } catch (e) {
        errorService.catch(`Error changeCurrency invest. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    changeInvestPage (store, { investPage }) {
      try {
        if (![INVEST_PAGES.SEND, INVEST_PAGES.RECEIVE].includes(investPage)) {
          throw new Error(`Page not found '${investPage}'`)
        }
        store.commit('setInvestPage', { investPage })
      } catch (e) {
        errorService.catch(`Error changeInvestPage invest. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    changeValuePercent (store, { percent }) {
      try {
        const { currency } = store.state
        const currencyValue = Math.floor(store.rootGetters['user/getBalanceByCurrency'](currency.id) * (percent / 100))
        store.commit('setCurrencyValue', { currencyValue })
      } catch (e) {
        errorService.catch(`Error changeValuePercent invest. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    send (store) {
      try {
        const { currency } = store.state
        if (currency) {
          cashApiService.send()
        }
      } catch (e) {
        errorService.catch(`Error send invest. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    receive (store) {
      try {
        const { currency, currencyValue } = store.state
        if (currency && currencyValue) {
          cashApiService.receive()
        }
      } catch (e) {
        errorService.catch(`Error receive invest. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    }
  }
}
