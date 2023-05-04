<template>
  <div>
    <div class="row menu">
      <router-link tag="div" class="logo cursor-pointer" to="/main">
        <Logo></Logo>
      </router-link>
      <div class="menu-container d-flex ml-auto text-right">
        <div v-if="checkAuth" class="balance-wrapper">
          <div @click="toggleOPChangeAccount" class="cursor-pointer mr-4 user-select-none">
            <img alt="logo" class="balance-wrapper-currency-icon" :src="currentAccount.currency.src"/>
            <span style="font-size: 14px; font-weight: bold;"> {{currentAccount.currency.id}} <i class="fas fa-chevron-down"></i></span>
            <span class="d-block balance text-white">
               <number style="font-weight:500; font-size: 14px" :to="currentAccount.balance" :from="currentAccount.balance" :format="(v) => theFormat(currentAccount, v)"/>
              </span>
          </div>
          <OverlayPanel
            :baseZIndex="-20"
            class="tooltip__currencies"
            appendTo="body"
            ref="op"
            top="50px"
            :showCloseIcon="false"
            :style="{padding: '15px', top: '50px'}"
            style="min-width: 100%; border-radius: 0 0 15px 15px; background-color: #0F1114;"
          >
            <AccountChooser :onChooseAccount="onChangeAccountCurrency"/>
          </OverlayPanel>
        </div>
        <Button @click="$router.push({ query: { modal: 'auth' } })" v-show="!checkAuth" class="p-button-outlined">
          {{ $t('header.auth') }}
        </Button>
        <Button v-if="checkAuth" @click="$router.push({ query: { modal: 'cash' } })" class="button-submit mx-2">
          <i class="fas fa-credit-card" style="font-size: 20px"></i>
        </Button>
        <div @click="toggleOPProfile" v-if="checkAuth" class="profile">
          <i class="fas fa-list-ul" :class="{ 'active-prifile' : isOpenTooltipProfile }">
            <OverlayPanel
              :baseZIndex="-50"
              class="tooltip__menu"
              appendTo="body"  ref="op1" :showCloseIcon="false">
              <MenuTooltipProfile @close="toggleOPProfile" />
            </OverlayPanel>
          </i>
        </div>
      </div>
    </div>
<!--    <div class="item-menu">
      <router-link class="mr-2"
                   v-for="(item) in pages.filter(item => !item.need_auth || checkAuth)"
                   tag="span"
                   :key="item.name"
                   active-class="active"
                   :to="item.to">
        <a>
              <span class="menu-text">
            {{ $t(item.name) }}
          </span>
        </a>
      </router-link>
    </div>-->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MenuTooltipProfile from './components/MenuTooltipProfile'
import Logo from '@/assets/svg/logo-icon.svg'
import AccountChooser from '@/common/components/AccountChooser/AccountChooser'

export default {
  components: {
    MenuTooltipProfile,
    Logo,
    AccountChooser
  },
  props: {
    text: {
      type: String,
      default: 'Dropdown'
    },
    noIcon: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    },
    naked: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      dropdown: this
    }
  },
  data () {
    return {
      isOpenTooltipProfile: false,
      isOpenTooltipCurrencies: false
    }
  },
  computed: {
    ...mapGetters('app', {
      online: 'online'
    }),
    ...mapGetters('navigations', ['pages']),
    ...mapGetters('menu', {
      menuList: 'items'
    }),
    ...mapGetters('user', {
      user: 'user',
      currentAccount: 'currentAccount',
      checkAuth: 'auth',
      game_mode: 'get_game_mode',
      getBonusBalance: 'bonus_balance'
    }),
    ...mapGetters('currency', ['getCurrencyCourseToDollar']),
    ...mapGetters('user', ['accounts', 'getBalanceByCurrency', 'showBalanceInUsd'])
  },
  methods: {
    theFormat (currentAccount, number) {
      if (this.showBalanceInUsd) {
        return `$ ${this.getCurrencyCourseToDollar(currentAccount.currency.id, number)}`
      }
      return `${Number(number).toFixed(8)}`
    },
    ...mapActions('user', {
      exit: 'exit',
      changeAccount: 'changeAccount'
    }),
    toggleOPProfile (e) {
      this.$refs.op1.toggle(e)
    },
    toggleOPChangeAccount (e) {
      this.$refs.op.toggle(e)
    },
    onChangeAccountCurrency (account) {
      this.changeAccount({ accountId: account.id })
      this.$refs.op.hide()
    }
  },
  created () {
  }
}
</script>
<style scoped lang="scss">
.p-overlaypanel:after, .p-overlaypanel:before {
  left: calc(var(--overlayArrowLeft, 0) + 1.85rem);
}
.item-menu {
  padding: 10px 0;
  overflow: hidden;
  font-size: 1rem;
  display: flex;
  align-items: center;
  span {
    width: 19% !important;
    text-align: center;
    color: #fff;
  }
  .active {
    padding: 3px 2px;
    background-color: #7C4EFF;
    border-radius: 5px;
    color: #fff !important;
  }
}
@media (max-width: 576px) {
  .item-menu span:nth-child(2){
    width: 16% !important;
  }

  .item-menu span:nth-child(3){
    width: 16% !important;
  }
}
@media (max-width: 480px) {
  .item-menu span:nth-child(2){
    width: 13% !important;
  }

  .item-menu span:nth-child(3){
    width: 13% !important;
  }

  .item-menu span:last-child{
    width: 90px !important;
  }

  .item-menu {
    margin-left: -10px;
    width: 107%;
  }
}
@media (max-width: 425px) {
  .item-menu {
  }
  .item-menu span:nth-child(1){
    width: 26% !important;
  }

  .item-menu span:nth-child(2){
    width: 26% !important;
  }

  .item-menu span:nth-child(3){
    width: 26% !important;
  }

  .item-menu span:nth-child(4){
    width: 21% !important;
  }
}

.button-submit {
  padding: 0.9rem;
  height: 40px;
  margin-right: -8px !important;
  z-index: 1;
  margin-top: 2px;
}

.menu-tooltip-modal {
  top: 95%;
  right: 1.8%;
  @media not all and (min-resolution: .001dpcm) {
    @supports (-webkit-appearance:none) {
      top: 125%;
      right: 4%;
    }
  }
}

@media only screen and (max-width: 370px) {
  .logo {
    max-width: 47px;
  }
}

.logo {
  height: 100%;
  width: 57px;
  margin-top: 16px;
  margin-left: 20px;
  z-index: 300;
}

.menu {
  z-index: 10;
  background-color: #1f222c;
}

.active .nav-link {
  background: #31343d;
  border-right: 3px solid yellow !important;
}
.balance-wrapper {
  background-color: #292E3D;
  border-radius: 25px 0 0 25px;
  height: 40px;
  padding: 0 10px 0 30px;
  text-align: left;
  margin-right: -30px;
  margin-top: 2px;
}

.balance {
  color: white;
  font-weight: 300;
  margin-top: -4px;
}

.active-prifile {
  color: white;
}

.menu-container {
  padding: 8px 22px 8px 8px;
  height: 60px;
}

.user-select-none {
  height: 60px;
}

.button-cashbox {
  height: 44px;
  color: #4d3f83;
}

.profile {
  background: #292E3D;
  padding: 8px;
  height: 40px;
  border: 1px solid #292E3D;
  border-radius: 0 15px 15px 0;
  width: 52px;
  text-align: center;
  -webkit-transition: all .3s;
  transition: all .3s;
  cursor: pointer;
  position: relative;
  margin-top: 2px;

  &:hover {
    transition: all .2s ease;
    color: #fff;
  }
}

.fa-list-ul {
  position: absolute;
  right: 13px;
  font-size: 20px;
  top: 10px;
}
.balance-wrapper {
  &-currency-icon{
    width: 18px;
  }
}

.tooltip {
  &__currencies {
    border-radius: 15px;
    text-align: center;
    margin-top: -10px;
    z-index: 10;
  }
  &__menu {
    border-radius: 15px;
    text-align: center;
    z-index: 10;
    @media (max-width: 450px) {
      min-width: 100%;
      border-radius: 0 0 15px 15px;
    }
  }

  &__currencies-body--item {
    font-size: 15px;
    padding: 10px;
    border-radius: 3px;
    text-align: left;
    color: rgba(0,0,0,.75);
    &:hover {
      background-color: #d0d0d0;
    }
  }
  &__currencies-body--item-name {
    margin-right: 6px;
    font-weight: 600;
  }
}
</style>
