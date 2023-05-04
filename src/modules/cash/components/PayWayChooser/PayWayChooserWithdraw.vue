<template>
  <PayWayChooser :payWayList="payWayList" :onChoosePayWay="onChoosePayWay"/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'
import PayWayChooser from './PayWayChooser'

export default {
  name: 'PayWayChooserWithdraw',
  components: {
    PayWayChooser
  },
  computed: {
    ...mapGetters('cash/withdraw', {
      payWayList: 'getPayWayListWithdraw'
    })
  },
  methods: {
    ...mapActions('cash', {
      changeCashPage: 'changeCashPage'
    }),
    ...mapActions('cash/withdraw', {
      changePayWayWithdraw: 'changePayWayWithdraw'
    }),
    onChoosePayWay (payWay) {
      this.changePayWayWithdraw({ payWayId: payWay.id })
      this.changeCashPage({ pageCash: CASH_PAGES.PAY_CASH })
    }
  }
}
</script>

<style scoped>

</style>
