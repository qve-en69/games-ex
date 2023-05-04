<template>
  <div>
    <CashCurrencyChooser :currencyList="currencyList.filter(c => c.id !== getCurrencyFrom.id)" :onChooseCurrency="onChooseCurrency" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'
import CashCurrencyChooser from '@/modules/cash/components/CurrencyChooser/CashCurrencyChooser'

export default {
  name: 'DepositChooseCurrency',
  components: { CashCurrencyChooser },
  computed: {
    ...mapGetters('currency', {
      currencyList: 'getCurrencyList'
    }),
    ...mapGetters('cash/converted', ['getCurrencyFrom', 'getCurrencyTo'])
  },
  methods: {
    ...mapActions('cash', ['changeCashPage']),
    ...mapActions('cash/converted', ['changeCurrencyTo']),
    onChooseCurrency (currency) {
      this.changeCurrencyTo({ currencyId: currency.id })
      this.changeCashPage({ pageCash: CASH_PAGES.PAY_CASH })
    }
  }
}
</script>
