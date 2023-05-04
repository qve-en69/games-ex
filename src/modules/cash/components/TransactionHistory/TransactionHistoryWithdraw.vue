<template>
  <div class="table-content">
    <DPreloader style="flex: 1 1 auto;" v-if="fetchStatus === 'FETCH'" />
    <TransactionHistoryTable style="flex: 1 1 auto;" v-else-if="fetchStatus === 'FETCHED'" :transactions="transactions" />
    <TransactionHistoryFooter
      :paginationSize="paginationSize"
      :paginationPage="paginationPage"
      :currency="currency"
      :setPaginationSize="changePaginationSize"
      :beforePaginationPage="beforePaginationPage"
      :nextPaginationPage="nextPaginationPage"
      :changeCurrency="changeCurrency"
      v-if="fetchStatus === 'FETCHED'"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import DPreloader from '@/common/components/Preloader/Preloader'

import TransactionHistoryTable from '@/modules/cash/components/TransactionHistory/TransactionHistoryTable'
import TransactionHistoryFooter from '@/modules/cash/components/TransactionHistory/TransactionHistoryFooter'

export default {
  name: 'TransactionHistoryWithdraw',
  components: { DPreloader, TransactionHistoryFooter, TransactionHistoryTable },
  computed: {
    ...mapGetters('cash/transactionHistory/withdrawTransaction', {
      fetchStatus: 'getFetchStatus',
      transactions: 'getTransactions',
      paginationSize: 'getPaginationSize',
      paginationPage: 'getPaginationPage',
      currency: 'getCurrency'
    })
  },
  methods: {
    ...mapActions('cash/transactionHistory/withdrawTransaction', [
      'changePaginationSize',
      'beforePaginationPage',
      'nextPaginationPage',
      'initTransactionHistory',
      'changeCurrency'
    ])
  },
  created () {
    this.initTransactionHistory()
  }
}
</script>

<style scoped lang="scss">
.table-content {
  display: flex;
  flex-flow: column;
  height: calc(100% - 82px);
}
@media (max-width: 576px){
  .table-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding-bottom: 94px;
  }
}
</style>
