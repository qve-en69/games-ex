<template>
  <div class="position-relative">
    <div class="col-12 send-chat-block">
      <div class="col-12 message-container justify-content-center position-relative">
        <textarea
          :placeholder="$t('chat.chat_input')"
          @keydown.enter.prevent="sendMessageC"
          @focus="onFocusTextarea"
          @blur="onBlurTextarea"
          ref="inputMessage"
          v-model="message"
          class="textarea-container"
          :class="{ 'active-input': isFocusedMessage}"
        />
        <EmojiChatSendMessage class="emoji-chat" :isFocusedMessage="isFocusedMessage" />
        <Button @click.stop="sendMessage"
                :disabled="disabled"
                class="button-send"
                :class="{'active-button-send': isFocusedMessage}">
          <div class="btn-icon">
            <i class="fa-solid fa-paper-plane-top"></i>
          </div>
        </Button>
      </div>
      <GifChatSendMessage/>
    </div>
    <ReplyChatSendMessage/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GifChatSendMessage from './GifChatSendMessage'
import ReplyChatSendMessage from './ReplyChatSendMessage'
import EmojiChatSendMessage from './EmojiChatSendMessage'
import { DELAY_MESSAGE } from '@/modules/chat/constants'

export default {
  name: '',
  data () {
    return {
      focusedTextarea: false,
      disabled: false,
      interval: null
    }
  },
  components: { EmojiChatSendMessage, ReplyChatSendMessage, GifChatSendMessage },
  methods: {
    ...mapActions('chat', ['sendMessage', 'changeMessage']),
    onFocusTextarea () {
      this.focusedTextarea = true
    },
    onBlurTextarea () {
      this.focusedTextarea = false
    },
    sendMessageC () {
      if (!this.disabled) {
        this.sendMessage()
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      checkAuth: 'auth'
    }),
    ...mapGetters('chat', ['getMessage', 'lastTimeSend']),
    message: {
      get () {
        return this.getMessage
      },
      set (message) {
        this.changeMessage({ message })
      }
    },
    isFocusedMessage () {
      return this.message.trim().length || this.focusedTextarea
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      if (this.lastTimeSend === 0) {
        this.disabled = false
      } else { this.disabled = !(this.lastTimeSend <= Date.now() - DELAY_MESSAGE) }
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>

.answer-close:hover {
  color: white;
}

.send-chat-block {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  opacity: 1;
  -webkit-transition: all ease 0.3s;
  transition: all ease 0.3s;
  background: #353840;
  font-size: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 0px;
}

.message-container {
  position: relative;
  display: flex;
}

.button-send {
  position: fixed;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -80px;
  border-radius: 100%;
  transition: .4s;
  cursor: pointer;
}

.textarea-container {
  display: inline-block;
  background: #17191F;
  width: 100%;
  border: none;
  outline: 0;
  color: #fff;
  overflow-y: auto;
  transition: .4s;
  height: 42px;
  border-radius: 25px;
  padding: 8px 42px 8px 16px;
  resize: none;

  &::placeholder {
    padding-top: 1px;
    font-size: 15px;
    color: #54555a;
  }

  .button-send-icon-wrap {
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    color: black;
    background: linear-gradient(to top, #ffab0b 0%, #ffe635 100%);
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    height: 32px;
  }

  .emoji-button-wrapper {
    height: 100%;
    cursor: pointer;
    background: linear-gradient(to top, #ffab0b 0%, #ffe635 100%);
  }
}

.active-input {
  box-shadow: 0 0 0 2px #7456e0;
  margin-right: 50px;
}

.emoji-chat {
  position: absolute;
  right: 30px;
  transition: .4s;
}

.button-send.active-button-send {
  right: 17px;
}

.btn-icon {
  i {
    margin: 2px 0 0 2px;
    font-size: 20px;
  }
}

.not-auth {
  text-align: center;
  background-color: #C4C4C4;
  padding-bottom: 1rem;
  padding-top: 2rem;
}

.not-auth__text {
  color: black;
  font-weight: 300;
  font-size: 1rem;
}
</style>
