<template>
 <DCurrencyChooser
   :currencyList="currencyList.filter(c => c.enabled)"
   :onChooseCurrency="onChooseCurrency" />
</template>

<script>

import DCurrencyChooser from '@/common/components/CurrencyChooser/CurrencyChooser'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: { DCurrencyChooser },
  props: ['currencyList', 'onChooseCurrency'],
  methods: {},
  computed: {
    ...mapGetters('cash', ['isActiveCurrency']),
    ...mapGetters('user', ['getActiveCurrencyIds'])
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>

</style>
