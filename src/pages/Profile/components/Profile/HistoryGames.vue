<template>
  <div class="row history-games mx-1 mt-4 user-select-none">
    <div class="col-12">
      <div class="row">
        <div class="history-games__body mt-3 px-3">
          <DataTable
            class="history-games__table p-datatable-sm"
            :value="selectedHistoryGames"
            :rows="size"
            :lazy="true"
            :paginator="true"
            :totalRecords="totalRecords"
            :loading="loading"
            @page="onPage($event)"
          >

            <Column field="log.gameName"
            :header="$t('history.game')">
              <template #body="slotProps">
                <div class="table-title-color">
                  {{ getGameName(slotProps.data.gameName) }}
                </div>
              </template>
            </Column>

            <Column field="log.date"
            :header="$t('history.time')">
              <template #body="slotProps">
                {{ selectedHistoryGamesDateTime(slotProps.data.date) }}
              </template>
            </Column>

            <Column field="log.totalBet"
            :header="$t('history.bet')">
              <template #body="slotProps">
                {{ (slotProps.data.totalBet / 100).toFixed(2) }}
              </template>
            </Column>

            <Column field="log.rate"
              :header="$t('history.coefficient')">
              <template #body="slotProps">
                x{{ slotProps.data.rate }}
              </template>
            </Column>

            <Column field="log.totalWin"
            :header="$t('history.winnings')">
              <template #body="slotProps" >
                <div class="win">
                  <div :class="getStatusClass(slotProps.data.totalWin)">
                    {{(slotProps.data.totalWin > 0 ? slotProps.data.totalWin / 100 : 0).toFixed(2)}}
                  </div>
                  <div :class="getStatusClass(slotProps.data.totalWin)">
                    <i :class="slotProps.data.currency.id | currencyToIconClass" class="ml-1"></i>
                  </div>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { toDatetimeString } from '@/utils/date'

export default {
  name: 'HistoryGamesGlobal',
  data () {
    return {
      selectedHistoryGames: [],
      nameTable: 'my-bets',
      betStatus: true,
      page: 0,
      size: 15,
      totalRecords: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
      checkAuth: 'auth'
    })
  },
  methods: {
    onPage (event) {
      console.log(event)
      this.page = event.page
      this.loadGameHistory(this.page, this.size)
    },
    loadGameHistory (page, size) {
      this.loading = true
      this.$socket.client.emit('call', 'player.getUserLog', {
        take: size,
        skip: page * size
      }, (err, data) => {
        if (!err) {
          console.log(data)
          this.selectedHistoryGames = data.logs
          this.totalRecords = data.totalRows
        }
        this.loading = false
      })
    },
    selectedHistoryGamesDateTime (date) {
      return toDatetimeString(new Date(date))
    },
    getGameName (gameId) {
      const gameName = gameId.split(':').pop()
      return gameName
    },
    getStatusClass (state) {
      let className = ''
      if (state >= 0) {
        className = 'bet-win'
      } else {
        className = 'bet-lose'
      }
      return className
    }
  },
  created () {
    this.loadGameHistory(this.page, this.size)
  }
}
</script>

<style scoped lang="scss">
.history-games {
  display: flex;
  align-items: center;
  flex-direction: column;
  &__header {
    background: transparent;
    color: white;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    color: #c0c0c0;
    &--items {
      color: #666874;
    }
    &--item {
      cursor: pointer;
      &:hover {
        box-shadow: 0 6px 0px -4px #fff600;
      }
      &-active {
        color: #c0c0c0;
      }
    }
  }
  &__body {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
  }
  &__table {
    font-size: 14px;
  }
}

.win {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.bet-win {
  color: #b5ff6d;
}
.bet-lose {
  color: #666874;
}

.table-title-color {
  color: #666874;
}

.title-table-font-size {
  font-size: 20px;
}

@media (max-width: 500px) {
  .history-games {
    &__table {
      font-size: 9px;
    }
  }
}

@media (max-width: 380px) {
  .history-games {
    &__table {
      font-size: 8px;
    }
  }
}

@media (max-width: 340px) {
  .history-games {
    &__table {
      font-size: 6px;
    }
  }
}
</style>
