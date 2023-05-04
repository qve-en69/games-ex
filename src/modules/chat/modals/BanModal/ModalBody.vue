<template>
  <div class="bg-main p-3">
    <select class="form-control" v-model="reason">
      <option :key="reason.value" v-for="reason in this.reasons" :value="reason.value">{{ reason.msg }}</option>
    </select>
    <select class="form-control" v-model="time">
      <option :key="time.value" v-for="time in this.times" :value="time.value">{{ time.msg }}</option>
    </select>
    <textarea class="form-control" v-if="reason === 100" v-model="comment"/>
    <div class="text-center">
      <Button @click="ban()" class="button-submit ">
        Ban
      </Button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ModalBody',
  props: ['userId'],
  data () {
    return {
      comment: '',
      times: [
        { value: 5, msg: '5 минут' },
        { value: 30, msg: '30 минут' },
        { value: 60, msg: '60 минут' },
        { value: 120, msg: '120 минут' },
        { value: 180, msg: '180 минут' },
        { value: 1440, msg: '24 часа' },
        { value: 10080, msg: 'Неделя' },
        { value: 'forever', msg: 'Навсегда' }
      ],
      reasons: [
        { value: 0, msg: 'Реклама других проектов' },
        { value: 1, msg: 'Оскорбление чувств и достоинств' },
        { value: 100, msg: 'Своя причина' }
      ],
      reason: 0,
      time: 5
    }
  },
  methods: {
    ...mapActions('chat', ['banUser']),
    ban () {
      const comment = this.reason === 100 ? this.comment
        : (this.reasons.filter(row => row.value === this.reason))[0].msg
      this.banUser({ userId: this.userId, comment, time: this.time }).then(() => {
        this.$emit('close')
        this.$noty.success('Успешно')
      })
      this.comment = ''
    }
  }
}
</script>
<style scoped lang="scss">
.bg-main {
  background-color: #292C38;
  border-radius: 1rem;
  min-width: 427px;
  margin: 1rem;
}

.button-submit {
  height: 4rem;
  margin: 1rem 0;
  border-radius: 1rem;
  width: 15rem;
  background-color: #7C4EFF;
}

.form-control {
  height: 4rem;
  text-align: center;
  color: white;
  background-color: #1c1f29;
  border: 1px solid #383838;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
}

.form-control::-webkit-input-placeholder {
  color: #1c1f29;
}

.form-control::-moz-placeholder {
  color: #1c1f29;
}

.form-control:-moz-placeholder {
  color: #1c1f29;
}

.form-control:-ms-input-placeholder {
  color: #1c1f29;
}
</style>
