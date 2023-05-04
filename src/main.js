import Vue from 'vue'
import store from './store'
import router from './router/router'
import io from 'socket.io-client'
import VueLocalStorage from 'vue-localstorage'
import Moment from 'vue-moment'
import Vuelidate from 'vuelidate'
import VueAxios from 'vue-axios'
import VueNoty from 'vuejs-noty'
import VueOverflowScroll from 'vue-overflow-scroll'
import VueSocket from 'vue-socket.io-extended'
import App from './App'
import VueTippy, { TippyComponent } from 'vue-tippy'
import StatusIndicator from 'vue-status-indicator'
import VueNumber from 'vue-number-animation'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import VModal from 'vue-js-modal'
import Maska from 'maska'
import axios from './instances/axios'
import registerFilters from './filters'
import AvatarCropper from 'vue-avatar-cropper'
import './plugins/installPrime'
import utilsMixin from './mixins/utils'
import VueGapi from 'vue-gapi'
import Chatra from '@chatra/chatra'
import { i18n } from '@/plugins/i18n/i18n'
import PortalVue from 'portal-vue'
Vue.use(PortalVue)
Vue.use(VModal, { dialog: true, dynamic: true, dynamicDefaults: { clickToClose: false } })
Vue.use(Maska)
Vue.use(VueReCaptcha, {
  siteKey: '***',
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true
  }
})
Vue.use(VueOverflowScroll)
Vue.use(VueTippy)
Vue.use(AvatarCropper)
Vue.component('tippy', TippyComponent)
Vue.use(VueNumber)
Vue.use(i18n)
Vue.use(Moment)
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})
Vue.use(VueAxios, axios)
Vue.use(StatusIndicator)
Vue.use(Vuelidate)
Vue.use(VueNoty, {
  theme: 'mint',
  timeout: 1000,
  progressBar: true,
  layout: 'bottomCenter',
  visibilityControl: true
})

Vue.use(VueGapi, {
  apiKey: '***',
  clientId: '***.apps.googleusercontent.com',
  discoveryDocs: [],
  scope: `https://www.googleapis.com/auth/userinfo.profile`
})
const ioInstance = io('/', {
  transports: ['websocket'],
  upgrade: false,
  secure: true,
  reconnection: true,
  autoConnect: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 'Infinity'
})
ioInstance.on('connect_error', (error) => {
  console.error(error)
})

store.$socket = ioInstance
store.$i18n = i18n

Vue.use(VueSocket, ioInstance, {
  store,
  actionPrefix: 'socket_',
  mutationPrefix: 'socket_'
})

// console.log('%c СТОП! Это функция браузера для разработчиков. Если кто-то сказал вам, что вы можете скопировать и вставить что-то здесь, то это мошенничество, которое даст злоумышленнику доступ к вашему аккаунту. ', 'color: red; font-size: 22px; font-weight: bold; ')

console.log('TEST REALEse tag')
registerFilters()
Vue.mixin(utilsMixin)

Vue.prototype.$chatra = Chatra
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted () {
    this.$chatra('init', {
      ID: '***',
      setup: {
        zIndex: -1,
        language: 'en'
      }
    })
  }
}).$mount('#app')

// Notification.requestPermission().then(function (permission) { console.log('permiss', permission) })
