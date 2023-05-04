import { currencyApiService } from '@/common/services/apiServices'
import { errorService } from '@/common/services/errorService'
import DacModal from '@/common/components/Menu/modals/DacModal'
import Vue from 'vue'
import { modalsNames } from '@/utils/constants'

export default {
  namespaced: true,
  state: {
    fetchStatus: 'FETCH',

    currencyList: [],
    currencyCourse: [],
    currencyListHelper: new Map()
  },
  getters: {
    getCurrencyList (state) {
      return state.currencyList
    },
    getCurrencyCourse (state) {
      return state.currencyCourse
    },
    getCurrencyCourseToDollar (state) {
      return (currencyId, value) => {
        const currency = state.currencyListHelper.get(currencyId)
        if (!value || !currency || !state.currencyCourse[currency.id]) return 0
        return (value * state.currencyCourse[currency.id]).toFixed(8)
      }
    },
    getCurrencyCourseByCode (state) {
      return code => Number(state.currencyCourse[code]).toFixed(2)
    },
    convert (state) {
      return (from, to, amount) => {
        const toCurrency = state.currencyList.find(cur => cur.id === to)
        const fromCurrency = state.currencyList.find(cur => cur.id === from)
        if (from === 'USD') {
          return Number(amount / state.currencyCourse[toCurrency.id]).toFixed(toCurrency.precisionUnit)
        } else if (to === 'USD') {
          return Number(amount * state.currencyCourse[fromCurrency.id]).toFixed(toCurrency.precisionUnit)
        } else {
          const inUSD = Number(amount / state.currencyCourse['USD']).toFixed(2)
          return Number(inUSD / state.currencyCourse['USD']).toFixed(toCurrency.precisionUnit)
        }
      }
    }
  },
  mutations: {
    setCurrencyList (state, { currencyList }) {
      state.currencyList = currencyList
    },
    setCurrencyListHelper (state, { currencyListHelper }) {
      state.currencyListHelper = currencyListHelper
    },
    setCurrencyCourse (state, { currencyCourse }) {
      state.currencyCourse = currencyCourse
    }
  },
  actions: {
    openDacModal () {
      Vue.prototype.$modal.show(
        DacModal,
        {},
        {
          name: modalsNames.DAC,
          clickToClose: false,
          adaptive: true,
          height: '100%',
          width: '100%'
        }
      )
    },
    async initCurrency (store) {
      try {
       function boolTimer () {

         let time
         const result = new Promise(resolve => {
           time = setTimeout(() => {
             resolve(true)
           },1000)
         })
         function clear () {
           clearTimeout(time)
         }
         return {result, clear}
       }


        const currencyList = await currencyApiService.getCurrencyList()
        const currencyCourse = await currencyApiService.getCurrencyCourse()

        const currencyListHelper = new Map()
        currencyList.forEach((currency) => {
          currencyListHelper.set(currency.id, currency)
        })

        store.commit('setCurrencyListHelper', { currencyListHelper })
        store.commit('setCurrencyList', { currencyList })
        store.commit('setCurrencyCourse', { currencyCourse })
      } catch (e) {
        errorService.catch(`Error initCurrency. ${e.message}`)
      }
    },
    convertToCurrency (store, data) {

    }
  }
}
