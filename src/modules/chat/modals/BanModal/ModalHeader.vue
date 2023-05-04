<template>
  <div class="title">
    <div class="text-white" style="font-weight: bold; font-size: 1.14rem">
      {{ $t('compoints.block_user') }}
    </div>
  </div>
</template>
<script>

export default {
  name: 'ModalHeader'

}
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  margin: 0.12rem 3.57rem 1.1rem 0.71rem;
  @media (max-width: 390px) {
    margin: 0.12rem 2.57rem 0 0.71rem;
  }
}
.title-right {
  font-weight: 300;
  cursor: pointer;
  margin-top: 2px;
}
</style>
