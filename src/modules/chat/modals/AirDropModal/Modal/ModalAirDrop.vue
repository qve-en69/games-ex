<template>
  <DModal class="content">
      <ModalHeader/>
      <button @click="$emit('close')" class="dm-close-icon">
        <i style="font-size: 1.15rem; margin-top: -8px" class="pi pi-times"></i>
      </button>
      <ModalBody @close="$emit('close')" class="dm-close-"/>
  </DModal>
</template>
<script>
import { mapActions } from 'vuex'

import { DModal } from '@/common/components'

import ModalBody from './ModalBody.vue'
import ModalHeader from './ModalHeader.vue'

export default {
  components: { ModalHeader, ModalBody, DModal },
  name: 'ModalAirDrop',
  methods: {
    ...mapActions('cash', ['initCash'])
  },
  created () {
    // console.log('initCash')
    this.initCash()
  }
}
</script>
<style scoped>
.dm-close-icon {
  position: absolute;
  font-weight: bold;
  right: 10px;
  top: 17px;
  z-index: 11;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  color: #969696;
}

</style>
