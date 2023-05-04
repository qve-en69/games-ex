<template>
  <div class="reply-in-chat" v-if="message.replyData">
    <div class="row">
      <div class="col-1">
        <div class="reply-line"></div>
      </div>
      <div class="col-11">
        <div class="row">
          <div class="col-12">
            <div
              :style="`color: #${message.replyData.user.moderator ? message.replyData.user.moderatorColor : message.replyData.user.userColor}`">
              <i style="font-size: 18px;"
                 v-if="checkPrivilege(message.replyData.user.roles, 'moderator') || checkPrivilege(message.replyData.user.roles, 'admin')"
                 class="fas fa-user-secret"></i>
              {{ message.replyData.user.nick }}
            </div>
            <img v-if="message.replyData.typeId === 3" :src="message.replyData.message">
            <div v-else>{{ message.replyData.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reply',
  components: {},
  props: ['message'],
  methods: {},
  computed: {},
  watch: {},
  created () {
  }
}
</script>

<style lang="scss" scoped>

</style>
