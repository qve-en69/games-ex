<template>
  <div>
    <div class="game" @click="open(game)">
      <div class="game-icon">
        <img
          :src="urlIconLarge"
          class="game-icon-image"
          :title="`${game.id} - ${game.title}`"
        >
      </div>
      <div class="game-hover-mask">
        <svg class="game-play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63 63">
          <defs></defs>
          <g fill="none" fill-rule="evenodd">
            <circle cx="31.3" cy="31.3" r="30.3" fill="#000" fill-opacity=".2" stroke="#E5E7EE"
                    stroke-width="2"></circle>
            <path fill="#F5F6F7"
                  d="M39.5 34.3l-11.3 7.5a2 2 0 01-3-1.6v-15a2 2 0 013-1.7L39.5 31a2 2 0 010 3.3z"></path>
          </g>
        </svg>
      </div>
    </div>
    <div class="game-text cursor-pointer position-relative d-flex">
      <span>{{ game.name }}</span>
      <div class="circle">
        <i style="font-size:14px;" class="far fa-question-circle cursor-pointer"></i>
        <div class="popular-hidden">
          <div class="hidden-rtp">
            RTP:<span>{{ (game.payout || 95).toFixed(2) }}%</span>
          </div>
          <div class="hidden-best-win">
            {{ $t('main.slider.big_win') }} <span class="text-white">{{ game.bigWinRate }}X</span>
          </div>
          <div class="hidden-footer">
            <span>{{ game.producer.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/mixins/utils'

export default {
  name: 'GamesIcon',
  props: ['game'],
  mixins: [utils],
  computed: {
    urlIconLarge () {
      const [provider, name] = this.game.id.split(':')
      return `https://cdn.softswiss.net/i/s3/${provider}/${name}.png`
    },
    urlIconMiddle () {
      const [provider, name] = this.game.id.split(':')
      return `https://cdn.softswiss.net/i/s4/${provider}/${name}.png`
    }
  }
}
</script>

<style scoped lang="scss">

.game {
  width: 100%;
  padding-top: 100%;
  position: relative;
  display: block;
  border-radius: 1.25rem;
  cursor: pointer;
  overflow: hidden;
  transform: translateZ(0);
  &-text {
    display: flex;
    justify-content: space-between;
  }

  &-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;

    &-image {
      width: 100%;
      height: 100%;
      -webkit-transition: all .3s;
      transition: all .3s;
      border-radius: 1rem;
      overflow: hidden
    }
  }

  &-hover-mask {
    position: absolute;
    -webkit-transition: all .3s linear;
    transition: all .3s linear;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
    font-size: .75rem;
    opacity: 0;
    border-radius: 1rem;

    &:hover {
      opacity: 1;
    }

    &-house-edge {
      color: #f5f6f7;
      text-align: right;
      padding: 0.625rem 0.875rem 0 0;
    }
  }

  &-play-icon {
    fill: rgba(245, 246, 247, .9);
    width: 3rem;
    height: 3rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1.5rem;
    margin-top: -1.5rem;
    -webkit-transform: scale(1.3);
    -ms-transform: scale(1.3);
    transform: scale(1.3);
    -webkit-transition: -webkit-transform .3s;
    -webkit-transition: transform .3s;
    transition: transform .3s;
  }

  &:hover .game-icon-image {
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -webkit-transition: all .3s;
    transition: all .3s;
  }
}

.game-icon-text {
  display: inline-flex;
  justify-content: space-between;
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
.circle:hover .popular-hidden {
  display: block;
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
</style>
