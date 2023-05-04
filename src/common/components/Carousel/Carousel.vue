<template>
  <div class="row" v-if="init">
    <div class="swiper swiper0">
      <div class="swiper-wrapper cursor-pointer">
        <div class="swiper-slide" :key="`${idx}_${isLang.code}`" v-for="(banner, idx) in banners">
          <router-link tag="div" :to="banner.link">
            <img :class="banner.classMobile" :src="banner.imgMobile"
                 style="width: 100%; padding: 10px; border-radius: 25px;">
            <img :class="banner.class" :src="banner.img" style="width: 100%; padding: 10px; border-radius: 25px;">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Swiper from 'swiper'

export default {

  data: () => ({
    banners: []
  }),
  watch: {
    isLang (val) {
      this.banners = this.getBanners(val.code)
    }
  },
  methods: {
    getBanners (code) {
      return [
        {
          img: require(`@/assets/images/banner/${code}/3_desktop.png`),
          imgMobile: require(`@/assets/images/banner/${code}/3_mobile.png`),
          class: 'd-none d-md-block',
          classMobile: 'd-block d-md-none',
          link: '/'
        },
        {
          img: require(`@/assets/images/banner/${code}/1_desktop.png`),
          imgMobile: require(`@/assets/images/banner/${code}/1_mobile.png`),
          class: 'd-none d-md-block',
          classMobile: 'd-block d-md-none',
          link: '/'
        },
        {
          img: require(`@/assets/images/banner/${code}/2_desktop.png`),
          imgMobile: require(`@/assets/images/banner/${code}/2_mobile.png`),
          class: 'd-none d-md-block',
          classMobile: 'd-block d-md-none',
          link: '/'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('app', {
      init: 'getInit', isLang: 'getLang'
    })
  },
  beforeMount () {
    this.banners = this.getBanners(this.isLang.code)
  },
  mounted () {
    // eslint-disable-next-line no-new
    new Swiper('.swiper0', {
      speed: 2000,
      slidesPerView: 1,
      spaceBetween: 5,
      direction: 'horizontal',
      loop: true,
      rewind: false,
      autoplay: {
        delay: 4500,
        waitForTransition: true
      },
      roundLengths: true
    })
  }
}
</script>
