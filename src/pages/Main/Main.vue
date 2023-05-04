<template>
  <div class="container-fluid">
    <DCarousel/>
    <GamesStatistic
      :listMw="getListByName('MW')"
      :listTwg="getListByName('TWG')"
      :listTrn="getListByName('TRN')"
      :listRp="getListByName('RP')"/>
    <SliderCarousel :rows="2" :list="getListByName('BFC')"/>
    <SliderCarousel :rows="2" :list="getListByName('BLG')"/>
    <SliderCarousel :rows="2" :list="getListByName('RLG')"/>
    <HistoryGamesGlobal/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import GameCard from '@/common/components/GameCard/GameCard'
// import ItemSlider from '@/common/components/ItemSlider/ItemSlider'
import HistoryGamesGlobal from '@/pages/HistoryGamesGlobal'
import DCarousel from '@/common/components/Carousel/Carousel'
import SliderCarousel from '@/common/components/SliderCarousel/SliderCarousel'
import GamesStatistic from '@/common/components/GamesStatistics/GamesStatistic'

export default {
  components: {
    GamesStatistic,
    DCarousel,
    SliderCarousel,
    HistoryGamesGlobal
  },
  computed: {
    ...mapGetters('user', {
      checkAuth: 'auth'
    }),
    ...mapGetters('game', ['getListByName'])
  }
}
</script>

<style scoped lang="scss">

.container-fluid {
  max-width: 1320px;
}

@media (min-width: 992px) {
  .container-fluid {
    margin-top: 1rem;
  }
}

</style>
