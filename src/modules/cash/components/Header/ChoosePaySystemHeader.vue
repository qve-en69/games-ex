<template>
  <div class="title">
    <button
      @click="changeCashPage({ pageCash: CASH_PAGES.PAY_CASH })"
      class="dm-back-icon"
    >
      <i style="cursor: pointer; font-size: 1.25rem " class="pi pi-chevron-left"></i>
    </button>
    <div class="text-white">    {{ $t('cash.currency.choise_pay_system')}}
    </div>
    <div class=" title-right
    ">
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'

export default {
  name: 'ChoosePaySystemHeader',
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
<style scoped lang="scss">

.dm-back-icon {
  position: absolute;
  background: transparent;
  color: #969696;
  top: 17px;
  left: 10px;
}

.text-white {
  font-weight: bold;
  font-size: 1.14rem;
  margin-left: 2.2rem;
}

div {
  display: flex;
  justify-content: space-between;
  margin-bottom: -2px;
}
</style>
