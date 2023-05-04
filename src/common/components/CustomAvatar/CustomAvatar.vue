<template>
  <div class="avatar" :style="'width: ' + size +'px; height: ' + size +'px'">
    <avatar style="border-radius: 50%; margin-top: 0;" :rounded="false" class="avatar_circle as" :src="src" :username="username" :size="this.getSizeAvatar()">
    </avatar>
    <div class="avatar_image" :class="this.getStatusStyle()"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from 'vue-avatar'

export default {
  props: ['src', 'username', 'size', 'compointStatus'],
  components: {
    Avatar
  },
  computed: {
    ...mapGetters('compoint', {
      compointStatuses: 'compointStatuses'
    })
  },
  methods: {
    getSizeAvatar () {
      return (this.size * 1.075)
    },
    getStatusStyle () {
      let image = 0
      for (let i in this.compointStatuses) {
        if (this.compointStatuses[i].statusId === this.compointStatus) {
          image = this.compointStatus
        }
      }
      return 'loyalty_' + image
    }
  },
  created () {
    // console.warn('created-compointStatuses', this.compointStatuses)
  }
}
</script>
<style scoped>
.avatar{
  position: relative;
  display: flex;
}

.avatar_image{
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  justify-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
}

.avatar_circle{
  margin: auto;
}

.loyalty_1{background-image: url(../../../assets/images/loyalty/1.png)}
.loyalty_2{background-image: url(../../../assets/images/loyalty/2.png)}
.loyalty_3{background-image: url(../../../assets/images/loyalty/3.png)}
.loyalty_4{background-image: url(../../../assets/images/loyalty/4.png)}
.loyalty_5{background-image: url(../../../assets/images/loyalty/5.png)}
.loyalty_6{background-image: url(../../../assets/images/loyalty/6.png)}
.loyalty_7{background-image: url(../../../assets/images/loyalty/7.png)}
.loyalty_8{background-image: url(../../../assets/images/loyalty/8.png)}
.loyalty_9{background-image: url(../../../assets/images/loyalty/9.png)}
.loyalty_10{background-image: url(../../../assets/images/loyalty/10.png)}
.loyalty_11{
  background-image: url(../../../assets/images/loyalty/11.png);
}
.loyalty_12 {
  background-image: url(../../../assets/images/loyalty/12.png);
}
.loyalty_13 {
  background-image: url(../../../assets/images/loyalty/13.png);
}
.loyalty_14 {
  background-image: url(../../../assets/images/loyalty/14.png);
}
.loyalty_15 {
  background-image: url(../../../assets/images/loyalty/15.png);
  background-size: 76%;
}

</style>
