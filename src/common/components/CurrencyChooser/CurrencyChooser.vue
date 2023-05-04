<template>
  <div>
    <DCurrencyChooserList
      v-if="page === 'PAGE_CURRENCY_CHOOSER'"
      :useCurrencyListAccounts="true"
      :currencyList="currencyList"
      :onChooseCurrency="onChooseCurrency"
      :onSetPage="setPage"
    />
    <DCurrencyChooserActiveCurrency v-else :onSetPage="setPage"/>
  </div>
</template>
<script>
import DCurrencyChooserList from './CurrencyChooserList'
import DCurrencyChooserActiveCurrency from './CurrencyChooserActiveCurrency'

export default {
  components: { DCurrencyChooserActiveCurrency, DCurrencyChooserList },
  props: ['currencyList', 'onChooseCurrency'],
  name: 'DCurrencyChooser',
  data () {
    return {
      page: 'PAGE_CURRENCY_CHOOSER'
    }
  },
  methods: {
    setPage (page) {
      this.page = page
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
