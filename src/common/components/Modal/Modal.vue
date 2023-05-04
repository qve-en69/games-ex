<template>
  <div class="dm-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DModal'
}
</script>

<style scoped lang="scss">
.dm-wrapper {
  background-color: #1c1f29;
  border-radius: 1.25rem;
  margin: auto;
  position: relative;
  max-height: 100%;
  //overflow: hidden;
  max-width: 548px;
}

// TODO ПОЛЗУНОК СКРОЛЛА
@media (max-width: 991px) {
  .dm-wrapper {
    max-height: 80vh;
  }
}

@media (max-width: 576px) {
  .dm-wrapper {
    width: 100vw;
    border-radius: 0;
    max-width: 100vw;
    max-height: 100vh;
    height: 100vh;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
}

</style>
