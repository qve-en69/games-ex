<template>
  <div class="row my-4 games-wrapper p-0 mx-0">
    <div class="col-12 p-0 m-0 games-content">
      <div class="col-12 col-md-6 col-lg-6 col-xl-3 games-item">
        <div class="games-header">
          <i class="games-icon fa-solid fa-bullseye-arrow"></i>
          <div class="games-header-text"><span class="much">
            {{ $t(`games.list.${listMw.id}`).split(' ', 1).join(' ') }}
          </span>{{ $t(`games.list.${listMw.id}`).split(' ').slice(1, 3).join(' ') }}
          </div>
        </div>
          <div class="swiper swiper1">
            <div class="swiper-wrapper">
              <div v-for="(game, idx) of this.listMw.gamesListGames" :key="idx"
                   class="swiper-slide games-item-content">
                <img :src="url(game.game.id)" alt="" @click="open(game.game)">
                <div class="item-info">
                  <div @click="openModalUser((JSON.parse(game.data)).user.id)" class="item-header">{{
                      (JSON.parse(game.data)).user.nick
                    }}
                  </div>
                  <div class="item-won"> {{ $t('games.list.won') }}: <span>
                    ${{
                      (JSON.parse(game.data)).amount / 100
                    }}
                  </span></div>
                  <div class="item-game-name">{{ $t('games.list.in') }} {{ game.game.title }}</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="col-12 col-md-6 col-lg-6 col-xl-3 games-item">
        <div class="games-header">
          <i class="games-icon fa-solid fa-trophy"></i>
          <div class="games-header-text"><span class="top">
            {{ $t(`games.list.${listTwg.id}`).split(' ', 1).join(' ') }}
          </span>{{ $t(`games.list.${listTwg.id}`).split(' ').slice(1, 3).join(' ') }}
          </div>
        </div>
          <div class="swiper swiper2">
            <div class="swiper-wrapper">
              <div v-for="(game, idx) of this.listTwg.gamesListGames" :key="idx"
                   class="swiper-slide games-item-content">
                <img :src="url(game.game.id)" alt="" @click="open(game.game)">
                <div class="item-info">
                  <div class="item-won">{{ $t('games.list.profit') }}: <span>{{ ((JSON.parse(game.data)).amount / 100).toFixed(2) }} $</span>
                  </div>
                  <div class="item-game-name">{{ $t('games.list.in') }} {{ game.game.title }}</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="col-md-6 col-xl-3 col-lg-6 d-none d-md-block games-item">
        <div class="games-header">
          <i class="games-icon fa-solid fa-dice-d10"></i>
          <div class="games-header-text"><span class="new">
            {{ $t(`games.list.${listTrn.id}`).split(' ', 1).join(' ') }}
          </span>{{ $t(`games.list.${listTrn.id}`).split(' ').slice(1, 3).join(' ') }}
          </div>
          <div class="ml-auto popular-header-tabs my-auto">
            <button class="dm-back-icon-games swiper-button-prev3 mr-1">
              <i style="cursor: pointer; font-size: 1rem;" class="pi pi-chevron-left"></i>
            </button>
            <button class="dm-back-icon-games swiper-button-next3 ">
              <i style="cursor: pointer; font-size: 1rem;" class="pi pi-chevron-right"></i>
            </button>
          </div>
        </div>
          <div class="swiper swiper3 ">
            <div class="swiper-wrapper">
              <div v-for="(game, idx) of this.listTrn.gamesListGames" :key="idx"
                   class="swiper-slide games-item-content-trending">
                <img class="item-img" :src="url(game.game.id)" alt="" @click="open(game.game)">
                <div class="item-info">
                  <div class="item-rtp">RTP: <span>{{ game.game.payout }}% </span></div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="col-lg-6 col-md-6 col-xl-3 d-none d-md-block games-item">
        <div class="games-header">
          <i class="games-icon fa-solid fa-fire-flame-curved"></i>
          <div class="games-header-text"><span class="trending">
            {{ $t(`games.list.${listRp.id}`).split(' ', 1).join(' ') }}</span>
            {{ $t(`games.list.${listRp.id}`).split(' ').slice(1, 3).join(' ') }}
          </div>
          <div class="ml-auto popular-header-tabs swiper-button-prev4 my-auto">
            <button class="dm-back-icon-games  mr-1">
              <i style="cursor: pointer; font-size: 1rem;" class="pi pi-chevron-left"></i>
            </button>
            <button class="dm-back-icon-games  swiper-button-next4 ">
              <i style="cursor: pointer; font-size: 1rem;" class="pi pi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div class="swiper swiper4">
          <div class="swiper-wrapper">
            <div v-for="(game, idx) of this.listTrn.gamesListGames" :key="idx"
                 class="swiper-slide games-item-content-trending">
              <img class="item-img" :src="url(game.game.id)" alt="" @click="open(game.game)">
              <div class="item-info">
                <div class="item-rtp">RTP: <span>{{ game.game.payout }}% </span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
import Swiper, { Autoplay, Navigation } from 'swiper'
import { USER_STATISTIC_PAGES } from '@/modules/userStatistic/constants'
import ModalUserInfo from '@/modules/userStatistic/components/Modal/ModalUserInfo'
import { mapActions, mapGetters, mapMutations } from 'vuex'

Swiper.use(Autoplay)
Swiper.use([Navigation])
export default {
  name: 'GamesStatistic',
  props: ['listMw', 'listTwg', 'listTrn', 'listRp'],
  data () {
    return {
      name: '',
      offset: 2,
      start: 0,
      end: 2,
      list: []
    }
  },
  methods: {
    ...mapActions('game', ['getGames', 'openGame']),
    ...mapMutations('game', ['setCurrentGame']),
    getImageUrl (imageId) {
      return `https://picsum.photos/600/400/?image=${imageId}`
    },
    open (game) {
      console.log(game)
      this.setCurrentGame({
        ...game,
        url: this.url(game.id)
      })
      this.$router.push(`/games/play/${game.id}`)
      // this.openGame({ gameId, currency: this.currentAccount.currency.name }).then(data => {
      //   this.$router.push(`/games/play/${gameId}`)
      // })
    },
    url (id) {
      const [provider, name] = id.split(':')
      return `https://cdn.softswiss.net/i/s4/${provider}/${name}.png`
    },
    ...mapMutations('userStatistic', ['setPageUserStatistic']),
    openModalUser (currentUser) {
      this.setPageUserStatistic({ pageUserStatistic: USER_STATISTIC_PAGES.USER_INFO })
      this.$modal.show(ModalUserInfo, { currentUser: currentUser }, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    }
  },
  computed: {
    ...mapGetters('chat', ['getToggle'])
  },
  mounted () {
    // eslint-disable-next-line no-new
    new Swiper('.swiper1', {
      speed: 1000,
      slidesPerView: 2,
      spaceBetween: 5,
      direction: 'vertical',
      loop: true,
      rewind: false,
      allowTouchMove: false,
      autoplay: {
        delay: 3500,
        waitForTransition: true
      },
      roundLengths: true
      // pagination: {
      //   el: '.swiper-pagination'
      // },
      // scrollbar: {
      //   el: '.swiper-scrollbar'
      // }
    })
    // eslint-disable-next-line no-new
    new Swiper('.swiper2', {
      // autoplay: true,
      speed: 1000,
      slidesPerView: 2,
      direction: 'vertical',
      spaceBetween: 5,
      loop: true,
      allowTouchMove: false,
      rewind: false,
      autoplay: {
        delay: 9300,
        waitForTransition: true
      },
      roundLengths: true
    })
    // eslint-disable-next-line no-new
    new Swiper('.swiper3', {
      speed: 1000,
      direction: 'horizontal',
      loop: true,
      spaceBetween: 50,
      rewind: false,
      allowTouchMove: false,
      autoplay: {
        delay: 4100,
        waitForTransition: true
      },
      roundLengths: true,
      navigation: {
        nextEl: '.swiper-button-next3',
        prevEl: '.swiper-button-prev3'
      },
      breakpointsBase: 'games-item',
      breakpoints: {
        120: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        240: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    })
    // eslint-disable-next-line no-new
    new Swiper('.swiper4', {
      speed: 1000,
      direction: 'horizontal',
      loop: true,
      spaceBetween: 50,
      allowTouchMove: false,
      rewind: false,
      autoplay: {
        delay: 3300,
        waitForTransition: true
      },
      roundLengths: true,
      navigation: {
        nextEl: '.swiper-button-next4',
        prevEl: '.swiper-button-prev4'
      },
      breakpointsBase: 'games-item',
      breakpoints: {
        100: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        240: {
          slidesPerView: 3,
          spaceBetween: 15
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.popular-header-tabs {
  min-width: 4rem;
}

.games-img {
  max-width: 2.5rem;
  max-height: 2.5rem;
}

.item-header {
  cursor: pointer;
}

.item-header:hover {
  text-decoration: underline;
}

.swiper {
  height: 180px;
}

.games-item {
  padding: 1rem 0.5rem;
}

.games-icon {
  font-size: 25px;
}

.fa-fire-flame-curved {
  color: #d13b78;
}

.fa-trophy {
  color: #ffe000;
}

.fa-dice-d10 {
  color: #8cc339;
}

.fa-bullseye-arrow {
  color: #4d71f2;
}

.swiper-wrapper img {
  border-radius: 1rem;
  cursor: pointer;
  max-width: 5rem;
  max-height: 5rem;
}

.games-wrapper {
  background-color: #1C1F29;
  border-radius: 15px;
  padding: 1rem;
  margin: 0 auto;
}

.games-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.games-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.2rem;
}

.games-header-text {
  margin-left: 0.5rem;
  color: #fff;
  font-size: 15px;
  max-height: 20px;

  .much {
    color: #5076FF;
  }

  .top {
    color: #FFEC43;
  }

  .new {
    color: #8cc339;
  }

  .trending {
    color: #DC437A;
  }
}

.games-item-content {
  display: flex;
  font-size: 20px;
  color: #fff;

  img {
    cursor: pointer;
  }
}

.item-info {
  margin-left: 10px;
  line-height: 24px;
  font-size: 0.9rem
}

.item-header {
  color: #969696;
  min-width: 1rem;
}

.item-won span {
  color: #5ED127;
}

.games-item-content-trending-wrap {
  display: flex;
  justify-content: space-between;
}

.item-img {
}

.games-item-content-trending {
  margin-top: 20px;
  font-size: 17px;
  color: #fff;
  margin-right: 15px;
  align-items: center;
  display: flex;
  flex-direction: column;

  img {
    height: 102px;
    width: 102px;
    cursor: pointer;
  }
}

.games-item-content-trending:last-child {
  margin-right: 0;
}

.item-rtp {
  text-align: center;

  span {
    color: #5ED127;
  }
}

.dm-back-icon-games {
  background: #13151D;
  padding: 1px;
  border-radius: 35px;
  color: #969696;
  width: 1.5rem;
  height: 1.5rem;
}
.dm-back-icon-games:hover {
  color: white;
}

a:hover {
  color: #90929f;
}

@media (max-width: 1250px) {
  .games-header-text {
    font-size: 16px;
  }

  .games-item-content {
    font-size: 16px;
    margin-left: 15px;
  }
}

@media (max-width: 1050px) {
  .games-content {
    flex-wrap: wrap;
    justify-content: space-around;
  }

}

@media (max-width: 768px) {
  .games-content {
    display: block;
  }

  .games-item-content-trending {
    img {
      height: 102px;
      width: 102px;
    }
  }
  .games-item-content-trending-wrap {
    justify-content: space-around;
  }
}

@media (max-width: 576px) {
  .games-header-text {
    font-size: 20px;
  }
}

@media (max-width: 420px) {
  .games-header-text {
    font-size: 16px;
  }

  .games-item-content-trending {
    img {
      height: 78px;
      width: 78px;
    }
  }

}
</style>
