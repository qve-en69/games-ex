<template>
  <div class="title">
    <div class="text-white" style="font-weight: bold; font-size: 1.14rem">
      {{ $t('cashbox.header') }}
    </div>
    <div @click="changeCashPage({ pageCash: CASH_PAGES.TRANSACTION_HISTORY })" class="title-right">
      <i class="fas fa-file-invoice"></i> {{ $t('cashbox.history_transact') }}
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'

export default {
  name: 'PayCashHeader',
  data () {
    return {
      CASH_PAGES
    }
  },
  methods: {
    ...mapActions('cash', ['changeCashPage'])
  }
}
</script>
<style lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  margin: 0.12rem 3.57rem 1.1rem 0.71rem;
  @media (max-width: 390px) {
    margin: 0.12rem 2.57rem 0 0.71rem;
  }
}
.title-right {
  font-weight: 300;
  cursor: pointer;
  margin-top: 2px;
}
</style>
