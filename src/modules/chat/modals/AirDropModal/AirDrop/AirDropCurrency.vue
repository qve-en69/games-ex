<template>
  <div class="dm-wrapper content">
    <DCurrencyChooserList
      :useCurrencyListAccounts="false"
      :currencyList="airDropCurrencyList"
      :onChooseCurrency="onChooseCurrency"/>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { AIR_DROP_PAGES } from '@/modules/chat/modals/AirDropModal/constants'
import DCurrencyChooserList from '@/common/components/CurrencyChooser/CurrencyChooserList'

export default {
  name: 'AirDropCurrency',
  components: {
    DCurrencyChooserList
  },
  methods: {
    ...mapActions('chat/airDrop', ['changeAirDropPage']),
    ...mapActions('chat/airDrop', ['changeAirDropCurrency']),
    onChooseCurrency (currency) {
      this.changeAirDropCurrency({ airDropCurrency: currency })
      this.changeAirDropPage({ pageAirDrop: AIR_DROP_PAGES.AIR_DROP })
    }
  },
  computed: {
    ...mapState('chat/airDrop', ['airDropCurrencyList'])
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 16px 10px 16px;
  font-weight: 700;
  text-align: right;
  background: #1c1f29;
  border-radius: 15px;
}

.p-input-icon-left {
  display: block;
}

.assets-block {
  display: flex;
  width: 100%;
  border: 0;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 1rem;
  height: 44px;

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
  width: 103px;
  margin-right: 20px;
  font-weight: 700;
  color: #fff;
  display: block;
}

.main {
  background-color: #292c38;
  margin: -16px;
  padding: 10px;
  border-radius: 15px;
  margin-top: 20px;
  height: 102%;
}

.button-pay {
  padding: 2px 5px 2px 0;
  margin: 15px 0 0 15px;
  font-weight: 700;
  display: flex;
  width: 190px;
  height: 33px;
  justify-content: center;
  align-items: center;
  background-color: #7c4eff;
  color: #fff;
  text-transform: uppercase;
  border-radius: 15px;

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
  margin: 5px 3px;
}

.switch {
  display: flex;
}

.switch-item {
  margin-right: 1rem;
}

.find-input {
  border-radius: 15px;
  height: 40px;
  background: #15181F;
  padding-left: 35px;
  width: 100%;
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

.current-items {
  cursor: pointer;
  margin-bottom: 5px;

  :hover {
    outline: 1px solid #ae99ec;
    transition: 0.5;
    border-radius: 15px;
  }

  .assets-block__title {
    :hover {
      outline: none;
    }
  }
}

.current-main {
  height: calc(90vh - 143px);
  max-height: 678px;
  overflow: auto;
  padding: 5px;
}

@media (max-width: 576px) {
  .current-main {
    height: calc(100vh - 130px);
  }
}

@media (min-width: 576px) {
  .content {
    width: 530px;
  }
}

.current-main::-webkit-scrollbar {
  width: 0;
}

::v-deep .assetc-main {
  max-height: 500px;
  height: calc(55vh - 207px);
}

::v-deep .content {
  //padding: 0 16px 10px 16px !important;
}

@media (max-width: 576px) {
  ::v-deep .assetc-main {
    height: calc(100vh - 331px);
    overflow: auto;
    max-height: none;
  }
}
</style>
