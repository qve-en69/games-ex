<template>
  <div class="content-wrapper">
    <DPreloader v-if="getFetchStatus === 'FETCH'" />
    <slot v-else></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { DPreloader } from '@/common/components'

export default {
  name: 'DepositWrapper',
  components: { DPreloader },
  computed: {
    ...mapGetters('cash/deposit', ['getErrorStatus', 'getFetchStatus'])
  }
}
</script>

<style>
.content-wrapper {
  width: 100%;
}
</style>
