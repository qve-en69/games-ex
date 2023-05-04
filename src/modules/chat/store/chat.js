import { NOTIFICATION_LEVEL } from '@/common/constants'
import { errorService } from '@/common/services/errorService'
import { i18n } from '@/plugins/i18n/i18n'
import { MESSAGE_TYPE } from '@/modules/chat/constants'
import airDrop from './airDrop'
import { chatApiService } from '@/common/services/apiServices'

export default {
  namespaced: true,
  modules: {
    airDrop
  },
  state: {
    message: '',
    messageToValue: '',
    replyMessage: null,
    messages: [],
    toggleChatVisible: true,
    lastTimeSend: 0,
    currentChannel: null,
    channels: []
  },
  getters: {
    getMessages: state => state.messages,
    getToggle: state => state.toggleChatVisible,
    getMessage: state => state.message,
    getReplyMessage: state => state.replyMessage,
    getChannels: state => state.channels,
    getCurrentChannel: state => state.currentChannel,
    lastTimeSend: state => state.lastTimeSend
  },
  mutations: {
    setMessage (state, { message }) {
      state.message = message
    },
    setToggle (state, { toggleChatVisible }) {
      state.toggleChatVisible = toggleChatVisible
    },
    clearMessage (state) {
      state.message = ''
    },
    updateLastTimeSend (state) {
      state.lastTimeSend = Date.now()
    },
    setReplyMessage (state, { replyMessage }) {
      state.replyMessage = replyMessage
    },
    clearReplyMessage (state) {
      state.replyMessage = null
    },
    removeMessage (state, { removeMessage }) {
      state.messages = state.messages.filter(
        message => message.id !== removeMessage.id
      )
    },
    loadMessages (state, { loadedMessages }) {
      loadedMessages.filter(message => message.channelId === state.currentChannel.id).reverse().forEach(message => {
        state.messages.push(message)
      })
    },
    setChannels (state, data) {
      state.channels = data
    },
    setCurrentChannel (state, data) {
      state.currentChannel = data
      state.messages = []
    }
  },
  actions: {
    chatLoad () {
      this.$socket.emit('call', 'chat.load')
    },
    socket_chat (store, [event, data]) {
      switch (event) {
        case 'load':
          store.commit('loadMessages', { loadedMessages: data })
          break
        case 'channels':
          store.commit('setChannels', data)
          if (!store.state.currentChannel || typeof store.state.curentChannel !== 'number') {
            store.dispatch('chat/changeChannel', data[0], { root: true })
          }
          store.dispatch('chat/loadChatByChannelId', { channelId: store.state.currentChannel.id }, { root: true })
          break
        case 'error':
          store.dispatch('notifications/addNotification', {
            level: NOTIFICATION_LEVEL.ERROR,
            text: data.payload.msg || i18n.t('errors.base')
          })
          break
        case 'updateConnective':
          store.state.messages = store.state.messages.map(message => {
            if (message.id === data.id) {
              message.connectData = data.connectData
            }
            return message
          })
          break
        case 'del':
          store.commit('removeMessage', { removeMessage: data })
          break
      }
    },
    loadChatByChannelId (store, { channelId }) {
      chatApiService.loadChat({
        channelId: channelId
      })
        .then(data => {
          store.state.messages = []
          store.commit('loadMessages', { loadedMessages: data })
        })
        .catch(err => {
          if (err) {
            store.dispatch(
              'notifications/addNotification',
              { text: err.message, level: NOTIFICATION_LEVEL.ERROR },
              {
                root: true
              }
            )
          }
        })
    },
    changeChannel (store, channel) {
      store.commit('setCurrentChannel', channel)
      store.dispatch('chat/loadChatByChannelId', { channelId: store.state.currentChannel.id }, { root: true })
    },
    setReplyMessage (store, { replyMessage }) {
      store.commit('setReplyMessage', { replyMessage })
    },
    clearReplyMessage (store) {
      store.commit('clearReplyMessage')
    },
    async createBonus (store, { limit, getAirDropCurrencyId, amount }) {
      await chatApiService.createBonus(limit, getAirDropCurrencyId, amount)
    },
    async activateBonus (store, { id, code }) {
      try {
        await chatApiService.activateBonus({ id, code })
          .then(() => {
            store.dispatch('notifications/addNotification', {
              level: NOTIFICATION_LEVEL.SUCCESS,
              text: i18n.t('chat.air_drop.activated')
            }, { root: true })
          })
      } catch (e) {
        store.dispatch('notifications/addNotification', {
          level: NOTIFICATION_LEVEL.ERROR,
          text: e.response.data.message
        }, { root: true })
      }
    },
    changeMessage (store, { message }) {
      try {
        store.commit('setMessage', { message })
      } catch (e) {
        errorService.catch(`Error changeMessage. ${e.message}`)
      }
    },

    sendGif (store, { gifUrl }) {
      try {
        store.dispatch('send', { msg: gifUrl, type: MESSAGE_TYPE.GIF })
        store.commit('updateLastTimeSend')
        store.commit('clearReplyMessage')
      } catch (e) {
        errorService.catch(`Error sendGif. ${e.message}`)
      }
    },

    sendMessage (store) {
      try {
        const message = store.state.message.trim()
        if (message === '') return
        store.dispatch('send', { msg: message, type: MESSAGE_TYPE.COMMON })
        store.commit('clearMessage')
        store.commit('updateLastTimeSend')
        store.commit('clearReplyMessage')
      } catch (e) {
        errorService.catch(`Error sendMessage. ${e.message}`)
      }
    },

    send (store, { msg, type }) {
      chatApiService.sendMessage({
        msg,
        replyData: store.state.replyMessage,
        type,
        channelId: store.state.currentChannel.id
      }).catch(err => {
        if (err) {
          store.dispatch(
            'notifications/addNotification',
            { text: err.response.data.message, level: NOTIFICATION_LEVEL.ERROR },
            {
              root: true
            }
          )
        }
      })
    },

    deleteMessage (store, { message }) {
      chatApiService.chatDeleteMessage({ id: message.id }).catch(err => {
        if (err) {
          store.dispatch(
            'notifications/addNotification',
            { text: err.response.data.message, level: NOTIFICATION_LEVEL.ERROR },
            {
              root: true
            }
          )
        }
      })
    },

    banUser (store, { userId, comment, time }) {
      return chatApiService.chatBanUser({ userId, comment, time }).catch(err => {
        if (err) {
          store.dispatch(
            'notifications/addNotification',
            { text: err.response.data.message, level: NOTIFICATION_LEVEL.ERROR },
            {
              root: true
            }
          )
        }
      })
    }
  }
}
