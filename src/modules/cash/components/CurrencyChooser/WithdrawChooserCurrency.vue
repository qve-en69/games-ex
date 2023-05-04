<template>
  <CashCurrencyChooser :currencyList="currencyList" :onChooseCurrency="onChooseCurrency"/>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'
import CashCurrencyChooser from '@/modules/cash/components/CurrencyChooser/CashCurrencyChooser'

export default {
  name: 'WithdrawChooseCurrency',
  components: { CashCurrencyChooser },
  computed: {
    ...mapGetters('cash/withdraw', {
      currencyList: 'getCurrencyListWithdraw'
    })
  },
  methods: {
    ...mapActions('cash', ['changeCashPage']),
    ...mapActions('cash/withdraw', ['changeWithdrawCurrency']),
    onChooseCurrency (currency) {
      this.changeWithdrawCurrency({ currencyId: currency.id })
      this.changeCashPage({ pageCash: CASH_PAGES.PAY_CASH })
    }
  }
}
</script>
