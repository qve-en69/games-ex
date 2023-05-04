<template>
    <div class="chat-container" v-chat-scroll="{always: false, smooth: false, scrollonremoved: true}">
      <Message :key="idx" v-for="(message, idx) in messages.slice()" :message="message" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'

import Message from '@/modules/chat/message/Message'

Vue.use(require('vue-chat-scroll'))

export default {
  name: 'ChatMessage',
  components: {
    Message
  },
  computed: {
    ...mapGetters('chat', { messages: 'getMessages' })
  }
}
</script>

<style lang="scss" scoped>

.chat-container {
  flex: 1;
  position: relative;
  overflow-y: scroll;
  padding: 1rem;
  background: #1C1F29;
}

</style>
