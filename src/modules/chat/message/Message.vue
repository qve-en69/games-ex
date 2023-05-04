<template>
  <div :class="(message.typeId === 'system') ? 'system-message' : ''" class="message">
    <ul>
      <li class="chat-message d-flex flex-column" style="position: relative">
        <div class="ml-1 item-message">
          <div>
            <Avatar :message="message" class="mt-2"/>
            <div class="hiddenBtn">
              <div class="row">
                <!--              <button class="btn&#45;&#45;send"><i class="fas fa-money-bill-wave"></i></button>-->
                <button @click="addToSendMessage()" class="btn--send"><i><i class="fas fa-at"></i></i></button>
              </div>
            </div>
          </div>
          <div>
            <Author :message="message"/>
            <Reply :message="message"/>
            <Comment :message="message"/>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '@/modules/chat/message/Components/Avatar'
import Reply from '@/modules/chat/message/Components/Reply'
import Comment from '@/modules/chat/message/Components/Comment'
import Author from '@/modules/chat/message/Components/Author'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Message',
  components: { Avatar, Reply, Comment, Author },
  props: ['message'],
  methods: {
    addToSendMessage () {
      this.sendMessage = this.message.user.nick
    },
    ...mapActions('chat', ['changeMessage'])
  },
  computed: {
    ...mapGetters('chat', {
      getMessage: 'getMessage'
    }),
    sendMessage: {
      get () {
        return this.getMessage
      },
      set (message) {
        this.changeMessage({ message: `@${message}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  overflow: hidden;
  padding-bottom: 0;
  font-size: 0.8rem;
}

.chat-message:hover .hiddenBtn {
  opacity: 1;
  transition: opacity .3s;

}
.item-message {
  display: inline-flex;
}
.hiddenBtn {
  margin-left: 80px;
  transition: opacity .3s;
  opacity: 0;
  position: absolute;
  top: 5px;
  right: 10px;
}

.btn--send {
  background: transparent;
  color: #969696;
  transition: color .3s;
}

.btn--send:hover {
  color: #fff;
  transition: all .3s;
}

</style>
