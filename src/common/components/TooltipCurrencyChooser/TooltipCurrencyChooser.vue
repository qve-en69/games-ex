<template>
    <component @setPage="setPage" v-if="current" :is="current" :props="currentProps"/>
</template>
<script>
import TooltipCurrencyChooserList from '@/common/components/TooltipCurrencyChooser/TooltipCurrencyChooserList'
import TooltipCurrencyChooser from '@/common/components/TooltipCurrencyChooser/TooltipCurrencyChooserActiveCurrency'

const PAGE_CURRENCY_CHOOSER = 'PAGE_CURRENCY_CHOOSER'
const PAGE_ACTIVE_CURRENCY = 'PAGE_ACTIVE_CURRENCY'

export default {
  components: { TooltipCurrencyChooserList, TooltipCurrencyChooser },
  props: ['currencyList', 'onChooseCurrency'],
  name: 'CommonTooltipCurrencyChooser',
  data () {
    return {
      page: PAGE_CURRENCY_CHOOSER,
      current: null,
      currentProps: {}
    }
  },
  methods: {
    setPage (page) {
      this.page = page
      switch (page) {
        case PAGE_CURRENCY_CHOOSER:
          this.current = TooltipCurrencyChooserList
          console.log()
          this.currentProps = {
            currencyList: this.currencyList,
            onChooseCurrency: this.onChooseCurrency
          }
          break
        case PAGE_ACTIVE_CURRENCY:
          this.current = TooltipCurrencyChooser
          this.currentProps = {}
          break
      }
    }
  },
  created () {
    this.setPage(PAGE_CURRENCY_CHOOSER)
  }
}
</script>
<style lang="scss" scoped>

</style>
