<template>
  <div>
    <div class="table-content mt-2">
      <DPreloader v-if="fetchStatus === 'FETCH'"/>
      <SessionTable v-else-if="fetchStatus === 'FETCHED'" :sessions="sessions"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DPreloader from '@/common/components/Preloader/Preloader'
import SessionTable from '@/pages/Profile/components/Profile/Session/SessionTable'

export default {
  name: 'Sessions',
  components: { DPreloader, SessionTable },
  computed: {
    ...mapGetters('profile/session', {
      fetchStatus: 'getFetchStatus',
      sessions: 'getSessions'
    })
  },
  methods: {
    ...mapActions('profile/session', ['initSession'])
  },
  created () {
    this.initSession()
  }
}
</script>

<style scoped lang="scss">

@media (max-width: 576px) {
  .table-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 560px;
  }
}

.card-header {
  background: transparent;
  color: white;
  font-size: 24px;
  margin-left: -5px;
  font-weight: 700;
}

::v-deep .p-datatable-thead>tr>th {
  background: #1b1e26 !important;
  padding: 1rem 1rem 0rem 1rem !important;
}

::v-deep .p-datatable-tbody {
  margin-top: 0 !important;
}

::v-deep .p-datatable-tbody>tr>td {
  background: #1b1e26 !important;
}
</style>
