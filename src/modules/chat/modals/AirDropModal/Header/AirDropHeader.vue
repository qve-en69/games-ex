<template>
  <div class="header-title">
    {{ $t('chat.air_drop.name') }}
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { AIR_DROP_PAGES } from '@/modules/chat/modals/AirDropModal/constants'

export default {
  name: 'AirDropHeader',
  data () {
    return {
      AIR_DROP_PAGES,
      checked: false
    }
  },
  methods: {
    ...mapActions('chat/airDrop', ['changeAirDropPage'])
  }
}
</script>
<style scoped lang="scss">
.dm-back-icon {
  position: absolute;
  top: 17px;
  left: 10px;
  background: transparent;
  color: #969696;
}

.switch-text {
  margin-right: 1rem;
  line-height: 1.85rem;
}

.text-white {
  font-weight: bold;
  font-size: 1.14rem;
  margin-left: 3rem;
}

.switch-btn {
  margin-top: 11px;
}

div {
  display: flex;
  justify-content: space-between;
  /*margin-top: 0.21rem;*/
  margin-bottom: -0.27rem;
}

@media (max-width: 413px) {
  .dm-back-icon {
    top: 17px;
  }
  .switch-btn {
    top: 14px;
  }
}

::v-deep .p-inputswitch-slider {
  background-color: #666666 !important;
  height: 9px;
  width: 32px;
}

::v-deep .p-inputswitch.p-focus .p-inputswitch-slider {
  box-shadow: none;
}

::v-deep .p-inputswitch .p-inputswitch-slider:before {
  background-color: #B9B9B9;
  height: 13px;
  width: 22px;
  border-radius: 15px;
  left: -5px;
  margin-top: -7px;
  top: 5px;
}

::v-deep .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider:before {
  background-color: #9EFF00;
}

::v-deep .p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
  background-color: #206F28 !important;
}

.header-title {
  background-color: #1C1F29;
  padding: 6px 10px 19px 45px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  margin-top: 9px;
}

</style>
