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
  name: 'ConvertedWrapper',
  components: { DPreloader },
  computed: {
    ...mapGetters('cash/converted', ['getErrorStatus', 'getFetchStatus'])
  }
}
</script>

<style scoped lang="scss">

.content-wrapper {
  width: 100%;
}

.active {
  border-radius: 1px;
}
.active:hover {
  border-color: #b19df7;
  cursor: pointer;
}
</style>
