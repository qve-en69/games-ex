import { cashApiService } from '@/common/services/apiServices'
import { errorService } from '@/common/services/errorService'

/* надо добавить возможно поля для ошибок дополнительные.
  Проверить -
  4. Изменение размера суммы (deposit / withdraw)
  5. Изменение реквизитов
  Доделать -
  2. Реакция на ввод
 */
export default {
  namespaced: true,
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,

    bonusDepositSelect: null,
    bonusDeposit: [], // список бонусов на депозит
    methodsDeposit: [], // список всех направлений пополнений(методы)
    availableCurrencyDeposit: [], // список доступных валют для пополнения
    depositCurrency: null, // выбранная валюта {}
    availablePayWaysDepositByCurrency: [], // отфильтрованный список направлений пополнения по валюте
    payWayDeposit: null, // выбранное направление второй
    depositAmount: 500, // хранится в рублях
    methodDeposit: null,

    fetchStatusDeposit: 'FETCHED',

    fetchStatusQRCode: 'FETCH',
    depositQRCode: '',
    depositAddress: '',
    depositComment: '',
    depositQRCodeText: ''
  },
  getters: {
    getSelectedBonus: state => state.bonusDepositSelect,
    getDepositBonuses: state => state.bonusDeposit,
    getFetchStatus (state) {
      return state.fetchStatus
    },
    getErrorStatus (state) {
      return state.errorStatus
    },
    getCurrencyListDeposit (state) { // список валют доступных для депозита
      return state.availableCurrencyDeposit
    },
    getCurrencyDeposit (state) { // выбранная валюта для депозита
      return state.depositCurrency
    },
    getPayWayListDeposit (state) { // список платежных систем для построения селекта
      return state.availablePayWaysDepositByCurrency
    },
    getPayWayDeposit (state) { // выбранная платежная система
      return state.payWayDeposit
    },
    getDepositAmount (state) { // отсюда берешь велечину депозита
      return state.depositAmount
    },
    getDepositQRCode (state) {
      return state.depositQRCode
    },
    getDepositQRCodeText (state) {
      return state.depositQRCodeText
    },
    getDepositAddress (state) {
      return state.depositAddress
    },
    getDepositComment (state) {
      return state.depositComment
    },
    getMethodDeposit (state) {
      return state.methodDeposit
    },
    getFetchStatusQRCode (state) {
      return state.fetchStatusQRCode
    },
    getFetchStatusDeposit (state) {
      return state.fetchStatusDeposit
    }
  },
  mutations: {
    setSelectBonus: (state, bonus) => {
      state.bonusDepositSelect = bonus
    },
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setErrorStatus (state, { errorStatus }) {
      state.errorStatus = errorStatus
    },
    setMethodsDeposit (state, { methodsDeposit }) {
      state.methodsDeposit = methodsDeposit
    },
    setAvailableCurrencyDeposit (state, { availableCurrencyDeposit }) {
      state.availableCurrencyDeposit = availableCurrencyDeposit
    },
    setDepositCurrency (state, { depositCurrency }) {
      state.depositCurrency = depositCurrency
    },
    setAvailablePayWaysDepositByCurrency (state, { availablePayWaysDepositByCurrency }) {
      state.availablePayWaysDepositByCurrency = availablePayWaysDepositByCurrency
    },
    setPayWayDeposit (state, { payWayDeposit }) {
      state.payWayDeposit = payWayDeposit
    },
    setDepositAmount (state, { depositAmount }) {
      state.depositAmount = depositAmount
    },
    setDepositQRCode (state, { depositQRCode }) {
      state.depositQRCode = depositQRCode
    },
    setDepositQRCodeText (state, { depositQRCodeText }) {
      state.depositQRCodeText = depositQRCodeText
    },
    setDepositComment (state, { depositComment }) {
      state.depositComment = depositComment
    },
    setDepositAddress (state, { depositAddress }) {
      state.depositAddress = depositAddress
    },
    setMethodDeposit (state, { methodDeposit }) {
      state.methodDeposit = methodDeposit
    },
    setBonusDeposit (state, { bonusDeposit }) {
      state.bonusDeposit = bonusDeposit
    },
    setFetchStatusQRCode (state, { fetchStatusQRCode }) {
      state.fetchStatusQRCode = fetchStatusQRCode
    },
    setFetchStatusDeposit (state, { fetchStatusDeposit }) {
      state.fetchStatusDeposit = fetchStatusDeposit
    }
  },
  actions: {
    async initDeposit (store) {
      try {
        const bonuses = await cashApiService.loadBonusDeposit()
        if (bonuses.length > 0) {
          store.commit('setBonusDeposit', { bonusDeposit: bonuses })
          store.commit('setSelectBonus', bonuses[0])
        }
        const methodsDeposit = await cashApiService.loadMethodsDeposit()
        store.commit('setMethodsDeposit', { methodsDeposit })
        const availableCurrencyListId = methodsDeposit.map(methodDeposit => methodDeposit.currencyId)
        const availableCurrencyDeposit = store.rootState.currency.currencyList.filter(currency => availableCurrencyListId.includes(currency.id))
        store.commit('setAvailableCurrencyDeposit', {
          availableCurrencyDeposit
        })

        if (!store.rootState.cash.activeCurrencyId) {
          if (availableCurrencyDeposit.length) {
            if (availableCurrencyDeposit.map(cur => cur.id).includes(store.rootState.user.user.currentAccount.currencyId)) {
              store.dispatch('changeDepositCurrency', { currencyId: store.rootState.user.user.currentAccount.currencyId })
            } else {
              store.dispatch('changeDepositCurrency', { currencyId: availableCurrencyDeposit[0].id })
            }
          }
        } else {
          if (availableCurrencyDeposit.map(cur => cur.id).includes(store.rootState.cash.activeCurrencyId)) {
            store.dispatch('changeDepositCurrency', { currencyId: store.rootState.cash.activeCurrencyId })
          } else {
            store.dispatch('changeDepositCurrency', { currencyId: availableCurrencyDeposit[0].id })
          }
        }
      } catch (e) {
        errorService.catch(`Error initDeposit. ${e.message}`)
        store.commit('setErrorStatus', { errorStatus: true })
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    },
    changeDepositCurrency (store, { currencyId }) {
      try {
        const depositCurrency = store.state.availableCurrencyDeposit.find(availableCurrency => availableCurrency.enabled && availableCurrency.id === currencyId)
        if (!depositCurrency) {
          throw new Error('Currency not found `' + currencyId + '`')
        }
        const availablePayWayIdsDepositByCurrency =
          store.state.methodsDeposit.filter(
            (methodDeposit) => methodDeposit.currencyId === currencyId
          ).map(methodDeposit => methodDeposit.wayId)
        const availablePayWaysDepositByCurrency = store.rootState.cash.payWaysList.filter(payWay => availablePayWayIdsDepositByCurrency.includes(payWay.id))
        if (availablePayWaysDepositByCurrency.length === 0) {
          throw new Error('Pay ways not available by currency `' + currencyId + '`')
        }
        store.commit('setDepositCurrency', { depositCurrency })
        store.commit('setAvailablePayWaysDepositByCurrency', { availablePayWaysDepositByCurrency })
        store.dispatch('changePayWayDeposit', { payWayId: availablePayWaysDepositByCurrency[0].id })
        store.dispatch('cash/setActiveCurrencyId', { currencyId }, { root: true })
      } catch (e) {
        errorService.catch('Error changeDepositCurrency' + e.message)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    changePayWayDeposit (store, { payWayId }) {
      try {
        store.commit('setErrorStatus', { errorStatus: false })

        const payWayDeposit =
          store.state.availablePayWaysDepositByCurrency.find(
            (payWay) => payWay.id === payWayId
          )
        if (!payWayDeposit) {
          throw new Error('Pay ways not found `' + payWayId + '`')
        }
        const methodDeposit = store.state.methodsDeposit.find(
          (methodDeposit) =>
            methodDeposit.wayId === payWayDeposit.id &&
            methodDeposit.currencyId === store.state.depositCurrency.id
        )
        if (!methodDeposit) {
          throw new Error(`Method not found by currency ${store.state.depositCurrency.id} and payWay '${payWayDeposit.name}'`)
        }

        store.commit('setMethodDeposit', { methodDeposit })
        store.commit('setPayWayDeposit', { payWayDeposit })

        // проверка на крипта или нет
        if (store.state.depositCurrency.typeId === 'crypto') {
          store.dispatch('getCryptoQRCode')
        }
      } catch (e) {
        errorService.catch('Error changePayWayDeposit ' + e.message)
        store.commit('setErrorStatus', { errorStatus: true })
      }
    },
    changeDepositAmount (store, { depositAmount }) {
      store.commit('setDepositAmount', { depositAmount })
    },
    async getCryptoQRCode (store) {
      try {
        store.commit('setFetchStatusQRCode', { fetchStatusQRCode: 'FETCH' })
        const { methodDeposit } = store.state
        if (!methodDeposit) {
          throw new Error('Method not found')
        }
        const result = await cashApiService.deposit(methodDeposit.id, Number(methodDeposit.minLimit))
        store.commit('setDepositAddress', { depositAddress: result.address })
        store.commit('setDepositQRCode', { depositQRCode: result.qrcode })
        store.commit('setDepositQRCodeText', { depositQRCodeText: result.text })
        store.commit('setDepositComment', { depositComment: result.comment })
      } catch (e) {
        errorService.catch('Error getCryptoQRCode ' + e.message)
        store.commit('setErrorStatus', { errorStatus: true })
      }
      store.commit('setFetchStatusQRCode', { fetchStatusQRCode: 'FETCHED' })
    },
    async deposit (store) {
      store.commit('setFetchStatusDeposit', { fetchStatusDeposit: 'FETCH' })
      store.commit('setErrorStatus', { errorStatus: false })
      try {
        const { methodDeposit, depositAmount } = store.state
        if (!methodDeposit) {
          throw new Error('Method not found')
        }
        const result = await cashApiService.deposit(methodDeposit.id, Number(depositAmount))
        window.open(result.address, '_blank')
      } catch (e) {
        errorService.catch('Error deposit ' + e.message)
        store.commit('setErrorStatus', { errorStatus: true })
      }
      store.commit('setFetchStatusDeposit', { fetchStatusDeposit: 'FETCHED' })
    }
  }
}
