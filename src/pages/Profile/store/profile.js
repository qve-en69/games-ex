import { errorService } from '@/common/services/errorService'
import { PROFILE_TABS } from '@/pages/Profile/constants'
import GeneralProfile from './generalProfile'
import SecurityProfile from './securityProfile'
import Email from './email'
import Session from './session'

export default {
  namespaced: true,
  modules: {
    generalProfile: GeneralProfile,
    securityProfile: SecurityProfile,
    email: Email,
    session: Session
  },
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,
    tabProfile: PROFILE_TABS.GENERAL
  },
  getters: {
    getFetchStatus (state) {
      return state.fetchStatus
    },
    getErrorStatus (state) {
      return state.errorStatus
    },
    getTabProfile (state) {
      return state.tabProfile
    }
  },
  mutations: {
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setErrorStatus (state, { errorStatus }) {
      state.errorStatus = errorStatus
    },
    setTabProfile (state, { tabProfile }) {
      state.tabProfile = tabProfile
    }
  },
  actions: {
    async initProfile (store) {
      try {
      //   // перенести в общую инициализацию
      //   // await store.dispatch('deposit/initDeposit')
      //   // await store.dispatch('withdraw/initWithdraw')
      //   // await store.dispatch('converted/initConverted')
      //   // await store.dispatch('invest/initInvest')
      // } catch (e) {
      //   store.commit('setErrorStatus', { errorStatus: true })
      //   errorService.catch(`Error initCash ${e.message}`)
      } catch (e) {
        store.commit('setErrorStatus', { errorStatus: true })
        errorService.catch(`Error initProfile ${e.message}`)
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    },
    changeTabProfile (store, tabProfile) {
      try {
        if (!Object.values(PROFILE_TABS).includes(tabProfile)) {
          throw new Error(`Page '${tabProfile}' not found`)
        }
        store.commit('setTabProfile', { tabProfile })
      } catch (e) {
        errorService.catch('Error changeTabProfile. ' + e.message)
      }
    }
  }
}
