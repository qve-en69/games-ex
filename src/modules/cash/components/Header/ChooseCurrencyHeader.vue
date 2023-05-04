<template>
  <div class="mb-3">
    <button
      @click="changeCashPage({ pageCash: CASH_PAGES.PAY_CASH })"
      class="dm-back-icon"
    >
      <i style="cursor: pointer; font-size: 1.25rem;" class="pi pi-chevron-left"></i>
    </button>
    <div class="header">
      {{ $t('cash.currency.choise_currency') }}
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'

export default {
  name: 'ChoiseCurrencyHeader',
  data () {
    return {
      CASH_PAGES,
      checked: false
    }
  },
  methods: {
    ...mapActions('cash', ['changeCashPage']),
    ...mapMutations('cash', ['setActiveCurrency'])
  },
  computed: {
    ...mapGetters('cash', ['isActiveCurrency']),
    activeCurrencyModel: {
      get () {
        return this.isActiveCurrency
      },
      set (activeCurrency) {
        this.setActiveCurrency({ activeCurrency })
      }
    }
  }
}
</script>
<style scoped lang="scss">
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
  color: white;
  font-size: 1.14rem;
  margin-left: 3rem;
}

.switch-btn {
  margin-top: 11px;
}

div {
  display: flex;
  justify-content: space-between;
  /*margin-top: 0.21rem;*/
  margin-bottom: -0.27rem;
}

@media (max-width: 413px) {
  .switch-btn {
    top: 14px;
  }
}

::v-deep .p-inputswitch-slider {
  background-color: #666666 !important;
  height: 9px;
  width: 32px;
}

::v-deep .p-inputswitch.p-focus .p-inputswitch-slider {
  box-shadow: none;
}

::v-deep .p-inputswitch .p-inputswitch-slider:before {
  background-color: #B9B9B9;
  height: 13px;
  width: 22px;
  border-radius: 15px;
  left: -5px;
  margin-top: -7px;
  top: 5px;
}

::v-deep .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider:before {
  background-color: #9EFF00;
}

::v-deep .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
  background-color: #206F28 !important;
}
</style>
