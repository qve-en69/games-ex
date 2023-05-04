import { errorService } from '@/common/services/errorService'
import { AIR_DROP_PAGES } from '@/modules/chat/modals/AirDropModal/constants'

export default {
  namespaced: true,

  state: {
    pageAirDrop: AIR_DROP_PAGES.AIR_DROP,
    airDropCurrency: null,
    airDropCurrencyList: []
  },
  getters: {
    getPageAirDrop: state => state.pageAirDrop,
    getAirDropCurrencyList: state => state.airDropCurrencyList,
    getAirDropCurrencyId: state => state.airDropCurrency.id,
    getAirDropCurrency: state => state.airDropCurrency
  },
  mutations: {
    setPageAirDrop (state, { pageAirDrop }) {
      state.pageAirDrop = pageAirDrop
    },
    setAirDropCurrency (state, { airDropCurrency }) {
      state.airDropCurrency = airDropCurrency
    },
    setAirDropCurrencyList (state, { airDropCurrencyList }) {
      state.airDropCurrencyList = airDropCurrencyList
    }
  },
  actions: {
    initAirDrop (store) {
      try {
        console.log('start initAir')
        console.log(store.rootState.user)
        const currencyAvailableIds = store.rootState.user.user.accounts.filter(item => item.balance > 0).map(item => item.currency.id)
        const airDropCurrencyList = store.rootState.currency.currencyList.filter(currency => currencyAvailableIds.includes(currency.id))
        store.commit('setAirDropCurrency', { airDropCurrency: airDropCurrencyList.length ? airDropCurrencyList[0] : null })
        store.commit('setAirDropCurrencyList', { airDropCurrencyList })
      } catch (e) {
        errorService.catch(`Error initAirDrop. ${e.message}`)
      }
    },
    changeAirDropPage (store, { pageAirDrop }) {
      try {
        if (!Object.keys(AIR_DROP_PAGES).includes(pageAirDrop)) {
          throw new Error(`Page '${pageAirDrop}' not found`)
        }
        store.commit('setPageAirDrop', { pageAirDrop })
      } catch (e) {
        errorService.catch(`Error changeAirDropPage. ${e.message}`)
      }
    },
    changeAirDropCurrency (store, { airDropCurrency }) {
      try {
        store.commit('setAirDropCurrency', { airDropCurrency })
      } catch (e) {
        errorService.catch(`Error changeAirDropCurrency. ${e.message}`)
      }
    }

  }
}
