<template>
  <div class="row justify-content-center">
    <div v-if="(connect && !isConnected.telegram) || !connect" class="social ml-1 social-telegram position-relative">
      <a>
        <i class="fab fa-telegram-plane cursor-pointer"></i>
        <vueTelegramLogin
          mode="callback"
          telegram-login="DBot"
          @callback="openTelegram"
        />
      </a>
    </div>
    <div v-if="(connect && !isConnected.google) || !connect"  class="social ml-2 social-google">
      <a @click="openGoogle">
        <i class="fab fa-google"></i>
      </a>
    </div>
<!--    <div v-if="(connect && !isConnected.openWallet) || !connect" class="social ml-2 social-wc">-->
<!--      <a @click="openWalletConnect">-->
<!--        <svg class="mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#3d96fc" d="M32 16a16 16 0 11-32 0 16 16 0 0132 0z"></path><path fill="#fff" d="M16 14.4l5 5.2 5.1-5.1 2.2 2.1L21 24l-5-5.1-5.2 5.1-7.2-7.3 2.1-2.1 5.1 5 5.1-5zm7.9-2.4l.1.1-2.3 2.4c-4-3.8-7.5-3.9-11.5 0H10l-2.3-2.4c5.2-5 10.8-5 16-.1z"></path></svg>-->
<!--      </a>-->
<!--    </div>-->
<!--    <div class="social ml-2 social-facebook position-relative">-->
<!--      <a class="social social-facebook">-->
<!--        <i class="fab fa-facebook-f cursor-pointer"></i>-->
<!--        <facebook-login class="button"-->
<!--                        appId="326022817735322"-->
<!--                        @login="openFacebook"-->
<!--                        @get-initial-status="openFacebook">-->
<!--        </facebook-login>-->
<!--      </a>-->
<!--    </div>-->
    <!--    <div class="social ml-2 social-ok">-->
    <!--      <a href="/api/auth/ok">-->
    <!--        <i class="fab fa-odnoklassniki"></i>-->
    <!--      </a>-->
    <!--    </div>-->
    <!--    <div class="social ml-2 social-steam">-->
    <!--      <a href="/api/auth/steam">-->
    <!--        <i class="fab fa-steam-symbol"></i>-->
    <!--      </a>-->
    <!--    </div>-->
  </div>
</template>
<script>
import { vueTelegramLogin } from 'vue-telegram-login'
// import facebookLogin from 'facebook-login-vuejs'

import { mapActions } from 'vuex'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
// Create a connector

export default {
  props: ['isConnected', 'connect'],
  components: {
    vueTelegramLogin
    // facebookLogin
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions('auth', ['telegramLogin', 'googleLogin']),
    openTelegram (data) {
      this.telegramLogin({ ...data, connect: this.connect })
        .then(() => {
          if (!this.connect) {
            this.$emit('close')
            this.$router.replace('/')
          } else {
            this.$noty.success('success')
          }
        }).catch(e => {
          this.$noty.error(e.response.data.message)
        })
    },
    openGoogle () {
      this.$gapi.login().then(() => {
        const data = JSON.parse(localStorage.getItem('gapi.session'))
        this.googleLogin({
          id: data.id,
          nick: data.fullName,
          email: data.email,
          avatar: data.imageUrl,
          token: data.accessToken,
          connect: this.connect
        }).then(() => {
          if (!this.connect) {
            this.$router.replace('/')
            this.$emit('close')
          } else {
            this.$noty.success('success')
          }
        }).catch(e => {
          this.$noty.error(e.response.data.message)
        })
      })
    },
    openFacebook (user) {
      console.log(user)
    },
    openWalletConnect () {
      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      })

      if (!connector.connected) {
        // create new session
        connector.createSession()
      }
      connector.on('connect', (error, payload) => {
        if (error) {
          throw error
        }
        // Get provided accounts and chainId
        // eslint-disable-next-line no-unused-vars
        console.log(payload)
        const { accounts, chainId } = payload.params[0]
        console.log(accounts, chainId)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.fab {
  color: white;
}
.row {
  background: #1C1F29;
  padding: 10px 18px 6px 14px;
  border-radius: 35px;
  display: inline-flex;
}
.social {
  text-align: center;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  cursor: pointer;
  font-size: 23px;
  margin-bottom: 5px;
  color: white;
&-vk {
   background-color: #5181b8;
 }
&-telegram {
   background-color: #40B3E0;
 }
&-facebook {
   background-color: #4267b2;
 }
&-google {
   background-color: #d93a3a;
 }
&-ok {
   background-color: #ef8d2d;
 }
&-steam {
  background-color: #90929f;
}
&:hover {
   opacity: 0.9;
 }
}
</style>
<style>
.social-telegram iframe {
  position: absolute;
  top: -2px;
  left: -2px;
  z-index: 1;
  width: 40px !important;
  cursor: pointer;
  opacity: .01;
}
</style>
