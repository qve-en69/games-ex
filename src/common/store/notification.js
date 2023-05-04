import Vue from 'vue'

import { errorService } from '@/common/services/errorService'
import { NOTIFICATION_LEVEL } from '@/common/constants'
/*
Interface Notification {
text:string;
level: NOTIFICATION_LEVEL;
}
 */
export default {
  namespaced: true,
  actions: {
    addNotification (store, notification) {
      try {
        switch (notification.level) {
          case NOTIFICATION_LEVEL.SUCCESS:
            Vue.noty.success(notification.text)
            break
          case NOTIFICATION_LEVEL.ERROR:
            Vue.noty.error(notification.text)
            break
          case NOTIFICATION_LEVEL.WARNING:
            Vue.noty.warning(notification.text)
            break
          case NOTIFICATION_LEVEL.INFO:
            Vue.noty.info(notification.text)
            break
          default:
            throw new Error(
              'notification.level not found ' + notification.level
            )
        }
      } catch (e) {
        errorService.catch(`Error addNotification. ${e.message}`)
      }
    }
  }
}
