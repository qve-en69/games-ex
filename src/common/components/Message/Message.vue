<template>
  <div>
    <Message :severity="'error'" v-if="error">{{ error }}</Message>
  </div>
</template>
<script>
export default {
  name: 'DMessage',
  props: {
    DMessage: {
      type: Object,
      required: true
    }
  }
}
</script>
