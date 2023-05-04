import Vue from 'vue'
import VueI18N from 'vue-i18n'
import { en } from './langs/en'
import { ru } from './langs/ru'
import { ua } from './langs/ua'
import { tr } from './langs/tr'

Vue.use(VueI18N)

export const i18n = new VueI18N({
  local: '',
  fallbackLocale: 'en',
  messages: {
    en, ru, ua, tr
  }
})
