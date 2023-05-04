<template>
  <div>
    <div class="find">
      <span class="p-input-icon-left">
        <i class="pi pi-search"/>
        <InputText class="find-input" type="text" v-model="searchValue"/>
      </span>
    </div>
    <div class="assetc-main">
      <div
        class="assetc-block"
        v-for="currency in getCurrencyList.filter(currencyInList =>
          currencyInList.id
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        )"
        :key="currency.id"
      >
        <div class="assets-block__title">
          <div class="assets-block">
            <img alt="logo" class="assets-block__currency-icon" :src="currency.src"/>
            <div class="assets-block__currency-name">{{ currency.id }}</div>
          </div>
          <div class="assetc-num">
            <InputSwitch :value="getActiveCurrencyIds.includes(currency.id)"
                         @change="onSetAccountEnabled(currency.id, !getActiveCurrencyIds.includes(currency.id))"/>
          </div>
        </div>
      </div>
    </div>
    <Divider/>
    <div class="footer">
      <button
        id="dep"
        @click.prevent="onSetPage('PAGE_CURRENCY_CHOOSER')"
        class="button-pay"
      >
        <i class="pi pi-list list-icon"/>
        {{ $t('cash.currency.active_currency_list')}}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DCurrencyChooserActiveCurrency',
  props: ['onSetPage'],
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters('user', ['accounts', 'getActiveCurrencyIds']),
    ...mapGetters('currency', ['getCurrencyList'])
  },
  methods: {
    ...mapActions('user', ['setAccountEnabled']),
    onSetAccountEnabled (currencyId, enabled) {
      this.setAccountEnabled(
        {
          [currencyId]: enabled
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
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
.assetc-num {
  width: 65px;
  font-weight: 700;
  color: #fff;
  display: block;
  margin-top: 22px;
}
.button-pay {
  padding: 2px 5px 2px 0;
  margin: 2px 0 16px 15px;
  font-weight: 700;
  display: flex;
  width: 230px;
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
}

.find {
  border-radius: 10px;
  text-align: center;
  margin: 5px 0;

  span {
    width: 100%;
  }
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
.list-icon {
  margin: 0 10px 0 3px;
  color: #000000;
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
.assetc-main {
  height: calc(90vh - 207px);
  max-height: 610px;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0;
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
}

@media (max-width: 413px) {
  .assetc-main {
    height: calc(100vh - 250px);
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
