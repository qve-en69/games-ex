<template>
  <div class="justify-content-center text-center preform">
    <form class="form-signin">
      <div class="reg-text text-white">
        <span>{{ $t('authentication.fast_register.welcome') }}</span>
      </div>
      <div class="px-3">
        <div class="input-group">
          <InputText v-model="nick"
                     :class="{ 'is-invalid': $v.nick.$dirty && $v.nick.$invalid, 'is-valid': $v.nick.$dirty && !$v.nick.$invalid }"
                     type="text" id="inputLogin" class="p-form-control"
                     @input="$v.nick.$touch()"
                     :placeholder="($t('authentication.fast_register.username'))"/>
          <div class="invalid-feedback invalid-input invalid-confirm">
            {{ $t('authentication.name_correct') }}
          </div>
        </div>
      </div>
      <div class="reg-text">
        <span>{{ $t('authentication.fast_register.choice_icon') }}</span>
      </div>
      <div class="icons-list">
        <img class="icon iconActive" v-for="item in icons" :key="item.id" :src="item.icon" @click="activeClick(item.icon)" :class="item.icon === active_icon ? 'active' : '' ">
      </div>
      <Divider class="divider"/>
      <div class="px-3">
        <Button @click.prevent="Sumbit" :disabled="(!this.active_icon || this.$v.$invalid)" class="mb-1 button-submit" type="submit">
          {{ $t('authentication.fast_register.submit').toUpperCase() }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { required, helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^(?!.*\\.\\.)(?!\\.)(?!.*\\.$)(?!\\d+$)[a-zA-Z.0-9А-я]{5,15}$/)

export default {
  components: {},
  data () {
    return {
      nick: '',
      active_icon: '',
      icons: [
        { id: 1, icon: 'https://static.d.net/avatars/avatar1.png' },
        { id: 2, icon: 'https://static.d.net/avatars/avatar2.png' },
        { id: 3, icon: 'https://static.d.net/avatars/avatar3.png' },
        { id: 4, icon: 'https://static.d.net/avatars/avatar4.png' },
        { id: 5, icon: 'https://static.d.net/avatars/avatar5.png' },
        { id: 6, icon: 'https://static.d.net/avatars/avatar6.png' }
      ]
    }
  },
  validations: {
    nick: {
      required,
      alpha
    }
  },
  computed: {
    ...mapGetters('registration', ['getRegistartionPair'])
  },
  created () {
    console.log(this.getRegistartionPair)
  },
  methods: {
    ...mapActions('registration', ['registerEmail']),
    activeClick (icon) {
      this.active_icon = icon
    },
    Sumbit () {
      if (!this.$v.$invalid) {
        this.$recaptchaLoaded().then(() => {
          this.$recaptcha('login').then((token) => {
            this.registerEmail({
              email: this.getRegistartionPair.email,
              password: this.getRegistartionPair.password,
              login: this.getRegistartionPair.login,
              rToken: token,
              avatar: this.active_icon,
              nick: this.nick
            }).then(data => {
              this.$modal.hide('modal')
            }).catch(e => {
              this.$noty.error(e.response.data.message)
            })
          })
        })
      }
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

.button-submit {
  border-radius: 17px;
  font-weight: bold;
  width: 100%;
}

.main-wrapper {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.icons-list {
  display: flex;
  justify-content: space-evenly;
  margin: -0.5rem 1rem 0;
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
  .active {
    border-color: #b19df7;
    cursor: pointer;
    transition: border-color .3s
  }
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
}
</style>
