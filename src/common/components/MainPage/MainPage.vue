<template>
  <div id="main-layout" class="container-fluid">
    <template>
      <DAppModals/>
      <div class="row">
        <DMenuDesktop class="d-none d-lg-block col-12"/>
        <DMenuMobile class="d-lg-none d-sm-block col-12"/>
      </div>
      <div class="row main-content" :class="bodyDisposition">
        <div class="col center-column d-flex justify-content-between">
          <div class="content row">
            <div class="col-12 px-0 max-vh">
              <transition name="component-fade" mode="out-in">
                <router-view/>
              </transition>
            </div>
          </div>
          <DFooter class="content row" />
        </div>
        <AsideRight class="d-none d-lg-block right-column h-100"/>
      </div>
    </template>
  </div>
</template>

<script>
import DAppModals from '@/common/components/AppModals/AppModals'
import {
  DFooter,
  DMenuDesktop,
  DMenuMobile
} from '@/common/components'
import AsideRight from '@/modules/asideRight/AsideRight'

export default {
  name: '',
  components: {
    DAppModals,
    DMenuDesktop,
    DMenuMobile,
    DFooter,
    AsideRight
  },
  props: [''],
  data () {
    return {
      mobileGameMenu: 'slide-out',
      mobileLeftToggle: null,
      bodyDisposition: ''

    }
  },
  methods: {
    openGameMenu () {
      if (this.mobileGameMenu === 'slide-out') {
        this.mobileGameMenu = 'slide-in'
        this.mobileLeftToggle = false
      } else if (this.mobileGameMenu === 'slide-in') {
        this.mobileGameMenu = 'slide-out'
      }
    }
  },
  computed: {},
  created () {
  }
}
</script>

<style scoped lang="scss">
#main-layout {
  transition: all 0.66s cubic-bezier(0.77, 0.54, 0, 0.85);
  background-color: #15181f;
  box-sizing: border-box;
  min-height: 100%;
}
.component-fade-enter-active {
  animation-name: fadeInDown;
  animation-duration: 0.2s
}

.component-fade-leave-active {
  display: none;
  animation-name: fadeOutDown;
  animation-duration: 0.2s;
}

.main-content {
  height: calc(100vh - 61px);
}
.center-column {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  -webkit-box-orient: vertical;
  display: -webkit-box; /* Safari */
}

.right-column {
  width: 376px;
  max-width: 376px;
  transition: .5s !important;
  left: 0;
}

.max-vh {
  height: 100%;
}

::-webkit-scrollbar {
  width: 0;
}

.active {
  background-color: #7C4EFF;
  border-radius: 10px;
}

</style>
