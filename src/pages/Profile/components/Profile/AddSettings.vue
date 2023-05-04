<template>
    <div class="col-12">
      <div class="row">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th>Игра</th>
                <th>Время</th>
                <th>Выигрыш</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="log in history" :key="log.id">
                <td>{{getGameName(log.game_id)}}</td>
                <td>{{log.createdAt | moment("YYYY-MM-DD HH:mm:ss")}}</td>
                <td>{{(log.bet/ 100).toFixed(2)}}</td>
                <td>{{(log.winLose > 0 ? log.winLose / 100 : 0).toFixed(2)}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'History',
  data: () => ({
    history: []
  }),
  methods: {
    getGameName (id) {
      switch (Number(id)) {
        case 1: return 'Dice'
        case 2: return 'Classic'
        case 3: return 'Battle'
        case 4: return 'Coinflip'
        case 5: return 'Fast'
        case 6: return 'Fortune'
        case 7: return 'Mines'
        default: return id
      }
    }
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
      checkAuth: 'auth',
      profileID: 'profileID'
    })
  },
  created () {
    this.$socket.client.emit('call', 'history.getGameLogs', {}, (err, data) => {
      console.log('getGameLogs', this.data)

      if (!err) {
        this.history = data
      }
    })
  }
}
</script>

<style scoped lang="scss">
.card-header {
  background: transparent;
  color: white;
  font-size: 24px;
  margin-left: -5px;
  font-weight: 700;
}

</style>
