<template>
  <div class="user__head align-items-center">
    <div class="author">
                <div class="nickname" v-if="['common', 'airdrop', 'gif'].includes(message.typeId)"
                      @click="openModalUser(message.user)">
                  <i style="font-size: 18px;"
                     v-if="checkRole('moderator') || checkRole('admin')"
                     class="fas fa-user-secret"></i> <span>{{ message.user.nick }}</span>
                </div>
      <div class="time">{{formatDate(message.createdAt)}}</div>
      <div class="justify-content-end d-flex mr-0 ml-0">
        <!-- <div v-if="checkAuth && (message.typeId === 1 || message.typeId === 3)"
             @click="toggleWindowReply(message)" class="btn-link cursor-pointer align-self-end">
          Ответить
        </div>-->

        <div
          v-if="checkAuth && (checkRole('admin') || checkRole('moderator'))"
          class="d-inline-block">
          <button class="btn--warning" @click="deleteMessage({ message })"><i class="far fa-trash-alt"></i>
          </button>
          <button class="btn--danger" @click="ban(message.user.id)"><i class="fas fa-ban"></i>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ModalUserInfo from '@/modules/userStatistic/components/Modal/ModalUserInfo'
import { USER_STATISTIC_PAGES } from '@/modules/userStatistic/constants'
import dayjs from 'dayjs'
import ModalBan from '@/modules/chat/modals/BanModal/ModalBan'

export default {
  name: 'Author',
  props: ['message'],
  methods: {
    ...mapActions('chat', ['setReplyMessage', 'deleteMessage']),
    ...mapMutations('userStatistic', ['setPageUserStatistic']),
    openModalUser (currentUser) {
      this.setPageUserStatistic({ pageUserStatistic: USER_STATISTIC_PAGES.USER_INFO })
      this.$modal.show(ModalUserInfo, { currentUser: currentUser.id }, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    },
    ban (userId) {
      this.$modal.show(ModalBan,
        { userId: userId },
        {
          name: 'modal',
          clickToClose: false,
          adaptive: true,
          height: '100%',
          width: '100%'
        }
      )
    },
    toggleWindowReply (message = null) {
      this.setReplyMessage({ replyMessage: message })
    },
    formatDate (date) {
      return dayjs(date).format('HH:mm')
    }
  },
  computed: {
    ...mapGetters('user', {
      checkAuth: 'auth',
      checkRole: 'checkRole'
    })
  }
}
</script>

<style lang="scss" scoped>
.fa-trash-alt {
  color: #FBCD58;
  font-size: 13px;
}

.fa-ban {
  font-size: 13px;
  color: #7A3A3A;
}

.btn--warning, .btn--danger {
  width: 24px;
  height: 24px;
  background-color: #292E3D;
  border-radius: 5px;
  margin: 0 0 0 3px;
  padding: 0 3px 0 4px;
}
.time {
  margin: 0 10px 0 10px;
}

.author {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.nickname {
  margin: 2px 0 0 10px;
  font-weight: 700;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
  }
}
</style>
