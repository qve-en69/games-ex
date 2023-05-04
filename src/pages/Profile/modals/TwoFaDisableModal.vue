<template>
  <DModal>
    <div class="two-fa-disable">
      <div class="two-fa-disable__container">
        <div class="two-fa-disable__header">
          <div class="two-fa-disable__header--title mt-2">{{ $t('profile.fa2.name') }}</div>
          <div class="two-fa-disable__close" @click="$emit('close')">
            <div class="two-fa-disable__close-icon">
              <i class="pi pi-times"></i>
            </div>
          </div>
        </div>
        <div class="two-fa-disable__body__wrapper">
          <div class="two-fa-disable__body py-0">
            <div class="row mt-2">
              <div class="col-12">
                <div class="p-float-label">
                  <p class="text-grey mt-3">{{ $t('profile.fa2[7]') }}</p>
                  <InputText
                    v-model.trim="password"
                    type="password"
                    class="p-form-control"
                  />
                  <div class="invalid-feedback invalid-input invalid-confirm">
                    {{ $t('profile.security.password_not_match') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="p-float-label mt-3">
              <p class="text-grey">Введите 6-значный код из приложения</p>
              <div class="code-wrapper">
                <PincodeInput v-model="codeAuth" placeholder="-" :length="6" />
              </div>
              <div class="invalid-feedback invalid-input invalid-confirm">
                {{ $t('profile.security.password_not_match') }}
              </div>
            </div>
            <Button @click="disable" :disabled="codeAuth < 6" class="col-12 mt-3 button-activate">{{ $t('profile.fa2[10]') }}</Button>
          </div>
        </div>
      </div>
    </div>
  </DModal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DModal from '@/common/components/Modal/Modal'
import PincodeInput from 'vue-pincode-input'

export default {
  name: 'TwoFaDisableModal',
  components: { DModal, PincodeInput },

  data () {
    return {
      codeAuth: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
      checkAuth: 'auth',
      profileID: 'profileID'
    })
  },
  methods: {
    ...mapActions('user', ['disable2FA']),
    disable () {
      this.disable2FA({ code: this.codeAuth, password: this.password })
        .then(data => {
          this.$noty.success('success')
          this.$emit('close')
        })
        .catch(e => {
          this.$noty.error(e.response.data.message)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.v--modal {
  background-color: transparent;
  display: flex;
  justify-content: center;
}
.v--modal-overlay {
  background: rgba(0, 0, 0, 0.76);
}
.v--modal-box {
  top: 0px !important;
}

.two-fa-disable {
  display: flex;
  justify-content: center;
  height: 90vh;
  max-height: 371px;
  width: 100%;
  background-color: #1C1F29;

  &__container {
    position: relative;
    background-color: #1c1f29 !important;
    color: white;
    border: none;
  }
  &__header {
    background-color: #1C1F29;
    padding: 6px 10px 12px 22px;
  }
  &__header--title {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    margin-top: 5px;
  }
  &__body {
    background-color: #292C38;
    padding: 0 30px 20px 20px !important;
    border-radius: 15px;
    width: 480px;
  }
  &__close {
    top: 8px;
    border-radius: 6px;
    position: absolute;
    right: 10px;
    z-index: 2;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    &-icon {
      font-size: 1.3rem;
      color: #90929f;
      margin-top: 2px;
      margin-right: 5px;
      &:hover {
        color: #6e7078;
      }
    }
  }
}

.two-fa-disable__body__wrapper {
  max-height: 322px;
  overflow: auto;
  border-radius: 15px;
  background-color: #292C38;
  height: calc(90vh - 49px)
}
.two-fa-disable__body__wrapper::-webkit-scrollbar {
  width: 0;
}

.form-control {
  position: relative;
  color: white;
  height: 44px;
  text-align: left;
}
.form-control.is-invalid, .was-validated .form-control:invalid {
  padding-right: .75rem;
}
.form-control::-webkit-input-placeholder {
  color: #90929f;
  font-size: 16px;
}

.button-activate {
  color: white;
  height: 55px;
  text-align: center;
  justify-content: center;
}

input.vue-pincode-input {
  max-width: 55px !important;
  height: 55px;
  background-color: #383A44;
  border-radius: 15px;
  box-shadow: none;
  border: 1px transparent solid;
  transition: .3s all ease-in-out;
  color: #fff;
  font-size: 16px;
}

input.vue-pincode-input:hover {
  border-color: #b19df7;
}

input.vue-pincode-input:focus {
  box-shadow: 0 0 0 1px #7f69ce;
  border-color: #b19df7;
  outline: 0 none;
  outline-offset: 0;
}

@media (max-width: 576px) {
  .two-fa-disable__container {
    width: 100vw;
    max-height: 100vh;
    height: 100vh
  }
  .two-fa-disable {
    width: 100vw;
    max-height: 100vh;
    height: 100vh
  }
  .two-fa-disable__body {
    width: 100vw;
    height: 100vh;
  }
  .two-fa-disable__body__wrapper {
    width: 100vw;
    max-height: calc(100vh - 50px);
    height: 100vh
  }
  .input-key-wrapper {
    width: 100%;
  }
}

@media (max-width: 440px) {
  .two-fa-disable {
    background: #1c1f29;
    align-items: flex-start;
  }
}

</style>
