<template>
  <InvestWrapper>
    <div class="container">
      <div class="direction">
        <div :class="[investPage === INVEST_PAGES.SEND ? 'active' : '', 'direction__send']"
             @click="changeInvestPage({ investPage: INVEST_PAGES.SEND })"
        >
          {{ $t('cashbox.menu.send') }}
        </div>
        <div :class="[investPage === INVEST_PAGES.RECEIVE ? 'active' : '', 'direction__receive']"
             @click="changeInvestPage({ investPage: INVEST_PAGES.RECEIVE })"
        >
          {{ $t('cashbox.menu.receive') }}
        </div>
      </div>
      <transition name="component-fade" mode="out-in">
        <Send v-if="investPage === INVEST_PAGES.SEND" />
        <Receive v-if="investPage === INVEST_PAGES.RECEIVE" />
      </transition>
    </div>
  </InvestWrapper>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import { INVEST_PAGES } from '@/modules/cash/constants'
import Send from './SendDeposit'
import Receive from './ReceiveDeposit'
import InvestWrapper from './InvestWrapper'

export default {
  name: 'Deposit',
  components: {
    InvestWrapper,
    Send,
    Receive
  },
  data () {
    return {
      INVEST_PAGES
    }
  },
  computed: {
    ...mapGetters('cash/invest', { investPage: 'getInvestPage', fetchStatus: 'getFetchStatus' })
  },
  methods: {
    ...mapActions('cash/invest', ['changeInvestPage'])
  }
}
</script>
<style scoped lang="scss">
.container {
  padding-bottom: 1rem;
  background-color: #292C38;
}
.direction {
  display: flex;
  width: 20rem;
  height: 2.5rem;
  margin: 0 auto;
  margin-top: 1rem;
  background: #4A4B52;
  border-radius: 2rem;
  font-weight: bold;
  color: #BABABA;
;
  &__send {
    flex: 1;
    border-radius: 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -1rem;
    padding-right: 1rem;
  }
  &__receive {
    flex: 1;
    border-radius: 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -1rem;
    padding-left: 1rem;
  }
  .active {
    background: #9184B7;
    color: white;
    padding: 0;
  }
}

.direction:hover {
  cursor: pointer;
}

@media(max-width: 500px) {
  .direction {
    width: 15rem;
  }
}
</style>
