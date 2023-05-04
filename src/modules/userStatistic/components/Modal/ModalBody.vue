<template>
  <div class="modal-body-my">
    <UserInfo v-if="pageUserStatistic === USER_STATISTIC_PAGES.USER_INFO"/>
    <UserInfoName v-else-if="pageUserStatistic === USER_STATISTIC_PAGES.USER_EDIT_NAME"/>
    <UserInfoAvatar v-else-if="pageUserStatistic === USER_STATISTIC_PAGES.USER_EDIT_AVATAR"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { UserInfo, UserInfoName, UserInfoAvatar } from '@/modules/userStatistic/components/components'
import { USER_STATISTIC_PAGES } from '@/modules/userStatistic/constants'

export default {
  name: 'ModalBody',
  data () {
    return {
      USER_STATISTIC_PAGES
    }
  },
  components: {
    UserInfo,
    UserInfoName,
    UserInfoAvatar

  },
  computed: {
    ...mapGetters('userStatistic', { pageUserStatistic: 'getPageUserStatistic' })
  }
}
</script>
<style scoped>
.modal-body-my {
  width: 427px;
  padding-left: 3px;
}

@media (max-width: 576px) {
  .modal-body-my {
    width: 100%;
    height: 100%;
  }
}

</style>
