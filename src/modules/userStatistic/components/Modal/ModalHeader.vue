<template>
  <div>
    <InfoHeader v-if="pageUserStatistic === USER_STATISTIC_PAGES.USER_INFO"/>
    <EditNameHeader v-else-if="pageUserStatistic === USER_STATISTIC_PAGES.USER_EDIT_NAME"/>
    <EditAvatarHeader v-else-if="pageUserStatistic === USER_STATISTIC_PAGES.USER_EDIT_AVATAR"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { InfoHeader, EditNameHeader, EditAvatarHeader } from '@/modules/userStatistic/components/Header'
import { USER_STATISTIC_PAGES } from '@/modules/userStatistic/constants'

export default {
  name: 'ModalHeader',
  components: {
    InfoHeader,
    EditNameHeader,
    EditAvatarHeader
  },
  data () {
    return {
      USER_STATISTIC_PAGES
    }
  },
  computed: {
    ...mapGetters('userStatistic', { pageUserStatistic: 'getPageUserStatistic' })
  }
}
</script>
<style scoped>
</style>
