<template>
  <div class="shadow-chat d-flex align-items-center">
    <div class="col-5 text-left d-flex align-items-center">
      <status-indicator class="indic" pulse status="positive"/>
      <span class="ml-3 text-white counter-label">{{ $t('header.online') }}:</span>
      <span class="text-white" style="font-weight: 700;">{{ online }}</span>
    </div>
    <div class="col-7 text-right">
      <i @click="openRules" class="cursor-pointer fas fa-exclamation-circle mr-2"></i>
      <OverlayPanel append-to="body" ref="op1" style="width: 400px; top: 57px;">
        <div class="chat-rules">
          <p class="title"><span>{{ $t('chat.rules.header') }}</span>
          </p>
          <p class="rule-item"><span>1. </span><span>{{ $t('chat.rules.1') }}</span>
          </p>
          <p class="rule-item"><span>2. </span><span>{{ $t('chat.rules.2') }}</span>
          </p>
          <p class="rule-item"><span>3. </span><span>{{ $t('chat.rules.3') }}</span>
          </p>
          <p class="rule-item"><span>4. </span><span>{{ $t('chat.rules.4') }}</span>
          </p>
          <p class="rule-item"><span>5. </span><span>{{ $t('chat.rules.5') }}</span>
          </p>
          <p class="rule-item"><span>6. </span><span>{{ $t('chat.rules.6') }}</span></p>
        </div>
      </OverlayPanel>
      <Dropdown class="lang-dropdown"
                @change="selectChannel"
                appendTo="body"
                v-model="selectedChannel"
                :options="getChannels" optionLabel="id"/>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ChatOnline',
  data: () => ({
    selectedChannel: null
  }),
  computed: {
    ...mapGetters('app', ['online']),
    ...mapGetters('chat', ['getCurrentChannel', 'getChannels'])
  },
  methods: {
    selectChannel (e) {
      this.changeChannel(e.value)
    },
    openRules (e) {
      this.$refs.op1.toggle(e)
    },
    ...mapActions('chat', ['changeChannel'])
  },
  mounted () {
    this.selectedChannel = this.getCurrentChannel
  }
}
</script>

<style lang="scss" scoped>
.p-overlaypanel:after, .p-overlaypanel:before {
  left: calc(var(--overlayArrowLeft, 0) + 0.45rem);
}
.indic {
  margin: 7px -10px 0 10px;
  --status-indicator-size: 22px;
  --status-indicator-color-positive: #8FFF1E;
  --status-indicator-color-positive-semi: rgba(75, 210, 143, .5);
  --status-indicator-color-positive-transparent: rgba(75, 210, 143, 0);
}

.shadow-chat {
  position: relative;
  display: block;
  height: 70px;
  background-color: #222632;
  background-size: 100%;
  width: 100%;
  //text-align: center;
}

.counter-label {
  display: block;
  width: 80px;
}

@media (max-width: 440px) {
  .chat-close {
    top: 4%;
    right: 2%;
  }
}
@media (max-width: 576px) {
  .p-overlaypanel {
    min-width: 100%;
  }
}
.lang-dropdown {
  min-width: 133px;
  height: 68px;
  align-items: center;
  background: linear-gradient(360deg, rgba(131, 87, 255, 0.39) 0%, rgba(53, 55, 65, 0.39) 52.6%);
  border: 0;
  left: 14px;
}
.chat-rules {
  padding: 20px;
  background: #1c1f29;
  .title {
      font-size: 1rem;
      height: 2rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      font-weight: 700;
  }
  .rule-item {
    margin-top: 0.75rem;
  }
  p {
    margin: 0;
    word-break: normal;
  }
}
</style>
