<template>
  <div v-if="replyMessage" class="reply">
    <div class="row">
      <div class="col-1">
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-12 text-nowrap"
               :style="`color: #${replyMessage.user.moderator ? replyMessage.user.moderatorColor : replyMessage.user.userColor}`">
            {{ replyMessage.user.nick }}
          </div>
          <div class="col-12 text-nowrap overflow-hidden" style="text-overflow: ellipsis;">
            <img v-if="replyMessage.typeId === 'gif'" :src="replyMessage.message">
            <span v-else> {{ replyMessage.message }}</span>
          </div>
        </div>
      </div>
      <div class="col-2">
        <button @click="clearReplyMessage" class="w-100 h-100 answer-btn"><i class="answer-close fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ReplyChatSendMessage',
  computed: {
    ...mapGetters('chat', {
      replyMessage: 'getReplyMessage'
    })
  },
  methods: {
    ...mapActions('chat', ['clearReplyMessage'])
  }
}
</script>

<style scoped lang="scss">
.reply {
  display: block;
  background-color: #20252f;
  width: 100%;
  min-height: 60px;
  max-height: 200px;
  position: absolute;
  bottom: calc(100% + 5px);
  overflow: hidden;
  z-index: 9;
  padding-top: 6px;
}
.answer-close:hover {
  color: white;
}

</style>
