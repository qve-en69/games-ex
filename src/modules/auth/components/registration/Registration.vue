<template>
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="animationBody">
        <div class="reg__form-tabs">
          <div :class="{ 'reg__form-tab-active' : component === 'Fast' }" class="reg__form-tab"
               @click="component = 'Fast'">
            {{ $t('authentication.register.fast') }}
          </div>
          <div :class="{ 'reg__form-tab-active' : component === 'Email' }" class="reg__form-tab"
               @click="component = 'Email'">
            {{ $t('authentication.register.email') }}
          </div>
        </div>
        <div class="reg__form-components">
          <transition name="slide-fade" mode="out-in">
            <keep-alive>
              <component :is="component" @update:component="$emit('update:component', $event)"></component>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Fast from '../registrationFast/Fast'
import Email from './Email'

export default {
  name: 'Registration',
  components: {
    Fast,
    Email
  },
  data: () => ({
    component: 'Email'
  }),
  computed: {
    ...mapGetters('navigations', ['menuModalName'])
  },
  created () {
    if (this.$route.params.refererId) {
      this.$socket.client.emit('refererInfo', {
        type: 'request',
        payload: { id: this.$route.params.refererId }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@media(max-width: 500px) {
  .animationBody {
    margin-top: -25px;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}

.reg {
  display: flex;
  padding-left: 50px;
  flex-direction: column;
  justify-content: flex-start;

  &-press {
    font-size: 14px;
    cursor: pointer;

    &-active {
      color: white;

      &:hover {
        color: yellow;
      }
    }
  }

  &__form-tabs {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 7px 22px 9px 15px;
  }

  &__form-tab {
    -webkit-box-align: center;
    -ms-flex-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    width: 100%;
    cursor: pointer;
    font-size: 18px;
    height: 40px;
    color: #90929f;

    &:hover {
      color: yellow
    }
  }

  &__form-tab-active {
    color: white;

    &:hover {
      color: white;
    }
  }

  &__form-components {
    flex-grow: 1;
  }
}

@media (max-width: 900px) {
  .reg {
    padding-right: 0;
    padding-left: 0;
  }
}

@media (max-width: 500px) {
  .reg {
    &__form-tab {
      &:hover {
        box-shadow: none;
      }
    }
    &__form-tabs {
      margin: 17px 22px 9px;
    }
  }
}

@media (max-width: 350px) {
  .reg {
    &__form-tab {
      font-size: 13px;
    }
  }
}

</style>
