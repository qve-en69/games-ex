<template>
  <DModal class="main-modal">
    <div class="auth">
      <button class="dm-dialog-back" @click="component = 'Auth'" v-if="component === ('Registration')">
        <i class="pi pi-chevron-left"></i>
      </button>
      <button @click="$router.push($route.path)" class="dm-close-icon dm-dialog-close">
        <i class="pi pi-times"></i>
      </button>
      <SvgBackground class="vector" />
      <div class="container position-relative">
        <div class="welcome">
          <div class="msg1">{{ $t('authentication.bonus').toUpperCase() }}</div>
          <img class="img1" src="@/assets/images/auth/login_co.png">
        </div>
      </div>
      <div class="premain position-relative z-150">
        <div class="main pt-1 mt-1 pb-4">
          <transition name="slide-fade" mode="out-in">
            <keep-alive>
            <components @close="$emit('close')" :is="component" @update:component="component = $event"></components>
            </keep-alive>
          </transition>
        </div>
        <div class="col-12 mt-3 text-center" v-if="component === 'Auth'">
          <span>{{ $t('authentication.auth_another_resources') }}</span>
          <div class="mt-3" style="padding-bottom: 48px;">
            <OAuth :connect="false" @close="$emit('close')"/>
          </div>
        </div>
        <div class="col-12 mt-3 text-center" v-if="component === 'Registration'">
          <span>{{ $t('authentication.register_another_resources') }}</span>
          <div class="mt-3" style="padding-bottom: 48px;">
            <OAuth :connect="false" @close="$emit('close')"/>
          </div>
        </div>
        <button class="dm-dialog-back back-recovery" @click="component = 'Auth'" v-if="component === ('RecoveryPassword')">
          <i class="pi pi-chevron-left"></i>
        </button>
      </div>
    </div>
  </DModal>
</template>

<script>
import { DModal } from '@/common/components'
import SvgBackground from '@/assets/svg/auth/vec_1.svg'

import Auth from './auth/Auth'
import Registration from './registration/Registration'
import FastRegistration from './registrationFast/FastRegistration'
import EmailAvatar from './registration/EmailAvatar'
import FastRegistrationSuccess from './registrationFast/FastRegistrationSuccess'
import OAuth from './oAuth/oAuth'
import RecoveryPassword from '@/modules/auth/components/recoveryPassword/RecoveryPassword'
import Auth2Fa from '@/modules/auth/components/auth/Auth2Fa'

export default {
  name: 'newAuthModal',
  components: { DModal, Auth, Auth2Fa, Registration, RecoveryPassword, FastRegistration, EmailAvatar, FastRegistrationSuccess, OAuth, SvgBackground },
  data: () => ({
    component: 'Auth'
  })
}
</script>

<style scoped lang="scss">

.pi-times {
  font-size: 1.3rem;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.auth {
  margin: -1rem;
  padding: 1rem 0 0 0;
  background: linear-gradient(106.62deg, #7C4EFF -1.5%, #641C8F 101.04%);
  border-radius: 15px;
}

@media (min-width: 576px) {
  .auth {
    width: 515px;
  }
}
.main-modal {
  padding: 1rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: calc(90vh - 77px);
  @media (max-width: 576px) {
    max-height: 100vh;
  }
}
::-webkit-scrollbar {
  width: 0;
}

.welcome {
  height: 15rem;
  top: 3.75rem;
  left: 1.25rem;
  right: 0.3125rem;
  z-index: 1;
  color: rgb(245, 246, 247);
  @media (max-width: 500px) {
    height: 11rem;
  }
}
.main {
  background-color: #1C1F29;
  border-radius: 15px;
  padding-bottom: 10px;
}
.premain {
  background-color: #101216;
  border-radius: 15px;
  padding-bottom: 1px;
  // padding-bottom: 1.5rem;
  @media (max-width: 600px) {
    height: 100vh;
    //height: calc(100vh - 185px);
  }
}

.welcome {
  .msg1 {
    font-size: 1.75rem;
    font-weight: bold;
    width: 14.375rem;
    line-height: 1.4;
    padding-top: 50px;
      @media (max-width: 500px) {
      font-size: 1.5rem;
      padding-top: 30px;
      margin: 0;
    }
  }
  .img1 {
    height: 15rem;
    position: absolute;
    right: 15px;
    top: 0rem;
    z-index: 0;
    @media (max-width: 500px) {
      right: 0.5rem;
      height: 13rem;
      top: -2rem;
    }
  }
  .img-coin1 {
    height: 3rem;
    position: absolute;
    right: 12.5rem;
    top: 2rem;
    z-index: 10;
    transform: rotate(45deg);
    @media (max-width: 500px) {
      right: 11rem;
      height: 2rem;
    }
  }
  .img-coin2 {
    height: 3rem;
    position: absolute;
    right: 3rem;
    top: 2rem;
    z-index: 10;
    transform: rotate(260deg);
    @media (max-width: 500px) {
      height: 2rem;
      right: 1.5rem;
    }
  }
  .img-coin3 {
    height: 4rem;
    position: absolute;
    right: 1rem;
    top: 10.5rem;
    z-index: 1;
    transform: rotate(270deg);
    @media (max-width: 500px) {
      height: 2rem;
      right: 1rem;
      top: 8.5rem;
    }
  }
}

.vector {
  position: absolute;
  width: 100.8%;
  top: 5rem;
  z-index: 0;
  margin-left: -4px;
  @media (max-width: 500px) {
    top: 2rem;
  }
}

::v-deep .dm-content {
  margin-top: -70px;
  background: linear-gradient(106.62deg, #7C4EFF -1.5%, #641C8F 101.04%);
  @media (max-width: 500px) {
    margin-top: -55px;
  }
}
.dm-dialog-back {
  position: absolute;
  left: 0;
  top: -16rem;
  z-index: 11;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.75rem;
  background: transparent;
  color: rgb(245, 246, 247);
  @media (max-width: 500px) {
    top: -13rem;
  }
}
.dm-close-icon{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 11;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.75rem;
  background: transparent;
  color: rgb(245, 246, 247);
}
.container {
  margin-top: 0rem;
  @media (max-width: 500px) {
    margin-top: 1rem;
  }
}
</style>
