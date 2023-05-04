<template>
  <div @click.prevent="open(game)" class="game">
    <div class="game-icon">
      <img class="game-icon-image"
           :src="url(game.id)"
           :alt="game.title"
      />
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
</template>

<script>
import utils from '@/mixins/utils'

export default {
  name: 'GameItem',
  mixins: [utils],
  components: {},
  props: ['game'],
  data () {
    return {
      name: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

.game {
  width: 100%;
  padding-top: 100%;
  position: relative;
  display: block;
  border-radius: 1rem;
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
  }

  &-play-icon {
    fill: rgba(245, 246, 247, .9);
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1rem;
    margin-top: -1rem;
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

</style>
