<template>
  <div class="profile-wallet">
    <div class="profile-wallet__container">
      <div class="profile-wallet__header mt-n1">
        {{$t('cashbox.walletModal.currencies')}}
      </div>
      <div class="profile-wallet__body">
        <div class="profile-wallet__body--active-balance">
          <div class="profile-wallet__body--active-balance--title" >
            {{$t('cashbox.walletModal.active_balances')}}
          </div>
          <div v-for="(active, idx) in activeBalances" :key="idx" class="profile-wallet__body--active-balance--container">
            <div class="profile-wallet__body--active-balance--container-item">
              <div class="profile-wallet__body--active-balance--container-item-label">
                <span>
                  <div class="profile-wallet__body--active-balance--container-item-label-container"><i :class="active.code | currencyToIconClass" class=""></i></div>
                </span>
              </div>
              <div class="profile-wallet__body--active-balance--container-item-content">
                {{ active.description }}
                <div class="profile-wallet__body--active-balance--container-item-content-right">
                  <div class="profile-wallet__body--active-balance--container-item-content-right-value">
                    <number :to="active.balance" :from="active.balance" :format="theFormat"/>
                  </div>
                  <button class="profile-wallet__body--active-balance--container-item-content-right-button" @click="disableAccount(active)">
                    {{$t('cashbox.walletModal.button_disabled')}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="currencyBalances.length" class="profile-wallet__body--currency-balance">
          <div class="profile-wallet__body--currency-balance--title" >
            {{$t('cashbox.walletModal.currency_balances')}}
          </div>
          <div v-for="(currency, idx) in currencyBalances" :key="idx" class="profile-wallet__body--currency-balance--container">
            <div class="profile-wallet__body--currency-balance--container-item">
              <div class="profile-wallet__body--currency-balance--container-item-label">
                <span>
                  <div class="profile-wallet__body--currency-balance--container-item-label-container"><i :class="currency.code | currencyToIconClass" class=""></i></div>
                </span>
              </div>
              <div class="profile-wallet__body--currency-balance--container-item-content">
                {{ currency.description }}
                <div class="profile-wallet__body--currency-balance--container-item-content-right">
                  <div class="profile-wallet__body--currency-balance--container-item-content-right-value">
                    <number :to="currency.balance" :from="currency.balance" :format="theFormat"/>
                  </div>
                  <button class="profile-wallet__body--currency-balance--container-item-content-right-button-add" @click="addAccount(currency)">
                    {{$t('cashbox.walletModal.button_add')}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="cryptocurrencies.length" class="profile-wallet__body--cryptocurrencies-balance">
          <div class="profile-wallet__body--cryptocurrencies-balance--title" >
            {{$t('cashbox.walletModal.cryptocurrencies')}}
          </div>
          <div v-for="(crypto, idx) in cryptocurrencies" :key="idx" class="profile-wallet__body--cryptocurrencies-balance--container">
            <div class="profile-wallet__body--cryptocurrencies-balance--container-item">
              <div class="profile-wallet__body--cryptocurrencies-balance--container-item-label">
                <span>
                  <div class="profile-wallet__body--cryptocurrencies-balance--container-item-label-container"><i :class="crypto.code | currencyToIconClass" class=""></i></div>
                </span>
              </div>
              <div class="profile-wallet__body--cryptocurrencies-balance--container-item-content">
                {{ crypto.description }}
                <div class="profile-wallet__body--cryptocurrencies-balance--container-item-content-right">
                  <div class="profile-wallet__body--cryptocurrencies-balance--container-item-content-right-value">
                    <number :to="crypto.balance" :from="crypto.balance" :format="theFormat"/>
                  </div>
                  <button class="profile-wallet__body--cryptocurrencies-balance--container-item-content-right-button-add" @click="addAccount(crypto)">
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

export default {
  name: 'Currency',
  components: {},
  data: () => ({
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
    }
  },
  created () {
    this.getCurrencyAccounts()
  }
}
</script>

<style lang="scss">
.profile-wallet {
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    height: 100%;
    width: 100%;
  }

  &__header {
    background: transparent;
    color: white;
    padding: 8px 0 0 15px;
    font-weight: 700;
    font-size: 24px;
  }

  &__body {
    padding: 5px;
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
      border-radius: 6px;
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
      margin-left: 0;
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
      background-color: #4778aa;
      margin-left: auto;
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
        background-color: #4779aab0;
      }
    }

    &--currency-balance--container, &--cryptocurrencies-balance--container {
      background: transparent;
      border-radius: 5px;
    }

    &--currency-balance--container-item-content-right-button-add, &--cryptocurrencies-balance--container-item-content-right-button-add {
      background-color: #6c981f;
      &:hover {
        background-color: rgba(126, 165, 59, 0.733);
      }
    }
  }
}

::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
}

@media (max-width: 440px) {
  .profile-wallet {
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
  }
}

@media (max-width: 380px) and (max-height: 680px) {
  .profile-wallet{
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
  .profile-wallet {
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
