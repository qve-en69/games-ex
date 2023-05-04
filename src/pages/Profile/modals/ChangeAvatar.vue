<template>
  <DModal>
    Установка аватара
    <div style="width: 300px; height: 400px;">
      <vue-cropper
        v-if="option.img"
        ref="cropper"
        :src="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :high="option.high"
        :maxImgSize="option.maxImgSize"
        @realTime="realTime"
        @imgLoad="imgLoad"
        @cropMoving="cropMoving"
        :enlarge="option.enlarge"
        :mode="option.mode"
        :limitMinSize="option.limitMinSize"
      >
      </vue-cropper>
    </div>
    <div class="edit-tools" aria-disabled="false">
      <label class="btn" for="uploads">File</label>
      <input  type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" ref="uploadImg">
            <button class="scale w-25">
              <i class="fas fa-search-plus"></i>
            </button>
            <button class="scale w-25">
              <i class="fas fa-search-minus"></i>
            </button>
            <button class="rotate w-25" @click="rotateRight()">
              <i class="fas fa-undo right"></i>
            </button>
            <button class="rotate w-25"  @click="rotateLeft()">
              <i class="fas fa-undo"></i>
            </button>
    </div>
    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
  'margin': '5px'}">
      <div :style="previews.div">
        <img :src="option.img" :style="previews.img">
      </div>
    </div>
    <p>中等大小</p>
    <div :style="previewStyle1">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
  </DModal>
</template>

<script>
import VueCropper from 'vue-cropperjs'

import DModal from '@/common/components/Modal/Modal'

import 'cropperjs/dist/cropper.css'

export default {
  name: 'ChangeAvatar',
  components: { DModal, VueCropper },
  data: () => ({
    previews: {},
    option: {
      img: '',
      size: 1,
      full: false,
      outputType: 'png',
      canMove: true,
      fixedBox: false,
      original: false,
      canMoveBox: true,
      autoCrop: false,
      autoCropWidth: 200,
      autoCropHeight: 200,
      centerBox: false,
      high: false,
      cropData: {},
      enlarge: 1,
      mode: 'contain',
      maxImgSize: 3000,
      limitMinSize: [100, 120]
    },
    previewStyle1: {}
  }),
  methods: {
    changeImg () {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
    },
    startCrop () {
      // start
      this.crap = true
      this.$refs.cropper.startCrop()
    },
    stopCrop () {
      //  stop
      this.crap = false
      this.$refs.cropper.stopCrop()
    },
    clearCrop () {
      // clear
      this.$refs.cropper.clearCrop()
    },
    refreshCrop () {
      // clear
      this.$refs.cropper.refresh()
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotate('-90')
    },
    rotateRight () {
      this.$refs.cropper.rotate('90')
    },
    finish (type) {
      // 输出
      // const test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          const img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    realTime (data) {
      const previews = data
      const h = 0.5
      // const w = 0.2
      this.previewStyle1 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: h
      }
      console.log(data)
      this.previews = data
    },
    finish2 (type) {
      this.$refs.cropper2.getCropData(data => {
        this.model = true
        this.modelSrc = data
      })
    },
    finish3 (type) {
      this.$refs.cropper3.getCropData(data => {
        this.model = true
        this.modelSrc = data
      })
    },
    down (type) {
      // event.preventDefault()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data)
          if (window.navigator.msSaveBlob) {
            const blobObject = new Blob([data])
            window.navigator.msSaveBlob(blobObject, 'demo.png')
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click()
            })
          }
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data
          if (window.navigator.msSaveBlob) {
            const blobObject = new Blob([data])
            window.navigator.msSaveBlob(blobObject, 'demo.png')
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click()
            })
          }
        })
      }
    },
    uploadImg (e) {
      // 上传图片
      // this.option.img
      const file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      const reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
        this.$refs.uploadImg.value = ''
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad (msg) {
      console.log(msg)
    },
    cropMoving (data) {
      this.option.cropData = data
    }
  }
}
</script>

<style scoped>

</style>
