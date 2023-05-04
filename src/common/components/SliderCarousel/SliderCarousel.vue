<template>
  <div class="row p-0">
    <div class="col-12 p-0">
      <div v-if="list && list.gamesListGames.length" class="row popular-wrapper" ref="wrapper">
        <div v-if="lite" class="popular-header-lite">
          <div class="header-left">
            <i v-if="list.id === 'FBIS'" class="fa-solid mr-2" :class="iconGame" ></i>
            <i v-if="list.id === 'TCG'" class="fa-solid  mr-2" :class="iconGame"></i>
            <i v-if="list.id === 'RLG'" class="fa-solid  mr-2" :class="iconGame"></i>
            <i v-if="list.id === 'TLG'" class="fa-solid  mr-2" :class="iconGame"></i>
            <div class="popular-header-text-lite">
              {{ $t(`games.list.${list.id}`) }}
            </div>
            <span class="popular-text-games-lite">{{ list.gamesListGames.length }}</span>
          </div>
          <div class="popular-header-btns my-auto">
            <button ref="prev" class="popular-btn-prev">
              <i class="pi pi-chevron-left"></i>
            </button>
            <button ref="next" class="popular-btn-next">
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div v-else class="popular-header">
          <div class="popular-header-text">
            {{ $t(`games.list.${list.id}`).split(' ', 2).join(' ') }}
            <div class="much">
              {{ $t(`games.list.${list.id}`).split(' ').slice(2, 3).join(' ') }}
            </div>
          </div>
          <div class="popular-header-btns ml-2">
            <router-link v-if="this.list.id === 'BFC'" tag="button" to="/games/c/main" class="popular-btn-all">{{ $t('main.slider.all') }} <span
              style="color: yellow">{{ list.gamesListGames.length }}</span> {{ $t('main.slider.games') }}
            </router-link>
            <router-link v-else tag="button" to="/games/live/main" class="popular-btn-all">{{ $t('main.slider.all') }} <span
              style="color: yellow">{{ list.gamesListGames.length }}</span> {{ $t('main.slider.games') }}
            </router-link>
            <button ref="prev" class="popular-btn-prev ml-2">
              <i class="pi pi-chevron-left"></i>
            </button>
            <button ref="next" class="popular-btn-next ml-2">
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div v-if="list && list.gamesListGames.length" ref="swiper" class="swiper">
          <div class="swiper-wrapper">
            <div v-for="(slides, idx) of slides" :key="idx"
                 class="swiper-slide games-item-content">
              <div class="col-12 px-2 popular-content" :style="{ gridTemplateColumns: template }">
                <div class="popular-card-item" :key="idx" v-for="(stat, idx) in slides">
                  <div class="popular-default-card" v-if="stat.game.id === 'template'">
                    <img
                      class="popular-default-image"
                      src="data:image/png;base64, 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"
                    />
                  </div>
                  <div v-else>
                    <GameItem :game="stat.game"/>
                    <div class="popular-card-text">
                      <span>{{ stat.game.name }}</span>
                      <div class="circle">
                        <i style="font-size:14px;" class="far fa-question-circle cursor-pointer"></i>
                        <div class="popular-hidden">
                          <div class="hidden-rtp">
                            RTP:<span>{{ (stat.game.payout || 95).toFixed(2) }}%</span>
                          </div>
                          <div class="hidden-best-win">
                            {{ $t('main.slider.big_win') }} <span class="text-white">{{ stat.game.bigWinRate }}X</span>
                          </div>
                          <div v-if="stat.game" class="hidden-footer">
                            <span>{{ stat.game.producer.title }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapMutations } from 'vuex'
import Swiper, { Navigation, Scrollbar } from 'swiper'
import GameItem from '@/common/components/GameItem/GameItem'

Swiper.use([Navigation, Scrollbar])

export default {
  name: 'SliderCarousel',
  components: { GameItem },
  props: ['list', 'rows', 'lite'],
  data: () => ({
    games: [],
    slides: [],
    ro: null,
    wrapperWidth: 1320,
    template: 'repeat(8, 1fr)',
    timeout: null,
    perncet: 0,
    part: 0,
    all: 0
  }),
  computed: {
    iconGame () {
      return {
        'fa-cards': this.list.id === 'FBIS',
        'fa-dice ': this.list.id === 'RLG',
        'fa-sort-amount-up-alt': this.list.id === 'TLG',
        'fa-bow-arrow': this.list.id === 'TCG'
      }
    }
  },
  watch: {
    $route (val) {
      this.calc()
    }
  },
  methods: {
    ...mapActions('game', ['getGames', 'openGame']),
    ...mapMutations('game', ['setCurrentGame']),

    open (game) {
      this.setCurrentGame({
        ...game,
        url: this.url(game.id)
      })
      this.$router.push(`/games/play/${game.id}`)
    },
    url (id) {
      const [provider, name] = id.split(':')
      return `https://cdn.softswiss.net/i/s4/${provider}/${name}.png`
    },
    calc () {
      if (this.$refs.swiper && this.$refs.swiper.swiper) {
        this.$refs.swiper.swiper = null
      }
      if (this.$refs.wrapper) {
        const countGamesAll = this.list.gamesListGames.length
        const rows = this.rows
        this.wrapperWidth = this.$refs.wrapper.offsetWidth
        let imageWidth = 170
        if (this.wrapperWidth < 350) {
          imageWidth = 120
        }
        let gamesByRow = Math.floor(this.wrapperWidth / imageWidth)
        this.perncet = (((rows * gamesByRow) / countGamesAll * 100)).toFixed(0)
        this.part = rows * gamesByRow
        this.all = countGamesAll
        this.template = `repeat(${gamesByRow}, ${rows}fr)`
        const pages = Math.ceil(countGamesAll / (gamesByRow * rows))
        this.slides = []
        for (let i = 0; i < pages; i++) {
          this.slides.push(this.list.gamesListGames.slice(gamesByRow * i * rows, gamesByRow * (i + 1) * rows))

          // add template
          if (this.slides[i].length < gamesByRow * rows) {
            const count = gamesByRow * rows - this.slides[i].length
            for (let b = 0; b < count; b++) {
              this.slides[i].push({
                game: { id: 'template' }
              })
            }
          }
        }

        setTimeout(() => {
          // eslint-disable-next-line no-new
          new Swiper(this.$refs.swiper, {
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 10,
            direction: 'horizontal',
            loop: false,
            navigation: {
              nextEl: this.$refs.next,
              prevEl: this.$refs.prev
            }
          })
        }, 300)
      }
    }
  },
  mounted () {
    if (this.list) {
      if (this.list.gamesListGames.length) {
        this.calc()
        this.ro = new ResizeObserver(entries => {
          for (let entry of entries) {
            if (entry.contentBoxSize) {
              clearTimeout(this.timeout)
              this.timeout = setTimeout(() => {
                this.calc()
              }, 200)
            }
          }
        })
        this.ro.observe(this.$refs.swiper)
      }
    }
  },
  beforeUnmount () {
    if (this.ro) {
      this.ro.unobserve(this.$refs.swiper)
    }
  },
  unmounted () {
    this.ro = null
  }
}
</script>

<style lang="scss" scoped>
.popular-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

progress[value] {
  width: 250px;
  height: 20px;
}

.popular-header-lite {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.more-games {
  margin: 0 auto;
}

.popular-wrapper {
  position: relative;
  padding: 0 10px;
  margin: 1rem 0;
  z-index: 0;
}

.button-submit {
  height: 2.5rem;
  margin-top: 20px;
  border-radius: 15px;
  width: 12rem;
  background-color: #7f64e3;
  color: white;
}

.popular-header-text {
  position: relative;
  background-image: linear-gradient(to right, #1c1f29, #1c1f29);
  background-repeat: no-repeat;
  background-size: 70% 100%;
  padding-left: 15px;
  color: white;
  font-weight: 600;
  height: 70px;
  font-size: 1.3rem;
  padding-top: 5px;
  min-width: 150px;
  padding-right: 1rem;
  border-top-left-radius: 1.25rem;
  text-transform: uppercase;
  display: inline-block;
  padding-bottom: 5rem;
  margin-bottom: -0.8rem;
  z-index: 1;

  div {
    color: yellow;
  }
}

.popular-header-text-lite {
  font-size: 1rem;
  color: white;
  font-weight: 600;
}

.popular-text-games-lite {
  color: rgb(93, 160, 0);;
  font-size: 1.2rem;
  font-weight: 600;
}

.header-left {
  display: flex;
  align-items: center;
  height: 3rem;

  span {
    margin-left: 1rem;
  }
}

.popular-header-text:after {
  content: "";
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAABwCAYAAADmIGnzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEt0lEQVR4nO3dTWhcVRiH8ecaaRAqjIu4MdhsAimIpBBclKwszEa6aTZW3FhRtIpU8aMiYqporUSLutCF+AH1C10Ud124EHRjoVZ0IyKIO7HUgAV3xsWZ0KSZSe7M3Hvec97z/0EJdJG8M/MwYW7ue281vWfvGnFdAS4Bq8Dl3tffgIvAeeDXyPNIBNcb/MzdvX+DrAIXgG+BMyg8FyqDd7RhXQQ+BT4D/rAdRUZ1nfUANcwDp4DfgXPAfsthZDQ5hLauArrAdyi47OQU2kYbg5s1nkVqyDW0dV3gJ+AY+T8W1zy8OJPAaeAb9O6WLA+hrVskHBa5x3oQ2cpTaBCOz50BnrYeRDbzFhqET6engLfx+fiy5PmFeBQ4C9xgPIfgOzSAg4Rfpd4fZ/JKeAEOASvWQ5SuhNAAHgeOWg9RslJCA3gLuMt6iFKVFNoE8AFws/UgJSopNIAp4B3rIUpUWmgQPhwsWQ9RmhJDg/CudpP1ECUpNbQp4E3rIUpSamgA9wL7rIcoRcmhVYRDHhJByaFBOLVIHwwiKD00CH+e2mU9hHcKDWYIp4JLixRa8Cz6i0GrFFrQAU5YD+GZQrvqAeA26yG8UmhXTQCvWw/hlULbrItOJWqFQttqBZurLLmm0LaaAx60HsIbhdbfMjq7o1EKrb8p4HnrITxRaIMdRdfyaIxCG2wSeNV6CC8U2vYOAQesh/BAoe1sBT1PY9MTuLN54D7rIXKn0OpZRheLGYtCq2caOG49RM4UWn3PALdaD5ErhVafDneMQaEN527gDushcqTQhlOhc9ZGotCGt4iu/D00hTaal9HhjqEotNHMAE9YD5EThTa642hFrzaFNrrdwCvWQ+RCoY3nCFrRq0WhjUeHO2pSaOPrEm6cIdtQaM14Da3obUuhNWOOcO8pGUChNecFtKI3kEJrTocQm/Sh0Jr1EFrR60uhNWsSHe7oS6E17yBa0dtCobVDK3rX0JPRjnm0oreJQmvPSeBG6yFSodDaoysSbaDQ2vUYWtEDFFrbtKLXo9DadxjYbz2ENYUWR/H3BlVocSxQ+IqeQoun6BU9hRbPDAWv6Cm0uIpd0VNocRW7oqfQ4jsC7LMeIjaFFl9FOLujKArNxp3AkvUQMSk0OycpaEVPodmZpaAVPYVmq5gVPYVmqwO8aD1EDArN3sMUsKKn0OxNUMCKnkJLg/sVPYWWjjdw/Hq4fWAZup1wSQWXFFpalnG6oqfQ0jKF07M7FFp6HsHhMotCS08FfIiz074VWppmgRPWQzRJoaXrSRzdslGhpasCPsLJp1CFlrY54EscnLem0NLXBd61HmJcCi0P9wPPWQ8xDoWWj5fI+LIKCi0fFfA+mS61KLS8TAJfAMeM5xiaQstPBZwm3OgsGwotX08BnwC7rAepQ6Hl7TDwNRlcJ1eh5W8R+JFwCCRZCs2HDvAecA64xXaU/hSaL13gZxI83qbQ/OkAHwPnSehe7wrNrwXgKxIJTqH5tzG4JYwOhyi0ciwQTjn6k/DB4QARX/9qes/etVg/TJLzF/A5cBb4HvinrR+k0GTdGvAL4VfsBUJ4PwD/NvHNFZrs5ApwCVgFLve+/t37/2v9N+ib/A/tr3ySCa8RfAAAAABJRU5ErkJggg==);
  position: absolute;
  width: 70%;
  background-size: 100% 100%;
  left: 69%;
  top: 0;
  bottom: 0;
  z-index: -1;
}

.popular-content {
  background: #1C1F29;
  padding: 15px;
  border-radius: 1rem;
  overflow: hidden;
  display: grid;
  grid-gap: 10px;
  width: 100%;
}

.popular-card {
  padding: 5px;
}

.popular-card-text {
  display: flex;
  justify-content: space-between;
  position: relative;
  text-transform: capitalize;
}

.fa-question-circle {
  color: #969696;
  font-size: 10px;
  margin-top: 3px;
}

.popular-card-item {
  cursor: pointer;
  //background-color: #151820;
  border-radius: 15px;
  position: relative;
}

.popular-default-card {
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    background-color: #969696;
    width: 100%;
    border-radius: 15px;
  }
}

.popular-hidden {
  display: none;
  background-color: #282C37;
  position: absolute;
  padding: 0.5rem;
  bottom: 0;
  right: 0;
  font-size: 1rem;
  color: #b2b3bb;
  border-radius: 5px;
  font-weight: 300;
  z-index: 10;
  width: 170px;
}

.hidden-rtp {
  background-color: #1C1F29;
  border-radius: 5px;
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;

  span {
    color: #8FFF00;
  }
}

.hidden-best-win {
  margin-top: 4px;
  background-color: #1C1F29;
  border-radius: 5px;
  padding: 2px 4px;
  display: flex;
  text-transform: none;
  justify-content: space-between;
}

.hidden-footer {
  display: flex;
  font-size: 0.8rem;
  margin-top: 10px;
  justify-content: space-between;

  span {
    margin-top: 2px;
  }
}

.hidden-live {
  background-color: #1C1F29;
  border-radius: 5px;
  padding: 1px 0;
  width: 29px;
  text-align: center;
}

.hidden-show {
  margin-left: 3px;
  background-color: #1C1F29;
  border-radius: 5px;
  padding: 1px 0px;
  width: 52px;
  text-align: center;
}

.circle:hover .popular-hidden {
  display: block;
}

.popular-card-text {
  color: #969696;
  font-size: 14px;
}

.game-card {
  width: 20%;
}

.circle {
  position: relative;
}

.popular-btn-all {
  background: #1C1F29;
  padding: 0px 15px !important;
  border-radius: 15px;
  color: #969696;
  height: 31px;
  margin-top: 10px;
}

.popular-btn-prev {
  background: #1C1F29;
  padding: 5px !important;
  border-radius: 15px;
  color: #969696;
  width: 31px;
  height: 31px;
  //margin-left: 30px;
}

.popular-btn-next {
  background: #1C1F29;
  padding: 5px !important;
  border-radius: 15px;
  color: #969696;
  width: 31px;
  height: 31px;
  //margin: 0 20px 0 10px;
}

.popular-btn-all:hover {
  color: #fff;
}

.popular-btn-prev:hover,
.popular-btn-next:hover {
  background-color: #313744;
  color: #fff;
}

.popular-image-block {
  background-color: #969696;
  width: 100%;
  border-radius: 15px;
}

@media (max-width: 500px) {
  //.popular-content {
  //  grid-template-columns: repeat(3, 1fr);
  //  overflow: scroll;
  //}
  .popular-header-text {
    font-size: 12px;
    padding-top: 13px;
    width: 120px;
    height: 55px;
  }
  .popular-hidden {
    right: 0;
    font-size: 1rem;
    width: 11rem;
  }
}

</style>
