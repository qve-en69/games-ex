<template>
  <DModal class="col-12 position-relative h-100 p-0 d-flex flex-column">
    <ChatOnline />
    <button @click="$emit('close')" class="dm-close-icon">
      <i style="font-size: 1.15rem;" class="pi pi-times"></i>
    </button>
    <ChatMessages />
    <ChatSendMessage />
  </DModal>
</template>

<script>

import { DModal } from '@/common/components'
import { ChatOnline } from './components'
import { ChatMessages } from './messages'
import { ChatSendMessage } from './sendMessage'

export default {
  name: 'Chat',
  components: {
    ChatMessages,
    ChatOnline,
    DModal,
    ChatSendMessage
  }
}
</script>

<style lang="scss" scoped>
.dm-close-icon {
  display: none;
  position: absolute;
  font-weight: bold;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 11;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  color: #969696;
  user-select: none;

}
.v--modal-box, .v--modal {
  height: 100%;
}
@media screen and (max-width: 991px) {
  .dm-close-icon {
    display: block !important;
  }
}
@media screen and (max-width: 576px) {
  .dm-wrapper {
    border-radius: 0;
  }
}

@media screen and (min-width: 991px) {
  .dm-wrapper {
    border-radius: 0;
  }
}

.chat-close {

}

</style>
