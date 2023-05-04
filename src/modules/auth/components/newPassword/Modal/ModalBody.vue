<template>
  <div class="modal-body-my">
    <div class="promo-modal">
      <div class="promo-modal__container">
        <div class="text-center">
          <img class="img-newpass" src="@/assets/images/auth/new-password.png" alt="">
          <p class="text-grey-top">{{ $t('authentication.recovery_password_title') }}</p>
          <p class="text-grey">{{ $t('authentication.remember_passord') }}</p>
          <InputText @input="$v.password.$touch()"
                     :class="{ 'is-invalid': $v.password.$dirty && $v.password.$invalid }"
                     v-model.trim="password"
                     :placeholder="( $t('authentication.new_password') )"
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
          <InputText @input="$v.repeatPassword.$touch()"
                     :class="{ 'is-invalid': $v.repeatPassword.$dirty && $v.repeatPassword.$invalid }"
                     v-model.trim="repeatPassword"
                     :placeholder="( $t('authentication.enter_new_password') )"
                     type="password"
                     class="p-form-control"
          />
          <div v-if="!$v.repeatPassword.sameAsPassword" class="invalid-feedback invalid-input invalid-confirm">
            {{ $t('profile.security.password_not_match') }}
          </div>
        </div>
        <div class="text-center">
          <Button  @click="changePassword" class="button-submit p-button">
            {{ $t('authentication.enter_input') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { minLength, required, sameAs } from 'vuelidate/lib/validators'
import { hasLowercase, hasNumber, hasUppercase } from '@/utils/validators'
import { NOTIFICATION_LEVEL } from '@/common/constants'
import { mapActions } from 'vuex'

export default {
  name: 'ModalBody',
  data () {
    return {
      password: '',
      repeatPassword: ''
    }
  },
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
    }
  },
  methods: {
    add () {
      console.log(this.password)
      console.log(this.repeatPassword)
    },
    ...mapActions('profile/securityProfile', ['setNewPasswordByToken']),
    changePassword () {
      if (!this.$v.$invalid.password && !this.$v.$invalid.repeatPassword) {
        this.setNewPasswordByToken({ password: this.password, token: this.$route.query.token }).then(() => {
          this.$noty.success('Success')
          this.$emit('close')
        }).catch((e) => {
          this.$noty.error(e.response.data.message)
        })
      } else {
        this.addNotification({ level: NOTIFICATION_LEVEL.ERROR, text: this.$t('profile.error[11]') })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-body-my {
  width: 427px;
  padding-left: 3px;
}

.p-button {
  background: rgba(56, 58, 68, 0.84);
  border-radius: 15px;
  border: none;
  height: 31px;
  padding: 0 49px;
  margin-top: -10px;
}

.img-newpass {
  height: 10rem;
  width: 10rem;
  margin: 1rem;
}
.text-grey-top {
  font-size: 1.5rem;
}
.p-button:hover {
  background-color: #7f64e3;
}

.p-form-control {
  margin-bottom: 1rem;
}

.promo-modal {
  max-height: 600px;
  margin: 14px 0 -14px -17px;
  width: 455px;

  &__container {
    background-color: #292C38;
    padding: 0 40px;
  }

  &__avatar {
    text-align: center;
    margin-bottom: 35px;
    padding-top: 20px;

    &-border {
      border: 4px solid #4A4C56;
      box-sizing: content-box;
      border-radius: 50%;
      height: 119px;
      width: 119px;
      margin: 0 auto;
    }
  }
}

.promo-modal::-webkit-scrollbar {
  width: 0;
}
.invalid-feedback {
  margin-bottom: 1rem
}
.button-submit {
  height: 55px;
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 15px;
  width: 252px;
  background-color: #7C4EFF;
}

.promo-modal__avatar-img {
}

@media (max-width: 576px) {
  .promo-modal {
    background: #1c1f29;
    align-items: flex-start;
    width: 100vw;
    max-height: 100vh;
    height: calc(100vh - 55px);

    &__container {
      background-color: #292C38;
      width: 100%;
      height: 100%;
      padding: 0 40px;
    }
  }
}

@media (max-width: 576px) {
  .modal-body-my {
    width: 100%;
    height: 100%;
  }
}

</style>
