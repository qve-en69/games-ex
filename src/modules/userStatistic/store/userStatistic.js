import { errorService } from '@/common/services/errorService'
import { userStatisticApiService } from '@/common/services/apiServices'
import { USER_STATISTIC_PAGES } from '@/modules/userStatistic/constants'

export default {
  namespaced: true,
  state: {
    statistic: {
      startDate: 0,
      betsAmount: 0,
      gamesPlayed: 0,
      betterRate: 0,
      betterWin: 0
    },
    info: {
      avatar: '',
      nick: 'named',
      userId: 23
    },
    pageUserStatistic: USER_STATISTIC_PAGES.USER_INFO, // переменная страницы
    fetchStatus: 'FETCH'
  },
  getters: {
    getStatistic: state => state.statistic,
    getPageUserStatistic: state => state.pageUserStatistic,
    getInfo: state => state.info,
    getFetchStatus: state => state.fetchStatus
  },
  mutations: {
    setStatistic (state, { statistic }) {
      state.statistic = statistic
    },
    setPageUserStatistic (state, { pageUserStatistic }) {
      state.pageUserStatistic = pageUserStatistic
    },
    setFetchStatus (state, { fetchStatus }) {
      state.fetchStatus = fetchStatus
    },
    setInfo (state, { info }) {
      state.info = info
    }
  },
  actions: {
    async initUserStatistic (store, { userId }) {
      try {
        store.commit('setFetchStatus', { fetchStatus: 'FETCH' })
        const { user, statistic } = await userStatisticApiService.getUserInfo(userId)
        store.commit('setStatistic', { statistic })
        store.commit('setInfo', { info: user })

        store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
      } catch (e) {
        errorService.catch('Error getUserStatistic. ' + e.message)
        store.commit('setFetchStatus', { fetchStatus: 'ERROR' })
      }
    },
    changeUserStatisticPage (store, { pageUserStatistic }) {
      // сменить страницу
      try {
        if (!Object.keys(USER_STATISTIC_PAGES).includes(pageUserStatistic)) {
          throw new Error(`Page '${pageUserStatistic}' not found`)
        }
        store.commit('setPageUserStatistic', { pageUserStatistic })
      } catch (e) {
        errorService.catch(`Error changeUserStatisticPage. ${e.message}`)
      }
    }
  }
}
