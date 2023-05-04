<template>
  <div class="footer">
    <Dropdown class="dropdown-currency" :value="currency" :options="currencyList"
              optionLabel="name" @change="onChangeCurrency"  placeholder="Все валюты">
      <template #value="currency">
        <div style="display: flex;" v-if="currency.value.id">
          <img style="height: 18px; margin: 3px 7px 0 3px"
               :src="currency.value.src" />
          <div>{{currency.value.id}}</div>
        </div>
      </template>
      <template #option="currency">
        <div style="display: flex" class="country-item">
          <img style="height: 18px; margin: 3px 7px 0 3px"
               :src="currency.option.src" />
          <div>{{currency.option.id}}</div>
        </div>
      </template>
    </Dropdown>
    <div class="footer-right">
      <Dropdown class="dropdown-paginationSize"
                v-model="paginationSizeState"
                :options="TRANSACTION_HISTORY_PAGINATION_SIZES.map(size => ({ label: size, value: size }))"
                optionLabel="label"
      >
      </Dropdown>
      <InputText class="paginationPage" :value="paginationPage" disabled="true" />
      <Button class="beforePaginationPage" @click="beforePaginationPage">
        <i class="pi pi-chevron-left"/>
      </Button>
      <Button class="nextPaginationPage" @click="nextPaginationPage">
        <i class="pi pi-chevron-right"/>
      </Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { TRANSACTION_HISTORY_PAGINATION_SIZES } from '@/modules/cash/constants'

export default {
  name: 'TransactionHistoryFooter',
  props: ['paginationSize', 'paginationPage', 'currency', 'setPaginationSize', 'beforePaginationPage', 'nextPaginationPage', 'changeCurrency'],
  data () {
    return {
      TRANSACTION_HISTORY_PAGINATION_SIZES
    }
  },
  computed: {
    ...mapGetters('currency', { currencyList: 'getCurrencyList' }),
    paginationSizeState: {
      get () {
        return { label: this.paginationSize, value: this.paginationSize }
      },
      set (paginationSize) {
        this.setPaginationSize({ paginationSize: paginationSize.value })
      }
    }
  },
  methods: {
    onChangeCurrency (e) {
      this.changeCurrency({ currency: e.value })
    }
  }
}
</script>

<style scoped lang="scss">

::v-deep .p-dropdown-label {
  margin-left: 5px;
  overflow: visible;
  flex: 0.8 1 auto;
}

::v-deep .p-dropdown-trigger{
  transform: rotate(-90deg);
  width: 1rem;
  margin-left: 7px;
}

::v-deep .p-dropdown-panel {
  border-radius: 20px;
  background-color: #12151D;
  border: none;
  box-shadow: none;
  padding: 5px;
}

::v-deep .p-dropdown-items {
  padding: 0.3rem 0;
}

::v-deep .p-dropdown-items-wrapper {
  border-radius: 15px;
}

::v-deep .p-dropdown-items-wrapper::-webkit-scrollbar {
  width: 3px;
}

::v-deep .p-dropdown-items-wrapper::-webkit-scrollbar-thumb {
  background-color: #585858;
}

::v-deep .p-dropdown-item:hover {
  box-sizing: border-box;
  background: rgba(196, 196, 196, 0.03);
  border-color: #9360FF !important;
  border-radius: 15px;
  transition: all .2s linear;
}

::v-deep .p-dropdown-item.p-highlight {
  background: rgba(177,157,247,.16);
  border-color: #9360FF !important;
  border-radius: 15px;
}

::v-deep .p-dropdown-item {
  padding: 6px !important;
  font-weight: 400;
  box-sizing: border-box;
  border: 1px solid transparent !important;
  border-radius: 15px !important;
}

::v-deep .p-dropdown-item:not(:hover) {
  transition: all .2s linear;
}

.fa-coins {
  margin: 3px 7px 0 3px;
  font-size: 20px;
  color: #D7C257;
}
.footer {
  background-color: #292C38;
  border-radius: 0 0 15px 15px;
  margin: 0px -16px -30px -16px;
  padding: 20px 0 20px 10px;
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;

}

.dropdown-currency {
  display: flex;
  border: 1px solid transparent;
  background-color: #1C1F29;
  width: 165px;
  height: 40px;
  border-radius: 25px;
  align-items: center;
  margin-right: 10px;
}

.currency-block {
  display: flex;
}

.dropdown-paginationSize {
  border: 1px solid transparent;
  background-color: #1C1F29;
  width: 82px;
  height: 40px;
  border-radius: 25px;
  align-items: center;
  margin-right: 10px;
}

.p-disabled, .p-component:disabled {
  opacity: 1;
}

.paginationPage {
  background-color: #1C1F29;
  width: 60px;
  height: 40px;
  border-radius: 25px;
  align-items: center;
  text-align: center;
  opacity: 1;
  border: none;
  color: #fff;
  margin-right: 10px;
}

.beforePaginationPage {
  background-color: rgba(86, 89, 100, 0.4);
  border-radius: 25px 0 0 25px;
  width: 45px;
  height: 40px;
  border: 1px solid transparent;
  margin-right: 1px;
}
.beforePaginationPage:hover .pi {
  color: #fff;
  transition: all .1s linear;
}

.nextPaginationPage {
  background-color: rgba(86, 89, 100, 0.4);
  border-radius: 0 25px 25px 0;
  width: 45px;
  height: 40px;
  border: 1px solid transparent;
  margin-right: 10px;
}

.nextPaginationPage:hover .pi {
  color: #fff;
  transition: all .1s linear;
}

.pi {
  color: rgba(150, 150, 150, 0.4);
  transition: all .1s linear;
}

.pi-chevron-right {
  margin-left: -11px;
}

@media (max-width: 1200px) {
  .pi-chevron-right {
    margin-left: -5px;
  }
}

@media (max-width: 900px) {
  .dropdown-currency {
    width: 130px;
  }
  .paginationPage {
    width: 45px;
  }
}

@media (max-width: 825px) {
  .dropdown-currency {
    margin-right: 5px;
  }
  .paginationPage {
    margin-right: 5px;
  }
  .dropdown-paginationSize {
    margin-right: 5px;
  }
}

@media (max-width: 386px) {
  .nextPaginationPage {
    width: 35px;
  }
  .beforePaginationPage {
    width: 35px;
  }
  .pi-chevron-left {
    margin-left: -7px;
  }
}

</style>
