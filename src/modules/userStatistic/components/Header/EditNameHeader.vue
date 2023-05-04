<template>
  <div>
    <button
      @click="changeUserStatisticPage({ pageUserStatistic: USER_STATISTIC_PAGES.USER_INFO })"
      class="dm-back-icon"
    >
      <i style="cursor: pointer; font-size: 1.25rem;" class="pi pi-chevron-left"></i>
    </button>
    <div class="text-white" style="font-weight: bold">{{ $t('profile.edit_profile') }}</div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import { USER_STATISTIC_PAGES } from '@/modules/userStatistic/constants'

export default {
  name: 'EditNameHeader',
  data () {
    return {
      USER_STATISTIC_PAGES
    }
  },
  methods: {
    ...mapActions('userStatistic', ['changeUserStatisticPage'])
  }
}
</script>
<style scoped>
.dm-back-icon {
  position: absolute;
  top: 20px;
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

div {
  display: flex;
  justify-content: space-between;
  /*margin-top: 0.21rem;*/
}
</style>
