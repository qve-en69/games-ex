import Vue from 'vue'
import VueRouter from 'vue-router'
import { commonRouter } from '@/router/commonRouter'
import { bonusRouter } from '@/router/bonusRouter'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { // не опускать вниз
      name: 'Games',
      path: '/games/play/:gameId',
      component: () => import('@/games/PlayWindow')
    },
    ...commonRouter,
    ...bonusRouter
  ]
})

export default router
