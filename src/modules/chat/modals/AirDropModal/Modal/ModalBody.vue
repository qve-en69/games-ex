<template>
  <div>
    <AirDrop @close="$emit('close')" v-if="pageAirDrop === AIR_DROP_PAGES.AIR_DROP"/>
    <AirDropCurrency @close="$emit('close')" v-else-if="pageAirDrop === AIR_DROP_PAGES.CHOOSE_CURRENCY"/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import { AIR_DROP_PAGES } from '@/modules/chat/modals/AirDropModal/constants'

import AirDrop from '@/modules/chat/modals/AirDropModal/AirDrop/AirDrop'
import AirDropCurrency from '@/modules/chat/modals/AirDropModal/AirDrop/AirDropCurrency'

export default {
  name: 'ModalBody',
  data () {
    return {
      AIR_DROP_PAGES
    }
  },
  components: {
    AirDrop,
    AirDropCurrency
  },
  methods: {
    ...mapActions('chat/airDrop', ['initAirDrop'])
  },
  computed: {
    ...mapGetters('chat/airDrop', { pageAirDrop: 'getPageAirDrop' })
  },
  created () {
    this.initAirDrop()
  }
}
</script>
<style scoped lang="scss">
</style>
