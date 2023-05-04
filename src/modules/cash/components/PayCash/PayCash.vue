<template>
  <div class="main-modal">
    <div class="modal-menu">
      <div class="content" style="height: 70px">
        <div
          class="cursor-pointer menu-tab "
          :class="pagePayCash === PAY_CASH_TABS.DEPOSIT ? 'active' : ''"
          @click="changePayCashPage({ pagePayCash: PAY_CASH_TABS.DEPOSIT })"
        >
          <SvgTransaction class="vector"/>
          <div>{{ $t('cashbox.menu.transactions') }}</div>
        </div>
        <div
          class="ml-2 cursor-pointer menu-tab"
          :class="pagePayCash === PAY_CASH_TABS.WITHDRAW ? 'active' : ''"
          @click="changePayCashPage({ pagePayCash: PAY_CASH_TABS.WITHDRAW })"
        >
          <SvgWithdraw class="vector"/>
          <div>{{ $t('cashbox.menu.withdraw') }}</div>
        </div>
        <div
          class="ml-2 menu-tab"
          :class="pagePayCash === PAY_CASH_TABS.CONVERTED ? 'active' : ''"
          @click="changePayCashPage({ pagePayCash: PAY_CASH_TABS.CONVERTED })"
        >
          <SvgChoice class="vector"/>
          <div>{{ $t('cashbox.menu.choice') }}</div>
        </div>
        <div
          class="ml-2 menu-tab"
          style="opacity: 0.4;"
          :class="pagePayCash === PAY_CASH_TABS.INVEST ? 'active' : ''"
        >
          <SvgDeposit class="vector"/>
          <div>{{ $t('cashbox.menu.deposite') }}</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="content">
        <transition name="component-fade" mode="out-in">
          <keep-alive>
            <components  @close="$emit('close')" :is="pagePayCash"></components>
          </keep-alive>
        </transition>
      </div>
    </div>
    <div class="helper">
      <span class="help-text">{{ $t('cashbox.help') }}</span>
      <a @click="openChatra()" class="press-help">
        {{ $t('cashbox.support') }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import SvgTransaction from '@/assets/svg/cash/Transaction.svg'
import SvgWithdraw from '@/assets/svg/cash/Withdraw.svg'
import SvgChoice from '@/assets/svg/cash/Choice.svg'
import SvgDeposit from '@/assets/svg/cash/Deposit.svg'

import { PAY_CASH_TABS } from '@/modules/cash/constants'
import { Converted } from './Converted'
import { Deposit } from './Deposit'
import { Withdraw } from './Withdraw'
import { Invest } from './Invest'

export default {
  name: 'PayCashBody',
  components: {
    Deposit,
    Withdraw,
    Invest,
    Converted,
    SvgTransaction,
    SvgWithdraw,
    SvgChoice,
    SvgDeposit
  },
  data () {
    return {
      PAY_CASH_TABS
    }
  },
  computed: {
    ...mapGetters('cash', { pagePayCash: 'getPagePayCash' })
  },
  methods: {
    ...mapActions('cash', ['changePayCashPage']),
    ...mapActions('app', ['openChatra'])
  }
}
</script>
<style scoped lang="scss">
.modal-menu {
  background-color: rgb(30, 32, 36);
  border-radius: 1.25rem;
  margin-bottom: 20px;
  font-size: 12px;
  width: 100%;

  @media (max-width: 390px) {
    margin-top: 15px;
  }

  .content {
    display: flex;
    .menu-tab {
      flex: 1;
    }
  }
}
.main-modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: calc(99vh - 77px);
  @media (max-width: 576px) {
    max-height: calc(100vh - 60px);
  }
}
::v-deep .container {
  @media (max-width: 500px) {
    min-height: 0;
  }
}
.menu-tab {
  position: relative;
  padding: 0.7rem 0;
  text-align: center;
  cursor: pointer;
  line-height: 1;
  border-radius: 1.25rem;
  height: 70px;
}

.active {
  background: #7c4eff;
  color: rgb(255, 255, 255);
  height: 70px;
  svg {
    fill: #fff;
  }
}

.main {
  background: #1c1f29;
  border-radius: 15px;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0;
}

.content {
  background: #292c38;
  display: flex;
  border-radius: 15px;
  height: calc(36rem + 10px);

  @media (max-width: 1200px) {
    height: 36rem;
  }

  @media (max-width: 576px) {
    height: calc(100vh - 215px);
  }
  //
  //@media (max-width: 375px) {
  //  height: 65vh;
  //}
}

.helper {
  width: calc(100% + 28px);
  font-size: 0.85rem;
  text-align: center;
  padding: 2em;
  background-color: #101216;
  margin: -14px;
  border-radius: 0 0 15px 15px;
  margin-top: 20px;
}

@media (min-width: 1200px) {
  .helper {
    width: calc(100% + 32px);
    margin: -16px;
    margin-top: 15px;
  }
}

@media (max-width: 1200px) {
  .helper {
    margin-top: 15px;
  }
}

@media (max-height: 800px) {
  .helper {
    margin-bottom: -23px;
  }
}

@media (max-width: 390px) {
  .helper {
    margin-bottom: -23px;
  }
}

.help-text {
  color: white;
}

.vector {
  height: 1.5rem;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
}
.press-help {
  cursor: pointer;
}
</style>
