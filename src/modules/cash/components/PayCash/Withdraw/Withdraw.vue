<template>
  <WithdrawWrapper
    @close="$emit('close')"
  >
    <div class="container">
      <div class="text">
        <span>{{ $t('cashbox.menu.withdraw_currency') }}</span>
      </div>
      <div v-if="currencyWithdraw && payWayWithdraw && methodWithdraw">
        <div
          @click="
            changeCashPage({ pageCash: CASH_PAGES.WITHDRAW_CURRENCY_CHOOSE })
          "
        >
          <DPreviewCurrency class="active" :currency="currencyWithdraw"/>
        </div>
        <div v-if="currencyWithdraw.typeId === 'fiat'">
          <div class="text">
            <span>{{ $t('cashbox.select_payment') }}</span>
          </div>
          <div class="block">
            <div
              class="payment"
              @click="
                changeCashPage({ pageCash: CASH_PAGES.WITHDRAW_PAY_WAY_CHOOSE })
              "
            >
              <div>
                <img class="currency__icon" :src="payWayWithdraw.image"/>
                <span>{{ payWayWithdraw.name }}</span>
              </div>
              <div>
                <i class="pi pi-chevron-right"/>
              </div>
            </div>
          </div>
          <div class="text">
            <span>{{ $t('cashbox.address_for_withdraw') }}</span>
          </div>
          <InputText placeholder="Enter wallet" class="block" v-model="purseNumber"/>
        </div>
        <div v-else-if="currencyWithdraw.typeId === 'crypto'">
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
                :activeKey="payWayWithdraw.id"
              />
            </div>
          </div>
          <div class="text d-flex justify-content-between mt-4">
            <div>
              <span>{{ $t('cashbox.address_for_withdraw') }}</span>
            </div>
            <div class="mr-2">
              <span> {{ $t('cashbox.minimum_deposit') }} </span>
              <span style="color: #FAFF00;">{{ methodWithdraw.minLimit }} {{currencyWithdraw.id}}</span>
            </div>
          </div>
            <InputText
              v-model="purseNumber"
              :class="{ 'is-invalid': $v.purseNumber.$dirty && $v.purseNumber.$invalid }"
              @input="$v.purseNumber.$touch()"
              type="text"
              class="block address active"
              style="border: none !important; margin-top: 1rem"
              :placeholder="$t('cashbox.address_crypto_payment')"
            />
            <div v-if="!$v.purseNumber.required" class="invalid-feedback invalid-input invalid-confirm">
              Required
            </div>
          <div v-if="!$v.purseNumber.minLength" class="invalid-feedback invalid-input invalid-confirm">
            Min Lenght 6
          </div>
        </div>
        <div class="text">
          <span>{{ $t('cashbox.menu.withdrawal_amount') }}</span>
        </div>
        <div class="block">
          <InputNumber
            class="withdraw-amount"
            @input="$v.withdrawAmount.$touch()"
            :class="{ 'is-invalid': $v.withdrawAmount.$dirty && $v.withdrawAmount.$invalid }"
            v-model="withdrawAmount"
            :useGrouping="false"
            color="white"
            mode="decimal"
            :min-fraction-digits="currencyWithdraw.precisionUnit"
            :max-fraction-digits="currencyWithdraw.precisionUnit"
            :min="Number(methodWithdraw.minLimit)"
            :max="Number(methodWithdraw.maxLimit)"
          />
          <div v-if="!$v.withdrawAmount.required" class="invalid-feedback invalid-input invalid-confirm">
            Required
          </div>
          <div class="choice cursor-pointer">
            <div @click="changePercentAmount(25)">25%</div>
            <div class="choise-hide" @click="changePercentAmount(50)">50%</div>
            <div class="choise-hide" @click="changePercentAmount(75)">75%</div>
            <div @click="changePercentAmount(100)">100%</div>
          </div>
        </div>
        <div class="text" style="text-align: center; margin-left: 0">
          <span>{{ $t('cashbox.menu.comission') }} </span>
          <span style="font-weight: bold; color: #9184B7">{{ methodWithdraw.commission }} {{
              currencyWithdraw.id
            }}</span>
        </div>
        <Button class="button-pay mt-0" @click="GoWithdraw">
          {{ $t('cashbox.menu.withdraw_order').toUpperCase() }}
        </Button>
      </div>
      <div class="warning-withdraw">
        {{ $t('cashbox.menu.warning_withdraw') }}
      </div>
    </div>
  </WithdrawWrapper>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import {
  DButtonGroup,
  DPreviewCurrency
} from '@/common/components'

import { CASH_PAGES } from '@/modules/cash/constants'
import WithdrawWrapper from './WithdrawWrapper'
import { minLength, required } from 'vuelidate/lib/validators'

export default {
  components: {
    WithdrawWrapper,
    DPreviewCurrency,
    DButtonGroup
  },
  data () {
    return {
      CASH_PAGES
    }
  },
  validations: {
    purseNumber: {
      required,
      minLength: minLength(6)
    },
    withdrawAmount: {
      required
    }
  },
  computed: {
    ...mapGetters('cash/withdraw', {
      getPurseNumber: 'getWithdrawPurseNumber',
      currencyWithdraw: 'getCurrencyWithdraw',
      payWayList: 'getPayWayListWithdraw',
      payWayWithdraw: 'getPayWayWithdraw',
      getWithdrawAmount: 'getWithdrawAmount',
      methodWithdraw: 'getMethodWithdraw'
    }),
    ...mapGetters('user', {
      getBalanceByCurrency: 'getBalanceByCurrency'
    }),
    withdrawAmount: {
      get () {
        return this.getWithdrawAmount
      },
      set (withdrawAmount) {
        this.changeWithdrawAmount({ withdrawAmount })
      }
    },
    purseNumber: {
      get () {
        return this.getPurseNumber
      },
      set (withdrawPurseNumber) {
        this.changeWithdrawPurseNumber({ withdrawPurseNumber })
      }
    }
  },
  methods: {
    ...mapActions('cash', {
      changeCashPage: 'changeCashPage'
    }),
    ...mapActions('cash/withdraw', {
      withdraw: 'withdraw',
      changeWithdrawPurseNumber: 'changeWithdrawPurseNumber',
      changePayWayWithdraw: 'changePayWayWithdraw',
      changeWithdrawAmount: 'changeWithdrawAmount',
      changeWithdrawAmountPercent: 'changeWithdrawAmountPercent'
    }),
    GoWithdraw () {
      if (!this.$v.$invalid) {
        this.withdraw()
          .then(() => {
            this.$noty.success('success')
            this.$emit('close')
            this.$router.push({ path: 'main', query: {} })
          })
          .catch(e => {
            this.$noty.error(e.response.data.message)
          })
      } else {
        this.$v.$touch()
      }
    },
    changePercentAmount (percent) {
      this.changeWithdrawAmountPercent({ withdrawAmountPercent: percent })
    },
    onChangePurseNumber (e) {
      this.changeWithdrawPurseNumber({ withdrawPurseNumber: e.target.value })
    },
    changePayWayButton (payWayId) {
      this.changePayWayWithdraw({ payWayId })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .p-inputnumber-input {
  border-radius: 15px;
  background-color: #1c1f29;
  padding-left: 20px;
  width: 100%;
}

.container {
  padding: 1rem;
  background: #292c38
}

.block {
  background: #383a44;
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.8rem;
  border-radius: 15px;
  max-height: 70px;
  width: 100%;
  justify-content: space-between;

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

  .withdraw-amount {
    width: 10rem;
    background: inherit;
  }

  .choice div:hover {
    color: #fff;
    transition: all 0.2s;
  }
}

.text {
  margin-left: 1rem;
  margin-bottom: 0.4rem;
}

.button-pay {
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 1rem;
  border-radius: 10px;
}

.warning-withdraw {
  background: rgba(196, 196, 196, 0.15);
  border-radius: 5px;
  padding: 1rem;
  padding-left: 1.5rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  line-height: 1.5rem;
  color: #ffffff;
}

.choice {
  display: flex;
  box-sizing: border-box;
  height: 2rem;
  margin: auto 0;
  //padding-left: 3rem;

  :first-child {
    border-radius: 1rem 0 0 1rem;
  }

  :last-child {
    border-radius: 0 1rem 1rem 0;
  }

  div {
    background: #565964;
    flex: 1;
    color: #bababa;
    margin-right: 1px;
    padding: 0.4rem 0.7rem;
    font-size: 0.8rem;
  }
}

.active {
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.active:hover {
  border-color: #b19df7;
  cursor: pointer;
}

.input-text {
  font-weight: 100;
  width: 423px;
  height: 15px;
  border: none;
  margin: 3px 0 0px -30px;
  padding: 1rem;
}

InputText {
  width: 100px;
}

.address {
  display: block;
  position: relative;
  padding: 1rem;
}

.button-group {
  width: 100%;
  padding-left: 10px;
}
.choise-hide {
  @media (max-width: 380px) {
    display: none;
  }
}
</style>
