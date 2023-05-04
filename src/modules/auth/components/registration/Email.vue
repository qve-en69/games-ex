<template>
  <form class="form-signin">
    <div class="px-3">
      <div class="input-group">
        <InputText @input="$v.items.login.$touch()"
                   :class="{ 'is-invalid': $v.items.login.$dirty && $v.items.login.$invalid }"
                   v-model.trim="items.login" type="text" id="inputEmail" class="p-form-control" :placeholder="$t('authentication.you_login')"
                   autocorrect="null"
        />
        <div class="invalid-feedback invalid-input">
            <span v-if="!$v.items.login.required">
              {{ $t('authentication.enter_login') }}
            </span>
            <span v-if="!$v.items.login.alpha">
               {{ $t('authentication.name_correct') }}
            </span>
        </div>
      </div>
      <div class="input-group">
        <InputText @input="$v.items.email.$touch()"
                   :class="{ 'is-invalid': $v.items.email.$dirty && $v.items.email.$invalid }"
                   v-model.trim="items.email" type="text" id="inputEmail" class="p-form-control" placeholder="E-mail"
                   autocorrect="null"
        />
        <div class="invalid-feedback invalid-input">
            <span v-if="!$v.items.email.required">
              {{ $t('authentication.enter_email') }}
            </span>
          <span v-else-if="!$v.items.email.email">
              {{ $t('authentication.enter_email_valid') }}
            </span>
        </div>
      </div>
      <div class="input-group">
        <Password @input="$v.items.password.$touch()"
                  toggleMask
                  :class="{ 'is-invalid': $v.items.password.$dirty && $v.items.password.$invalid }"
                  v-model.trim="items.password" type="password" id="inputPassword" class="p-input-password"
                  :placeholder="($t('authentication.enter_password'))"
                  input-style="padding-left: 20px"
        />
        <div class="invalid-feedback invalid-input">
            <span v-if="!$v.items.password.required">
              {{ $t('authentication.enter_password') }}
            </span>
          <span v-else-if="!$v.items.password.hasUppercase">
              {{ $t('authentication.password_has_uppercase') }}
            </span>
          <span v-else-if="!$v.items.password.hasLowercase">
              {{ $t('authentication.password_has_lowercase') }}
            </span>
          <span v-else-if="!$v.items.password.hasNumber">
              {{ $t('authentication.password_has_number') }}
            </span>
          <span v-else-if="!$v.items.password.minLength">
              {{ $t('authentication.enter_password_minLength') }}
            </span>
        </div>
      </div>
      <!--        <div class="input-group" v-if="hasReferer">-->
      <!--          <div class="input-group-prepend">-->
      <!--            <span class="input-group-text mt-2"> <i class="fas fa-user-friends"></i></span>-->
      <!--          </div>-->
      <!--          <InputText :value="`Реферал: ${refererInfo.nick}`"-->
      <!--                class="mt-2 p-form-control invite" />-->
      <!--        </div>-->
    </div>
    <Divider class="divider"/>
    <div class="px-3">
      <div class="reg-press">
        <div class="chbox-container">
          <Checkbox class="chbox" v-model="agree" :binary="true"/>
        </div>
        <div class="ml-1 text-left agree-text">
            <span>{{ $t('authentication.confirmation_agreement.text_1') }}
              <span @click="getConditionOfUsage">
                <router-link class="reg-press-active" tag="a"
                             :to="'/terms'">{{ $t('authentication.confirmation_agreement.text_2') }}</router-link>
              </span>
              {{ $t('authentication.confirmation_agreement.text_3') }}
            </span>
        </div>
      </div>
      <div class="buttons">
        <Button @click.prevent="$emit('update:component', 'Auth')" class="my-2 button-submit button-back" type="submit">
          <i class="pi pi-chevron-left"/>
          <div class="btn-text">{{ $t('authentication.auth').toUpperCase() }}</div>
        </Button>
        <Button @click.prevent="$emit('update:component', 'EmailAvatar'); Submit()"
                class="my-2 button-submit button-forward" type="submit" :disabled="(!agree || this.$v.$invalid)">
          {{ $t('authentication.create_account').toUpperCase() }}
        </Button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { email, required, minLength, helpers } from 'vuelidate/lib/validators'

import { hasUppercase, hasLowercase, hasNumber } from '@/utils/validators'
const alpha = helpers.regex('alpha', /^[A-z0-9_-]{3,16}$/)

export default {
  components: {},
  data () {
    return {
      items: {
        email: '',
        password: '',
        login: ''
      },
      success: true,
      msg: '',
      agree: false
    }
  },
  computed: {
    ...mapGetters('navigations', ['conditionOfUsage'])

  },
  validations: {
    items: {
      login: {
        required,
        alpha
      },
      email: {
        required,
        email
      },
      password: {
        minLength: minLength(6),
        required,
        hasUppercase,
        hasLowercase,
        hasNumber
      }
    }
  },
  methods: {
    ...mapActions('navigations', ['setConditionOfUsage']),
    ...mapActions('registration', ['registerEmail']),
    ...mapMutations('registration', ['setRegistationPair']),
    Submit () {
      if (!this.$v.$invalid) {
        this.$recaptchaLoaded().then(() => {
          this.$recaptcha('login').then((token) => {
            const data = {
              email: this.items.email,
              password: this.items.password,
              login: this.items.login,
              rToken: token
            }
            this.setRegistationPair(data)
          })
        })
      }
    },
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

.agree-text {
  font-weight: 300;
  font-size: 15px
}

@media (max-width: 375px) {
  .agree-text {
    font-size: 13px;
  }
}

.btn-text {
  width: 100%;
  margin-left: -10px
}

.pi-chevron-left {
  padding-left: 10px
}

::v-deep .pi-eye:hover  {
  cursor: pointer;
}
::v-deep .pi-eye-slash:hover {
  cursor: pointer;
}

::v-deep #inputPassword {
  padding-left: 0;
}

::v-deep #inputPassword::-webkit-input-placeholder {
  padding-left: 0;
}

.input-group {
  margin-bottom: 20px;
}

.p-form-control {
  position: relative;
  color: white;
  border-radius: 20px;
  background-color: #383A44;
  padding-left: 20px;
  height: 60px;
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

.invalid-input {
  position: absolute;
  z-index: 2;
  top: 90%;
  font-size: 12px;
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

@media (max-width: 600px) {
  .invalid-input {
    font-size: 10px;
    top: 100%;
  }
  .reg-press {
    font-size: 12px;
  }
  .invalid-feedback {
    margin-top: 0.25rem;
  }
  .divider {
    overflow: visible;
    padding-bottom: 10px;
  }
}
</style>
