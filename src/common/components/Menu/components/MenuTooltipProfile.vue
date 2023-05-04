<template>
  <div class="profile__tooltip">
    <div class="profile__tooltip-content">
      <div class="profile__tooltip-content-item-header">
        <DCustomAvatar class="cursor-pointer" @click="openModalUser(user)" style="width: 42px" :src="user.avatar"
                            :username="user.nick" :size="40"></DCustomAvatar>
        <span @click="openModalUser(user); toggle()"
              class="profile__tooltip-content-text-nick cursor-pointer font-weight-bold">{{ user.nick }}</span>
        <!-- Settings profile -->
        <span @click="openModalUser(user); toggle()" class="profile__tooltip-content-text settings"><i
          class="far fa-user-circle"></i> {{ $t('profile.myprofile') }}</span>
        <!--  -->
      </div>
      <hr class="profile__tooltip-content-line">
      <!-- Progress bar -->
      <!--      <div class="profile__tooltip-content-progress">-->
      <!--        <div class="profile__tooltip-content-text-progress">-->
      <!--          <span class="profile__tooltip-content-text-progress-lvl">{{ $t('menu.tooltip.level') }}</span>-->
      <!--          <span class="profile__tooltip-content-text-progress-more">{{ $t('menu.tooltip.more') }}</span>-->
      <!--        </div>-->
      <!--        &lt;!&ndash; <ProgressBar class="progress-bar-vue-prime" :value="value" /> &ndash;&gt;-->
      <!--        <div class="profile__tooltip-content-progress-bar">-->
      <!--          <div class="progress-bar orange stripes">-->
      <!--            <span style="width: 40%"></span>-->
      <!--          </div>-->
      <!--          <div class="profile__tooltip-content-text percent">50%</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--  -->
      <!-- Menu -->
      <div class="profile__tooltip-content-menu">
        <div @click="$router.push('/settings'); toggle()" class="profile__tooltip-content-item profile-button">
          <span class="profile__tooltip-content-icon"><i class="fas fa-user-cog"></i></span>
          <span class="profile__tooltip-content-text">{{ $t('menu.tooltip.settings') }}</span>
        </div>
        <div @click="openPromoModal(); toggle()" class="profile__tooltip-content-item profile-button">
          <span class="profile__tooltip-content-icon"><i class="fas fa-qrcode"></i></span>
          <span class="profile__tooltip-content-text">{{ $t('profile.promo') }}</span>
        </div>
        <div @click="$router.push('/affilate'); toggle()" class="profile__tooltip-content-item profile-button">
          <span class="profile__tooltip-content-icon"><i class="fa-solid fa-person-sign"></i></span>
          <span class="profile__tooltip-content-text">{{ $t('menu.tooltip.affilate') }}</span>
        </div>
        <div @click="openWheelBonusModal" class="profile__tooltip-content-item profile-button">
          <span class="profile__tooltip-content-icon"><i class="fa-solid fa-ferris-wheel"></i></span>
          <span class="profile__tooltip-content-text">{{ $t('menu.tooltip.wheel') }}</span>
        </div>
        <div @click="toggle()">
          <router-link :to="menu.link" :key="idx" v-for="(menu, idx) in menu" class="profile__tooltip-content-item">
            <span class="profile__tooltip-content-icon"><i :class="menu.icon"></i></span>
            <span class="profile__tooltip-content-text">{{ $t(menu.name) }}</span>
          </router-link>
        </div>
        <!--        <div @click="$router.push('/rank-system'); toggle()" class="profile__tooltip-content-item profile-button">-->
        <!--          <span class="profile__tooltip-content-icon"><i class="fas fa-user-cog"></i></span>-->
        <!--          <span class="profile__tooltip-content-text">Rank</span>-->
        <!--        </div>-->
        <div @click="openChatra(); toggle()" class="profile__tooltip-content-item profile-button ">
          <span class="profile__tooltip-content-icon"><i class="fas fa-life-ring"></i></span>
          <span class="profile__tooltip-content-text">{{ $t('profile.support') }}</span>
        </div>
        <!--        <div @click="$router.push('/bonus'); toggle()" class="profile__tooltip-content-item profile-button ">-->
        <!--          <span class="profile__tooltip-content-icon"><i class="fas fa-gift"></i></span>-->
        <!--          <span class="profile__tooltip-content-text">{{ $t('profile.bonus') }}</span>-->
        <!--        </div>-->
      </div>
      <div @click="onLogout" class="profile__tooltip-content-item exit cursor-pointer">
        <span class="profile__tooltip-content-icon"><i class="far fa-arrow-alt-circle-right"></i></span>
        <span class="profile__tooltip-content-text exit-text">{{ $t('menu.tooltip.exit') }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { DCustomAvatar } from '@/common/components'
import ModalUserInfo from '@/modules/userStatistic/components/Modal/ModalUserInfo'
import ModalPromo from '@/modules/bonus/Modal/ModalPromo'

export default {
  components: {
    DCustomAvatar
  },
  name: 'MenuTooltipProfile',
  data () {
    return {
      value: 20,
      menu: [
        {
          name: 'profile.helpdesk',
          link: '/helpdesk',
          icon: 'fas fa-book'
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('app', ['openChatra']),
    toggle () {
      this.$emit('close')
    },
    onLogout () {
      this.logout().then(() => {
        this.$router.replace('/main')
      })
    },
    ...mapActions('modals', ['openWheelBonusModal']),
    openModalUser (currentUser) {
      console.log(this.user)
      console.log(currentUser)
      this.$modal.show(ModalUserInfo, { currentUser: currentUser.id }, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    },
    openPromoModal () {
      this.$modal.show(ModalPromo, {}, {
        clickToClose: false,
        adaptive: true,
        height: '100%',
        width: '100%'
      })
    }

  },
  computed: {
    ...mapGetters('user', {
      user: 'user'
    })
  }
}
</script>

<style scoped lang="scss">
.profile {
  &__tooltip-content {
    height: 350px;
    width: 380px;
    padding: 15px;
    background: #0F1114;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 15px;
    @media (max-width: 450px) {
      border-radius: 0 0 15px 15px;
    }

    &:hover {
      cursor: default;
    }

    &:before {
    }

    &-line {
      background-color: rgba(150, 150, 150, 0.2);
      height: 1px;
      width: 363px;
      margin: 10px 0 5px -15px;
    }

    &-progress {
      width: 100%;
      margin: 11px 0;
    }

    &-progress-bar {
      display: flex;
      background-color: #15181F;
      border-radius: 15px;
    }

    &-menu {
      width: 350px;
      max-height: 218px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      padding: 25px 25px 15px 25px;
      background-color: #15181F;
      border-radius: 15px;
    }
  }

  &__tooltip-content-item {
    height: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;

    &:hover {
      color: #fff;
    }

    &-header {
      height: 52px;
      width: 100%;
      display: flex;
      align-items: center;
      background: #0F1114;
    }
  }

  &__tooltip-content-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #969696;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    font-size: 18px;
  }

  &__tooltip-content-text {
    font-family: 'Supermolot', sans-serif;
    display: inline-block;
    color: #969696;
    font-weight: 300;
    font-size: 14px;
    transition: all .2s ease;

    &:hover {
      transition: all .2s ease;
      color: #fff;
    }

    &-nick {
      color: #ffffff;
      font-size: 16px;
      margin-left: 6px;
      font-family: 'Supermolot', sans-serif;
    }

    &-progress {
      font-size: 12px;
      font-family: 'Supermolot', sans-serif;
      font-weight: 300;
      display: flex;
      justify-content: space-around;
      margin: -4px 0 8px 0;

      &-more {
        color: #969696;
        margin-left: 50px;
        transition: all .2s ease;

        &:hover {
          cursor: pointer;
          color: #fff;
          transition: all .2s ease;
        }
      }
    }
  }
}

.profile__tooltip-content-text:hover .profile__tooltip-content-icon {
  color: #fff;
}

.settings {
  margin-left: auto;
}

.settings:hover {
  cursor: pointer;
  color: #fff;
}

.percent {
  font-size: 10px;
  margin: 12px 0 0 14px;

  &:hover {
    color: #969696;
    cursor: default;
  }
}

.progress-bar-vue-prime {
  width: 300px;
  margin: 5px auto;
}

.progress-bar {
  background-color: #333842;
  height: 10px;
  padding: 0;
  width: 277px;
  margin: 13px 0 13px 10px;
  border-radius: 15px
}

.progress-bar span {
  display: inline-block;
  height: 25px;
  width: 200px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset;
  transition: width .4s ease-in-out;
}

.orange span {
  background-color: #fecf23;
  background-image: linear-gradient(to bottom, #FAFF04, #FF9A04);
}

.exit {
  margin: 11px 0 -2px 25px;
  width: 80px;
}

.exit-text {
  color: #8f9090;
}

.fa-arrow-alt-circle-right {
  transition: all .4s ease;
}

.exit:hover .exit-text {
  transition: all .2s ease;
  color: #fff;
  cursor: pointer;
}

.exit:hover .fa-arrow-alt-circle-right {
  transform: rotate(180deg);
  transition: all .4s ease;
}

.profile-button {
  :hover {
    cursor: pointer;
  }
}

@media (max-width: 991px) {
  .profile {
    &__tooltip-content {
      top: 45px;
    }
  }
}

@media (max-width: 450px) {
  .profile {
    &__tooltip-content {
      width: 100%;

      &-menu {
        width: calc(95vw - 30px);
      }

      &-line {
        width: 100vw;
      }
    }
  }
  .progress-bar {
    width: calc(95vw - 90px);
  }
}

.p-overlaypanel:after, .p-overlaypanel:before {
  left: calc(var(--overlayArrowLeft, 0) + 1.45rem);
}
</style>
