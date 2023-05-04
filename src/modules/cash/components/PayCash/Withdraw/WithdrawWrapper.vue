<template>
  <div class="content-wrapper">
    <DPreloader v-if="getFetchStatus === 'FETCH'" />
    <div class="mt-2 text-center" v-else-if="getErrorStatus === true">
      Internal Error Please try again latter...
    </div>
    <slot @close="$emit('close')" v-else></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { DPreloader } from '@/common/components'

export default {
  name: 'WithdrawWrapper',
  components: { DPreloader },
  computed: {
    ...mapGetters('cash/withdraw', ['getErrorStatus', 'getFetchStatus'])
  }
}
</script>

<style scoped>
.content-wrapper {
  width: 100%;
}
</style>
