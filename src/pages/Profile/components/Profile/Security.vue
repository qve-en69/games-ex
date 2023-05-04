<template>
  <div class="col-12">
    <div class="row">
      <div class="card-body py-0 mb-3">
        <form>
          <div class="form-row">
            <div class="col-12 p-fluid">
              <div v-if="loginUser" class="row">
                <div class="col-12 col-md-6 p-fluid">
                  <div class="p-float-label">
                    <p>{{ $t('profile.security.new_password') }}</p>
                    <InputText @input="$v.password.$touch()"
                               :class="{ 'is-invalid': $v.password.$dirty && $v.password.$invalid }"
                               v-model.trim="password"
                               type="password"
                               class="p-form-control"
                    />
                    <div class="invalid-feedback invalid-input">
                      <span v-if="!$v.password.required">
                        {{ $t('profile.security.enter_password') }}
                      </span>
                      <span v-else-if="!$v.password.hasUppercase">
                        {{ $t('profile.security.password_has_uppercase') }}
                      </span>
                      <span v-else-if="!$v.password.hasLowercase">
                        {{ $t('profile.security.password_has_lowercase') }}
                      </span>
                      <span v-else-if="!$v.password.hasNumber">
                        {{ $t('profile.security.password_has_number') }}
                      </span>
                      <span v-else-if="!$v.password.minLength">
                        {{ $t('profile.security.enter_password_minLength') }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 p-fluid">
                  <div class="p-float-label">
                    <p>{{ $t('profile.security.confirm_password') }}</p>
                    <InputText @input="$v.repeatPassword.$touch()"
                               :class="{ 'is-invalid': $v.repeatPassword.$dirty && $v.repeatPassword.$invalid }"
                               v-model.trim="repeatPassword"
                               type="password"
                               class="p-form-control"
                    />
                    <div class="invalid-feedback invalid-input invalid-confirm">
                      {{ $t('profile.security.password_not_match') }}
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 mt-3 p-fluid">
                  <div class="p-float-label">
                    <p>{{ $t('profile.security.current_password') }}</p>
                    <InputText
                      v-model.trim="currentPassword"
                      type="password"
                      class="p-form-control"
                    />
                    <div class="invalid-feedback invalid-input invalid-confirm">
                      {{ $t('profile.security.password_not_match') }}
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-12 mt-3 pl-sm-3">
                  <Button @click.prevent="savePassword" :disabled="(this.$v.repeatPassword.$invalid || this.$v.password.$invalid || !(currentPassword.length > 5))" class="justify-content-center button-submit w-100">
                    {{ $t('profile.security.button_save') }}
                  </Button>
                </div>
              </div>
              <div v-else class="row">
                <div class="col-12 col-md-6 p-fluid">
                  <div class="p-float-label">
                    <p>{{ $t('profile.security.you_login') }}</p>
                    <InputText @input="$v.login.$touch()"
                               :class="{ 'is-invalid': $v.login.$dirty && $v.login.$invalid }"
                               v-model.trim="login"
                               type="text"
                               class="p-form-control"
                    />
                    <div class="invalid-feedback invalid-input">
                      <span v-if="!$v.login.required">
                        {{ $t('profile.security.enter_login') }}
                      </span>
                      <span v-else-if="!$v.login.minLength">
                        {{ $t('profile.security.enter_login_minLength') }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 p-fluid">
                  <div class="p-float-label">
                    <p>{{ $t('profile.security.new_password') }}</p>
                    <InputText @input="$v.password.$touch()"
                               :class="{ 'is-invalid': $v.password.$dirty && $v.password.$invalid }"
                               v-model.trim="password"
                               type="password"
                               class="p-form-control"
                    />
                    <div class="invalid-feedback invalid-input">
                      <span v-if="!$v.password.required">
                        {{ $t('profile.security.enter_password') }}
                      </span>
                      <span v-else-if="!$v.password.hasUppercase">
                        {{ $t('profile.security.password_has_uppercase') }}
                      </span>
                      <span v-else-if="!$v.password.hasLowercase">
                        {{ $t('profile.security.password_has_lowercase') }}
                      </span>
                      <span v-else-if="!$v.password.hasNumber">
                        {{ $t('profile.security.password_has_number') }}
                      </span>
                      <span v-else-if="!$v.password.minLength">
                        {{ $t('profile.security.enter_password_minLength') }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 mt-3 p-fluid">
                  <div class="p-float-label">
                    <p>{{ $t('profile.security.confirm_password') }}</p>
                    <InputText @input="$v.repeatPassword.$touch()"
                               :class="{ 'is-invalid': $v.repeatPassword.$dirty && $v.repeatPassword.$invalid }"
                               v-model.trim="repeatPassword"
                               type="password"
                               class="p-form-control"
                    />
                    <div class="invalid-feedback invalid-input invalid-confirm">
                      {{ $t('profile.security.password_not_match') }}
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-12 mt-3 pl-sm-3">
                  <Button @click.prevent="createLocalAccountVue" class="justify-content-center button-submit w-100">
                    {{ $t('profile.security.button_save') }}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-if="loginUser" class="row">
      <div class="card-header">
        <!--        {{ $t('profile.security.two_factor_authentication }}-->
        {{ $t('profile.security.fa2_auth') }}
      </div>
      <div class="card-body mt-1 py-0 row two-factor">
        <div class="card-text text-center font-weight-light mb-2 text-white">
          {{ $t('profile.security.protect_account') }}
        </div>
        <Button v-if="!user.tfa" @click="enable2FA(); toggle = !toggle" class="ml-2 mb-2 button-fa">
          {{ $t('profile.security.enable_2FA') }}
        </Button>
        <Button v-else @click="disable2FA()" class="button-fa fa-disable">
          {{ $t('profile.security.disable_2FA') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TwoFaModal from '../../modals/TwoFaModal'
import TwoFaDisableModal from '../../modals/TwoFaDisableModal'
import { sameAs, required, minLength } from 'vuelidate/lib/validators'
import { hasUppercase, hasLowercase, hasNumber } from '@/utils/validators'
import { NOTIFICATION_LEVEL } from '@/common/constants'

export default {
  name: 'Security',
  data: () => ({
    password: '',
    repeatPassword: '',
    currentPassword: '',
    twoFA: false,
    toggle: false,
    login: ''
  }),
  validations: {
    password: {
      minLength: minLength(6),
      required,
      hasUppercase,
      hasLowercase,
      hasNumber
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    },
    login: {
      minLength: minLength(6),
      required
    }
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
      checkAuth: 'auth',
      loginUser: 'getLogin',
      profileID: 'profileID'
    })
  },
  methods: {
    ...mapActions('profile/securityProfile', ['changePassword', 'createLocalAccount']),
    ...mapActions('user', ['me']),
    ...mapActions('notifications', ['addNotification']),
    savePassword () {
      if (!this.$v.$invalid.password && !this.$v.$invalid.repeatPassword) {
        this.changePassword({ password: this.password, oldPassword: this.currentPassword })
          .then(() => this.$noty.success('Success'))
          .catch((e) => this.$noty.error(e.response.data.message))
      } else {
        this.addNotification({ level: NOTIFICATION_LEVEL.ERROR, text: this.$t('profile.error[11]') })
      }
    },
    createLocalAccountVue () {
      if (!this.$v.$invalid) {
        this.createLocalAccount({ login: this.login, password: this.password })
          .then(data => {
            this.me()
          })
      } else {
        this.addNotification({ level: NOTIFICATION_LEVEL.ERROR, text: this.$t('profile.error[11]') })
      }
    },
    enable2FA () {
      this.$modal.show(TwoFaModal, {}, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    },
    disable2FA () {
      this.$modal.show(TwoFaDisableModal, {}, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */
{
  transform: translateY(-30px);
  opacity: 0;
}

.twofa-key {
  padding-right: 38px;
  padding-bottom: 24px !important;
}

.two-factor-hide {
  border: 1px solid rgba(115, 115, 115, 0.51);
  border-radius: 15px;
  font-size: 14px;
  text-align: left !important;
  padding: 28px 15px 18px 15px !important;
}

.two-factor {
  display: flex;
  border: 1px solid rgba(115, 115, 115, 0.51);
  border-radius: 15px;
  font-size: 14px;
  text-align: left !important;
  padding: 28px 15px 18px 15px !important;
  justify-content: space-around;

  &__text span {
    color: #FAFF00;
  }

  &__content {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__inputs {
    width: 55%;
  }

  &__label-text {
    font-size: 14px;
  }
}

::v-deep .p-inputtext {
  padding-left: 7px;
  font-size: 18px;
}

.form-row > .col, .form-row > [class*=col-] {
  padding-right: 0px;
  padding-left: 0px
}

.card-header {
  background: transparent;
  color: white;
  font-size: 24px;
  margin-left: -5px;
  font-weight: 700;
}

.invalid-input {
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 10px;
  font-size: 13px;
}

.invalid-email {
  margin-left: 16px
}

.p-form-control {
  height: 54px;
  font-size: 18px;

  &__two-factor {
    width: 100%;
  }
}

.button-submit {
  height: 54px;
  margin-top: 30px;
  border-radius: 15px;
}

@media (max-width: 600px) {
  .invalid-input {
    font-size: 12px;
  }
  .button-confirm {
    font-size: 12px;
  }
}

.social {
  border-radius: 15px;
  margin-left: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 5px;
  color: white;

  &-vk {
    height: 40px;
    width: 60px;
    background-color: #5181b8;
  }

  &-telegram {
    height: 40px;
    width: 100px;
    background-color: #3390ec;
  }

  &-facebook {
    height: 40px;
    width: 110px;
    background-color: #4267b2;
  }

  &-google {
    height: 40px;
    width: 80px;
    background-color: #d93a3a;
  }

  &-ok {
    height: 40px;
    width: 60px;
    background-color: #ef8d2d;
  }

  &:hover {
    opacity: 0.9;
  }
}

.invalid-feedback {
  margin-top: .07rem;
}

.button-fa {
  color: white;
  height: 25px;
  font-size: 12px;
  min-width: 103px !important;
}

.button-fa:hover {
  color: white;
}

.fa-disable {
  min-width: 106px !important;
}

.fa-two-body {
  display: flex;
  align-items: center;
  background-color: rgb(93 93 93 / 0%);
  border: 1px solid rgb(197 224 255 / 28%);
  border-radius: 5px;
  width: 95%;
  margin: auto;
}

p {
  margin-bottom: 7px;
}
</style>
