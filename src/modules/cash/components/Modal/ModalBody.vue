<template>
  <div class="modal-body-my">
    <PayCash @close="$emit('close')" v-if="pageCash === CASH_PAGES.PAY_CASH"/>
    <TransactionHistory v-else-if="pageCash === CASH_PAGES.TRANSACTION_HISTORY"/>

    <DepositChooserCurrency v-else-if="pageCash === CASH_PAGES.DEPOSIT_CURRENCY_CHOOSE"/>
    <WithdrawChooserCurrency v-else-if="pageCash === CASH_PAGES.WITHDRAW_CURRENCY_CHOOSE"/>
    <ConvertedFromChooserCurrency v-else-if="pageCash === CASH_PAGES.CONVERTED_FROM_CURRENCY_CHOOSE"/>
    <ConvertedToChooserCurrency v-else-if="pageCash === CASH_PAGES.CONVERTED_TO_CURRENCY_CHOOSE"/>
    <InvestChooserCurrency v-else-if="pageCash === CASH_PAGES.INVEST_CURRENCY_CHOOSE"/>

    <PayWayChooserWithdraw v-else-if="pageCash === CASH_PAGES.WITHDRAW_PAY_WAY_CHOOSE"/>
    <PayWayChooserDeposit v-else-if="pageCash === CASH_PAGES.DEPOSIT_PAY_WAY_CHOOSE"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'
import {
  DepositChooserCurrency,
  WithdrawChooserCurrency,
  ConvertedFromChooserCurrency,
  ConvertedToChooserCurrency,
  InvestChooserCurrency
} from '@/modules/cash/components/CurrencyChooser'
import { TransactionHistory } from '@/modules/cash/components/TransactionHistory'
import { PayCash } from '@/modules/cash/components/PayCash'
import {
  PayWayChooserDeposit,
  PayWayChooserWithdraw
} from '@/modules/cash/components/PayWayChooser'

export default {
  name: 'ModalBody',
  data () {
    return {
      CASH_PAGES
    }
  },
  components: {
    PayCash,
    TransactionHistory,
    DepositChooserCurrency,
    WithdrawChooserCurrency,
    PayWayChooserWithdraw,
    PayWayChooserDeposit,
    ConvertedFromChooserCurrency,
    ConvertedToChooserCurrency,
    InvestChooserCurrency
  },
  computed: {
    ...mapGetters('cash', { pageCash: 'getPageCash' })
  }
}
</script>
<style scoped>
.modal-body-my {
  height: 739px;
  width: 515px;

}

@media (max-width: 1200px) {
  .modal-body-my {
    height: 650px;
  }
}

@media (max-width: 576px) {
  .modal-body-my {
    width: 100%;
    height: 100%;
  }
}

</style>
