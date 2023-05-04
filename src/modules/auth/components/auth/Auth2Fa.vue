
<template>
  <div class="justify-content-center text-center">
    <div class="p-float-label mt-3">
      <p class="reg-text text-white">{{ $t('profile.security.text_2fa') }}</p>
      <PincodeInput v-model="codeAuth" placeholder="-" :length="6"/>
      <div class="invalid-feedback invalid-input invalid-confirm">
        {{ $t('profile.security.password_not_match') }}
      </div>
    </div>
    <Divider class="divider"/>
    <div class="px-3">
      <Button @click.prevent="Sumbit" :disabled="codeAuth.length < 6" class="mb-1 button-submit" type="submit">
        {{ $t('authentication.fast_register.submit').toUpperCase() }}
      </Button>
    </div>
  </div>
</template>

<script>
import PincodeInput from 'vue-pincode-input'
import { mapActions } from 'vuex'

export default {
  components: { PincodeInput },
  props: ['token'],
  data () {
    return {
      codeAuth: ''
    }
  },
  methods: {
    ...mapActions('auth', ['loginByTfaToken']),
    Sumbit () {
      if (this.loginByTfaToken({ token: this.token, code: this.codeAuth })) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.reg-text {
  margin: 1rem 0;
  font-weight: 300;
  font-size: 1.1rem;
}

.button-submit {
  border-radius: 17px;
  font-weight: bold;
  width: 100%;
}

@media (max-width: 500px) {
  .divider {
    padding-bottom: 10px;
    overflow: visible;
  }

}
</style>
