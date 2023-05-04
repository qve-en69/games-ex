<template>
  <div class="user__head d-flex align-items-center">
    <div @click="openModalUser(message.user)" class="avatar mr-1">
      <DCustomAvatar :src="message.user.avatar"
                    :username="message.user.nick"
                    :compointStatus="message.user.compointStatus"
                    :size="34"
                    style="width: 36px"/>
      <DCustomAvatar v-if="message.typeId === 'moderator' && checkPrivilege(message.user.roles, 'moderator')"
                    :src="'https://pp.userapi.com/c834401/v834401093/e78fa/EIRe2SJ8XBw.jpg'"
                    :username="message.user.nick"
                    :compointStatus="15"
                    :size="36"/>
    </div>
  </div>
</template>

<script>
import { DCustomAvatar } from '@/common/components'
import ModalUserInfo from '@/modules/userStatistic/components/Modal/ModalUserInfo'

export default {
  name: 'Avatar',
  components: { DCustomAvatar },
  props: ['message'],
  methods: {
    openModalUser (currentUser) {
      this.$modal.show(ModalUserInfo, { currentUser: currentUser.id }, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;
  border-radius: 0;
  width: 36px;
}
</style>
