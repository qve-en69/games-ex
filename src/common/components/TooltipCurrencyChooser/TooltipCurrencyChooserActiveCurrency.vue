<template>
  <div>
    <DProgressSpinner v-if="load"/>
  <div v-else>
    <div class="find">
      <span class="p-input-icon-left">
        <i class="pi pi-search"/>
        <InputText class="find-input" type="text" v-model="searchValue"/>
      </span>
    </div>
    <div class="assetc-main" v-if="variables.length">
      <div
        class="assetc-block"
        v-for="(currency) in variables"
        :key="currency.id"
      >
        <div class="assets-block__title">
          <div class="assets-block">
            <img alt="logo" class="assets-block__currency-icon" :src="currency.src"/>
            <div class="assets-block__currency-name">{{ currency.id }} hue</div>
          </div>
          <div class="assetc-num">
            <InputSwitch v-model="currency.accountChecked" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button
        id="dep"
        @click.prevent="onSetAccountEnabled"
        class="button-pay"
      >
        <i class="pi pi-list list-icon"/>
        {{ $t('cash.currency.active_currency_list')}}
      </button>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import DProgressSpinner from '@/common/components/ProgressSpinner/ProgressSpinner'

export default {
  name: 'CommonTooltipCurrencyChooserActiveCurrency',
  components: {
    DProgressSpinner
  },
  data () {
    return {
      searchValue: '',
      variables: [],
      load: true
    }
  },
  computed: {
    ...mapGetters('user', ['accounts', 'getActiveCurrencyIds']),
    ...mapGetters('currency', ['getCurrencyList'])
  },
  methods: {
    ...mapActions('user', ['setAccountEnabled', 'getAccountVariables']),
    onSetAccountEnabled () {
      this.setAccountEnabled(
        this.variables.reduce((acc, currency) => ({ ...acc, ...{ [currency.id]: currency.accountChecked } }), {})
      )
      this.$emit('setPage', 'PAGE_CURRENCY_CHOOSER')
    }
  },
  mounted () {
    this.getAccountVariables().then((data) => {
      this.load = false
      this.variables = data.map(cur => {
        return {
          ...cur,
          accountChecked: !!(cur.account.length && cur.account[0].enabled)
        }
      })
    })
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
  padding: 0rem 0.5rem;
  font-size: 14px;

  &__title {
    display: flex;
    align-items: center;
    max-height: 42px;
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
.assetc-num {
  width: 65px;
  font-weight: 700;
  color: #fff;
  display: block;
  margin-top: 22px;
  padding-left: 15px;
  font-size: 14px;
}
.button-pay {
  padding: 2px 5px 2px 0;
  margin: 15px 0 0 0px;
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
  margin-bottom: 4px;
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
.assetc-main {
  height: calc(90vh - 250px);
  max-height: 300px;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0;
}

//@media (max-width: 450px) {
//  .footer {
//    font-size: 13px;
//  }
//}
//
//@media (max-width: 413px) {
//  .assetc-main {
//    height: calc(100vh - 250px);
//  }
//}

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
