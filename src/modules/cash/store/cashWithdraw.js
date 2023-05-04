import { cashApiService } from '@/common/services/apiServices'
import { errorService } from '@/common/services/errorService'
import Vue from 'vue'

/* надо добавить возможно поля для ошибок дополнительные.
  Проверить -
  4. Изменение размера суммы (deposit / withdraw)
  5. Изменение реквизитов
  Доделать -
  1. Реакция на вывод
 */
export default {
  namespaced: true,
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,
    methodsWithdraw: [],
    availableCurrencyWithdraw: [], // отфильтрованный список валют по списке выводов
    withdrawCurrency: null, // выбранная валюта (предположительно хранить как объект, но это не точно)
    availablePayWaysWithdrawByCurrency: [], // список направлений списаний отфильтрованный по валюте
    payWayWithdraw: null, // выбранная платежная система (предположительно хранить как объект)
    withdrawAmount: 0,
    withdrawPurseNumber: '',

    methodWithdraw: null
  },
  getters: {
    getFetchStatus (state) {
      return state.fetchStatus
    },
    getErrorStatus (state) {
      return state.errorStatus
    },
    getCurrencyListWithdraw (state) {
      return state.availableCurrencyWithdraw
    },
    getCurrencyWithdraw (state) {
      return state.withdrawCurrency
    },
    getPayWayListWithdraw (state) {
      return state.availablePayWaysWithdrawByCurrency
    },
    getPayWayWithdraw (state) {
      return state.payWayWithdraw
    },
    getWithdrawAmount (state) {
      return state.withdrawAmount
    },
    getWithdrawPurseNumber (state) { // реквизиты для вывода
      return state.withdrawPurseNumber
    },
    getMethodWithdraw (state) {
      return state.methodWithdraw
    }
  },
  mutations: {
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setErrorStatus (state, { errorStatus }) {
      state.errorStatus = errorStatus
    },
    setMethodsWithdraw (state, { methodsWithdraw }) {
      state.methodsWithdraw = methodsWithdraw
    },
    setAvailableCurrencyWithdraw (state, { availableCurrencyWithdraw }) {
      state.availableCurrencyWithdraw = availableCurrencyWithdraw
    },
    setWithdrawCurrency (state, { withdrawCurrency }) {
      state.withdrawCurrency = withdrawCurrency
    },
    setAvailablePayWaysWithdrawByCurrency (state, { availablePayWaysWithdrawByCurrency }) {
      state.availablePayWaysWithdrawByCurrency = availablePayWaysWithdrawByCurrency
    },
    setPayWayWithdraw (state, { payWayWithdraw }) {
      state.payWayWithdraw = payWayWithdraw
    },
    setWithdrawAmount (state, { withdrawAmount }) {
      state.withdrawAmount = withdrawAmount
    },
    setWithdrawPurseNumber (state, { withdrawPurseNumber }) {
      state.withdrawPurseNumber = withdrawPurseNumber
    },
    setMethodWithdraw (state, { methodWithdraw }) {
      state.methodWithdraw = methodWithdraw
    }
  },
  actions: {
    async cancelWithdraw (store, { paymentId }) {
      cashApiService.cancelWithdraw(paymentId)
        .then(data => {
          Vue.prototype.$noty.success('success')
          store.dispatch('cash/transactionHistory/depositTransaction/initTransactionHistory', null, { root: true })
          store.dispatch('cash/transactionHistory/withdrawTransaction/initTransactionHistory', null, { root: true })
        })
        .catch(e => {
          Vue.prototype.$noty.error(e.response.data.message)
        })
    },
    async initWithdraw (store) {
      try {
        const methodsWithdraw = await cashApiService.loadMethodsWithdraw()
        store.commit('setMethodsWithdraw', { methodsWithdraw })
        const availableCurrencyListId = methodsWithdraw.map(methodWithdraw => methodWithdraw.currencyId)
        const availableCurrencyWithdraw = store.rootState.currency.currencyList.filter(
          (currency) => availableCurrencyListId.includes(currency.id)
        )
        store.commit('setAvailableCurrencyWithdraw', {
          availableCurrencyWithdraw
        })
        if (!store.rootState.cash.activeCurrencyId) {
          if (availableCurrencyWithdraw.length) {
            if (availableCurrencyWithdraw.map(cur => cur.id).includes(store.rootState.user.user.currentAccount.currencyId)) {
              store.dispatch('changeWithdrawCurrency', { currencyId: store.rootState.user.user.currentAccount.currencyId })
            } else {
              store.dispatch('changeWithdrawCurrency', { currencyId: availableCurrencyWithdraw[0].id })
            }
          }
        } else {
          if (availableCurrencyWithdraw.map(cur => cur.id).includes(store.rootState.cash.activeCurrencyId)) {
            store.dispatch('changeWithdrawCurrency', { currencyId: store.rootState.cash.activeCurrencyId })
          } else {
            store.dispatch('changeWithdrawCurrency', { currencyId: availableCurrencyWithdraw[0].id })
          }
        }
      } catch (e) {
        errorService.catch('Error loadPayWaysWithdraw ' + e.message)
        store.commit('setErrorStatus', { errorStatus: true })
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    },
    // метод меняет валюту для withdraw
    changeWithdrawCurrency (store, { currencyId }) {
      try {
        const withdrawCurrency = store.state.availableCurrencyWithdraw.find(
          (availableCurrency) => availableCurrency.id === currencyId
        )
        if (!withdrawCurrency) {
          throw new Error('Currency not found `' + currencyId + '`')
        }
        const availablePayWayIdsWithdrawByCurrency =
          store.state.methodsWithdraw.filter(
            (methodWithdraw) => methodWithdraw.currencyId === currencyId
          ).map(methodWithdraw => methodWithdraw.wayId)
        const availablePayWaysWithdrawByCurrency = store.rootState.cash.payWaysList.filter(payWay => availablePayWayIdsWithdrawByCurrency.includes(payWay.id))
        if (availablePayWaysWithdrawByCurrency.length === 0) {
          throw new Error('Pay ways not available by currency `' + currencyId + '`')
        }
        store.commit('setWithdrawCurrency', { withdrawCurrency })
        store.commit('setAvailablePayWaysWithdrawByCurrency', { availablePayWaysWithdrawByCurrency })
        store.dispatch('changePayWayWithdraw', { payWayId: availablePayWaysWithdrawByCurrency[0].id })
        store.dispatch('cash/setActiveCurrencyId', { currencyId }, { root: true })
      } catch (e) {
        errorService.catch('Error changeWithdrawCurrency ' + e.message)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    // метод меняет платежную систему для withdraw
    changePayWayWithdraw (store, { payWayId }) {
      try {
        const payWayWithdraw =
          store.state.availablePayWaysWithdrawByCurrency.find(
            (payWay) => payWay.id === payWayId
          )
        if (!payWayWithdraw) {
          throw new Error('Pay ways not found `' + payWayId + '`')
        }
        const methodWithdraw = store.state.methodsWithdraw.find(
          (methodWithdraw) =>
            methodWithdraw.wayId === payWayWithdraw.id &&
            methodWithdraw.currencyId === store.state.withdrawCurrency.id
        )
        if (!methodWithdraw) {
          throw new Error('Method not found')
        }

        store.commit('setMethodWithdraw', { methodWithdraw })
        store.commit('setPayWayWithdraw', { payWayWithdraw })
      } catch (e) {
        errorService.catch('Error changePayWayWithdraw ' + e.message)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    // метож меняет размер снятия
    changeWithdrawAmount (store, { withdrawAmount }) {
      store.commit('setWithdrawAmount', { withdrawAmount })
    },
    changeWithdrawAmountPercent (store, { withdrawAmountPercent }) {
      const currency = store.state.withdrawCurrency
      const withdrawAmount = Math.round(store.rootGetters['user/getBalanceByCurrency'](currency.id) * withdrawAmountPercent / 100 * Math.pow(10, 8)) / Math.pow(10, 8)
      store.commit('setWithdrawAmount', { withdrawAmount })
    },
    // метод меняет реквизиты снятия
    changeWithdrawPurseNumber (store, { withdrawPurseNumber }) {
      store.commit('setWithdrawPurseNumber', { withdrawPurseNumber })
    },

    async withdraw (store) {
      const { methodWithdraw, withdrawAmount, withdrawPurseNumber } = store.state
      return cashApiService.withdraw(methodWithdraw.id, Number(withdrawAmount), withdrawPurseNumber)
      // try {

      // if (!methodWithdraw) {
      //   throw new Error('Method not found')
      // }
      // eslint-disable-next-line no-unused-vars
      // const result = await cashApiService.withdraw(methodWithdraw.id, Number(withdrawAmount), withdrawPurseNumber)
      // return result
      // TODO результат несколько видов. Тут надо порешать, редирект или ещё чего
      // } catch (e) {
      //   errorService.catch('Error withdraw ' + e.message)
      //   // store.commit('setErrorStatus', { errorStatus: true })
      //   throw new Error(e.response.data)
      // }
    }
  }
}
