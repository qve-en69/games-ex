<template>
  <div class="justify-content-center text-center preform">
    <form class="form-signin">
      <div class="reg-text">
        <span>{{ $t('authentication.fast_register.register_success') }}</span>
        <br>
        <span>{{ $t('authentication.fast_register.dont_forget') }}</span>
      </div>
      <div class="px-4">
        <div class="block">
          <div class="word">{{ $t('authentication.you_login') }}</div>
          <div class="value">{{ getRegistartionPair.login }}</div>
        </div>
        <div class="block">
          <div class="word">{{ $t('authentication.enter_password') }}</div>
          <div class="value">{{ getRegistartionPair.password }}</div>
        </div>
      </div>
      <Divider style="margin: 27px 0;" class="divider"/>
      <div class="px-4">
        <a :href="`data:application/txt;charset=utf-8,
       login: ${getRegistartionPair.login}___password: ${getRegistartionPair.password}`" download="lp.txt"
           class="mb-1 btn btn-danger vertical-align button-submit button-save">
          {{ $t('authentication.save_file').toUpperCase() }}
        </a>
        <div class="reg-text mt-2 mb-3">
          <span>{{ $t('authentication.send_to_email') }}</span>
        </div>
        <div class="block">
          <SendPic class="send_pic cursor-pointer" @click="sendDataEmail" />
          <InputText v-model="email" type="text" id="inputLogin" class="block input-block"
                     :placeholder="($t('authentication.fast_register.email'))"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SendPic from '@/assets/svg/register/fast-registration/send_pic.svg'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    SendPic
  },
  data () {
    return {
      icons: [
        { id: 1, icon: require('@/assets/images/register/fast-registration/icon.png') },
        { id: 2, icon: require('@/assets/images/register/fast-registration/icon.png') },
        { id: 3, icon: require('@/assets/images/register/fast-registration/icon.png') },
        { id: 4, icon: require('@/assets/images/register/fast-registration/icon.png') },
        { id: 5, icon: require('@/assets/images/register/fast-registration/icon.png') }
      ],
      email: ''
    }
  },
  computed: {
    ...mapGetters('registration', ['getRegistartionPair'])
  },
  methods: {
    ...mapActions('registration', ['sendEmail']),
    sendDataEmail () {
      this.sendEmail({ email: this.email, password: this.getRegistartionPair.password, login: this.getRegistartionPair.login })
        .then(() => {
          this.$noty.success('Success')
        }).catch(e => {
          this.$noty.error(e.response.data.message)
        })
    }
  }
}
</script>

<style scoped lang="scss">

.p-form-control {
  position: relative;
  color: white;
  border-radius: 20px;
  background-color: #383A44;
  padding-left: 1.5rem;
  padding-right: 2rem;
  height: 60px;
}

.reg-text {
  margin: 1rem 0;
  font-weight: 300;
}

.button-save {
  background-color: #567C2F;
  height: 3rem;
  font-size: .9rem;
  border-radius: 1rem;
  font-weight: bold;
  width: 100%;
  border: 0;

  &:hover {
    background-color: #538f17;
  }
}

.main-wrapper {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.icons-list {
  display: flex;
  justify-content: space-evenly;
  margin: 0 1rem;
  margin-top: -0.5rem;
  padding: 0 3rem;

  .icon {
    height: 3.5rem;
    border: 2px solid transparent;
    border-radius: 50%;
    transition: border-color .3s
  }

  .icon:hover {
    border-color: #b19df7;
    cursor: pointer;
    transition: border-color .3s
  }
}

.block {
  background: #383A44;
  display: flex;
  margin-bottom: 1rem;
  border-radius: 1.5rem;
  height: 60px;
  font-weight: 300;
  font-size: 1.2rem;
  position: relative;

  .word {
    height: 100%;
    flex: 1;
    border-right: 1px solid #808080;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .value {
    flex: 3;
    display: flex;
    align-items: center;
    content: left;
    padding: 1rem;
    font-size: 16px;
  }
}

.send_pic {
  position: absolute;
  z-index: 2;
  right: 2rem;
  top: 1.2rem;
}

.input-block {
  width: 100%;
  position: absolute;
  z-index: 1;
  padding-left: 1rem;
  padding-right: 4.5rem;
}

@media (max-width: 500px) {
  .divider {
    padding-bottom: 10px;
    overflow: visible;
  }

  .icons-list {
    margin: 0 1rem;
    padding: 0 1rem;

    .icon {
      height: 3rem;
    }
  }

  .block {
    .value {
      flex: 2;
    }
  }
}
</style>
