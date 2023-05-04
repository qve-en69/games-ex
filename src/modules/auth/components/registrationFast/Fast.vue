<template>
    <form class="form-signin" style="margin-top: -10px">
      <Divider class="divider"/>
      <div class="px-3">
        <div class="reg-press">
          <div class="chbox-container">
            <Checkbox class="chbox" v-model="agree" :binary="true" />
          </div>
          <div class="ml-1 text-left" style="font-weight: 300; font-size: 15px">
            <span> {{ $t('authentication.confirmation_agreement.text_1') }}
              <span @click="getConditionOfUsage">
                <router-link class="reg-press-active" tag="a" :to="'/terms'">{{ $t('authentication.confirmation_agreement.text_2') }}</router-link>
              </span>
              {{ $t('authentication.confirmation_agreement.text_3') }}
            </span>
          </div>
        </div>
        <div class="buttons">
          <Button @click.prevent="$emit('update:component', 'Auth')" class="my-2 btn-block button-submit button-back" type="submit">
            <i class="pi pi-chevron-left"/>
            <div class="btn-text">{{ $t('authentication.auth').toUpperCase() }}</div>
          </Button>
          <Button @click.prevent="$emit('update:component', 'FastRegistration')" class="y-2 btn-block button-submit button-forward" type="submit" :disabled="!agree">
            {{ $t('authentication.create_account').toUpperCase() }}
          </Button>
        </div>
      </div>
    </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      success: true,
      msg: '',
      agree: false
    }
  },
  computed: {
    ...mapGetters('navigations', ['conditionOfUsage'])
  },
  methods: {
    ...mapActions('navigations', ['setConditionOfUsage']),
    Back () {
      this.$emit('modal', 'auth')
    },
    getConditionOfUsage () {
      this.setConditionOfUsage()
    }
  }
}
</script>

<style scoped lang="scss">

.btn-text {
  width: 100%;
  margin-left: -10px
}
.pi-chevron-left {
  padding-left: 10px
}

.input-group {
  margin-bottom: 15px;
}

.p-form-control {
  position: relative;
  color: white;
  height: 60px;
  border-radius: 20px;
  background-color: #383A44;
  padding-left: 20px;
}

.p-form-control::-webkit-input-placeholder {
  color: #90929f;
}
.p-form-control:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.p-form-control.is-invalid, .was-validated .p-form-control:invalid {
  padding-right: .75rem;
}

.invite {
  background-color: #121318;
  border-left: 1px solid #383838;
  font-size: 13px;
}

.reg-press {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  &-active {
    color: white;
    &:hover {
      color: yellow;
    }
  }
}
@media (max-width: 600px) {
  .reg-press {
    font-size: 12px;
  }
}

.invalid-input {
  position: absolute;
  z-index: 2;
  top: 90%;
  font-size: 12px;
}
@media (max-width: 600px) {
  .invalid-input {
    font-size: 10px;
    top: 100%;
  }
  .divider {
    overflow: visible;
    padding-bottom: 10px;
  }
}

.invalid-feedback {
  margin-top: 0.45rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.button-back {
  border-radius: 17px;
  width: 30%;
  background: #1C1F29;
  border: 2px solid #7C4EFF;
  color: #7C4EFF;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 0 9px;
}

.button-forward {
  border-radius: 17px;
  width: 67%;
  font-weight: bold;
}

.chbox-container {
  margin: 0.2rem 0.3rem 0 1rem;
}

::v-deep .p-checkbox .p-checkbox-box {
  height: 1rem;
  width: 1rem;
}
</style>
