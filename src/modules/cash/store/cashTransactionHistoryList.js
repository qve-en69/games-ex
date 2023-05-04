import { errorService } from '@/common/services/errorService'
import { cashApiService } from '@/common/services/apiServices'

import { TRANSACTION_HISTORY_PAGINATION_SIZES } from '@/modules/cash/constants'

export const createTransactionHistoryList = (codeId) => {
  return {
    namespaced: true,
    state: {
      fetchStatus: 'FETCH',
      errorStatus: false,
      currency: null,
      paginationSize: TRANSACTION_HISTORY_PAGINATION_SIZES[0],
      paginationPage: 1,
      transactions: []
    },
    getters: {
      getFetchStatus (state) {
        return state.fetchStatus
      },
      getErrorStatus (state) {
        return state.errorStatus
      },
      getTransactions (state) {
        return state.transactions
      },
      getPaginationPage (state) {
        return state.paginationPage
      },
      getPaginationSize (state) {
        return state.paginationSize
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
      setTransactions (state, { transactions }) {
        state.transactions = transactions
      },
      setPaginationPage (state, { paginationPage }) {
        state.paginationPage = paginationPage
      },
      setPaginationSize (state, { paginationSize }) {
        state.paginationSize = paginationSize
      },
      setCurrency (state, { currency }) {
        state.currency = currency
      }
    },
    actions: {
      async initTransactionHistory (store) {
        store.commit('setFetchStatus', { fetchStatus: 'FETCH' })
        try {
          const { paginationSize, paginationPage } = store.state
          let { currency } = store.state

          console.log('active', store.rootState.cash.activeCurrencyId)
          if (store.rootState.cash.activeCurrencyId && !currency) {
            currency = store.rootState.currency.currencyList.find(c => c.id === store.rootState.cash.activeCurrencyId)
          } else if (!currency) {
            currency = store.rootState.currency.currencyList[0]
          }
          if (currency) {
            console.log('select', currency.id)
          }
          store.commit('cash/transactionHistory/depositTransaction/setCurrency', { currency }, { root: true })
          store.commit('cash/transactionHistory/withdrawTransaction/setCurrency', { currency }, { root: true })

          store.dispatch('cash/setActiveCurrencyId', { currencyId: currency.id }, { root: true })

          const transactions = await cashApiService.getTransactionsHistory(codeId, paginationSize, paginationSize * (paginationPage - 1), currency.id)

          store.commit('setTransactions', { transactions })
        } catch (e) {
          errorService.catch(`Error initTransactions. ${e.message}`)
          store.commit('setErrorStatus', { errorStatus: true })
        }
        store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
      },
      changePaginationSize (store, { paginationSize }) {
        const { fetchStatus } = store.state

        if (fetchStatus === 'FETCHED') {
          store.commit('setPaginationSize', { paginationSize })
          store.commit('setPaginationPage', { paginationPage: 1 })
          store.dispatch('initTransactionHistory')
        }
      },
      beforePaginationPage (store) {
        const { fetchStatus, paginationPage } = store.state

        if (fetchStatus === 'FETCHED' && paginationPage > 1) {
          store.commit('setPaginationPage', { paginationPage: paginationPage - 1 })
          store.dispatch('initTransactionHistory')
        }
      },
      nextPaginationPage (store) {
        const { fetchStatus, transactions, paginationPage, paginationSize } = store.state

        if (fetchStatus === 'FETCHED' && transactions.length === paginationSize) {
          store.commit('setPaginationPage', { paginationPage: paginationPage + 1 })
          store.dispatch('initTransactionHistory')
        }
      },
      changeCurrency (store, { currency }) {
        const { fetchStatus } = store.state

        if (fetchStatus === 'FETCHED') {
          store.commit('setCurrency', { currency })
          store.dispatch('initTransactionHistory')
        }
      }
    }
  }
}
