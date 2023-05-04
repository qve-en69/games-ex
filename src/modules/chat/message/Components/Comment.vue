<template>
  <div>
    <MessageAirDrop v-if="message.type.id === 'airdrop'" :message="message"/>
    <MessageCommon v-else-if="message.type.id === 'gif' || ('common')" :message="message"/>
    <MessageTransfer v-else-if="message.type.id === 'transfer'" :message="message"/>
    <MessageGameLog v-else-if="message.type.id === 'game_log'" :message="message"/>
    <div class="wrap" v-else>
      <span> {{ message.message }}</span>
    </div>
  </div>
</template>

<script>

import MessageAirDrop from '@/modules/chat/message/MessageType/MessageAirDrop'
import MessageCommon from '@/modules/chat/message/MessageType/MessageCommon'
import MessageTransfer from '@/modules/chat/message/MessageType/MessageTransfer'
import MessageGameLog from '@/modules/chat/message/MessageType/MessageGameLog'

export default {
  name: 'Comment',
  components: { MessageGameLog, MessageCommon, MessageTransfer, MessageAirDrop },
  props: ['message']
}
</script>

<style lang="scss" scoped>
.wrap {
  background-color: #292E3D;
  border-radius: 15px;
  color: #fff;
  font-weight: 200;
  margin: 10px 0 -5px 5px;
}
</style>
