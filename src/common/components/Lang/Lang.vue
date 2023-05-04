<template>
   <Dropdown class="lang-dropdown"
             @change="selectLang"
             v-if="getLangs.length && selectedLang"
             v-model="selectedLang" :options="getLangs" optionLabel="name">
      <template #value="slotProps">
        <div class="country-item country-item-value" v-if="slotProps.value">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAeAQMAAABt+G7kAAAAA1BMVEVMaXFNx9g6AAAAAXRSTlMAQObYZgAAAAtJREFUeF5jGHYAAADSAAEzF5gpAAAAAElFTkSuQmCC"
               :class="'rounded flag flag-' + slotProps.value.code.toLowerCase()"
          />
          <div class="ml-2">{{slotProps.value.code.toUpperCase()}}</div>
        </div>
      </template>
      <template #option="slotProps">
        <div class="country-item">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAeAQMAAABt+G7kAAAAA1BMVEVMaXFNx9g6AAAAAXRSTlMAQObYZgAAAAtJREFUeF5jGHYAAADSAAEzF5gpAAAAAElFTkSuQmCC"
               :class="'flag flag-' + slotProps.option.code.toLowerCase()"
          />
          <div class="ml-2">{{slotProps.option.name}}</div>
        </div>
      </template>
    </Dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DLang',
  data: () => ({
    selectedLang: null
  }),
  computed: {
    ...mapGetters('app', ['getLang', 'getLangs'])
  },
  methods: {
    ...mapActions('app', {
      setLang: 'setLang'
    }),
    selectLang (e) {
      console.log(e.value)
      this.setLang(e.value)
    }
  },
  watch: {
    getLang (val) {
      this.selectedLang = val
    }
  },
  beforeMount () {
    this.selectedLang = this.getLang
  },
  beforeDestroy () {}
}
</script>

<style lang="scss" scoped>
.p-dropdown {
  width: 14rem;
}
.country-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.country-item-value {
  img.flag {
    width: 30px;
  }
}

</style>
