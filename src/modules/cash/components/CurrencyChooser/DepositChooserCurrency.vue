<template>
  <div>
    <CashCurrencyChooser :currencyList="currencyList" :onChooseCurrency="onChooseCurrency"/>
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
    ...mapGetters('cash/deposit', {
      currencyList: 'getCurrencyListDeposit'
    })
  },
  methods: {
    ...mapActions('cash', ['changeCashPage']),
    ...mapActions('cash/deposit', ['changeDepositCurrency']),
    onChooseCurrency (currency) {
      this.changeDepositCurrency({ currencyId: currency.id })
      this.changeCashPage({ pageCash: CASH_PAGES.PAY_CASH })
    }
  }
}
</script>
