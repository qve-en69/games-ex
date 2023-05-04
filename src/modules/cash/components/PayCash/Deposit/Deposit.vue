<template>
  <DepositWrapper>
    <div class="container">
      <div class="text">
        <span>{{ $t('cashbox.choose_currency') }}</span>
      </div>
      <div v-if="currencyDeposit && payWayDeposit && methodDeposit">
        <div @click="changeCashPage({ pageCash: CASH_PAGES.DEPOSIT_CURRENCY_CHOOSE })">
          <DPreviewCurrency :currency="currencyDeposit"/>
        </div>
        <!--        <div v-if="currencyDeposit.typeId === 'fiat'">
          <div class="text">
            <span>{{ $t('cashbox.select_payment') }}</span>
          </div>
          <div class="block active">
            <div
              class="payment"
              @click="
                changeCashPage({ pageCash: CASH_PAGES.DEPOSIT_PAY_WAY_CHOOSE })
              "
            >
              <div>
                <img class="currency__icon" :src="payWayDeposit.image"/>
                <span>{{ payWayDeposit.name }}</span>
              </div>
              <div>
                <i class="pi pi-chevron-right"/>
              </div>
            </div>
          </div>
          <div class="text" style="color: #FFC700">
            <span>{{ $t('cashbox.deposit_bonus') }}</span>
          </div>
          <div style="position: relative">
            <img class="flag-icon-1" src="@/assets/images/cash/flag.png"/>
            <img class="flag-icon-2" src="@/assets/images/cash/flag.png"/>
            <div class="bonus-block">
              <div class="bonus-block__1">
                <div>
                  <span style="color: #FFC700">{{
                      $t('cashbox.deposite')
                    }}</span>
                  <span style="color: #FFC700; font-weight: bold;"> $10 </span>
                  <span style="color: #FFC700; font-size: 0.7rem;"
                  >({{ $t('cashbox.more_deposite') }})</span
                  >
                  <br/>
                  <span style="color: white">≈ 1000.00 RUB</span>
                </div>
              </div>
              <div class="bonus-block__2">
                <Bag class="bag-icon"/>
                <div class="label">
                  <span style="color: #FFC700; font-size: 0.8em"
                  >+<span style="font-weight: bold">80%</span>
                    {{ $t('cashbox.bonus') }}
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div class="text">
            <span>{{
                $t('cashbox.menu.replenishment_amount')
              }}</span>
          </div>
          <InputNumber
            class="input-text active"
            inputStyle="border: none !important"
            color="white"
            v-model="depositAmount"
            mode="decimal"
            :useGrouping="false"
            :min="methodDeposit.minLimit"
            :max="methodDeposit.maxLimit"
          />
          <div class="amount_select">
            <Button
              class="amount text-white"
              v-for="value in amounts"
              :key="value"
              @click="depositAmount = value"
            >
              {{ value }}
            </Button>
          </div>
          <Button class="button-pay" @click="deposit" :disabled="fetchStatusDeposit === 'FETCH'">
            {{ $t('cashbox.menu.deposite_pay').toUpperCase() }}
          </Button>
        </div>-->
        <div v-if="currencyDeposit.typeId === 'crypto'">
          <div v-if="getSelectedBonus" class="text" style="color: #FFC700">
            <span>{{ $t('cashbox.bonus.first') }}</span>
            <span @click="openDepositBonusModal" style="cursor: pointer;float: right">{{ $t('cashbox.bonus.more') }}</span>
          </div>
          <div v-if="getSelectedBonus" style="position: relative">
            <img class="flag-icon-1" src="@/assets/images/cash/flag.png"/>
            <img class="flag-icon-2" src="@/assets/images/cash/flag.png"/>
            <div class="bonus-block">
              <div class="bonus-block__1">
                <div>
                  <span style="color: #FFC700">{{
                      $t('cashbox.deposite')
                    }}</span>
                  <span style="color: #FFC700; font-weight: bold;"> ${{getSelectedBonus.amount}} </span>
                  <span style="color: #FFC700; font-size: 0.7rem;">({{ $t('cashbox.bonus.more_deposite') }})</span>
                  <br/>
                  <span style="color: white">
                    ≈ {{ convert('USD', currencyDeposit.id, getSelectedBonus.amount)}} {{ currencyDeposit.id }}
                  </span>
                </div>
              </div>
              <div class="bonus-block__2">
                <Bag class="bag-icon"/>
                <div class="label">
                  <span style="color: #FFC700; font-size: 0.8em"
                  >+<span style="font-weight: bold">{{getSelectedBonus.rate}}%</span>
                    {{ $t('cashbox.bonus.name') }}
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div class="button-group">
            <span>{{ $t('cashbox.address_network') }}</span>
            <div class="button-item mt-2">
              <DButtonGroup
                :buttons="
                      payWayList.map(payWay => ({
                        title: payWay.id,
                        key: payWay.id
                      }))
                    "
                :onButtonClick="changePayWayButton"
                :activeKey="payWayDeposit.id"
              />
            </div>
          </div>
          <div class="text d-flex justify-content-between mt-4">
            <div>
              <span>{{ $t('cashbox.address_payment') }}</span>
            </div>
            <div class="mr-2">
              <span> {{ $t('cashbox.minimum_deposit') }} </span>
              <span style="color: #FAFF00;">{{ methodDeposit.minLimit }} {{currencyDeposit.id}}</span>
            </div>
          </div>
          <div class="block block-qr">
              <div v-if="errorStatus">
                <div class="faq-block mb-2">
                  <div class="faq-text">
                    <span style="color: red;">Oops, Internal Error please try again later...</span>
                  </div>
                </div>
              </div>
              <div v-if="!errorStatus && depositAddress" class="qr-text">
                <div>
                  <span>{{ depositAddress }}</span>
                </div>
                  <i @click.stop.prevent="copyText(depositAddress)"
                     style="cursor: pointer; font-size: 1.25rem; right: -25px; background: transparent; color: #969696;"
                     class="pi pi-clone"></i>
              </div>
            </div>
          <div v-if="!errorStatus && depositComment">
          <div class="text d-flex justify-content-between mt-2">
            <div>
              {{ $t('cashbox.comment') }} <span class="text-white font-weight-bold">{{ $t( 'cashbox.required') }}</span>
            </div>
          </div>
          <div class="block block-qr">
            <div v-if="!errorStatus && depositComment" class="qr-text mt-2">
              <div>
                {{ depositComment }}
              </div>
              <i @click.stop.prevent="copyText(depositComment)"
                 style="cursor: pointer; font-size: 1.25rem; right: -25px; background: transparent; color: #969696;"
                 class="pi pi-clone"></i>
            </div>
          </div>
          </div>
          <div v-if="!errorStatus" class="qr-main">
            <div class="qr-block">
              <DPreloader v-if="fetchStatusQRCode === 'FETCH'"/>
              <VueQRCodeComponent
                v-else-if="fetchStatusQRCode === 'FETCHED' && depositQRCodeText"
                :text="depositQRCodeText"
                :size="140"
                render-as="svg"
                class="qr-item"
                level="Q"
              />
              <img v-else width="140px" height="140px" class="qr-item" :src="`data:image/png;base64, ${depositQRCode}`"
                   alt="">
            </div>
          </div>
          <div class="faq-block">
            <div class="faq-text">
              <span>{{ $t('cash.currency.important') }}</span>
              {{ $t('cash.currency.important_text') }} {{ currencyDeposit.name }}
              {{ $t('cash.currency.important_text_last') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </DepositWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueQRCodeComponent from 'vue-qrcode-component'

import {
  DButtonGroup,
  DPreviewCurrency,
  DPreloader
} from '@/common/components'
import Bag from '@/assets/svg/cash/Bag.svg'

import { CASH_PAGES } from '@/modules/cash/constants'
import DepositWrapper from '@/modules/cash/components/PayCash/Deposit/DepositWrapper'
import { NOTIFICATION_LEVEL } from '@/common/constants'

export default {
  components: {
    DPreloader,
    DepositWrapper,
    DPreviewCurrency,
    Bag,
    VueQRCodeComponent,
    DButtonGroup
  },
  data () {
    return {
      CASH_PAGES,
      amounts: [500, 1000, 5000, 15000]
    }
  },
  computed: {
    ...mapGetters('cash/deposit', ['getSelectedBonus', 'getDepositBonuses']),
    ...mapGetters('cash/deposit', {
      currencyDeposit: 'getCurrencyDeposit',
      payWayDeposit: 'getPayWayDeposit',
      getDepositAmount: 'getDepositAmount',
      payWayList: 'getPayWayListDeposit',
      depositQRCode: 'getDepositQRCode',
      depositQRCodeText: 'getDepositQRCodeText',
      depositAddress: 'getDepositAddress',
      depositComment: 'getDepositComment',
      methodDeposit: 'getMethodDeposit',
      fetchStatusDeposit: 'getFetchStatusDeposit',
      fetchStatusQRCode: 'getFetchStatusQRCode',
      errorStatus: 'getErrorStatus'
    }),
    ...mapGetters('currency', ['convert']),
    ...mapGetters('user', {
      getBalanceByCurrency: 'getBalanceByCurrency'
    }),
    depositAmount: {
      get () {
        return this.getDepositAmount
      },
      set (depositAmount) {
        this.changeDepositAmount({ depositAmount })
      }
    }
  },
  methods: {
    ...mapActions('cash', {
      changeCashPage: 'changeCashPage'
    }),
    ...mapActions('notifications', ['addNotification']),
    ...mapActions('cash/deposit', {
      changeDepositAmount: 'changeDepositAmount',
      changePayWayDeposit: 'changePayWayDeposit',
      deposit: 'deposit'
    }),
    ...mapActions('modals', ['openDepositBonusModal', 'openBonusDepositInfoModal']),
    changePayWayButton (payWayId) {
      this.changePayWayDeposit({ payWayId })
    },
    async copyText (textCopy) {
      try {
        await navigator.clipboard.writeText(textCopy)
        this.addNotification({ level: NOTIFICATION_LEVEL.SUCCESS, text: this.$t('cash.currency.copy') })
      } catch ($e) {
        this.addNotification({ level: NOTIFICATION_LEVEL.ERROR, text: this.$t('cashbox.payment_states.error') })
      }
    }
  }
}
</script>

<style scoped lang="scss">

.active {
  border: 1px solid transparent;
  transition: border-color 0.2s;
  border-radius: 15px;
}

.active:hover {
  border-color: #b19df7;
  cursor: pointer;
}

.container {
  padding: 1rem;
  background: #292c38
}

.block {
  background: #383a44;
  padding: 0.5rem;
  margin-bottom: 0.8rem;
  border-radius: 15px;
  max-height: 70px;
  cursor: pointer;

  .currency {
    margin: -0.5rem 0;
    width: 70%;
    display: flex;
    border-right: 1px solid rgba(196, 196, 196, 0.1);
    justify-content: space-between;
    padding-right: 0.5rem;

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

  .payment {
    margin: -1rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-right: 0.5rem;

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

  .balance {
    padding-left: 1rem;
    width: 30%;
    margin: -1rem 0;
    display: flex;

    div {
      margin: auto 0;
    }
  }
}

.button-group {
  width: 100%;
  padding-left: 10px;
}

.bonus-block {
  background: radial-gradient(77.6% 2260.54% at -22.87% 131.58%, #958a42 0%, #383a44 100%);
  box-shadow: -6px 4px 13px 2px rgba(0, 0, 0, 0.25);
  display: flex;
  margin: auto;
  margin-bottom: 1rem;
  border-radius: 5px;
  height: 4.5rem;
  width: 87%;
  position: relative;
  z-index: 2;

  &__1 {
    border-right: 1px solid rgba(196, 196, 196, 0.1);
    flex: 65%;
    padding: 5px;
    @media (max-width: 420px) {
      font-size: 12px;
    }
    div {
      margin: auto;
      margin-left: 1rem;
      margin-top: 0.2rem;
    }
  }

  &__2 {
    flex: 35%;
    top: 5px;
    left: 15px;
    position: relative;
    @media (max-width: 420px) {
      left: 0px;
    }

    .bag-icon {
      position: absolute;
      left: 0.2rem;
      top: 0.7rem;
    }

    .label {
      position: absolute;
      left: 2.5rem;
      top: 0.9rem;
    }
  }
}

.flag-icon-1 {
  position: absolute;
  height: 3.5rem;
  left: 0.5rem;
  top: 0.5rem;
}

.flag-icon-2 {
  position: absolute;
  height: 3.5rem;
  right: 0.5rem;
  top: 0.5rem;
  transform: scale(-1, 1);
}

@media (max-width: 400px) {
  .button-group {
    padding-left: 0px;
  }
  .bonus-block {
    height: 5.5rem;
  }
  .flag-icon-1 {
    height: 5.5rem;
    left: 0;
  }
  .flag-icon-2 {
    height: 5.5rem;
    right: 0;
  }
  .bonus-block__2 {
    text-align: center;
  }
}

::v-deep .p-inputnumber-input {
  border-radius: 15px;
  background-color: #383a44;
  padding-left: 20px;
}

.input-text {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  height: 70px;
}

.text {
  margin-left: 1rem;
  margin-bottom: 0.4rem;
}

.amount_select {
  display: flex;
  justify-content: space-between;
}

.amount {
  display: block;
  width: 100%;
  margin: 0 0.2rem;
  padding: 0.4rem;
  background: #62587c;
  border: 1px solid rgba(115, 115, 115, 0.1);
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
}

.button-pay {
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 1rem;
  border-radius: 10px;
}

.qr-block {
  width: 170px;
  height: 170px;
  display: block;
  padding: 10px;
  border-radius: 15px;
  background-color: #383a44;
  margin: 0 auto 10px auto;
}

.qr-item {
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding: 5px
}

.qr-main {
  width: 100%;
}

.qr-text {
  color: #fff;
  font-weight: bold;
  max-width: 90%;
  margin: 5px;
  word-wrap: break-word;
  font-size: 0.9rem;
  width: 100%;
  justify-content: space-between;
  position: relative;

  .pi-clone {
    top: 0;
    right: 5px;
  }
}

.block-qr {
  width: 100%;
}

.faq-block {
  background-color: rgba(56, 58, 68, 0.5);
  border-radius: 15px;
  padding: 20px 12px;

  & span {
    color: #FAFF00;
  }
}

@media (max-width: 1200px) {
  .qr-text div {
    font-size: 1rem;
  }
}

@media (max-width: 900px) {
  .qr-text div {
    font-size: 0.85rem;
    min-width: 95%;
  }
}

@media (max-width: 390px) {
  .qr-text div {
    font-size: 0.75rem;
    min-width: 95%;
  }
  .bag-icon {
    top: 1.3rem;
  }
}

</style>
