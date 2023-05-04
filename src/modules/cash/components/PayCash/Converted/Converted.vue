<template>
  <ConvertedWrapper style="width: 100%">
    <div class="container">
      <div class="text">
        <span>{{ $t('cashbox.swap.you_send') }}</span>
      </div>
      <div class="block">
        <div class="value">
          <InputNumber
            class="value-input"
            :useGrouping="false"
            v-model="currencyFromValue"
            :minFractionDigits="currencyFrom.precisionUnit"
            :maxFractionDigits="currencyFrom.precisionUnit"
            :max="Number(getBalanceByCurrency(currencyFrom.id))"
          />
          <div class="choice cursor-pointer d-inline-flex align-self-right ml-auto">
            <div @click="changePercentAmount(100)">MAX</div>
          </div>
        </div>
        <div class="currency" @click="changeCashPage({ pageCash: CASH_PAGES.CONVERTED_FROM_CURRENCY_CHOOSE })">
          <div>
            <img class="currency__icon" :src="currencyFrom.src">
            <span>{{ currencyFrom.id }}</span>
            <br/>
            <span>{{getBalanceByCurrency(currencyFrom.id)}}</span>
          </div>
          <div>
            <i class="pi pi-chevron-right"/>
          </div>
        </div>
      </div>
      <div class="d-flex currency-price p-0 m-0 justify-content-between">
        <div class="ml-3">
          1 {{ currencyFrom.id }} <span> ≈
          {{ getCurrencyCourseToDollar(currencyFrom.id, 1) }}</span>
        </div>
      </div>
      <div class="text-center mt-4">
        <ChoicePic @click="swapCurrency"/>
      </div>
      <div class="container-pic ">
        <div class="text mb-0">
          <span>{{ $t('cashbox.swap.you_get') }}</span>
        </div>
      </div>

      <div class="block">
        <DPreloader v-if="fetchStatusCurrencyToValue === 'FETCH'"/>
        <div v-else-if="fetchStatusCurrencyToValue === 'FETCHED'" class="value">
          {{ currencyToValue }}
        </div>
        <div v-if="fetchStatusCurrencyToValue === 'FETCHED'" class="currency"
             @click="changeCashPage({ pageCash: CASH_PAGES.CONVERTED_TO_CURRENCY_CHOOSE })">
          <div>
            <img class="currency__icon" :src="currencyTo.src">
            <span>{{ currencyTo.id }}</span>
          </div>
          <div>
            <i class="pi pi-chevron-right"/>
          </div>
        </div>
      </div>
      <div class="swap-info">
        <div>{{ $t('cashbox.swap.time') }}: <span class="font-weight-bold text-white">{{ $t('cashbox.swap.instant') }}</span></div>
        <div>{{ $t('cashbox.swap.fee') }}: <span class="font-weight-bold text-white">{{ currencyFrom.id !== 'DAC' || currencyTo.id !== 'DAC'  ? Number(currencyFromValue * 0.04).toFixed(currencyFrom.precisionUnit) : currencyFromValue}} {{ currencyFrom.id }}</span></div>
      </div>
      <Button class="button-choice mt-3" @click="convertedCurrency"
              :disabled="currencyTo.id === currencyFrom.id && currencyFromValue > 0">
        {{ $t('cashbox.menu.choice_start').toUpperCase() }}
      </Button>
    </div>
  </ConvertedWrapper>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import ChoicePic from '@/assets/svg/cash/Choice_31.svg'
import DPreloader from '@/common/components/Preloader/Preloader'

import { CASH_PAGES } from '@/modules/cash/constants'
import { ConvertedWrapper } from '@/modules/cash/components/PayCash/Converted'

export default {
  name: 'Converted',
  components: {
    DPreloader,
    ConvertedWrapper,
    ChoicePic
  },
  data () {
    return { CASH_PAGES }
  },
  computed: {
    ...mapGetters('user', ['getBalanceByCurrency', 'currentAccount']),
    ...mapGetters('currency', ['getCurrencyCourseToDollar', 'getCurrencyCourseByCode']),
    ...mapGetters('cash/converted', {
      currencyFrom: 'getCurrencyFrom',
      currencyTo: 'getCurrencyTo',
      fetchStatus: 'getFetchStatus',
      getCurrencyFromValue: 'getCurrencyFromValue',
      currencyToValue: 'getCurrencyToValue',
      fetchStatusCurrencyToValue: 'getFetchStatusCurrencyToValue'
    }),
    currencyFromValue: {
      get () {
        return this.getCurrencyFromValue
      },
      set (currencyFromValue) {
        this.changeCurrencyFromValue({ currencyFromValue })
      }
    }
  },
  methods: {
    changePercentAmount (percent) {
      this.changeConvertedAmountPercent({ percent })
    },
    ...mapActions('cash', ['changeCashPage']),
    ...mapActions('cash/converted', ['changeCurrencyFromValue', 'convertedCurrency', 'swapCurrency', 'changeConvertedAmountPercent'])
  }
}
</script>
<style scoped lang="scss">
.convert-arrow {
  transition: fill .3s;
}

.choice {
  display: flex;
  box-sizing: border-box;
  height: 2rem;
  margin: auto 0;
  //padding-left: 3rem;
  div {
    background: #565964;
    flex: 1;
    color: #bababa;
    border-radius: 1rem;
    margin-left: 5px;
    padding: 0.4rem 0.7rem;
    font-size: 0.8rem;
    &:hover {
      color: white;
    }
  }
}
.convert-arrow:hover {
  cursor: pointer;
  fill: #fff;
  transition: fill .3s;
}

::v-deep .p-inputnumber-input {
  border-radius: 15px;
  background-color: #1c1f29;
  padding-left: 20px;
  width: 100%;
}

.value-input {
  height: 40px;
  max-width: 150px;
  border-radius: 15px;
}

.currency-price {
  margin: 0 1rem 0.5rem;
}

.swap-info {
  padding: 15px;
  background-color: rgba(56, 58, 68, 0.5);
  border-radius: 15px;
  margin-top: 15px;
}

.block {
  transition: border-color .2s;
  border: 1px solid transparent;
  background: #383A44;
  border-radius: 15px;
  display: flex;
  margin-bottom: 0.2rem;
  border-radius: 1rem;
  max-height: 70px;
  display: flex;

  .value {
    flex: 2;
    border-right: 1px solid var(--gray-700);
    padding: 1rem;
    display: flex;
    align-items: center;
    font-weight: 300;
    color: white;
  }

  .currency {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;

    div {
      margin: auto 0;
    }

    &__icon {
      height: 24px;
      margin-left: 5px;
    }

    span {
      color: white;
      margin-left: 0.5rem;
    }
  }
}

.active:hover {
  border-color: #b19df7;
  cursor: pointer;
}

.text {
  margin: 1rem 1rem .5rem;
}

.button-choice {
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 1rem;
  border-radius: 10px;
}

.container-pic {
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  margin-bottom: .5rem;
}

ChoicePic {
  height: 2rem;
}

@media (max-width: 500px) {
  .block {
    .currency {
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding: .5rem;

      div {
        margin: auto 0;
      }

      span {
        color: white;
      }
    }
  }
}
</style>
