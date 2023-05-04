<template>
<div>
  <div class="col-12">
    <div class="row">
      <div class="card-body ml-n1">
<!--        <div class="col-12 pb-1 verify-image">
          <i class="fas fa-passport"></i>
          <i class="fas fa-home"></i>
          <i class="fas fa-credit-card"></i>
        </div>
        <div class="col-12 mt-3 verify-info">
          <div class="verify-info-rules mb-2 font-weight-light">{{ $t('profile.verify.id_confirmation }}</div>
          <p>{{ $t('profile.verify.rules_one }}</p>
          <p>{{ $t('profile.verify.rules_two }}</p>
          <p>{{ $t('profile.verify.rules_three }}</p>
        </div>
        <div class="col-12 verify-input-file">
          <div class="input-file-content">
            {{ $t('profile.verify.draggable_file }}
            <div class="verify-input-rules">{{ $t('profile.verify.format_file }}</div>
            <input class="verify-input mt-1" type="file" multiple="" accept="image/*" ref="file" @change="handleFileUpload()" >
          </div>
        </div>-->
<!--        <div class="verify">-->
<!--          <div class="verify__email">-->
<!--            <div class="p-float__label">-->
<!--              <p class="verify-lable-text mb-2">{{$t('authentication.enter_login}}</p>-->
<!--              <InputText @input="$v.login.$touch()"-->
<!--                         v-model.trim="login" type="text"-->
<!--                         class="p-form-control"-->
<!--                         onfocus="this.removeAttribute('readonly')"/>-->
<!--              <div class="invalid-feedback invalid-input">-->
<!--                {{ $t('profile.security.uncorrect_login }}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="verify__safe">-->
<!--            <p class="verify-lable-text mb-2">Подтвердить действия</p>-->
<!--            <Button class="justify-content-center button-submit">-->
<!--              {{ $t('profile.security.button_save }}-->
<!--            </Button>-->
<!--          </div>-->
<!--        </div>-->
<!--        saasd-->
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'Verify',
  data: () => ({
    file: ''
  }),
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]

      const fileType = this.file['name'].split('.').pop()
      if (fileType.toLowerCase() !== 'jpg' && fileType.toLowerCase() !== 'png') {
        this.$noty.error(this.$t('profile.verify.invalid_file_type'))
        return
      }
      this.$noty.success(this.$t('profile.verify.valid_file_type'))

      this.submitFile()
    },
    submitFile () {
      let formData = new FormData()
      formData.append('file', this.file)
    }
  }
}
</script>

<style scoped lang="scss">

.verify-lable-text {
  font-size: 16px;
}

.p-form-control {
  height: 54px;
  font-size: 18px;
}

::v-deep .p-inputtext {
  padding-left: 7px;
  font-size: 18px;
}

.button-submit {
  width: 100%;
  height: 54px;
  border-radius: 15px;
}

.verify {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.verify__email {
  width: 48%;
}

.verify__safe {
  width: 48%;
}

.card-header {
  background: transparent;
  color: white;
  margin-left: -5px;
  font-weight: 700;
  font-size: 24px;
}

.card-body {
  padding: 20px;
  position: relative;
  width: 100%;
  font-size: 14px;
}

.verify-image {
  display: flex;
  justify-content: center;
}

.verify-info p:before {
  display: inline-block;
  content: "";
  width: 6px;
  height: 6px;
  background: #f2cb2b;
  border-radius: 30px;
  margin: 0 6px 3px 0;
}

.verify-info-rules {
  font-size: 15px;
  width: 100%;
  text-align: center;
  color: white;
}

.verify-input-file {
  height: 130px;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  color: white;
  align-items: center;
  text-align: center;
  border: 2px dashed rgb(144 146 159);
  border-radius: 10px;
  padding: 20px;
  position: relative;
}

.input-file-content {
  width: 100%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center
}

.verify-input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
}
.fa-passport, .fa-home, .fa-credit-card {
  font-size: 60px;
  margin-left: 15px;
}
</style>
