<template>
  <div class="air-drop">
    <div class="air-drop__container">
      <div class="air-drop__body__wrapper">
        <div class="air-drop__body">
          <div class="air-drop__body-title text-grey">
            <div class="text-center mb-3">
              {{ $t('chat.air_drop.this_air_drop') }}
            </div>
          </div>
          <div class="air-drop__body-input">
            <div class="text-grey">
              <span>{{ $t('chat.air_drop.amount_activate') }}</span>
            </div>
            <InputNumber @input="$v.limit.$touch()"
                         :class="{ 'is-invalid': $v.limit.$dirty && $v.limit.$invalid }"
                         v-model="limit" class="input mb-3"/>
            <div class="invalid-feedback invalid-input">
            <span v-if="!$v.limit.required">
              {{ $t('chat.air_drop.valid_limit') }}
            </span>
            </div>
          </div>
          <div class="air-drop__body-input">
            <div class="text-grey">
              <span>{{ $t('chat.air_drop.choise_currency') }}</span>
            </div>
            <div style="overflow: hidden" @click="changeAirDropPage({ pageAirDrop: AIR_DROP_PAGES.CHOOSE_CURRENCY })">
              <DPreviewCurrency class="input mb-3" :currency="airDropCurrency"/>
            </div>
          </div>
          <div class="air-drop__body-input">
            <div class="text-grey">
              <span>{{ $t('chat.air_drop.sum_air_drop') }}</span>
            </div>
            <InputNumber @input="$v.amount.$touch()"
                         mode="decimal"
                         :minFractionDigits="8"
                         :maxFracionDigits="8"
                         :class="{ 'is-invalid': $v.amount.$dirty && $v.amount.$invalid }"
                         v-model="amount" class="input"/>
            <div class="invalid-feedback invalid-input">
            <span v-if="!$v.amount.required">
              {{ $t('chat.air_drop.valid_amount') }}
            </span>
            </div>
          </div>
          <div class="text-center">
            <Button @click="createAirDrop(limit, getAirDropCurrencyId, amount)" class="col-12 mt-3 button-activate">
              {{ $t('chat.air_drop.start_air_drop') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DPreviewCurrency from '@/common/components/PreviewCurrency/PreviewCurrency'
import { mapActions, mapGetters, mapState } from 'vuex'
import { AIR_DROP_PAGES } from '@/modules/chat/modals/AirDropModal/constants'
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['currency'],
  name: 'PayWayChooser',
  components: { DPreviewCurrency },
  data () {
    return {
      AIR_DROP_PAGES,
      amount: 0,
      limit: 0
    }
  },
  computed: {
    ...mapState('chat/airDrop', ['airDropCurrency']),
    ...mapGetters('chat/airDrop', ['getAirDropCurrencyId'])
  },
  validations: {
    limit: {
      required
    },
    amount: {
      required
    }
  },
  methods: {
    ...mapActions('chat', ['createBonus']),
    ...mapActions('chat/airDrop', ['changeAirDropPage']),
    createAirDrop (limit, getAirDropCurrencyId, amount) {
      console.log(this.$v.$invalid)
      if (!this.$v.$invalid && this.limit > 0 && this.amount > 0) {
        this.createBonus({ limit, getAirDropCurrencyId, amount }).then(() => {
          this.$noty.success('AirDrop created')
          this.$emit('close')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v--modal {
  background-color: transparent;
  display: flex;
  justify-content: center;
}

.v--modal-overlay {
  background: rgba(0, 0, 0, 0.76);
}

.v--modal-box {
  top: 0 !important;
}

.air-drop {
  display: flex;
  justify-content: center;
  max-height: 465px;
  height: 90vh;
  width: 100%;
  background-color: #1C1F29;
  max-width: 465px;

  &__container {
    position: relative;
    background-color: #1c1f29;
    color: white;
    border: none;
  }

  &__body {
    background-color: #292C38;
    padding: 20px 33px;
    border-radius: 15px;
  }
}

.air-drop__body__wrapper {
  overflow: auto;
  border-radius: 15px;
  background-color: #292C38;
  //height: calc(90vh - 56px);
}

.air-drop__body__wrapper::-webkit-scrollbar {
  width: 0;
}

.rules {
  font-size: 17px;
}

.button-activate {
  color: white;
  height: 55px;
  justify-content: center;
  font-size: 18px;
  border-radius: 15px !important;
  max-width: 252px;
}
.text-grey {
  color: #969696;
  font-size: 16px;
  margin-bottom: 8px;
}

.air-drop::-webkit-scrollbar {
  width: 0;
}

@media (max-width: 576px) {
  .air-drop__container {
    width: 100vw;
    max-height: 100vh;
    height: 100vh
  }
  .air-drop__body__wrapper {
    width: 100vw;
    //max-height: calc(100vh - 50px);
    height: 100vh
  }
  .air-drop {
    width: 100vw;
    max-height: 100vh;
    height: 100vh;
    max-width: 100vw;
  }
  .air-drop__body {
    width: 100vw;
  }
}

.input {
  max-height: 55px;
  width: 100%;
}
</style>
