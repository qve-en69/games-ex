<template>
  <div
    :style="(message.type.name === 'gif' ? `min-height: 130px; ` : `background-color: #292E3D; border-radius: 15px; color: #fff; font-weight: 200; margin: 10px 0 -5px 5px;`) + (message.type.name === 'admin' ?'color: white; border-radius: 15px; padding: 15px 20px; box-shadow: rgb(255 255 255 / 44%) 0px -0.175em inset; margin-top: 10px; margin-bottom: 10px; text-align: center; font-weight: 300; background-color: rgb(107 121 128 / 26%);' : 'border-radius: 15px; font-weight: 300; padding: 15px 20px;')"
    >
    <img style="background-color: #292E3D; border-radius: 15px;" v-if="message.type.id === 'gif'" :src="message.message">
    <span class="text" v-else> {{ message.message }}</span>
  </div>
</template>

<script>

export default {
  name: 'MessageCommon',
  props: ['message']
}
</script>

<!--<template>-->
<!--  <div class="wrap">-->
<!--    <div-->
<!--      :style="(message.type.name === 'gif'? `min-height: 130px;` : ``) +  (message.type.name === 'common' ? 'color: white; border-radius: 15px; padding: 15px 20px; box-shadow: rgb(255 255 255 / 44%) 0px -0.175em inset; margin-top: 10px; margin-bottom: 10px; text-align: center; font-weight: 300; background-color: rgb(107 121 128 / 26%);' : 'border-radius: 15px; font-weight: 300; padding: 15px 20px;')"-->
<!--      class="comment">-->
<!--      <img v-if="message.type.name === 'gif'" :src="message.message">-->
<!--      <span v-else> {{ message.message }}</span>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<style lang="scss" scoped>

  .text {
    overflow-wrap: break-word;
  }

</style>
