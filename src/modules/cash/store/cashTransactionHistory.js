import {
  PAYMENT_CODE,
  TRANSACTION_HISTORY_PAGES
} from '@/modules/cash/constants'
import { createTransactionHistoryList } from '@/modules/cash/store/cashTransactionHistoryList'

export default {
  namespaced: true,
  state: {
    pageTransactionHistory: TRANSACTION_HISTORY_PAGES.DEPOSIT
  },
  modules: {
    depositTransaction: createTransactionHistoryList(PAYMENT_CODE.DEPOSIT),
    withdrawTransaction: createTransactionHistoryList(PAYMENT_CODE.WITHDRAW)
  },
  getters: {
    getPageTransactionHistory (state) {
      return state.pageTransactionHistory
    }
  },
  mutations: {
    setPageTransactionHistory (state, { pageTransactionHistory }) {
      state.pageTransactionHistory = pageTransactionHistory
    }
  },
  actions: {
    changePageTransactionHistory (store, { pageTransactionHistory }) {
      if (Object.values(TRANSACTION_HISTORY_PAGES).includes(pageTransactionHistory)) {
        store.commit('setPageTransactionHistory', { pageTransactionHistory })
      }
    }
  }
}
