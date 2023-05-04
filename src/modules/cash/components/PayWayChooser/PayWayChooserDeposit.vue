<template>
  <div>
    <PayWayChooser :payWayList="payWayList" :onChoosePayWay="onChoosePayWay"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'
import PayWayChooser from './PayWayChooser'

export default {
  name: 'PayWayChooserDeposit',
  components: {
    PayWayChooser
  },
  computed: {
    ...mapGetters('cash/deposit', {
      payWayList: 'getPayWayListDeposit'
    })
  },
  methods: {
    ...mapActions('cash', {
      changeCashPage: 'changeCashPage'
    }),
    ...mapActions('cash/deposit', {
      changePayWayDeposit: 'changePayWayDeposit'
    }),
    onChoosePayWay (payWay) {
      this.changePayWayDeposit({ payWayId: payWay.id })
      this.changeCashPage({ pageCash: CASH_PAGES.PAY_CASH })
    }
  }
}
</script>

<style scoped></style>
