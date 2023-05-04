<template>
  <div class="justify-content-center text-center preform">
        <div class="form-group mt-4">
          <div class="input-group col-12 mb-3">
            <InputText
              :class="{ 'is-invalid': $v.email.$dirty && $v.email.$invalid, 'is-valid': $v.email.$dirty && !$v.email.$invalid }"
              @input="$v.email.$touch()"
              placeholder="E-mail"
              type="text"
              class="p-form-control" v-model.trim="email"
            />
            <div class="invalid-feedback invalid-input">
              {{ $t('authentication.enter_email')  }}
            </div>
          </div>
        </div>
        <Divider class="divider"/>
        <div class="col-12 mt-4 text-center">
          <Button @click="recovery" class="btn-block button-submit">{{ $t('authentication.recovery_password')  }}</button>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'RecoveryPassword',
  data: () => ({
    email: ''
  }),
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    ...mapGetters('user', {
      checkAuth: 'auth'
    })
  },
  methods: {
    ...mapActions('user', ['recoveryPassword']),
    recovery () {
      if (!this.$v.$invalid) {
        this.$recaptchaLoaded().then(() => {
          this.$recaptcha('login').then((token) => {
            this.recoveryPassword({ recaptchaToken: token, email: this.email })
              .then(() => {
                this.$emit('close')
                this.$router.replace('/')
              })
          })
        })
      } else {
        this.$noty.error(this.$t('authentication.login_msg.email_incorrect)'))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.divider {
  @media (max-width: 600px) {
    overflow: visible;
    padding-bottom: 10px;
  }
}
.recovery-password-form {
  display: flex;
  justify-content: center;
}

.p-form-control {
  position: relative;
  color: white;
  border-radius: 20px;
  background-color: #383A44;
  height: 60px;
}

.p-form-control::-webkit-input-placeholder {
  color: #90929f;
}

.p-form-control:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.p-form-control.is-invalid, .was-validated .form-control:invalid {
  padding-right: .75rem;
}

.recovery-press {
  font-size: 14px;
  margin-top: 10px;

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
  top: 94%;
  right: 0%;
  font-size: 12px;
}

.valid-feedback {
  position: absolute;
  z-index: 2;
  top: 94%;
  right: 0%;
  font-size: 12px;
}

@media (max-width: 440px) {
  .invalid-input {
    font-size: 10px;
    top: 100%;
  }

  .nvalid-input {
    font-size: 10px;
    top: 100%;
  }

  .goto-auth {
    padding-left: 0 !important;
    text-align: center !important;
  }
}

.button-submit {
  border-radius: 17px;
}
</style>
