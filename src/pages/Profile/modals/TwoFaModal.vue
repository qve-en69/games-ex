<template>
  <DModal>
    <div class="two-fa__header">
      <div class="two-fa__header--title mt-2">{{ $t('profile.fa2.name') }}</div>
      <div class="two-fa__close" @click="$emit('close')">
        <i class="two-fa__close-icon pi pi-times"></i>
      </div>
    </div>
    <div class="two-fa__body__wrapper">
      <div class="two-fa__body">
        <div class="row link pb-2">
          <div class="col-12">
            <div class="text-grey">
              <span style="text-transform: uppercase">{{ $t('profile.fa2[1]') }}</span> <br>
              {{ $t('profile.fa2[2]') }} <a class="link-a" href="https://www.authy.com/"
                                            rel="noreferrer noopener" target="_blank">Authy</a>
              {{ $t('profile.fa2[3]') }}
              <a class="link-a" href="https://support.google.com/accounts/answer/106" rel="noreferrer noopener"
                 target="_blank">Google
                2FA</a>
              {{ $t('profile.fa2[4]') }}
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-4 col-md-4 col-12 text-center">
            <canvas class="qr-img" ref="qrcode"/>
          </div>
          <div class="col-md-7 col-12 rules offset-md-1 mt-1">
            <p style="color: #969696;">{{ $t('profile.fa2[12]') }}</p>
            <p style="font-size: 13px; margin-top: -7px">
              {{ $t('profile.fa2[5]') }}
            </p>
            <span style="color: #969696">{{ $t('profile.fa2[6]') }}</span> <br/>
            <div class="input-group my-2 row">
              <div class="input-key-wrapper">
                <InputText type="text"
                           v-model="code"
                           class="p-form-control input-key"
                           aria-describedby="basic-addon2"
                           disabled="disable"
                />
              </div>
              <div class="input-group-append">
                <div>
                  <i @click.stop.prevent="utils.saveInBuffer(code)"
                     style="cursor: pointer; font-size: 1.25rem; margin-left: 1rem; background: #2f313d; color: #969696; padding: 0.7rem; right: 0px; top: 0;"
                     class="pi pi-clone"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--          <div class="row mt-3">-->
        <!--            <div class="col-12">-->
        <!--              <div class="input-group mb-2">-->
        <!--                <InputText v-model="password" type="text" class="p-form-control"-->
        <!--                           :placeholder="($t('profile.fa2[7])"-->
        <!--                />-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <div class="row mt-2">
          <div class="col-12">
            <div class="input-group mb-3">
              <div class="p-float-label">
                <p class="text-grey">{{ $t('profile.fa2[7]') }}</p>
                <InputText
                  v-model.trim="password"
                  type="password"
                  class="p-form-control"
                />
                <div class="invalid-feedback invalid-input invalid-confirm">
                  {{ $t('profile.security.password_not_match') }}
                </div>
              </div>
              <div class="p-float-label mt-3">
                <p class="text-grey">{{ $t('profile.fa2[8]') }}</p>
                <div class="code-wrapper">
                  <PincodeInput v-model="codeAuth" placeholder="-" :length="6"/>
                </div>
                <div class="invalid-feedback invalid-input invalid-confirm">
                  {{ $t('profile.security.password_not_match') }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button @click="enable" class="col-12 mt-3 mb-3 button-activate">{{
            $t('profile.fa2[9]')
          }}
        </Button>
      </div>
    </div>
  </DModal>
</template>

<script>
import QRCode from 'qrcode'
import { mapActions, mapGetters } from 'vuex'
import DModal from '@/common/components/Modal/Modal'
import PincodeInput from 'vue-pincode-input'
import { func } from '@/utils/functions'

export default {
  name: 'TwoFaModal',
  components: { DModal, PincodeInput },

  data () {
    return {
      twoFA: false,
      code: '',
      codeAuth: '',
      password: '',
      utils: require('@/utils/functions')
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
    ...mapActions('user', ['load2FA', 'enable2FA']),
    enable () {
      this.enable2FA({ code: this.codeAuth, password: this.password })
        .then(data => {
          this.$noty.success('success')
          this.$emit('close')
        })
        .catch(e => {
          this.$noty.error(e.response.data.message)
        })
    },
    load () {
      this.load2FA()
        .then(data => {
          QRCode.toCanvas(this.$refs.qrcode, data.qrcode)
          this.code = data.code
        })
        .catch(e => {
          this.$noty.error(e.message)
        })
    }
  },
  created () {
    this.utils = func
    this.load()
  }
}
</script>

<style lang="scss">
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

.two-fa {
  display: flex;
  justify-content: center;
  max-height: 674px;
  height: 90vh;
  width: 100%;
  background-color: #1C1F29;

  &__container {
    position: relative;
    background-color: #1c1f29;
    color: white;
    border: none;
  }

  &__header {
    background-color: #1C1F29;
    border-radius: 15px;
    padding: 6px 10px 19px 22px;
  }

  &__header--title {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    margin-top: 5px;
  }

  &__body {
    background-color: #292C38;
    padding: 20px 30px;
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
      margin-top: 8px;

      &:hover {
        color: #6e7078;
      }
    }
  }
}

.two-fa__body__wrapper {
  max-height: 619px;
  overflow: auto;
  border-radius: 15px;
  background-color: #292C38;
  height: calc(90vh - 56px)
}
.two-fa__body__wrapper::-webkit-scrollbar {
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
}

.link-a {
  color: white;
}

.link-a:hover {
  color: yellow;
}

.text-grey {
  color: #969696;
  font-size: 16px;
}

.two-fa::-webkit-scrollbar {
  width: 0;
}

.qr-img {
  margin-top: 5px;
  width: 150px !important;
  height: 150px !important;
}

.pi-clone {
  position: absolute;
  right: 5px;
  top: 12px;
}

.p-float-label {
  width: 100%;
}

.p-form-control {
  width: 100%;
}

.input-key {
  max-height: 36px !important;
  margin-left: 13px !important;
}

.code-wrapper {
  display: flex;
  justify-content: space-around;
  margin-left: 5px;
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

@media (max-width: 768px) {
  .input-key-wrapper {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .two-fa__container {
    width: 100vw;
    max-height: 100vh;
    height: 100vh
  }
  .two-fa__body__wrapper {
    width: 100vw;
    max-height: calc(100vh - 50px);
    height: 100vh
  }
  .two-fa {
    width: 100vw;
    max-height: 100vh;
    height: 100vh
  }
  .two-fa__body {
    width: 100vw;
  }
}

@media (max-width: 480px) {
  .code-wrapper {
  }
}
</style>
