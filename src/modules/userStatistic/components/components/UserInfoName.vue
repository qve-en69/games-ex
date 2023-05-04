<template>
  <div class="user-modal">
    <div class="user-modal__container">
      <div class="user-modal__avatar">
        <div class="user-modal__avatar-border">
          <DCustomAvatar style="width: 120px; margin: -1px 0 0 -1px" :src="user.avatar" :username="info.nick"
                              :size="112"></DCustomAvatar>
        </div>
        <div @click="changeUserStatisticPage({ pageUserStatistic: USER_STATISTIC_PAGES.USER_EDIT_AVATAR })"
             class="p-button mt-2">{{ $t('avatar.select_avatar') }}
        </div>
      </div>
      <div class="p-float-label justify-content-start">
        <p class="text-grey">{{ $t('profile.name_user') }}</p>
        <InputText
          :class="{ 'is-invalid': $v.nickname.$dirty && $v.nickname.$invalid, 'is-valid': $v.nickname.$dirty && !$v.nickname.$invalid }"
          v-model="nickname"
          @input="$v.nickname.$touch()"
          placeholder="Nick"
          type="text"
          class="p-form-control"
        />
        <div class="invalid-feedback invalid-input invalid-confirm">
          {{ $t('authentication.name_correct') }}
        </div>
      </div>
      <div class="text-center">
        <Button @click="changeNick" class="button-submit p-button">
          {{ $t('avatar_modal.change') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>

import { USER_STATISTIC_PAGES } from '@/modules/userStatistic/constants'
import { mapActions, mapGetters } from 'vuex'
import {
  DCustomAvatar
} from '@/common/components'
import { required, helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^(?!.*\\.\\.)(?!\\.)(?!.*\\.$)(?!\\d+$)[a-zA-Z.0-9А-я]{5,15}$/)
export default {
  name: 'UserInfoName',
  data () {
    return {
      USER_STATISTIC_PAGES,
      nickname: ''
    }
  },
  validations: {
    nickname: {
      required,
      alpha
    }
  },
  components: {
    DCustomAvatar
  },
  methods: {
    ...mapActions('userStatistic', ['changeUserStatisticPage']),
    ...mapActions('user', ['changeNickName']),
    changeNick () {
      if (!this.$v.$invalid) {
        this.changeNickName(this.nickname).then(() => {
          this.$noty.success(this.$t('profile.success[4]'))
        }).catch(e => {
          this.$noty.error(e.response.data.message)
        })
      } else {
        this.$noty.error(this.$t('authentication.login_msg.email_incorrect)'))
      }
    }
  },
  computed: {
    ...mapGetters('userStatistic', { info: 'getInfo' }),
    ...mapGetters('user', ['user'])
  },
  mounted () {
    this.nickname = this.info.nick
  }
}
</script>

<style lang="scss" scoped>
.p-button {
  background: rgba(56, 58, 68, 0.84);
  border-radius: 15px;
  border: none;
  height: 31px;
  padding: 0 49px;
  margin-top: -10px;
}

.p-button:hover {
  background: rgba(86, 89, 103, 0.84);
}

.user-modal {
  height: calc(90vh - 20px);
  max-height: 423px;
  overflow-y: auto;
  border-radius: 15px;
  margin: 14px 0 -14px -17px;
  width: 455px;

  &__container {
    background-color: #292C38;
    width: 455px;
    height: 423px;
    padding: 0 40px;
  }

  &__avatar {
    text-align: center;
    margin-bottom: 35px;
    padding-top: 20px;

    &-border {
      border: 4px solid #4A4C56;
      box-sizing: content-box;
      border-radius: 50%;
      height: 119px;
      width: 119px;
      margin: 0 auto;
    }
  }
}

.user-modal::-webkit-scrollbar {
  width: 0;
}

.text-grey {
  color: #969696;
  font-size: 16px;
  margin-left: 15px;
}

.p-form-control {
  height: 55px;
}

.button-submit {
  height: 55px;
  margin-top: 20px;
  margin-bottom: 40px;
  border-radius: 15px;
  width: 252px;
  background-color: #7C4EFF;
}

.user-modal__avatar-img {
}

@media (max-width: 576px) {
  .user-modal {
    background: #1c1f29;
    align-items: flex-start;
    width: 100vw;
    max-height: 100vh;
    height: calc(100vh - 55px);

    &__container {
      background-color: #292C38;
      width: 100%;
      height: 100%;
      padding: 0 40px;
    }
  }
}
</style>
