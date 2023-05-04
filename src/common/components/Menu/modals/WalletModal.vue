<template>
  <div class="wallet">
    <div class="wallet__container">
      <div class="wallet__header">
        {{$t('cashbox.walletModal.currencies')}}
        <Button
                @click="openModal(DDollarModal)" class="p-button ml-5">
          DCoin
        </Button>
        <div class="wallet__close" @click="closeModal">
          <i class="wallet__close-icon fas fa-times"></i>
        </div>
      </div>
      <div class="wallet__body">
        <div class="wallet__body--active-balance">
          <div class="wallet__body--active-balance--title" >
            {{$t('cashbox.walletModal.active_balances')}}
          </div>
          <div v-for="(active, idx) in activeBalances" :key="idx" class="wallet__body--active-balance--container">
            <div class="wallet__body--active-balance--container-item">
              <div class="wallet__body--active-balance--container-item-label">
                <span>
                  <div class="wallet__body--active-balance--container-item-label-container">
                    <i :class="active.code | currencyToIconClass" class=""></i>
                  </div>
                </span>
              </div>
              <div class="wallet__body--active-balance--container-item-content">
                {{ active.description }}
                <div class="wallet__body--active-balance--container-item-content-right">
                  <div class="wallet__body--active-balance--container-item-content-right-value">
                    <number :to="active.balance" :from="active.balance" :format="theFormat"/>
                  </div>
                  <button class="wallet__body--active-balance--container-item-content-right-button" @click="disableAccount(active)">
                    {{$t('cashbox.walletModal.button_disabled')}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="currencyBalances.length" class="wallet__body--currency-balance">
          <div class="wallet__body--currency-balance--title" >
            {{$t('cashbox.walletModal.currency_balances')}}
          </div>
          <div v-for="(currency, idx) in currencyBalances" :key="idx" class="wallet__body--currency-balance--container">
            <div class="wallet__body--currency-balance--container-item">
              <div class="wallet__body--currency-balance--container-item-label">
                <span>
                  <div class="wallet__body--currency-balance--container-item-label-container"><i :class="currency.code | currencyToIconClass"></i></div>
                </span>
              </div>
              <div class="wallet__body--currency-balance--container-item-content">
                {{ currency.description }}
                <div class="wallet__body--currency-balance--container-item-content-right">
                  <div class="wallet__body--currency-balance--container-item-content-right-value">
                    <number :to="currency.balance" :from="currency.balance" :format="theFormat"/>
                  </div>
                  <button class="wallet__body--currency-balance--container-item-content-right-button-add" @click="addAccount(currency)">
                    {{$t('cashbox.walletModal.button_add')}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="cryptocurrencies.length" class="wallet__body--cryptocurrencies-balance">
          <div class="wallet__body--cryptocurrencies-balance--title" >
            {{$t('cashbox.walletModal.cryptocurrencies')}}
          </div>
          <div v-for="(crypto, idx) in cryptocurrencies" :key="idx" class="wallet__body--cryptocurrencies-balance--container">
            <div class="wallet__body--cryptocurrencies-balance--container-item">
              <div class="wallet__body--cryptocurrencies-balance--container-item-label">
                <span>
                  <div class="wallet__body--cryptocurrencies-balance--container-item-label-container"><i :class="crypto.code | currencyToIconClass" class=""></i></div>
                </span>
              </div>
              <div class="wallet__body--cryptocurrencies-balance--container-item-content">
                {{ crypto.description }}
                <div class="wallet__body--cryptocurrencies-balance--container-item-content-right">
                  <div class="wallet__body--cryptocurrencies-balance--container-item-content-right-value">
                    <number :to="crypto.balance" :from="crypto.balance" :format="theFormat"/>
                  </div>
                  <button class="wallet__body--cryptocurrencies-balance--container-item-content-right-button-add" @click="addAccount(crypto)">
                    {{$t('cashbox.walletModal.button_add')}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DDollarModal from './DacModal'

export default {
  name: 'WalletModal',
  components: {},
  data: () => ({
    DDollarModal,
    activeBalances: [],
    currencyBalances: [],
    cryptocurrencies: []
  }),
  computed: {
    ...mapGetters('user', {
      accounts: 'accounts'
    })
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    addAccount (account) {
      this.$socket.client.emit('call', 'account.addAccount', { currencyId: account.id }, (err, data) => {
        if (err) {
          this.$noty.error(err.message)
        } else {
          this.getCurrencyAccounts()
        }
      })
    },
    disableAccount (account) {
      this.$socket.client.emit('call', 'account.disableAccount', { id: account.accountId, enabled: false }, (err, data) => {
        if (err) {
          this.$noty.error(err.message)
        } else {
          this.getCurrencyAccounts()
        }
      })
    },
    getCurrencyAccounts () {
      this.$socket.client.emit('call', 'account.getAccounts', (err, data) => {
        if (!err) {
          this.initAccountsList(data)
        }
      })
    },
    initAccountsList (data) {
      this.activeBalances = data.active
      this.currencyBalances = data.fiat
      this.cryptocurrencies = data.crypto
    },
    theFormat (number) {
      return (number / 100).toFixed(2)
    },
    openModal (component, params) {
      return this.$modal.show(component, { params }, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    }
  },
  created () {
    this.getCurrencyAccounts()
  }
}
</script>

<style lang="scss">
.v--modal {
  display: flex;
  justify-content: center;
  background-color: transparent;
}
.v--modal-overlay {
  background: rgba(0, 0, 0, 0.76) !important;
}
.v--modal-box {
  top: 0 !important;
}

.wallet {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &__container {
    padding: 0;
    border-radius: 5px;
    outline: none;
    background: #282d38;
    height: 650px;
    width: 500px
  }

  &__header {
    width: 100%;
    height: 52px;
    background-color: rgba(122, 122, 122, 0.3);
    border-radius: 6px 6px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
    font-size: 16px;
    position: relative;
    color: #ffffff;
  }
  &__close {
    border-radius: 6px;
    position: absolute;
    top: -20%;
    right: -2.5%;
    width: 36px;
    background-color: white;
    height: 36px;
    display: block;
    z-index: 2;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    &-icon {
      padding: 10px;
      font-size: 22px;
      color: #90929f;
      margin-top: -2px;
      &:hover {
        color: #6e7078;
      }
    }
  }

  &__body {
    height: calc(100% - 52px);
    padding: 20px;
    background-color: #22232f;
    color: #fff;
    &--active-balance, &--currency-balance {
      margin-bottom: 10px;
    }
    &--active-balance--title, &--currency-balance--title, &--cryptocurrencies-balance--title {
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 400;
      color: #a5acbb;
    }
    &--active-balance--container, &--currency-balance--container, &--cryptocurrencies-balance--container {
      padding: 10px;
      border-radius: 5px;
    }
    &--active-balance--container-item, &--currency-balance--container-item, &--cryptocurrencies-balance--container-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 56px;
      padding: 0 12px;
      margin-bottom: 12px;
      border: 1px solid hsla(0,0%,100%,.08);
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      font-size: 14px;
    }
    &--active-balance--container-item, &--currency-balance--container-item, &--cryptocurrencies-balance--container-item {
      &:last-child {
        margin-bottom: 0px;
      }
    }
    &--active-balance--container-item-label, &--currency-balance--container-item-label, &--cryptocurrencies-balance--container-item-label {
      display: flex;
      align-items: center;
    }
    &--active-balance--container-item-label-container, &--currency-balance--container-item-label-container, &--cryptocurrencies-balance--container-item-label-container {
      height: 32px;
      width: 32px;
      min-width: 32px;
      border-radius: 3px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #343b48;
      margin-right: 10px;
    }
    &--active-balance--container-item-content, &--currency-balance--container-item-content, &--cryptocurrencies-balance--container-item-content {
      width: 100%;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 500;
    }
    &--active-balance--container-item-content-right, &--currency-balance--container-item-content-right,&--cryptocurrencies-balance--container-item-content-right {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &--active-balance--container-item-content-right-value, &--currency-balance--container-item-content-right-value, &--cryptocurrencies-balance--container-item-content-right-value {
      margin-left: 10px;
      font-size: 14px;
      font-weight: 300;
      color: #a5acbb;
    }
    &--active-balance--container-item-content-right-button, &--currency-balance--container-item-content-right-button-add, &--cryptocurrencies-balance--container-item-content-right-button-add {
      background-color: #4a5365;
      height: 32px;
      display: flex;
      align-items: center;
      margin-left: 12px;
      padding: 0 12px;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
      text-decoration: none;
      border: 0;
      outline: none;
      &:hover {
        background-color: #4a53659c;
      }
    }

    &--currency-balance--container, &--cryptocurrencies-balance--container {
      background: transparent;
      border-radius: 5px;
    }

    &--currency-balance--container-item-content-right-button-add, &--cryptocurrencies-balance--container-item-content-right-button-add {
      background-color: #6c981f;
      &:hover {
        background-color: #7ea53b;
      }
    }
  }
}

::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
}

@media (max-width: 740px) {
  .wallet {
    background: #282d38;
    align-items: flex-start;
    &__container {
      height: 100%;
      width: 100%;
    }
    &__body--active-balance--container-item, &__body--currency-balance--container-item, &__body--cryptocurrencies-balance--container-item {
      font-size: 12px;
    }
    &__body--active-balance--container-item-content-right-button, &__body--currency-balance--container-item-content-right-button-add, &__body--cryptocurrencies-balance--container-item-content-right-button-add {
      font-size: 10px;
    }
    &__close {
      position: fixed;
      top: 1%;
      right: 1%;
    }
  }
}

@media (max-width: 380px) and (max-height: 680px) {
  .wallet{
    &__body {
      padding: 15px;
      &--active-balance, &--currency-balance, &--cryptocurrencies-balance {
        margin-bottom: 10px;
      }
      &--active-balance--title, &--currency-balance--title, &--cryptocurrencies-balance--title {
        margin-bottom: 5px;
      }
    }
  }
}

@media (max-width: 340px) and (max-height: 600px) {
  .wallet {
    &__body {
      padding: 10px;
      &--active-balance--title, &--currency-balance--title, &--cryptocurrencies-balance--title {
        font-size: 12px;
      }
      &--active-balance--container-item, &--currency-balance--container-item, &--cryptocurrencies-balance--container-item {
        font-size: 10px;
      }
      &--active-balance--container-item-content-right-button, &--currency-balance--container-item-content-right-button-add, &--cryptocurrencies-balance--container-item-content-right-button-add {
        font-size: 8px;
      }
    }
  }
}
</style>
