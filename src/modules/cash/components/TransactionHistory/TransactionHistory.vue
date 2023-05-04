<template>
  <div style="height: 100%">
    <div class="modal-menu">
      <div class="content" style="height: 3rem; margin-bottom: 20px;">
        <div
          class="menu-tab "
          style="height: 3rem"
          :class="pageTransactionHistory === TRANSACTION_HISTORY_PAGES.DEPOSIT ? 'active' : ''"
          @click="changePageTransactionHistory({ pageTransactionHistory: TRANSACTION_HISTORY_PAGES.DEPOSIT })"
        >
          <div> {{ $t('cashbox.transaction.deposites') }}</div>
        </div>
        <div
          class="menu-tab"
          style="height: 3rem"
          :class="pageTransactionHistory === TRANSACTION_HISTORY_PAGES.WITHDRAW ? 'active' : ''"
          @click="changePageTransactionHistory({ pageTransactionHistory: TRANSACTION_HISTORY_PAGES.WITHDRAW })"
        >
          <div>{{ $t('cashbox.transaction.withdraws') }}</div>
        </div>
<!--        <div-->
<!--          class="menu-tab"-->
<!--          style="height: 3rem"-->
<!--          :class="pagePayCash === PAY_CASH_TABS.CONVERTED ? 'active' : ''"-->
<!--          @click="changePayCashPage({ pagePayCash: PAY_CASH_TABS.CONVERTED })"-->
<!--        >-->
<!--          <div>Детализация</div>-->
<!--        </div>-->
      </div>
    </div>
    <TransactionHistoryDeposit v-if="pageTransactionHistory === TRANSACTION_HISTORY_PAGES.DEPOSIT" />
    <TransactionHistoryWithdraw v-else-if="pageTransactionHistory === TRANSACTION_HISTORY_PAGES.WITHDRAW" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import { TRANSACTION_HISTORY_PAGES } from '@/modules/cash/constants'
import TransactionHistoryDeposit from '@/modules/cash/components/TransactionHistory/TransactionHistoryDeposit'
import TransactionHistoryWithdraw from '@/modules/cash/components/TransactionHistory/TransactionHistoryWithdraw'

export default {
  name: 'TransactionHistory',
  components: { TransactionHistoryWithdraw, TransactionHistoryDeposit },
  data () {
    return {
      TRANSACTION_HISTORY_PAGES
    }
  },
  computed: {
    ...mapGetters('cash/transactionHistory', { pageTransactionHistory: 'getPageTransactionHistory' })
  },
  methods: {
    ...mapActions('cash/transactionHistory', ['changePageTransactionHistory'])
  }
}
</script>
<style scoped lang="scss">
.modal-menu {
  overflow: visible;
  background-color: rgb(30, 32, 36);
  border-radius: 1.25rem;
  width: 50%;
  margin: 1rem auto 0;
  .content {
    display: flex;
    justify-content: space-between;
    .menu-tab {
      height: 3rem;
    }
  }
  @media (max-width: 1200px) {
    width: 225px;
  }
}
::v-deep .container {
  @media (max-width: 500px) {
    min-height: 0;
  }
}
.menu-tab {
  font-size: 1.14rem;
  font-weight: 300;
  padding: 6% 9%;
  text-align: center;
  cursor: pointer;
  line-height: 1;
  border-radius: 1.25rem;
}
.active {
  background: #7c4eff;
  color: rgb(255, 255, 255);
  height: 3rem;
}
.content {
  background: #292c38;
  display: flex;
  border-radius: 15px;
}

</style>
