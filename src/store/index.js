import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import auth from './modules/auth'
import navigations from './modules/navigations'
import app from './modules/app'
import bonus from './modules/bonus'
import compoint from './modules/compoint'
import game from './modules/game'
import modals from './modules/modals'
import registration from './modules/registration'
import { CashStoreModule } from '@/modules/cash/store'
import { UserStatisticStoreModule } from '@/modules/userStatistic/store'
import { ProfileStoreModule } from '@/pages/Profile/store'
import CurrencyStoreModule from './modules/currency'
import { NotificationStoreModule } from '@/common/store'
import { ChatStoreModule } from '@/modules/chat/store'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['user.user.showBalanceInUsd', 'app.lang', 'chat.currentChannel']
    })
  ],
  state: {
    connect: false,
    message: null,
    version: '1.01'
  },
  mutations: {},
  actions: {},
  modules: {
    modals,
    bonus,
    app,
    user,
    navigations,
    compoint,
    game,
    auth,
    registration,
    cash: CashStoreModule,
    chat: ChatStoreModule,
    profile: ProfileStoreModule,
    currency: CurrencyStoreModule,
    notifications: NotificationStoreModule,
    userStatistic: UserStatisticStoreModule

  }
})
