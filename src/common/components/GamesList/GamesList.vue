<template>
  <div class="popular-wrapper p-0" ref="wrapper">
    <div class="popular-header">
      <div class="popular-header-text">
        {{ name }}
      </div>
    </div>
    <div class="game-list">
      <div class="game-list--container" :style="{ gridTemplateColumns: `repeat(${items}, 1fr) ` }">
        <div style="grid-column: 1 / 3;" v-if="provider && provider.logo" class="">
          <img :src="provider.logo" alt="">
        </div>
        <GameIcon :game="game" :key="idx" v-for="(game, idx) of games"/>
      </div>
      <div class="col-12 mt-4 mb-4">
        <div class="more d-flex">
          <div class="d-flex flex-column text-center">
            <div>
              <ProgressBar class="more--progress-bar" v-model="percent"/>
            </div>
            <div class="mt-1">
              <span>{{ countGamesNow }}</span> &nbsp;
              / &nbsp;
              <span class="pr-3">{{ countAllGames }}</span>
            </div>
          </div>
        </div>
        <button v-show="percent < 100" @click="loadMore" class="button-submit mt-3">
          {{ $t('games.c.more_games') }}
          <i v-show="loadingMore" class="fa fa-spinner fa-spin fa-1x fa-fw"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapMutations } from 'vuex'
import GameIcon from '@/games/GamesIcon'

export default {
  name: 'SliderCarousel',
  components: {
    GameIcon
  },
  data: () => ({
    pageSize: 30,
    games: [],
    page: 1,
    loadingMore: false,
    items: 1,
    countAllGames: 100,
    provider: null,
    providerId: null,
    categoryId: null
  }),
  computed: {
    percent () {
      return +(this.games.length / this.countAllGames * 100).toFixed(0) || 0
    },
    countGamesNow () {
      return this.games.length
    },
    name () {
      return this.$route.params.producer || this.$t('games.c.all_provider')
    }
  },
  watch: {
    $route (val) {
      this.page = 1
      this.categoryList({
        page: this.page,
        pageSize: this.pageSize,
        type: val.params.type,
        producerId: val.params.producer,
        categoryId: val.query.category
      }).then(({ count, games, provider }) => {
        this.games = games
        this.countAllGames = count
        this.provider = provider
      })
    }
  },
  methods: {
    ...mapActions('game', ['categoryList']),
    ...mapMutations('game', ['setCurrentGame']),
    loadMore () {
      this.page++
      this.loadingMore = true
      console.log(this.pageSize)
      this.categoryList({
        page: this.page,
        pageSize: this.pageSize,
        type: this.$route.params.type,
        producerId: this.$route.params.producer,
        categoryId: this.$route.query.category
      }).then(({ count, games }) => {
        this.games.push(...games)
        this.countAllGames = count
      }).finally(() => {
        this.loadingMore = false
      })
    },
    loadGames () {
      this.categoryList({
        page: this.page,
        pageSize: this.pageSize,
        type: this.$route.params.type,
        producerId: this.$route.params.producer,
        categoryId: this.$route.query.category
      }).then(({ provider, count, games }) => {
        this.games = games
        this.countAllGames = count
        this.provider = provider
      })
    },
    calc () {
      let devider = 240
      if (this.$refs.wrapper.offsetWidth <= 500) {
        devider = 150
      }

      this.items = Math.floor(this.$refs.wrapper.offsetWidth / devider)
    }
  },
  mounted () {
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
    this.ro.observe(this.$refs.wrapper)
  },
  beforeMount () {
    this.loadGames()
  },
  beforeDestroy () {
    if (this.ro) {
      this.ro.unobserve(this.$refs.wrapper)
    }
  }
}
</script>

<style scoped lang="scss">
.game-list {
  background: #1c1f29;
  padding-bottom: 25px;
  border-radius: 0px 15px 15px 15px;

  &--container {
    display: grid;
    padding: 15px 15px 25px;
    gap: 1rem
  }
}

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

.more {
  margin: 0 auto;
  font-size: 0.9rem;
  justify-content: center;

  &--progress-bar {
    border-radius: 35px;
    height: 14px;
    top: 0.11rem;
    width: 150px;
  }
}

.popular-wrapper {
  position: relative;
  padding: 0 10px;
  margin-top: 25px;
  z-index: 0;
  @media (max-width: 700px) {
    padding: 0;
  }
}

.button-submit {
  height: 2.5rem;
  margin-top: 20px;
  max-width: 200px;
  border-radius: 15px;
  width: 60%;
  background-color: #7f64e3;
  display: flex;
  align-items: center;
  margin: auto;
  text-align: center;
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
  height: 40px;
  font-size: 1.3rem;
  width: 300px;
  border-top-left-radius: 1.25rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  z-index: 1;

  div {
    color: yellow;
  }
}

.popular-header-text-lite {
  font-size: 1.2rem;
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
  margin-left: 3%;

  span {
    margin-left: 1rem;
  }
}

.popular-header-text:after {
  content: "";
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAABwCAYAAADmIGnzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEt0lEQVR4nO3dTWhcVRiH8ecaaRAqjIu4MdhsAimIpBBclKwszEa6aTZW3FhRtIpU8aMiYqporUSLutCF+AH1C10Ud124EHRjoVZ0IyKIO7HUgAV3xsWZ0KSZSe7M3Hvec97z/0EJdJG8M/MwYW7ue281vWfvGnFdAS4Bq8Dl3tffgIvAeeDXyPNIBNcb/MzdvX+DrAIXgG+BMyg8FyqDd7RhXQQ+BT4D/rAdRUZ1nfUANcwDp4DfgXPAfsthZDQ5hLauArrAdyi47OQU2kYbg5s1nkVqyDW0dV3gJ+AY+T8W1zy8OJPAaeAb9O6WLA+hrVskHBa5x3oQ2cpTaBCOz50BnrYeRDbzFhqET6engLfx+fiy5PmFeBQ4C9xgPIfgOzSAg4Rfpd4fZ/JKeAEOASvWQ5SuhNAAHgeOWg9RslJCA3gLuMt6iFKVFNoE8AFws/UgJSopNIAp4B3rIUpUWmgQPhwsWQ9RmhJDg/CudpP1ECUpNbQp4E3rIUpSamgA9wL7rIcoRcmhVYRDHhJByaFBOLVIHwwiKD00CH+e2mU9hHcKDWYIp4JLixRa8Cz6i0GrFFrQAU5YD+GZQrvqAeA26yG8UmhXTQCvWw/hlULbrItOJWqFQttqBZurLLmm0LaaAx60HsIbhdbfMjq7o1EKrb8p4HnrITxRaIMdRdfyaIxCG2wSeNV6CC8U2vYOAQesh/BAoe1sBT1PY9MTuLN54D7rIXKn0OpZRheLGYtCq2caOG49RM4UWn3PALdaD5ErhVafDneMQaEN527gDushcqTQhlOhc9ZGotCGt4iu/D00hTaal9HhjqEotNHMAE9YD5EThTa642hFrzaFNrrdwCvWQ+RCoY3nCFrRq0WhjUeHO2pSaOPrEm6cIdtQaM14Da3obUuhNWOOcO8pGUChNecFtKI3kEJrTocQm/Sh0Jr1EFrR60uhNWsSHe7oS6E17yBa0dtCobVDK3rX0JPRjnm0oreJQmvPSeBG6yFSodDaoysSbaDQ2vUYWtEDFFrbtKLXo9DadxjYbz2ENYUWR/H3BlVocSxQ+IqeQoun6BU9hRbPDAWv6Cm0uIpd0VNocRW7oqfQ4jsC7LMeIjaFFl9FOLujKArNxp3AkvUQMSk0OycpaEVPodmZpaAVPYVmq5gVPYVmqwO8aD1EDArN3sMUsKKn0OxNUMCKnkJLg/sVPYWWjjdw/Hq4fWAZup1wSQWXFFpalnG6oqfQ0jKF07M7FFp6HsHhMotCS08FfIiz074VWppmgRPWQzRJoaXrSRzdslGhpasCPsLJp1CFlrY54EscnLem0NLXBd61HmJcCi0P9wPPWQ8xDoWWj5fI+LIKCi0fFfA+mS61KLS8TAJfAMeM5xiaQstPBZwm3OgsGwotX08BnwC7rAepQ6Hl7TDwNRlcJ1eh5W8R+JFwCCRZCs2HDvAecA64xXaU/hSaL13gZxI83qbQ/OkAHwPnSehe7wrNrwXgKxIJTqH5tzG4JYwOhyi0ciwQTjn6k/DB4QARX/9qes/etVg/TJLzF/A5cBb4HvinrR+k0GTdGvAL4VfsBUJ4PwD/NvHNFZrs5ApwCVgFLve+/t37/2v9N+ib/A/tr3ySCa8RfAAAAABJRU5ErkJggg==);
  position: absolute;
  width: 20%;
  background-size: 100% 100%;
  left: 69%;
  top: 0;
  bottom: 0;
  z-index: -1;
}

.popular-content {
  background: #1C1F29;
  padding: 10px 0 20px 0;
  border-radius: 0 15px 15px 15px;
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
  padding: 0 5px;
  position: relative;
  text-transform: capitalize;
}

.fa-question-circle {
  color: #969696;
  font-size: 10px;
  margin-top: 3px;
}

.popular-card-item {
  //flex-shrink: 0;
  margin: 0 auto 30px;
  cursor: pointer;
  width: 150px;
  height: 160px;
  //background-color: #151820;
  border-radius: 15px;
  position: relative;
}

.popular-default-card {
  background-color: #151820;
  height: 150px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  @media (max-width: 500px) {
      right: 0;
      font-size: 1rem;
      width: 11rem;
  }
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
  //height: 140px;
  border-radius: 15px;
  margin-right: 10px;
}

@media (max-width: 400px) {
  .popular-header-text {
    font-size: 12px;
    padding-top: 13px;
    width: 200px;
    height: 55px;
  }
  .popular-card-item {
    width: 100px;
    //height: 50px;
  }
}

</style>
