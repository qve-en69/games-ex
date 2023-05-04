<template>
  <div class="menu">
    <div class="d-flex">
      <div class="menu-left d-flex mr-auto d-flex">
        <router-link tag="div" class="text-center mr-4" to="/main">
          <Logo class="logo cursor-pointer"/>
        </router-link>
        <div>
          <router-link class="ml-3"
                       v-for="(item) in pages.filter(item => !item.need_auth || auth)"
                       tag="span"
                       :key="item.name"
                       active-class="active"
                       :to="item.to">
            <a class="menu-text">{{ $t(item.name) }}</a>
          </router-link>
        </div>
        <div @click="toggleOPFind" class="find ml-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search"/>
            <InputText class="find-input" type="text" :placeholder="$t('header.search')" v-model="searchValue"/>
          </span>
        </div>
        <OverlayPanel
          :baseZIndex="-50"
          class="tooltip__currencies"
          appendTo="body" ref="op2" :showCloseIcon="false"
          style="max-width: 1150px; background: #1C1F29; border-radius: 1.25rem; margin-top: 15px">
          <GameFind :keyword="searchValue" @close="toggleOPFind"/>
        </OverlayPanel>
      </div>
      <div class="menu-right">
        <DLang/>
        <div class="menu-right--hr mr-3 ml-3"/>
        <div v-if="auth" class="balance-wrapper ml-0">
          <div @click="toggleOPChangeAccount" class="cursor-pointer mr-4 user-select-none">
            <img alt="logo" class="balance-wrapper-currency-icon" :src="currentAccount.currency.src"/>
            <span style="font-size: 14px; font-weight: bold;"> {{ currentAccount.currency.id }} <i
              class="fas fa-chevron-down"></i></span>
            <span class="d-block balance text-white">
               <number style="font-weight:500; font-size: 16px" :to="currentAccount.balance"
                       :from="currentAccount.balance" :format="(v) => theFormat(currentAccount, v)"/>
              </span>
          </div>
        </div>
        <OverlayPanel
          :baseZIndex="-50"
          class="tooltip__currencies"
          appendTo="body" ref="op" :showCloseIcon="false" style="width: 370px">
          <AccountChooser :onChooseAccount="onChangeAccountCurrency"/>
        </OverlayPanel>
        <li class="nav-link p-0 ml-1">
          <Button v-show="!auth" @click="$router.push({ query: { modal: 'auth' } })" class="button-submit mr-2">
            {{ $t('header.auth') }}
          </Button>
        </li>
        <Button v-if="auth" @click="$router.push({ query: { modal: 'cash' } })" class="button-submit mx-2">
          <span><i class="fas fa-wallet"></i> {{ $t('header.cashbox') }}</span>
        </Button>
        <div @click="toggleOPProfile" v-if="auth" class="profile">
          <div class="profile-icon-container">
            <DCustomAvatar style="width: 42px" class="profile-icon-container-avatar" :src="user.avatar"
                                :username="user.nick" :size="40"></DCustomAvatar>
            <span class="profile-icon">
                <i class="fas fa-list-ul">
                   <OverlayPanel
                     :baseZIndex="-20"
                     class="tooltip__menu"
                     appendTo="body" ref="op1" :showCloseIcon="false" style="width: 370px">
                    <MenuTooltipProfile @close="toggleOPProfile()"
                    />
                  </OverlayPanel>
                </i>
              </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import MenuTooltipProfile from './components/MenuTooltipProfile'

import Logo from '@/assets/svg/logo-icon.svg'
import { DCustomAvatar } from '@/common/components'
import AccountChooser from '@/common/components/AccountChooser/AccountChooser'
import { DLang } from '@/common/components/Lang'
import GameFind from '@/common/components/GameFind/GameFind'

export default {
  components: {
    GameFind,
    DCustomAvatar,
    MenuTooltipProfile,
    Logo,
    AccountChooser,
    DLang
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
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters('navigations', ['pages']),
    ...mapGetters('currency', ['getCurrencyCourseToDollar']),
    ...mapGetters('user', ['auth', 'currentAccount', 'user', 'accounts', 'getBalanceByCurrency', 'showBalanceInUsd'])
  },
  methods: {
    theFormat (currentAccount, number) {
      if (this.showBalanceInUsd) {
        return `$ ${this.getCurrencyCourseToDollar(currentAccount.currency.id, number)}`
      }
      // return `${Number(number).toFixed(currentAccount.currency.precisionUnit)}`
      return `${Number(number).toFixed(8)}`
    },
    panelClose () {
      this.$refs.op1.hide()
    },
    ...mapActions('user', ['changeAccount']),
    toggleOPChangeAccount (e) {
      this.$refs.op.toggle(e)
    },
    toggleOPProfile (e) {
      this.$refs.op1.toggle(e)
    },
    toggleOPFind (e) {
      this.$refs.op2.toggle(e)
    },
    onChangeAccountCurrency (account) {
      this.changeAccount({ accountId: account.id })
      this.$refs.op.hide()
    }
  }
}
</script>
<style scoped lang="scss">
.p-overlaypanel:after, .p-overlaypanel:before {
  left: calc(var(--overlayArrowLeft, 0) + 1.85rem);
}

.find {
  border-radius: 10px;

  span {
    width: 100%;
  }
}

.find-input {
  border-radius: 15px;
  height: 1rem;
  min-width: 22rem;
  background: #15181F;
  @media (max-width: 1277px) {
    min-width: 0rem;
    width: 226px;
  }
}

.menu-text {
  font-size: 15px;
}

.active > a {
  color: #FFFFFF !important;
}

.row {
}

.nav li {
  margin-top: 12px;
}

.menu {
  height: 61px;
  font-size: 1rem;
  background-color: #1f222c;

  &-left {
    display: flex;
    align-items: center;
    flex: 1;
  }

  &-right {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: auto;
    justify-content: space-between;
    padding: 0.5rem 1rem;

    &--hr {
      border-left: 1px solid #c4c4c436;
      height: 100%;
    }
  }
}

.logo {
  height: 100%;
  width: 57px;
  margin-left: 20px;
  z-index: 300;
}

.logo:hover {
  filter: brightness(1.3);
}

.profile {
  background: #292E3D;
  padding: 8px;
  height: 34px;
  border: 1px solid #292E3D;
  border-radius: 15px;
  width: 52px;
  text-align: center;
  -webkit-transition: all .3s;
  transition: all .3s;
  cursor: pointer;
  position: relative;
  margin-left: 20px;

  &:hover {
    transition: all .2s ease;
    color: #fff;
  }
}

.profile-icon-container {
  display: flex;

  &-avatar {
    position: absolute;
    left: -20px;
    top: -5px;
  }
}

.active-prifile {
  color: white;
}

.fa-list-ul {
  position: absolute;
  margin-left: 18px;
  margin-top: 2px;
}

.fa-chevron-down {
  font-size: 10px;
  margin-left: 5px;
  margin-top: 2px;
}

.balance-wrapper {
  background-color: #292E3D;
  border-radius: 25px 0 0 25px;
  height: 44px;
  padding: 0 10px 0 30px;
  margin-right: -30px;
  min-width: 166px;

  &-currency-icon {
    width: 18px;
  }
}

.balance {
  color: rgb(255, 193, 6);
  font-weight: 300;
  margin-top: -5px;
}

@keyframes blink1 {
  0% {
    font-size: 16px;
  }
  15% {
    font-size: 17px;
  }
  30% {
    font-size: 18px;
  }
  45% {
    font-size: 19px;
  }
  60% {
    font-size: 20px;
  }
  75% {
    font-size: 18px;
  }
  90% {
    font-size: 16px;
  }
  100% {
    font-size: 15px;
  }
}

.currency {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
}

.currency:hover {
  background-color: #f1f1f1;
}

.currency-bonus {
  background-color: rgb(228, 155, 18);
  color: white;
  padding: 4px;
  border-radius: 3px;
}

.item-menu {
}

.navbar {
  padding: 15px;
}

.tooltip {
  &__currencies {
    background-color: #0F1114;
    border-radius: 15px;
    padding: 10px;
    text-align: center;
    z-index: 10;
  }

  &__menu {
    background-color: #0F1114;
    border-radius: 15px;
    text-align: center;
    z-index: 10;
  }

  &__currencies-body--item {
    font-size: 15px;
    padding: 10px;
    border-radius: 3px;
    text-align: left;
    color: rgba(0, 0, 0, .75);

    &:hover {
      background-color: #d0d0d0;
    }
  }

  &__currencies-body--item-name {
    margin-right: 6px;
    font-weight: 600;
  }
}

.p-overlaypanel {
  margin: 0 auto;
}

.p-overlaypanel:after, .p-overlaypanel:before {
  display: none;
}
</style>
