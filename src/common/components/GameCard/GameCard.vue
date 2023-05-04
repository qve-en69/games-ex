<template>
  <div class="card">
    <div class="face">
      <img :src="img" :alt="title">
      <div class="text-image">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardAnimation',
  props: ['img', 'title']
}
</script>

<style scoped>

.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 10.5rem;
  margin: .5rem;
  max-width: 17.8125rem;
  min-width: 80px;
  overflow: hidden;
  border-radius: 15px;
  transform-style: preserve-3d;
  perspective: 100rem;
  background: transparent;
}

.face {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  color: #fff;
  backface-visibility: hidden;
  transition: transform .7s cubic-bezier(0.8, -0.47, 0, 1.06);
  transform: rotateY(0deg);
  transform-style: preserve-3d;
}

.card:hover {
  transition: transform .7s cubic-bezier(0.8, -0.47, 0, 1.06);
  transform: scale(1.1);

}

img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  -webkit-user-select: none;
  user-select: none;
}

.text-image {
  font-family: Roboto;
  font-weight: 800;
  color: white;
  font-size: 18px;
  position: absolute;
  top: 7%;
  left: 7%;
  transform: translateY(-10%) translateZ(1.75rem);
}

@media (max-width: 1425px) {
  .text-image {
    font-size: 18px;
  }
}
@media (max-width: 770px) {
  .text-image {
    font-size: 14px;
  }
}
@media (max-width: 490px) {
  .text-image {
    font-size: 12px;
  }
}
@media (max-width: 380px) {
  .text-image {
    font-size: 11px;
  }
}

</style>
