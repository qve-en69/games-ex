<template>
  <div class="popups-block" ref="popupsBlock">
    <!--    <div class="d-flex">-->
    <!--      <div class="promotion">-->
    <!--        <i class="fas fa-money-bill"></i>-->
    <!--      </div>-->
    <!--      <div class="promotion ml-3">-->
    <!--        <i class="fas fa-robot"></i>-->
    <!--      </div>-->
    <!--    </div>-->
    <button class="dm-back-icon" @click="openAirDrop">
      <i style="cursor: pointer; font-size: 1.25rem;" class="fa-solid fa-messages-dollar"></i>
    </button>
    <div class="gif ml-3" @click="toggle">
      GIF
    </div>
<!--    <Button type="button" label="Toggle"  />-->
    <OverlayPanel ref="op1" appendTo="body" v-show="showGiphy" >
      <div>
        <DGiphyPopup :onClickGiphy="onClickGiphy"/>
      </div>
    </OverlayPanel>

  </div>
</template>

<script>
import { DGiphyPopup } from '@/common/components'
import { mapActions, mapGetters } from 'vuex'
import ModalAirDrop from '@/modules/chat/modals/AirDropModal/Modal/ModalAirDrop'
import OverlayPanel from 'primevue/overlaypanel'

export default {
  name: 'GifChatSendMessage',
  components: { DGiphyPopup, OverlayPanel },
  data: () => {
    return {
      showGiphy: false
    }
  },
  methods: {
    ...mapActions('chat', ['sendGif']),
    onClickGiphy (gifUrl) {
      this.sendGif({ gifUrl })
      this.showGiphy = false
    },
    closeGiphy (e) {
      if (this.$refs.popupsBlock.contains(e.target)) {
        return
      }
      this.showGiphy = false
      this.$refs.op1.toggle(e)
    },
    openAirDrop () {
      if (this.checkAuth) {
        this.$modal.show(ModalAirDrop, {}, {
          clickToClose: false,
          adaptive: true,
          height: '100%',
          width: '100%'
        })
      } else {
        this.$router.push({ query: { modal: 'auth' } })
      }
    },
    toggle (e) {
      this.$refs.op1.toggle(e)
      this.showGiphy = true
    },
    mounted () {
      document.addEventListener('click', this.closeGiphy)
    },
    beforeDestroy () {
      document.removeEventListener('click', this.closeGiphy)
    }
  },
  computed: {
    ...mapGetters('user', { checkAuth: 'auth' })
  }
}
</script>

<style lang="scss" scoped>
.popups-block {
  margin-top: 10px;
  padding: 0 36px 0 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  bottom: 10px;
  user-select: none;
}

.dm-back-icon {
  background: transparent;
  color: #969696;
}

.promotion {
  height: 20px;
  cursor: pointer;

  &:hover {
    color: #7f64e3
  }
}

.gif {
  height: 20px;
  font-weight: 800;
  z-index: 100;
  cursor: pointer;

  &:hover {
    color: #7f64e3
  }
}

.fa-messages-dollar:hover {
  color: #7f64e3
}

.p-overlaypanel {
  width: 375px !important;
  height: 430px;
  //background-color: #fff;
  margin-left: 50px;
  margin-top: -10px;
}

.p-overlaypanel-flipped {
  --overlayArrowLeft: 293px !important;
}

@media (max-width: 425px) {
  .p-overlaypanel {
    margin-left: calc(100vw - 375px);
  }
}
</style>
