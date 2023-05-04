<template>
  <div>
    <PayCashHeader v-if="pageCash === CASH_PAGES.PAY_CASH"/>
    <ChooseCurrencyHeader
      v-else-if="[CASH_PAGES.DEPOSIT_CURRENCY_CHOOSE, CASH_PAGES.WITHDRAW_CURRENCY_CHOOSE, CASH_PAGES.CONVERTED_FROM_CURRENCY_CHOOSE, CASH_PAGES.INVEST_CURRENCY_CHOOSE, CASH_PAGES.CONVERTED_TO_CURRENCY_CHOOSE].includes(pageCash)"/>
    <ChoosePaySystemHeader
      v-else-if="[CASH_PAGES.DEPOSIT_PAY_WAY_CHOOSE, CASH_PAGES.WITHDRAW_PAY_WAY_CHOOSE].includes(pageCash)"/>
    <TransactionHeader v-else-if="pageCash === CASH_PAGES.TRANSACTION_HISTORY"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'
import {
  ChoosePaySystemHeader,
  PayCashHeader,
  ChooseCurrencyHeader,
  TransactionHeader
} from '@/modules/cash/components/Header'

export default {
  name: 'ModalHeader',
  components: {
    PayCashHeader,
    ChoosePaySystemHeader,
    ChooseCurrencyHeader,
    TransactionHeader
  },
  data () {
    return {
      CASH_PAGES
    }
  },
  computed: {
    ...mapGetters('cash', { pageCash: 'getPageCash' })
  }
}
</script>
<style scoped>
</style>
