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

    <Button class="button-deposit mt-0" @click="receive">
      {{ $t('cashbox.menu.withdraw_deposit').toUpperCase() }}
    </Button>

    <div class="assets-text mt-1">
      <div class="text">{{ $t('cashbox.monetary_assets.assets') }}</div>
      <div class="assets-text__history text">
        <HistorySvg class="svg"/>
        <div>{{ $t('cashbox.monetary_assets.history') }}</div>
      </div>
    </div>

    <div class="assets-block">
      <div class="assets-block__title">
        <div>
          <img class="assets-block__currency-icon" :src="currency.src">
          <div class="assets-block__currency-name">{{ currency.id }}</div>
        </div>
        <div class="btn-withdraw">
          <ArrowSvg class="mr-2"/>
          <div>{{ $t('cashbox.monetary_assets.receive') }}</div>
        </div>
      </div>
      <div>
        <div class="text ml-0">
          {{ $t('cashbox.monetary_assets.invested') }}
          <span class="amounts ml-2">{{ asset.invested.currency }} {{ asset.title_currency }} = {{ asset.invested.dollars }} $</span>
        </div>
        <div class="text ml-0">
          PNL <span class="amounts ml-2"><span :class="[ asset.PNL.positive ? 'positive' : 'negative', 'mr-3' ]">{{ asset.PNL.percents }}</span>{{ asset.PNL.currency }} {{ asset.title_currency }} = {{ asset.PNL.dollars }} $</span>
        </div>
        <div class="text ml-0">
          {{ $t('cashbox.monetary_assets.created') }}
          <span class="amounts ml-2">{{ asset.created }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import HistorySvg from '@/assets/svg/cash/Assets.svg'
import ArrowSvg from '@/assets/svg/cash/Arrow.svg'

import { CASH_PAGES } from '@/modules/cash/constants'

export default {
  name: 'ReceiveDeposit',
  components: {
    HistorySvg,
    ArrowSvg
  },
  data () {
    return {
      asset: {
        title_currency: 'BTC',
        invested: {
          currency: '0.00312100',
          dollars: '5.00000000'
        },
        PNL: {
          positive: true,
          percents: '+1.12',
          currency: '0.00002100',
          dollars: '0.30000000'
        },
        created: '01.07.2021'
      },
      CASH_PAGES
    }
  },
  computed: {
    ...mapGetters('cash/invest', { currency: 'getCurrency', currencyValue: 'getCurrencyValue' })
  },
  methods: {
    ...mapActions('cash', ['changeCashPage']),
    ...mapActions('cash/invest', ['changeValuePercent', 'receive'])
  }
}
</script>

<style scoped lang="scss">
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
  .amounts {
    font-weight: bold;
    color: white;
    .positive {
      color: rgb(78, 220, 78);
    }
  }
}
.assets-text {
  display: flex;
  justify-content: space-between;
  &__history {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      margin-left: .5rem;
    }
  }
}
.assets-block {
  width: 100%;
  background: #383A44;
  border: 0;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 1rem;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
    }
  }
  &__currency-icon {
    height: 2rem;
    margin-right: .5rem;
  }
  &__currency-name {
    color: white;
  }
  .btn-withdraw {
    transition: color .3s;
    cursor: pointer;
  }
  .btn-withdraw:hover {
    color: #fff;
    transition: color .3s;
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
</stylescoped>
