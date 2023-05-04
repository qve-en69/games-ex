<template>
  <div class="main">
    <div class="find">
      <span class="p-input-icon-left">
        <i class="pi pi-search"/>
        <InputText class="find-input" type="text" v-model="searchValue"/>
      </span>
    </div>
    <div class="assetc-main" v-if="props.currencyList">
      <div
        class="assetc-block"
        v-for="currency in props.currencyList.filter(searchedCurrency =>
          searchedCurrency.id
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )"
        :key="currency.id"
        @click="props.onChooseCurrency(currency)"
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
            <div :class="showBalanceInUsd ? 'assetc-num2' : 'assetc-num1'" class="">{{ getBalanceByCurrency(currency.id) }}</div>
          </div>
          <div v-else class="assetc-num">
            <div class="assetc-num1 main-currency">{{ getBalanceByCurrency(currency.id) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button
        id="dep"
        @click.prevent="$emit('setPage','PAGE_ACTIVE_CURRENCY')"
        class="button-pay"
      >
        <i class="pi pi-list list-icon"/>
        {{ $t('cash.currency.manage') }}
      </button>
      <div v-if="currentAccount.currency" class="content">
        <div class="btc-price">{{currentAccount.currency.id}} {{ $t('cash.currency.price')}} <span>
          <span class="btc-price-dlr">$</span>
          {{ getCurrencyCourseToDollar(currentAccount.currency.id, 1) }}</span>
        </div>
        <div class="text-right switch">
          <p class="switch-item">{{ $t('cash.currency.check')}}<span>USD</span></p>
          <div class="switch-item">
            <InputSwitch class="switch-btn" v-model="checked"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['props'],
  name: 'CommonTooltipCurrencyChooserList',
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
  font-size: 13px;
  text-align: right;
  margin-right: -10px;
  margin-top: 15px;
}
.main-currency {
  //margin-right: 1rem;
}
.assets-block {
  display: flex;
  width: 78%;
  border: 0;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 0rem 0.5rem;
  font-size: 14px;

  &__title {
    display: flex;
    align-items: center;
    height: 42px;
    justify-content: space-between;

    div {
      align-items: center;
    }
  }

  &__currency-icon {
    height: 1.7rem;
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
  margin-right: 10px;
  font-weight: 700;
  color: #fff;
  display: block;
  font-size: 14px;
}

.assetc-num1 {
  text-align: right;
}

.button-pay {
  padding: 2px 5px 2px 0;
  margin: 15px 0 0 0px;
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

.footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: -5px;
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
  height: calc(90vh - 250px);
  max-height: 300px;
  overflow: auto;
  padding: 10px;
}

@media (max-width: 450px) {
  .content {
    font-size: 13px;
  }
}

//@media (max-width: 420px) {
//  .switch-item {
//    margin-right: 1rem;
//  }
//  .switch {
//    display: block;
//  }
//  .switch-item:last-child {
//    margin-top: -10px;
//    margin-right: 4px;
//  }
//}
//
//@media (max-width: 413px) {
//  .assetc-main {
//    height: calc(100vh - 250px);
//  }
//}
//
//@media (max-width: 375px) {
//  .content {
//    font-size: 11px;
//  }
//  .switch-item, .btc-price {
//    margin-right: 0;
//  }
//  .switch-item:last-child {
//    margin-top: -10px;
//    margin-right: -10px;
//  }
//}

::-webkit-scrollbar {
  width: 0;
}
.assetc-block {
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 15px;
  transition: all .3s;
  max-height: 42px;
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
  margin-top: 4px;
  margin-left: 5px;
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
