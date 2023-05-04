<template>
  <div class="user-modal mt-1">
    <div class="user-modal__container">
      <Button v-show="!image" class="button-upload" @click="clickButtonUpload"><i class="fas fa-images"></i></Button>
      <input type="file" ref="fileLoader" style="visibility: hidden" @change="fileUpload" accept="image/*"/>
      <div class="block">
        <VueCropper
          :aspectRatio="4 / 4"
          :key="image"
          v-if="image"
          class="cropper-class"
          ref="cropper"
          :fixedBox="true"
          :autoCrop="true"
          :autoCropArea="1"
          :center="true"
          :src="image"
          @ready="onReady"
          @zoom="onZoom"
          :background="false"
          :viewMode="1"
          dragMode="move"
          :cropBoxMovable="false"
          :cropBoxResizable="false"
          :toggleDragModeOnDblclick="false"
        />
      </div>
      <div class="user-modal__panel">
        <div class="user-modal__panel-cut">
          <div class="user-modal__panel-item" @click="changeCutValue(cutValue - 0.1)"><i class="pi pi-search-minus"></i></div>
          <Slider class="user-modal__panel-slider" :value="cutValue * 100" @change="e => changeCutValue(e / 100)"/>
          <div class="user-modal__panel-item" @click="changeCutValue(cutValue + 0.1)"><i class="pi pi-search-plus"></i></div>
          <div class="user-modal__panel-item" @click="rotateImage(-90)"><i class="pi pi-reply left" ></i></div>
          <div class="user-modal__panel-item"  @click="rotateImage(90)"><i class="pi pi-reply right"></i></div>
        </div>
      </div>
      <div class="p-float-label text-center">
        <div class="reg-text">
          <span>{{ $t('avatar_modal.default_avatar') }}</span>
        </div>
        <div class="icons-list">
          <img class="icon" v-for="item in icons" :key="item.id" :src="item.icon" @click="setCommonAvatar">
        </div>
      </div>
      <div class="text-center">
        <Button class="button-submit" @click="saveAvatar">
          {{ $t('avatar_modal.button_confirm') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { mapActions } from 'vuex'
import { USER_STATISTIC_PAGES } from '@/modules/userStatistic/constants'

export default {
  name: 'UserinfoAvatar',
  components: { VueCropper },
  data () {
    return {
      image: null,
      rotate: 0,
      cutValue: 0.28,
      icons: [
        { id: 1, icon: 'https://static.d.net/avatars/avatar1.png' },
        { id: 2, icon: 'https://static.d.net/avatars/avatar2.png' },
        { id: 3, icon: 'https://static.d.net/avatars/avatar3.png' },
        { id: 4, icon: 'https://static.d.net/avatars/avatar4.png' },
        { id: 5, icon: 'https://static.d.net/avatars/avatar5.png' },
        { id: 6, icon: 'https://static.d.net/avatars/avatar6.png' }
      ]
    }
  },
  methods: {
    ...mapActions('user', ['uploadAvatar']),
    ...mapActions('userStatistic', ['changeUserStatisticPage']),
    clickButtonUpload () {
      this.$refs.fileLoader.click()
    },
    fileUpload (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.image = reader.result
      }, false)
      if (file) {
        reader.readAsDataURL(file)
      }
    },
    onReady () {
      this.$refs.cropper.scale()
    },
    onZoom (e) {
      this.cutValue = e.detail.ratio
    },
    changeZoom (value) {
      console.log(value)
    },
    changeCutValue (value) {
      if (value > 0) {
        this.cutValue = value
        const containerData = this.$refs.cropper.getContainerData()
        this.$refs.cropper.zoomTo(this.cutValue, {
          x: containerData.width / 2,
          y: containerData.height / 2
        })
      }
    },
    saveAvatar () {
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('croppedImage', blob)

        this.uploadAvatar(formData).then(() => {
          this.changeUserStatisticPage({ pageUserStatistic: USER_STATISTIC_PAGES.USER_EDIT_NAME })
        }).catch((e) => {
          this.$noty.error(e.response.data.message)
        })
      })
    },
    rotateImage (degree) {
      this.rotate = this.rotate + degree
      if (this.rotate === 360 || this.rotate === -360) {
        this.rotate = 0
      }
      this.$refs.cropper.rotateTo(this.rotate)
    },
    setCommonAvatar (event) {
      this.image = event.target.src
    }
  }
}
</script>

<style lang="scss" scoped>

img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
.cropper-class{
  width: 90%;
  height: 90%;
  margin: auto;
  background: none;
}

.user-modal {
  overflow-y: auto;
  margin-top: -57px;
  &__panel {
    width: 374px;
    background-color: #383A44;
    border-radius: 15px;
    margin: 0 auto;
    i {
      font-size: 20px;
    }
    &-item {
      padding: 18px 21px;
      cursor: pointer;
      transition: all .2s ease-in-out;
      .left {
        transform: rotate(180deg);
      }
      .right {
        transform: rotate(-180deg);
        transform: scale(1, -1);
      }
    }
    &-item:hover {
      background-color: #2F323A;
      color: #fff;
    }
    &-slider {
      width: 90px;
    }
  }
}

.user-modal__panel-cut {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-modal::-webkit-scrollbar {
  width: 0;
}

.button-submit {
  height: 55px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 15px;
  width: 252px;
  background-color: #7C4EFF;
}

.button-upload {
  top: 193px;
  display: flex;
  margin: auto;
  font-size: 32px;
  z-index: 100;
  border: 0;
  background: transparent;
}

.reg-text {
  margin: 1rem 0;
  font-weight: 300;
}

.icons-list {
  display: flex;
  justify-content: space-evenly;
  margin: 0 1rem;
  margin-top: -0.5rem;
  padding: 0 3rem;

  .icon {
    height: 4rem;
    border: 2px solid transparent;
    border-radius: 50%;
    transition: border-color .3s
  }

  .icon:hover {
    border-color: #b19df7;
    cursor: pointer;
    transition: border-color .3s
  }
}

.block {
  height: 280px;
  margin: 10px 0;
}

::v-deep .p-slider {
  background-color: #C4C4C4 !important;
  height: 4px;
  width: 90px;
  border-radius: 15px;
  margin: 0 8px;
}

::v-deep .p-inputswitch.p-focus .p-inputswitch-slider {
  box-shadow: none;
}

::v-deep .p-slider-handle {
  background-color: #FFFFFF !important;
  width: 39px !important;
  height: 16px !important;
  border-radius: 15px !important;
  border: none !important;
  margin-left: -1rem !important;
}

::v-deep .p-slider-range {
  border-radius: 15px !important;
}

@media (max-width: 576px) {
  .user-modal {
    max-height: 100vh;
  }
}

@media (max-width: 420px) {
  .user-modal__panel {
    width: 340px;
    &-item:first-child:hover  {
      border-radius: 15px 0 0 15px;
    }
    &-item:last-child:hover {
      border-radius: 0 15px 15px 0;
    }
  }
}
</style>
