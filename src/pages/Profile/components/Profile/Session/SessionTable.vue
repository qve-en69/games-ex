<template>
  <DataTable class="table" responsiveLayout="scroll" :value="sessions" :scrollable="true" scrollHeight="flex">
    <Column style="font-weight: 300;" field="browser" :header="$t('profile.session.browser')">
      <template #body="slotProps">
        <span>{{ slotProps.data.browser }}</span>
      </template>
    </Column>
    <Column style="font-weight: 300;" field="region" :header="$t('profile.session.region')">
      <template #body="slotProps">
        <span>{{ slotProps.data.region }}</span>
      </template>
    </Column>
    <Column style="font-weight: 300;" field="ip" :header="$t('profile.session.ip')">
      <template #body="slotProps">
        <span>{{ slotProps.data.ip }}</span>
      </template>
    </Column>
    <Column style="font-weight: 300;" field="date" :header="$t('profile.session.when')">
      <template #body="slotProps">
        <span>{{ createDate(slotProps.data.date) }}</span>
      </template>
    </Column>
    <Column style="font-weight: 300;" field="online" :header="$t('profile.session.action')">
      <template #body="slotProps">
        <span>{{ getAction(slotProps.data.online) }}</span>
      </template>
    </Column>

  </DataTable>
</template>

<script>

import { ACTION_SESSION } from '@/pages/Profile/constants'
import dayjs from 'dayjs'

export default {
  name: 'SessionTable',
  props: ['sessions'],
  methods: {
    getAction (online) {
      switch (online) {
        case ACTION_SESSION.CURRENT: return 'Текущий'
        case ACTION_SESSION.COMPLETED: return 'Завершен'
      }
    },
    createDate (date) {
      return dayjs(date).format('YYYY.MM.DD HH:mm:ss')
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  margin-right: -10px;
  margin-left: -14px;
  height: 760px;
  //max-height: 591px;
  //height: calc(90vh - 225px);
  //overflow: scroll;
  border-radius: 15px 15px 0 0;
  width: 105.5%;
}

::v-deep .p-datatable-thead > tr > th {
  background-color: #292C38 !important;
}

::v-deep .p-datatable-scrollable-header {
  border-radius: 15px 15px 0 0 !important;
}

::v-deep .p-datatable-scrollable-header-box {
  padding-right: 0 !important;
}

::v-deep .p-datatable-scrollable-body::-webkit-scrollbar {
  width: 0 !important;
}

::v-deep .p-datatable-tbody {
  margin-top: 57px !important;
}

::v-deep .p-datatable-tbody > tr > td {
  border: none !important;
}

::v-deep .p-datatable-tbody > tr > td {
  background-color: #1C1F29;
}

::v-deep .p-datatable .p-datatable-thead > tr > th {
  background-color: #292C38 !important;
}

::v-deep .p-column-title {
  color: #969696;
  font-weight: 300;
}

.state-1, .state-5 {
  color: white;
}

.state-2 {
  color: #BFFF38;
}

.state-3 {
  color: #FFBB38;
}

.state-4, .state-6 {
  color: #FF3E3E
}

.state-7 {
  color: red;
}

@media (max-width: 991px) {
  .table {
    width: 103.5%;
  }
}

@media (max-width: 768px) {
  .table {
    width: 104.5%;
  }
}

@media (max-width: 576px) {
  .table {
    font-size: 12px;
    height: 560px;
    margin-right: 0;
    margin-left: 0;
    border-radius: 15px 15px 0 0;
    width: 110.5%;
  }
}

@media (max-width: 478px) {
  .table {
    font-size: 10px;
    height: 560px;
    margin-right: 0;
    margin-left: 0;
    border-radius: 15px 15px 0 0;
    width: 90vw;
  }
  ::v-deep.p-datatable .p-datatable-thead>tr>th {
    padding: 1rem 0.5rem;
  }
  ::v-deep .p-datatable-tbody>tr>td {
    padding: 1rem 0.5rem !important;
  }
}

</style>
