<template>
  <div class="content-wrapper">
    <DPreloader v-if="getFetchStatus === 'FETCH'" />
    <div v-else-if="getErrorStatus === true">Internal Error Please try again latter...</div>
    <slot v-else></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { DPreloader } from '@/common/components'

export default {
  name: 'InvestWrapper',
  components: { DPreloader },
  computed: {
    ...mapGetters('cash/invest', ['getErrorStatus', 'getFetchStatus'])
  }
}
</script>

<style scoped>

</style>
