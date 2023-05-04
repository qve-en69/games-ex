<template>
  <div class="position-relative" :class="{'hide': !toggleChatVisible}">
    <div class="chat-container">
      <i @click="chatVisible" class="fa-solid fa-comment-lines open" :class="{'close': !toggleChatVisible}"></i>
      <Chat/>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions, mapMutations
} from 'vuex'
import Chat from '@/modules/chat/Chat'

export default {
  components: {
    Chat
  },
  name: 'app-aside-menu-right',
  data: () => ({
    toggleChatVisible: true
  }),
  computed: {
    ...mapGetters('menu', {
      menuList: 'items'
    }),
    ...mapGetters('user', {
      user: 'user',
      getBalance: 'Balance',
      checkAuth: 'auth',
      checkAdmin: 'admin',
      balanceByPayments: 'balanceByPayments',
      chatBanned: 'chatBanned'
    }),
    ...mapGetters('compoint', {
      compointStatuses: 'compointStatuses'
    }),
    ...mapGetters('navigations', {
      pages: 'pages'
    })
  },
  methods: {
    ...mapActions('user', {
      exit: 'exit'
    }),
    ...mapMutations('chat', ['setToggle']),
    findStatus (statusId) {
      let status
      for (const i in this.compointStatuses) {
        status = this.compointStatuses[i]
        if (this.compointStatuses[i].statusId === statusId) {
          break
        }
      }
      return status
    },
    chatVisible () {
      this.toggleChatVisible = !this.toggleChatVisible
      this.$emit('toggleChatVisible')
      this.setToggle({ toggleChatVisible: this.toggleChatVisible })
    },
    percentToUpdate () {
      const percent = Math.floor(((this.user.compointCounter - this.findStatus(this.user.compointStatus).needsCompoints) * 100) / (this.findStatus(this.user.compointStatus + 1).needsCompoints - this.findStatus(this.user.compointStatus).needsCompoints)).toFixed(0)
      return percent < 100 ? percent : 100
    },
    getNeedCompointsToUp () {
      const nextStatus = this.findStatus(this.user.compointStatus + 1)
      const currentStatus = this.findStatus(this.user.compointStatus)
      return (nextStatus.needsCompoints - currentStatus.needsCompoints)
    },
    getCurrentCompoints () {
      const currentStatus = this.findStatus(this.user.compointStatus)
      const compointsTaken = this.user.compointCounter - currentStatus.needsCompoints
      return (compointsTaken).toFixed(0)
    }
  }
}

</script>
<style scoped lang="scss">

.chat-container {
  height: 100%;
  background-color: transparent;
}

.hide {
  transform: translateX(120px) !important;
  transition: .3s !important;
  width: 0 !important;
  margin-left: -5px;
}

.open {
  transform: rotateX(180deg);
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  background: #fff;
  position: absolute;
  bottom: 2%;
  left: -55px;
  cursor: pointer;
  color: #1C1F29;;
  font-size: 20px;
  transition: .3s;
  z-index: 9;
}

.close {
  transform: rotateX(0deg);
  transform: translateX(-90px) !important;
  transition: .3s;
  color: #1C1F29;
  font-size: 20px;
  margin-left: -25px;
  background-color: #fff;
}

::-webkit-scrollbar {
  width: 0;
  height: 100px;
}

::-webkit-scrollbar-button {
  background-color: #787878;
  display: none;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-track-piece {
  background-color: #787878;
}

::-webkit-scrollbar-thumb {
  height: 100px;
  background-color: #F5F5F5;
  border-radius: 10px;
}

::-webkit-scrollbar-corner {
  background-color: #787878;
}

::-webkit-resizer {
  background-color: #666;
}
</style>
