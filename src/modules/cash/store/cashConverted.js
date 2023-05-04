import { errorService } from '@/common/services/errorService'
import { cashApiService, currencyApiService } from '@/common/services/apiServices'
import Vue from 'vue'
// создать поля для ввода и сделать их заполняемыми
// прикрутить курсы валют
// реализовать эндпоинты
// создать окошко с ошибкой и вывести его в случае проблемы
export default {
  namespaced: true,
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,
    currencyFrom: null,
    currencyFromValue: 0,
    currencyTo: null,

    currencyToValue: 0,
    fetchStatusCurrencyToValue: 'FETCHED'
  },
  getters: {
    getFetchStatus (state) {
      return state.fetchStatus
    },
    getErrorStatus (state) {
      return state.errorStatus
    },
    getCurrencyFrom (state) {
      return state.currencyFrom
    },
    getCurrencyFromValue (state) {
      return state.currencyFromValue
    },
    getCurrencyTo (state) {
      return state.currencyTo
    },
    getCurrencyToValue (state) {
      return state.currencyToValue
    },
    getFetchStatusCurrencyToValue (state) {
      return state.fetchStatusCurrencyToValue
    }
  },
  mutations: {
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setErrorStatus (state, { errorStatus }) {
      state.errorStatus = errorStatus
    },
    setCurrencyFrom (state, { currencyFrom }) {
      state.currencyFrom = currencyFrom
    },
    setCurrencyTo (state, { currencyTo }) {
      state.currencyTo = currencyTo
    },
    setCurrencyFromValue (state, { currencyFromValue }) {
      state.currencyFromValue = currencyFromValue
    },
    setCurrencyToValue (state, { currencyToValue }) {
      state.currencyToValue = currencyToValue
    },
    setFetchStatusCurrencyToValue (state, { fetchStatusCurrencyToValue }) {
      state.fetchStatusCurrencyToValue = fetchStatusCurrencyToValue
    }
  },
  actions: {
    initConverted (store) {
      try {
        if (store.rootState.currency.currencyList.length < 2) {
          throw new Error(`Currency length less 2.`)
        }

        if (!store.rootState.cash.activeCurrencyId) {
          if (!store.state.currencyFrom) {
            if (store.rootState.user.user.currentAccount.currencyId) {
              store.commit('setCurrencyFrom', { currencyFrom: store.rootState.user.user.currentAccount.currency })
            } else {
              store.commit('setCurrencyFrom', { currencyFrom: store.rootState.currency.currencyList[0] })
            }
          }
        } else {
          store.commit('setCurrencyFrom', { currencyFrom: store.rootState.currency.currencyList
            .find(cur => cur.id === store.rootState.cash.activeCurrencyId)
          })
        }
        store.commit('setCurrencyTo', { currencyTo: store.rootState.currency.currencyList[0] })
      } catch (e) {
        errorService.catch(`Error init converted. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    },
    changeCurrencyFrom (store, { currencyId }) {
      try {
        const currencyFrom = store.rootState.currency.currencyList.find(currency => currency.id === currencyId)
        if (!currencyFrom) {
          throw new Error(`Currency not found with id ${currencyId}`)
        }
        store.commit('setCurrencyFrom', { currencyFrom })
        store.dispatch('changeCurrencyFromValue', { currencyFromValue: 0 })
        store.dispatch('cash/setActiveCurrencyId', { currencyId }, { root: true })
      } catch (e) {
        errorService.catch(`Error changeCurrencyFrom converted. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    changeCurrencyTo (store, { currencyId }) {
      try {
        const currencyTo = store.rootState.currency.currencyList.find(currency => currency.id === currencyId)
        if (!currencyTo) {
          throw new Error(`Currency not found with id ${currencyId}`)
        }
        store.commit('setCurrencyTo', { currencyTo })
        store.dispatch('changeCurrencyToValue')
      } catch (e) {
        errorService.catch(`Error changeCurrencyTo converted. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    changeCurrencyFromValue (store, { currencyFromValue }) {
      store.commit('setCurrencyFromValue', { currencyFromValue })
      store.dispatch('changeCurrencyToValue')
    },
    async swapCurrency (store) {
      const { currencyTo, currencyFrom } = store.state
      await store.dispatch('changeCurrencyFrom', { currencyId: currencyTo.id })
      await store.dispatch('changeCurrencyTo', { currencyId: currencyFrom.id })
    },
    changeConvertedAmountPercent (store, { percent }) {
      const currency = store.state.currencyFrom
      const amount = Math.round(store.rootGetters['user/getBalanceByCurrency'](currency.id) * percent / 100 * Math.pow(10, 8)) / Math.pow(10, 8)
      store.commit('setCurrencyFromValue', { currencyFromValue: amount })
      store.dispatch('changeCurrencyToValue', { currencyFromValue: amount })
    },
    async changeCurrencyToValue (store) {
      try {
        store.commit('setFetchStatusCurrencyToValue', { fetchStatusCurrencyToValue: 'FETCH' })
        let currencyToValue = 0
        const { currencyFrom, currencyTo, currencyFromValue } = store.state
        if (currencyFrom && currencyTo && currencyFromValue > 0) {
          currencyToValue = await currencyApiService.convert(currencyFrom.id, currencyTo.id, currencyFromValue, true)
        }
        store.commit('setCurrencyToValue', { currencyToValue })
      } catch (e) {
        store.commit('setCurrencyToValue', { currencyToValue: 0 })
        errorService.catch(`Error changeCurrencyToValue currency. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
      store.commit('setFetchStatusCurrencyToValue', { fetchStatusCurrencyToValue: 'FETCHED' })
    },
    async convertedCurrency (store) {
      try {
        const { currencyFrom, currencyTo, currencyFromValue } = store.state
        if (currencyFrom && currencyTo && currencyFromValue > 0) {
          store.dispatch('changeCurrencyFromValue', { currencyFromValue: 0 })
          await cashApiService.convert(currencyFrom.id, currencyTo.id, Number(currencyFromValue))
          Vue.prototype.$noty.success(`success convert`)
        }
      } catch (e) {
        console.log(e.response.data)
        errorService.catch(`Error converted currency. ${e.response.data.message}`)
        Vue.prototype.$noty.error(`Error converted currency. ${e.response.data.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    }
  }
}
