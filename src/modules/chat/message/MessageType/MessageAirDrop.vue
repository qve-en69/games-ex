<template>
  <div class="airdrop">
    <div class="airdrop-wrapper">
      <div class="airdrop-title">{{ $t('chat.air_drop.start') }}</div>
      <div class="airdrop-content">
        <div class="airdrop-activations">
          <div class="airdrop-activations-title">{{ $t('chat.air_drop.activation') }}</div>
          <div class="airdrop-activations-content">{{ message.connectData.counter }} / {{
              message.connectData.limit
            }}
          </div>
        </div>
        <div class="airdrop-sum">
          <div class="airdrop-sum-title">{{ $t('chat.air_drop.give_you') }}</div>
          <div class="airdrop-sum-content">
            <span>
            <img class="airdrop-content-img" :src=message.connectData.currency.src alt="">
            </span>
            {{ message.connectData.amount.toFixed(8) }}
          </div>
        </div>
      </div>
      <button @click="activateAirDrop()" class="airdrop-btn">{{ $t('chat.air_drop.activate') }}</button>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MessageAirDrop',
  props: ['message'],
  methods: {
    ...mapActions('chat', ['activateBonus']),
    activateAirDrop () {
      if (this.checkAuth) {
        this.activateBonus({ id: this.message.connectData.id })
      } else {
        this.$router.push({ query: { modal: 'auth' } })
      }
    }
  },
  computed: {
    ...mapGetters('user', { checkAuth: 'auth' })
  }
}
</script>

<style lang="scss" scoped>
.airdrop {
  color: #fff;
  font-weight: 200;
  margin-top: 10px;

  &-wrapper {
    background: radial-gradient(96.02% 351.14% at 3.98% 90.35%, #6F47AF 0%, #392952 100%);
    border-radius: 15px;
    padding: 23px;
    max-width: 90%;
    text-align: center;
  }

  &-content {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

  }

  &-activations {

    &-title {
      font-size: 14px;
    }

    &-content {
      background: #2F2145;
      border-radius: 15px;
      padding: 12px;
      height: 45px;
      width: 95px;
    }
  }

  &-sum {

    &-title {
      font-size: 14px;
    }

    &-content {
      background: #2F2145;
      border-radius: 15px;
      padding: 8px;
      height: 45px;
      width: 160px;
      margin-right: 1rem;
      margin-left: 0.5rem;

      span {
        margin-right: 8px;
      }
    }
  }

  &-btn {
    background: radial-gradient(107.04% 3192.9% at 0 89.42%, #513383 0, #7a2b81 100%);
    padding: 15px 0;
    width: 100%;
    border-radius: 15px;
    margin-top: 10px;
    color: #fff;
    font-weight: 200;
  }

  &-btn:hover {
    background: radial-gradient(107.04% 3192.9% at 0 89.42%, #4f3082 0, #6a2570 100%);
  }
}

.airdrop-content-img {
  height: 28px;
  width: 28px;
}

</style>
