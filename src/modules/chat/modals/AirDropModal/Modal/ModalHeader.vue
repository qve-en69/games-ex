<template>
  <div>
    <AirDropHeader v-if="pageAirDrop === AIR_DROP_PAGES.AIR_DROP"/>
    <AirDropCurrencyHeader v-else-if="pageAirDrop === AIR_DROP_PAGES.CHOOSE_CURRENCY"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import AirDropHeader from '@/modules/chat/modals/AirDropModal/Header/AirDropHeader'
import { AIR_DROP_PAGES } from '@/modules/chat/modals/AirDropModal/constants'
import AirDropCurrencyHeader from '@/modules/chat/modals/AirDropModal/Header/AirDropCurrencyHeader'

export default {
  name: 'ModalHeader',
  components: {
    AirDropHeader,
    AirDropCurrencyHeader
  },
  data () {
    return {
      AIR_DROP_PAGES
    }
  },
  computed: {
    ...mapGetters('chat/airDrop', { pageAirDrop: 'getPageAirDrop' })
  }
}
</script>
<style scoped>
</style>
