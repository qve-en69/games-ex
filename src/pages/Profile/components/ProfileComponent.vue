<template>
  <div v-show="checkAuth" class="container mt-2 r-3">
    <div class="row header-settings">
      <a @click="$router.go(-1)">
        <i class="pi pi-chevron-left"></i>
      </a>
      <div class="card-header pt-1 mb-2">
        {{ $t('profile.name') }}
      </div>
    </div>
    <div class="row bg justify-content-center settings-wrapper">
      <div class="col-12 col-lg-4 d-none d-lg-block" style="background-color: #262A36;border-radius: 15px;">
        <div class="row avatar-block mt-3 mb-3">
          <div v-if="!disabled" class="input-group mt-3 mb-3 col-11 outline-border">
            <input
              :class="{ 'is-invalid': $v.nick.$dirty && $v.nick.$invalid, 'is-valid': $v.nick.$dirty && !$v.nick.$invalid }"
              @input="$v.nick.$touch()"
              type="text"
              class="form-control outline" v-model.trim="nick"
              :disabled="disabled"
            >
            <div class="input-group-append">
                <span class="input-group-text right-outline">
                  <div @click="changeNickName"><i :class="{'fa-check-circle': !disabled}"
                                                  class="fas cursor-pointer"></i></div>
                </span>
            </div>
          </div>
          <span v-show="user.email && user.emailVerify" class="col-12 text-center mt-3">  {{ user.email }}</span>
        </div>
        <div class="row tabs">
          <button @click="changeTabProfile( PROFILE_TABS.GENERAL)"
                  :class="{ active: tabProfile === PROFILE_TABS.GENERAL }"
                  tag="button" class="button col-12">
            <i class="icons fas fa-user mr-2"></i> {{ $t('profile.general.title') }}
          </button>
          <button @click="changeTabProfile(PROFILE_TABS.SECURITY)" tag="button"
                  :class="{ active: tabProfile === PROFILE_TABS.SECURITY }"
                  class="button col-12">
            <i class="icons fas fa-shield-alt mr-2"></i> {{ $t('profile.security.name') }}
          </button>
          <button @click="changeTabProfile(PROFILE_TABS.SESSIONS)" tag="button"
                  :class="{ active: tabProfile === PROFILE_TABS.SESSIONS }"
                  class="button col-12">
            <i class="icons fas fa-project-diagram mr-2"></i> {{ $t('profile.session.name') }}
          </button>
        </div>
      </div>

      <div class="col-lg-8 col-12 bg-active justify-content-center mt-md-0 mt-2" style="border-radius: 15px;">
        <Dropdown class="dropdown-tabs mb-4" v-model="selectedPage" :options="pages" optionLabel="name"
                  placeholder="Общее">
        </Dropdown>
        <General v-if="tabProfile === PROFILE_TABS.GENERAL"/>
        <Security v-else-if="tabProfile === PROFILE_TABS.SECURITY"/>
        <Sessions v-else-if="tabProfile === PROFILE_TABS.SESSIONS"/>
        <Verify v-else-if="tabProfile === PROFILE_TABS.VERIFY"/>
        <Currency v-else-if="tabProfile === PROFILE_TABS.CURRENCY"/>
        <AddSettings v-else-if="tabProfile === PROFILE_TABS.ADD_SETTINGS"/>
      </div>
    </div>
  </div>
</template>
<script>
import {
  General,
  Security,
  Sessions,
  Verify,
  Currency,
  AddSettings
} from '@/pages/Profile/components/Profile'
import { mapGetters, mapActions } from 'vuex'
import { required, minLength, helpers } from 'vuelidate/lib/validators'
import AvatarModal from '../modals/AvatarModal'
import { PROFILE_TABS } from '@/pages/Profile/constants'

const alpha = helpers.regex(
  'alpha',
  /^(?!.*\.\.)(?!\.)(?!.*\.$)(?!\d+$)[a-zA-Z.0-9А-я]{5,15}$/
)
export default {
  components: {
    General,
    Security,
    Sessions,
    Verify,
    Currency,
    AddSettings
  },
  validations: {
    nick: {
      alpha,
      minLength: minLength(5),
      required
    }
  },
  data () {
    return {
      disabled: true,
      selectedPage: { name: 'Общее', code: PROFILE_TABS.GENERAL },
      pages: [
        { name: 'Общее', code: PROFILE_TABS.GENERAL },
        { name: 'Безопасность', code: PROFILE_TABS.SECURITY },
        { name: 'Сеccии', code: PROFILE_TABS.SESSIONS }
      ],
      nick: '',
      PROFILE_TABS,
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: ''
    }
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
      checkAuth: 'auth',
      profileID: 'profileID'
    }),
    ...mapGetters('profile', { tabProfile: 'getTabProfile' })
  },
  watch: {
    selectedPage (value) {
      this.changeTabProfile(value.code)
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('profile', ['changeTabProfile']),
    openModalChangeAvatar (currentUser) {
      this.$modal.show(AvatarModal, { currentUser }, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    },
    toggleShow () {
      this.show = !this.show
    },
    toggle (event) {
      this.$refs.menu.toggle(event)
    },
    cropSuccess (imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl
    },
    onLogout () {
      this.logout().then(() => {
        this.$router.push('/main')
      })
    },
    changeNickName () {
      if (this.disabled) {
        this.disabled = false
        return
      }
      if (this.nick === this.user.nick) {
        this.disabled = true
        this.$v.$reset()
        return
      }

      if (!this.$v.$invalid) {
        this.$socket.client.emit('call', 'player.changeNickName', { nick: this.nick }, (err, data) => {
          if (err) {
            this.$noty.error(err.message)
          } else {
            // console.warn('data', data)
            this.$noty.success(this.$t('profile.success[4]'))
            this.disabled = true
            this.$v.$reset()
          }
        })
      } else {
        this.$noty.error(this.$t('profile.error[2]'))
      }
    }
  },
  created () {
    this.nick = this.user.nick
  },
  mounted () {
    this.$modal.show('profile-modal')
  }
}
</script>

<style scoped lang="scss">

.container {
  max-width: 95%;
}

.pi-chevron-left {
  margin: 25px 0;
  font-size: 20px;
}

.pi-chevron-left:hover {
  cursor: pointer;
}

.card-header {
  background: transparent;
  color: white;
  font-weight: 700;
  font-size: 24px;
  margin-top: 12px;
}

.container {
  overflow: auto;
}

.icons {
  height: 33px;
  width: 32px;
  background-color: #535867;
  padding: 6px;
  font-size: 22px;
  border-radius: 5px;
}

.fa-edit:hover {
  color: white;
}

.fa-check-circle {
  color: rgb(197 224 255 / 28%);
}

.fa-check-circle:hover {
  color: white;
}

.fa-project-diagram {
  font-size: 17px;
  padding-top: 9px;
}

.bg {
  -webkit-box-shadow: 0 15px 15px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 15px -1px rgba(0, 0, 0, 0.1);
}

.form-control {
  padding-left: 0;
}

.form-control:disabled {
  background-color: #22252f;
}

.bg-active {
  background-color: #1B1E26;
  min-height: 650px;
  padding: 30px;
}

.switch label {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
}

.dropdown-tabs {
  display: none;
}

.switch input {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.switch.demo3 label {
  display: block;
  width: 40%;
  height: 50%;
  background: #a5a39d;
  border-radius: 40px;
}

.switch.demo3 label i {
  display: block;
  height: 100%;
  width: 55%;
  border-radius: inherit;
  position: absolute;
  z-index: 2;
  right: 45%;
  top: 0;
  background: #b2ac9e;
  background: -moz-linear-gradient(#f7f2f6, #b2ac9e);
  background: -ms-linear-gradient(#f7f2f6, #b2ac9e);
  background: -o-linear-gradient(#f7f2f6, #b2ac9e);
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#f7f2f6), to(#b2ac9e));
  background: -webkit-linear-gradient(#f7f2f6, #b2ac9e);
  background: linear-gradient(#f7f2f6, #b2ac9e);
  box-shadow: inset 0 1px 0 white,
  0 0 8px rgba(0, 0, 0, 0.3),
  0 5px 5px rgba(0, 0, 0, 0.2);
}

.switch.demo3 label i:after {
  content: "";
  position: absolute;
  left: 15%;
  top: 25%;
  width: 70%;
  height: 50%;
  background: #d2cbc3;
  border-radius: inherit;
}

.switch.demo3 input:checked ~ label {
  background: #ffc114;
}

.switch.demo3 input:checked ~ label i {
  right: -1%;
}

.switch.demo3 input:checked ~ label i:before {
  top: 48%;
  right: 116%;
  color: #ffc114;
}

.set-avatar {
  cursor: pointer;
  width: 58px;
  height: 56px;
  background-color: transparent;
  position: absolute;
  z-index: 20;
  left: 16px;
  top: 6px;

}

.button {
  display: inline-block;
  font-size: 18px;
  cursor: pointer;
  text-align: left;
  min-width: 170px;
  height: 60px;
  text-decoration: none;
  outline: none;
  color: #969696;
  background-color: #262A36;
  border: none;
  border-radius: 0px;
  font-weight: 300;
  padding: 0 0 7px 20px;
}

.button.disabled-button {
  color: #676977;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .button {
    min-width: 100%;
  }
}

.button.disabled-button {
  color: #676977;
}

.outline {
  text-align: center;
  background-color: #22252f;
  color: #ffffff;
}

.right-outline {
  background-color: #22252f;
}

.outline-border {
  border: 2px solid rgb(197 224 255 / 28%);
  border-radius: 5px;
}

.form-control.is-valid:focus, .was-validated .form-control:valid:focus {
  box-shadow: none;
}

.form-control.is-invalid:focus, .was-validated .form-control:invalid:focus {
  box-shadow: none;
}

.avatar-block {
  justify-content: center;
}

.nickname {
  margin: auto;
  width: 100%;
  text-align: center;
}

.settings-wrapper {
  background-color: #1b1e26;
  border-radius: 15px;
  height: 961px;
  max-width: 1200px;
  margin: auto;
}

@media (max-width: 991px) {
  .container {
    max-width: 99%;
  }
  .pi-chevron-left {
    margin-left: 20px;
  }
  .avatar-block {
    justify-content: left;
    margin-left: 15px;
    flex-wrap: nowrap;
  }
  .avatar-border {
    border: 3px solid #4A4C56;
    box-sizing: content-box;
    border-radius: 50%;
    height: 97px;
    width: 96px;
  }
  .nickname {
    text-align: left;
    margin-left: 30px;
    font-size: 20px;
    font-weight: 700;
  }
  .tabs {
    display: none;
  }
  .dropdown-tabs {
    display: inline-flex;
  }

  .checked {
    display: block;
  }
  .settings-wrapper {
    height: 100%;
  }
}

@media (max-width: 576px) {
  .header-settings {
    height: 40px;
  }
  .card-header {
    font-size: 18px;
    margin-top: -3px;
  }
  .pi-chevron-left {
    margin-left: 20px;
    margin-top: 4px;
  }
}

.active {
  background-color: #1B1E26;
  color: white;
}

</style>
