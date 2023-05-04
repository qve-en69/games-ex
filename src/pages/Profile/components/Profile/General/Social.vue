<template>
  <div class="col-12">
    <div v-if="!getActiveTelegram || getActiveGoogle">
      <div class="card-header mt-4 pt-1">
        {{ $t('profile.other.social') }}
      </div>
      <div class="card-body col-12 py-1">
        <OAuth :isConnected="isConnected" :connect="true"/>
      </div>
    </div>
    <div v-if="getActiveTelegram || getActiveGoogle" class="card-header mt-4 pt-1 mb-2">
      {{ $t('profile.other.name') }}
    </div>
    <div v-if="getActiveTelegram" class="social-linked-wrapper mt-2">
      <InputText type="text"
                 class="p-form-control"
                 style="border-radius: 15px"
                 :disabled="true"
                 v-model="getActiveTelegram.profileId"
      />
      <div class="social-linked social-telegram">
        <div class="social-icon">
          <i class="fab fa-telegram-plane"></i>
        </div>
      </div>
    </div>
    <div v-if="getActiveGoogle" class="social-linked-wrapper mt-2">
      <InputText type="text"
                 class="p-form-control"
                 style="border-radius: 15px"
                 :disabled="true"
                 v-model="getActiveGoogle.profileId"
      />
      <div class="social-linked social-google">
        <div class="social-icon google">
          <i class="fab fa-google"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OAuth from '@/modules/auth/components/oAuth/oAuth'

export default {
  name: 'Social',
  data: () => ({
    isConnected: {}
  }),
  components: {
    OAuth
  },
  watch: {
    getActiveTelegram (val) {
      this.isConnected.telegram = !!val
    },
    getActiveGoogle (val) {
      this.isConnected.google = !!val
    }
  },
  computed: {
    ...mapGetters('user', ['getActiveTelegram', 'getActiveOpenWallet', 'getActiveGoogle'])
  },
  mounted () {
    this.isConnected = {
      telegram: !!this.getActiveTelegram,
      google: !!this.getActiveGoogle,
      openWallet: !!this.getActiveOpenWallet
    }
  }
}
</script>

<style scoped lang="scss">

.card-header {
  background: transparent;
  color: white;
  margin-left: -5px;
  font-weight: 700;
  font-size: 18px;
}

.social {
  border-radius: 35px;
  height: 34px;
  width: 34px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 21px;
  color: #1C1F29;
  margin-top: 16px;

  &-telegram {
    background-color: #90A8FF;
  }

  &-facebook {
    background-color: #4267b2;
  }

  &-google {
    background-color: #d93a3a;
  }

  &:hover {
    opacity: 0.9;
  }
}

.social:first-child {
  margin-left: -5px;
}

.p-form-control {
  border-radius: 15px;
  background-color: #383A44;
  height: 54px;
  font-size: 18px;
  margin-left: 10px;
  width: 100%;
  padding-left: 70px;
}

.social-linked-wrapper {
  position: relative;
}

.social-linked {
  height: 52px;
  width: 53px;
  border-radius: 15px;
  position: absolute;
  top: 1px;
  left: 11px;
  text-align: center
}

.social-icon {
  border-radius: 35px;
  height: 32px;
  width: 32px;
  margin-left: 10px;
  font-size: 21px;
  color: #6B7190;
  margin-top: 10px;
  background-color: #fff;
}

.google {
  color: #ffffff;
  background-color: #d93a3a;
}

</style>
