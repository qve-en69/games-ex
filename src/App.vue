<template>
  <div class="wrapper slide-out">
    <modals-container/>
    <DPreloaderPage v-if="!connected || !init"/>
    <DMainPage v-if="init"/>
    <DFooterMenuMobile/>
  </div>
</template>

<script>
import './assets/css/reset.css'
import './assets/css/bootstrap.min.css'
import 'vuejs-noty/dist/vuejs-noty.css'
import './assets/css/main.css'
import './assets/css/flags.css'
import './assets/css/animate.css'
import 'primeflex/primeflex.min.css'
import 'primevue/resources/primevue.css'
import './assets/css/theme.css'
import './assets/css/custom.scss'

import { mapActions, mapGetters } from 'vuex'
import DFooterMenuMobile from '@/common/components/FooterMenuMobile/FooterMenuMobile'
import DMainPage from '@/common/components/MainPage/MainPage'
import { DPreloaderPage } from '@/common/components'

export default {
  components: {
    DPreloaderPage,
    DFooterMenuMobile,
    DMainPage
  },
  computed: {
    ...mapGetters('app', {
      init: 'getInit',
      connected: 'getConnected'
    })
  },
  methods: {
    ...mapActions('app', {
      initApp: 'initApp'
    })
  },
  created: function () {
    this.initApp()
  }
}
</script>

<style scoped lang="scss">
@import 'assets/css/app';

</style>
