<template>
  <div>
    <button
      @click="changeCashPage({ pageCash: CASH_PAGES.PAY_CASH })"
      class="dm-back-icon"
    >
      <i style="cursor: pointer; font-size: 1.25rem;" class="pi pi-chevron-left"></i>
    </button>
    <div class="header">
      {{ $t('cash.currency.transaction')}}
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'

export default {
  name: 'TransactionHeader',
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
<style scoped>
.dm-back-icon {
  position: absolute;
  top: 17px;
  left: 10px;
  background: transparent;
  color: #969696;
}

.header {
  font-weight: bold;
  margin-top: 0;
  font-size: 1.14rem;
  color: white;
  margin-left: 3rem;
}

div {
  display: flex;
  justify-content: space-between;
  /*margin-top: 0.21rem;*/
}
</style>
