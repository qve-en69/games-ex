<template>
  <div class="col-12">
    <div class="row">
      <Email />
      <Social />
    </div>
  </div>
</template>

<script>
import Email from '@/pages/Profile/components/Profile/General/Email'
import Social from '@/pages/Profile/components/Profile/General/Social'

export default {
  name: 'General',
  components: {
    Email,
    Social
  }
}
</script>

<style scoped lang="scss">
.card-header {
  background: transparent;
  color: white;
  margin-left: -5px;
  font-weight: 700;
  font-size: 24px;
}

</style>
