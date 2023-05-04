<template>
    <div class="justify-content-center text-center preform">
      <Message :severity="'error'" v-if="error !== null" >{{error}}</Message>
      <form class="form-signin">
        <div class="px-3 text-right">
          <div class="input-group" style="margin-top: 20px">
            <InputText v-model="login" type="text" id="inputLogin" class="p-form-control" :placeholder="($t('authentication.enter_login'))" />
          </div>
          <div style="margin: 3px 0">
            <span class="recovery-password" @click="$emit('update:component', 'RecoveryPassword')">{{ $t('authentication.forgot_password')}}</span>
          </div>
          <div class="input-group">
            <Password
              v-model="password"
              toggleMask
              type="password"
              id="inputPassword"
              class="p-input-password"
              :placeholder="($t('authentication.enter_password'))"
              :feedback="false"
              input-style="padding-left: 20px"
            />
          </div>
        </div>
        <Divider class="divider"/>
        <div class="px-3">
          <div class="buttons">
          <Button @click.prevent="Sumbit" class="my-2 btn-block button-submit button-auth" type="submit">{{$t('authentication.auth').toUpperCase()}}
          </Button>
          <Button class="my-2 btn-block button-submit button-register" @click="$emit('update:component', 'Registration')">
            <div style="width: 16px"/>
            <div style="width: 100%">{{$t('authentication.register_title').toUpperCase()}}</div>
            <i class="pi pi-chevron-right"/>
          </Button>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
const RecoveryPassword = () => import('../recoveryPassword/RecoveryPassword')

export default {
  components: {},

  computed: {
    ...mapGetters('auth', { error: 'getError', getLogin: 'getLogin', getPassword: 'getPassword' }),
    login: {
      get () {
        return this.getLogin
      },
      set (login) {
        this.setLogin({ login })
      }
    },
    password: {
      get () {
        return this.getPassword
      },
      set (password) {
        this.setPassword({ password })
      }
    }
  },
  methods: {
    ...mapActions('auth', { loging: 'login' }),
    ...mapMutations('auth', { setLogin: 'setLogin', setPassword: 'setPassword' }),
    async Sumbit () {
      const result = await this.loging({ login: this.login, password: this.password })
      if (result) {
        this.$router.push(this.$route.path)
      }
    },
    add () {
      console.log('emit')
      this.$emit('addmodal', { modal: RecoveryPassword })
    },
    openRecoveryPassword (name) {
      this.$emit('openRecoveryPassword', name)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep #inputPassword::-webkit-input-placeholder {
  padding-left: 0;
}

::v-deep .pi-eye:hover {
  cursor: pointer;
}

.p-form-control {
  position: relative;
  color: white;
  border-radius: 20px;
  background-color: #383A44;
  padding-right: 40px;
  height: 60px;
}

.invite {
  background-color: #121318;
  border-left: 1px solid #383838;
  font-size: 13px;
}

.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
}

.form-check-input {
  position: absolute;
  margin-top: .3rem;
  margin-left: -1.24rem;
}
.form-check-label {
  margin-bottom: 0;
}
.font-small {
  font-size: 6px;
}

.button-support {
  display: flex;
  justify-content: space-around;

  &__text {
    font-size: 12px;
    width: 50%;
    padding: 1px;
  }
}

@media (max-width: 600px) {
  .button-support {
    &__text {
      font-size: 12px;
      width: 50%;
      padding: 1px;
    }
  }
  .divider {
    overflow: visible;
    padding-bottom: 10px;
  }
}
.recovery-password {
  color: #969696;
  cursor: pointer;
  font-weight: 300;
  margin: 3px 20px 3px 0;
  &:hover {
    color: yellow
  }
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.button-register {
  border-radius: 17px;
  width: 59%;
  background: #1C1F29;
  border: 2px solid #7C4EFF;
  color: #7C4EFF;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.button-auth {
  border-radius: 17px;
  font-weight: bold;
  width: 37%;
}

.main-wrapper {
  padding-left: 0!important;
  padding-right: 0!important;
}
</style>
