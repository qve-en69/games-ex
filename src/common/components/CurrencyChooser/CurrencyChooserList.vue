<template>
  <div class="main">
    <div class="find" v-if="currencyList.length > 0">
      <span class="p-input-icon-left">
        <i class="pi pi-search"/>
        <InputText class="find-input" type="text" v-model="searchValue"/>
      </span>
    </div>
    <div>
      <div v-if="currencyList.length === 0">
        <div class="row m-auto justify-content-center mt-4">
          <img alt=":(" src="data:image/png;base64, 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">
          <p class="col-12 text-center">{{ $t('main.table_data_null') }}</p>
        </div>
      </div>
      <div class="assetc-main" v-if="currencyList">
        <div
          class="assetc-block"
          v-for="currency in currencyList.filter(searchedCurrency =>
          searchedCurrency.id
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )"
          :key="currency.id"
          @click="onChooseCurrency(currency)"
        >
          <div class="assets-block__title">
            <div class="assets-block">
              <img alt="logo" class="assets-block__currency-icon" :src="currency.src"/>
              <div class="assets-block__currency-name">{{ currency.id }}</div>
            </div>
            <div v-if="checked" class="assetc-num">
              <div class="assetc-num1">${{
                  getCurrencyCourseToDollar(currency.id, getBalanceByCurrency(currency.id))
                }}
              </div>
              <div :class="showBalanceInUsd ? 'assetc-num2' : 'assetc-num1'" class="">{{
                  getBalanceByCurrency(currency.id)
                }}
              </div>
            </div>
            <div v-else class="assetc-num">
              <div class="assetc-num1 main-currency">{{ getBalanceByCurrency(currency.id) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider/>
      <div class="footer">
        <button
          id="dep"
          v-if="useCurrencyListAccounts"
          @click.prevent="onSetPage('PAGE_ACTIVE_CURRENCY')"
          class="button-pay"
        >
          <i class="pi pi-list list-icon"/>
          {{ $t('cash.currency.manage') }}
        </button>
        <div v-if="currentAccount.currency" class="content">
          <div class="btc-price">{{ currentAccount.currency.id }} {{ $t('cash.currency.price') }}<span>
          <span class="btc-price-dlr">$</span>
          {{ getCurrencyCourseToDollar(currentAccount.currency.id, 1) }}</span>
          </div>
          <div class="text-right switch">
            <p class="switch-item">
              {{ $t('cash.currency.check') }}
              <span>USD</span></p>
            <div class="switch-item">
              <InputSwitch class="switch-btn" v-model="checked"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['currencyList', 'onChooseCurrency', 'onSetPage', 'useCurrencyListAccounts'],
  name: 'DCurrencyChooserList',
  data () {
    return {
      searchValue: '',
      checked: false
    }
  },
  computed: {
    ...mapGetters('user', ['getBalanceByCurrency', 'accounts', 'currentAccount', 'showBalanceInUsd']),
    ...mapGetters('currency', ['getCurrencyCourseToDollar'])
  },
  methods: {
    ...mapMutations('user', ['setShowBalanceInUsd'])
  },
  watch: {
    checked (val) {
      this.setShowBalanceInUsd(val)
    }
  },
  mounted () {
    this.checked = this.showBalanceInUsd
  }
}
</script>
<style lang="scss" scoped>
.content {
  font-weight: 700;
  font-size: 0.75rem;
  text-align: right;
}

.assets-block {
  display: flex;
  width: 78%;
  border: 0;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 1rem;

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      align-items: center;
    }
  }

  &__currency-icon {
    height: 2rem;
    margin-right: 0.5rem;
  }

  &__currency-name {
    color: white;
  }
}

.btc-price {
  margin-right: 13px;

  span {
    color: white;
  }
}

.switch-item span {
  color: white;
}

.assetc-num {
  //width: 103px;
  margin-right: 20px;
  font-weight: 700;
  color: #fff;
  display: block;
}

.assetc-num1 {
  text-align: right;
}

.button-pay {
  padding: 2px 5px 2px 0;
  margin: 2px 0 0 15px;
  font-weight: 700;
  display: flex;
  width: 160px;
  height: 33px;
  justify-content: center;
  align-items: center;
  background-color: #7c4eff;
  color: #fff;
  text-transform: uppercase;
  border-radius: 15px;
  font-size: 12px;

  &:hover {
    background-color: #663eda;
  }
}

#dep {
  margin-right: auto;
}

.footer {
  display: flex;
  justify-content: flex-end;
}

.find {
  border-radius: 10px;
  text-align: center;
  margin: 5px 0;

  span {
    width: 100%;
  }
}

.switch {
  display: flex;
}

.switch-item {
  margin-right: 1rem;
}

.find-input {
  border-radius: 15px;
  width: 100%;
  height: 40px;
  background: #15181F;
  padding-left: 35px;
}

.assets-block__currency-name {
  margin-left: 5px;
}

.assetc-num2 {
  font-weight: 300;
  color: #969696;
  text-align: right;
}

.list-icon {
  margin: 0 10px 0 3px;
  color: #000000;
}

.assetc-main {
  height: calc(90vh - 207px);
  max-height: 610px;
  overflow: auto;
}

@media (max-width: 1200px) {
  .assetc-main {
    height: calc(90vh - 190px);
    max-height: 530px;
  }
}

@media (max-width: 991px) {
  .assetc-main {
    height: calc(90vh - 270px);
  }
}

@media (max-width: 576px) {
  .assetc-main {
    height: calc(100vh - 188px);
    overflow: auto;
    max-height: none;
  }
}

@media (max-width: 450px) {
  .footer {
    font-size: 13px;
  }
  .button-pay {
    width: 160px;
  }
}

@media (max-width: 420px) {
  .switch-item {
    margin-right: 1rem;
  }
  .switch {
    display: block;
  }
  .switch-item:last-child {
    margin-top: -10px;
    margin-right: 4px;
  }
}

@media (max-width: 413px) {
  .assetc-main {
    height: calc(100vh - 225px);
  }
}

@media (max-width: 375px) {
  .content {
    font-size: 11px;
  }
  .switch-item, .btc-price {
    margin-right: 0;
  }
  .switch-item:last-child {
    margin-top: -10px;
    margin-right: -10px;
  }
}

::-webkit-scrollbar {
  width: 0;
}

.assetc-block {
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 15px;
  transition: all .3s;
}

.assetc-block:hover {
  border-color: #ae99ec;
}

.assets-block__title {
  :hover {
    outline: none;
  }
}

.switch-btn {
  margin-top: 7px;
}

.btc-price-dlr {
  color: #9EFF00 !important;
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
