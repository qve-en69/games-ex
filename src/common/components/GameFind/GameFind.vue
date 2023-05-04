<template>
  <div class="wrapper">
    <div class="content-header">
      <div class="header-result"></div>
      <div class="header-find">{{ $t('games.c.search') }} <span>{{ count }} </span>{{ $t('games.c.game_total') }} </div>
    </div>
    <div class="col-12 content">
      <div class="content-card-item" :key="idx" v-for="(game, idx) in games">
        <div class="card-item-content">
          <div class="card-item-img cursor-pointer">
            <img :src="url(game.id)" :alt="game.title" @click="toggle(); open(game)" >
          </div>
          <div class="card-item-info">
            <div class="card-item-title">{{ game.name }}</div>
            <div class="card-item-rtp">RTP: <span>{{ game.payout }}%</span></div>
            <div style="margin-top: 15px">
              <span class="card-item-more">{{ game.category[0].id }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import utils from '@/mixins/utils'

export default {
  name: 'GameFind',
  props: ['keyword'],
  data: () => ({
    timeout: null,
    games: [],
    count: 0
  }),
  mixins: [utils],
  methods: {
    ...mapActions('game', ['getSearchGames']),
    toggle () {
      this.$emit('close')
    }
  },
  computed: {
    ...mapGetters('game', ['getListByName'])
  },
  watch: {
    keyword (keyword) {
      console.log(keyword)
      if (keyword.length >= 3) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.getSearchGames({ keyword }).then(({ count, games }) => {
            this.games = games
            this.count = count
          })
        }, 300)
      } else {
        this.games = []
        this.count = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.content-header {
  display: flex;
  padding: 20px 20px 0 20px;
  justify-content: space-between;
  font-size: 1rem;
}

.header-result {
  font-weight: 700;
  margin-bottom: 0 !important;
}

.header-find {
  span {
    color: yellow;
  }
}

.content {
  display: flex;
  //justify-content: space-between;
  flex-wrap: wrap;
  max-height: 360px;
  overflow: auto;
}

.content-card-item {
  margin: 20px 10px;
}

.card-item-img {
  width: 50%;
}

.card-item-img img {
  border-radius: 15px;
  width: 122px;
  height: 122px;
  margin: 0 auto;
  display: block;
}

.card-item-content {
  display: flex;
  font-weight: 700;
  font-size: .75rem;
}

.card-item-info {
  text-align: left;
  padding-top: 15px;
  padding-left: 20px;
  width: 50%;
  line-height: .875rem;
  width: 122px;
}

.card-item-title {
  white-space: nowrap;
  overflow: hidden;
  //word-wrap: normal;
}

.card-item-rtp {
  span {
    color: yellow;
  }
}

.card-item-more {
  border-radius: 0.75rem;
  background-color: rgba(0,0,0,.4);
  padding: 2px 5px 2px 5px;
  margin: 0 0 0 -5px;
}

@media (max-width: 1300px) {
  .wrapper {
    width: 98.5vw;
  }

  .content-header {
    margin-bottom: 20px;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(8,1fr);
    grid-gap: 10px;
  }

  .content-card-item {
    margin: 0;
  }

  .card-item-content {
    display: block;
  }

  .card-item-more {
    display: none;
  }

  .card-item-info {
    padding: 7px;
    width: 112px;
    margin: 0 auto;
  }

  .card-item-img {
    width: 100%;
  }
}

@media (max-width: 1200px) {
  .content {
    grid-template-columns: repeat(7,1fr);
  }
}

@media (max-width: 1090px) {
  .content {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 991px) {
  .wrapper {
    width: calc(100vw - 50px);
  }
}

@media (max-width: 950px) {
  .content {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 950px) {
  .content {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 820px) {
  .content {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 670px) {
  .content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 420px) {
  .content {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
