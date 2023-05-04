<template>
  <div>
    <div class="text">
      <span>{{ $t('compoints.receive') }}</span>
    </div>
    <div class="block">
      <div class="value">
        <span>{{ currencyValue }}</span>
        <div class="choice">
          <div @click="changeValuePercent({percent: 25})">25%</div>
          <div @click="changeValuePercent({percent: 50})">50%</div>
          <div @click="changeValuePercent({percent: 100})">100%</div>
        </div>
      </div>
      <div class="currency" @click="changeCashPage({ pageCash: CASH_PAGES.INVEST_CURRENCY_CHOOSE })">
        <div>
          <img class="currency__icon" :src="currency.src">
          <span>{{ currency.id }}</span>
        </div>
        <div>
          <i class="pi pi-chevron-right"/>
        </div>
      </div>
    </div>
    <div class="text-rate">{{ $t('cashbox.menu.inserest_rate') }} <span>{{ inserted_rate }}%</span></div>
    <Button class="button-deposit mt-0" @click="send">
      {{ $t('cashbox.menu.send_deposit').toUpperCase() }}
    </Button>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { CASH_PAGES } from '@/modules/cash/constants'

export default {
  name: 'SendDeposit',
  data () {
    return {
      inserted_rate: 10,
      CASH_PAGES
    }
  },
  computed: {
    ...mapGetters('cash/invest', { currency: 'getCurrency', currencyValue: 'getCurrencyValue' })
  },
  methods: {
    ...mapActions('cash/invest', ['send', 'changeValuePercent']),
    ...mapActions('cash', ['changeCashPage'])
  }
}
</script>

<style lang="scss" scoped>
.block {
  cursor: pointer;
  background: #383A44;
  display: flex;
  margin-bottom: 0.8rem;
  border-radius: 1rem;
  height: 70px;
  .value {
    flex: 1;
    border-right: 1px solid var(--gray-700);
    padding: 1rem;
    display: flex;
    align-items: center;
    font-weight: 300;
    color: white;
    justify-content: space-between;
    span {
      padding-left: 5px;
    }
  }
  .currency {
    flex: 0.5;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    div {
      margin: auto 0;
    }
    &__icon {
      height: 2rem;
    }
    span {
      color: white;
      margin-left: 1rem;
    }
  }
}
.text {
  margin: 1rem 1rem .5rem;
}
.text-rate {
  text-align: center;
  margin: 1.5rem 0 .5rem 0;
  font-weight: 300;
  color: white;
  span {
    font-weight: bold;
    color: #9184B7;
  }
}
.button-deposit {
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 1rem;
  border-radius: 10px;
}
.choice {
  display: flex;
  box-sizing: border-box;
  height: 2rem;
  margin: auto 0;
  margin-left: 1rem;
  :first-child {
    border-radius: 1rem 0 0 1rem;
  }
  :last-child {
    border-radius: 0 1rem 1rem 0;
  }
  div {
    background: #565964;
    flex: 1;
    color: #BABABA;
    margin-right: 1px;
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
}
@media (max-width: 500px) {
  .block {
    height: 4rem;
    .currency {
      flex: 0.5;
      display: flex;
      justify-content: space-between;
      padding: .5rem;
      div {
        margin: auto 0;
      }
      &__icon {
        height: 2rem;
      }
      span {
        color: white;
        margin-left: 1rem;
      }
    }
  }
}
</style>
