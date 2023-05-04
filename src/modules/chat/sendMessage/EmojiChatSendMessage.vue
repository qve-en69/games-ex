<template>
  <div class="emoji-container position-absolute" ref="emojiBlock">
    <div @click="showEmoji = !showEmoji"
         class="emoji d-flex align-items-center justify-content-center"
        :class="{'emoji-move': isFocusedMessage}">
      <span :class="{'emoji--container-arrow': true}"><i class="fas fa-smile"></i></span>
    </div>
    <div v-show="showEmoji">
      <VEmojiPicker
        :pack="emojisNative"
        labelSearch
        :showSearch="false"
        :showCategory="false"
        @select="onSelectEmoji"/>
    </div>
  </div>
</template>

<script>
import packData from 'v-emoji-picker/data/emojis.json'
import VEmojiPicker from 'v-emoji-picker'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EmojiChatSendMessage',
  components: { VEmojiPicker },
  data: () => {
    return {
      showEmoji: false
    }
  },
  props: {
    isFocusedMessage: {
      type: Function
    }
  },
  computed: {
    ...mapGetters('chat', { message: 'getMessage' }),
    emojisNative () {
      return packData
    }
  },
  methods: {
    ...mapActions('chat', ['changeMessage']),
    closeEmoji (e) {
      if (this.$refs.emojiBlock.contains(e.target)) {
        return
      }
      this.showEmoji = false
    },
    onSelectEmoji (dataEmoji) {
      this.changeMessage({ message: this.message += dataEmoji.emoji })
      this.showEmoji = false
    }
  },
  mounted () {
    document.addEventListener('click', this.closeEmoji)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.closeEmoji)
  }
}
</script>

<style lang="scss">
#EmojiPicker {
  position: absolute;
  bottom: 47px;
  right: -17px;
  width: 363px;
  background-color: #121318 !important;
  border: 1px solid #121318 !important;
  z-index: 100;
  overflow-y: unset;
  border-radius: 10px;
}
.emoji-container{
  right: 17px;
  top: 8px;
}
.emoji {
  font-size: 18px;
  cursor: pointer;
  transition: .4s;

  &:hover {
    color: #7456e0
  }
}

.emoji-move {
  margin-right: 50px;
  transition: .4s;
}
</style>
