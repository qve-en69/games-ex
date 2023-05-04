import { cashApiService } from '@/common/services/apiServices'
import { errorService } from '@/common/services/errorService'

import { CASH_PAGES, PAY_CASH_TABS } from '@/modules/cash/constants'
import CashConverted from './cashConverted'
import CashInvest from './cashInvest'
import CashWithdraw from './cashWithdraw'
import CashDeposit from './cashDeposit'
import CashTransactionHistory from './cashTransactionHistory'

export default {
  namespaced: true,
  modules: {
    converted: CashConverted,
    invest: CashInvest,
    deposit: CashDeposit,
    withdraw: CashWithdraw,
    transactionHistory: CashTransactionHistory
  },
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,
    activeCurrency: true,
    waysList: [], // список всех* платежных систем
    pageCash: CASH_PAGES.PAY_CASH, // переменная страницы
    pagePayCash: PAY_CASH_TABS.DEPOSIT,
    activeCurrencyId: null
  },
  getters: {
    getActiveCurrencyId (state) {
      return state.activeCurrencyId
    },
    getFetchStatus (state) {
      return state.fetchStatus
    },
    getErrorStatus (state) {
      return state.errorStatus
    },
    isActiveCurrency (state) {
      return state.activeCurrency
    },
    getPayWaysList (state) {
      return state.payWaysList
    },

    getPageCash (state) {
      return state.pageCash
    },
    getPagePayCash (state) {
      return state.pagePayCash
    }
  },
  mutations: {
    setActiveCurrencyId (state, { currencyId }) {
      state.activeCurrencyId = currencyId
    },
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setErrorStatus (state, { errorStatus }) {
      state.errorStatus = errorStatus
    },
    setActiveCurrency (state, { activeCurrency }) {
      state.activeCurrency = activeCurrency
    },
    setPayWaysList (state, { payWaysList }) {
      state.payWaysList = payWaysList
    },
    setPageCash (state, { pageCash }) {
      state.pageCash = pageCash
    },
    setPagePayCash (state, { pagePayCash }) {
      state.pagePayCash = pagePayCash
    }
  },
  actions: {
    setActiveCurrencyId (store, { currencyId }) {
      store.commit('setActiveCurrencyId', { currencyId })
    },
    async initCash (store) {
      try {
        // перенести в общую инициализацию
        const payWaysList = await cashApiService.getPayWaysList()
        store.commit('setPayWaysList', { payWaysList })
        await store.dispatch('deposit/initDeposit')
        await store.dispatch('withdraw/initWithdraw')
        await store.dispatch('converted/initConverted')
        await store.dispatch('invest/initInvest')
      } catch (e) {
        store.commit('setErrorStatus', { errorStatus: true })
        errorService.catch(`Error initCash ${e.message}`)
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    },
    changeCashPage (store, { pageCash }) { // сменить страницу
      try {
        if (!Object.keys(CASH_PAGES).includes(pageCash)) {
          throw new Error(`Page '${pageCash}' not found`)
        }
        store.commit('setPageCash', { pageCash })
      } catch (e) {
        errorService.catch(`Error changeCashPage. ${e.message}`)
      }
    },
    changePayCashPage (store, { pagePayCash }) {
      try {
        store.dispatch('initCash')
        if (!Object.values(PAY_CASH_TABS).includes(pagePayCash)) {
          throw new Error(`Page '${pagePayCash}' not found`)
        }
        store.commit('setPagePayCash', { pagePayCash })
      } catch (e) {
        errorService.catch('Error changePayCashPage. ' + e.message)
      }
    }
  }
}
