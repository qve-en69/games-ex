<template>
  <div class="col-12 p-fluid">
    <p>{{ $t('profile.general.login') }}</p>
    <div class="p-inputgroup mt-1 mb-2">
      <InputText @input="$v.items.login.$touch()" type="text"
                 v-model.trim="items.login"
                 class="p-form-control"
                 style="border-radius: 15px"
                 :disabled="true"
      />
    </div>
    <p>{{ $t('profile.general.email') }}</p>
    <div class="p-inputgroup mt-1">
      <InputText @input="$v.items.email.$touch()" type="text"
                 :class="{ 'is-invalid': $v.items.email.$dirty && $v.items.email.$invalid }"
                 v-model.trim="items.email"
                 class="p-form-control"
                 style="border-radius: 15px; padding-right: 200px"
                 :disabled="items.emailVerified || sent"
      />

      <Button v-if="sent" style="border-radius: 5px;" class="button-submit p-button-success">
        <i class="fas fa-check-circle"></i>
        {{ $t('profile.general.button_sent') }}
      </Button>
      <Button v-else-if="items.emailVerified" style="border-radius: 5px;" class="button-submit p-button-success">
        <i class="fas fa-check-circle"></i>
        {{ $t('profile.general.confirm') }}
      </Button>
      <Button v-else style="border-radius: 5px;" @click.prevent="setConfirmEmail" class="button-submit p-button-secondary">
        <i class="fas fa-check-circle"></i>
        {{ $t('profile.general.button_confirm') }}
      </Button>
    </div>
    <div class="invalid-feedback invalid-input">
                          <span v-if="!$v.items.email.minLength">
                            {{ $t('profile.general.min_length') }}
                          </span>
      <span v-else-if="!$v.items.email.required">
                            {{ $t('profile.general.email') }}
                          </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'Email',
  data: () => ({
    items: {
      email: '',
      login: '',
      emailVerified: false
    },
    sent: false
  }),
  validations: {
    items: {
      email: {
        required,
        email
      }
    }
  },
  computed: {
    ...mapGetters('profile/email', {
      email: 'getProfileEmail',
      emailVerified: 'getEmailVerified'
    }),
    ...mapGetters('user', {
      login: 'getLogin'
    })
  },
  methods: {
    ...mapActions('profile/email', ['confirmEmail', 'initEmail']),
    async setConfirmEmail () {
      if (!this.$v.$invalid) {
        this.$noty.success('На вашу почту отправлено письмо для подтверждения')
        try {
          await this.confirmEmail(this.items.email)
          this.sent = true
        } catch (e) {
          this.$noty.error(e.response.data.message)
        }
      } else {
        this.$noty.error('Введите корректный email')
      }
    }
  },
  created () {
    this.initEmail()
    this.items.email = this.email
    this.items.emailVerified = this.emailVerified
    console.log(this.email)
  },
  beforeMount () {
    console.log(this.email)
    this.items.login = this.login
  },
  mounted () {
    this.items.email = this.email
    console.log(this.email)
  }
}
</script>

<style scoped lang="scss">

::v-deep .p-inputtext {
  font-size: 18px;
}

.p-form-control {
  border-radius: 15px;
  background-color: #383A44;
  height: 54px;
  font-size: 18px;
}

p {
  margin-bottom: 7px;
}

.invalid-feedback {
  margin-top: .07rem;
}

.invalid-input {
  position: absolute;
  z-index: 2;
  top: 100%;
  font-size: 13px;
  left: 10px;
}

@media (max-width: 600px) {
  .invalid-input {
    font-size: 12px;
  }
}

.button-submit {
  position: absolute;
  right: 30px;
  top: 134px;
  height: 33px;
  z-index: 1;
  background-color: #252831;
}

.p-fluid .p-inputgroup .p-button.p-button-icon-only {
  width: 11rem;
  height: 33px;
}

.p-button.p-button-success,
.p-button.p-button-success:enabled:focus,
.p-button.p-button-success:enabled:hover,
.p-button.p-button-success:hover {
  background-color: #1b1e26 !important;
  color: #ADFF00;
  border-color: #252831 !important;
  box-shadow: 0 0 0 1px #252831;
}

.p-button.p-button-success:hover {
  background-color: #252831 !important;
  color: #ADFF00;
}

.p-button {
  padding: 0.75rem 0.75rem !important;
}

.fa-check-circle {
  margin-right: 10px;
}

@media (max-width: 1200px) {
  .button-submit {
    top: 128px;
  }
}

</style>
