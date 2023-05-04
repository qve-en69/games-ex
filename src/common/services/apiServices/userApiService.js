import { apiTransport } from './transport'
import { D_USER_URL } from '../../constants'

class UserApiService {
  constructor (transport) {
    this.transport = transport
  }

  changeAccount (currencyId) {
    return this.transport.post(`/api/player/account/setActiveAccount`, { currencyId })
  }

  changePassword (password, oldPassword) {
    return this.transport.post(`/api/player/user/changePassword`, { password: password, oldPassword: oldPassword })
  }

  setNewPasswordByToken (password, token) {
    return this.transport.post(`/api/player/user/setNewPasswordByToken`, { password, token })
  }

  recoveryPassword ({ recaptchaToken, email }) {
    return this.transport.post(`/api/player/user/recoveryPassword`, { recaptchaToken, email })
  }

  changeNickName (nickname) {
    return this.transport.post(`/api/player/user/changeNickName`, { newNickName: nickname })
  }

  me () {
    return this.transport.post(`${D_USER_URL}/me`)
  }

  registerPhone (refererId, currencyId, promocode, phone, rToken) {
    return this.transport.post('/auth/registerFast', { refererId, currencyId, promocode, phone, rToken })
  }

  setActiveAccount (id) {
    return this.transport.post('/account/setActiveAccount', { id })
  }

  uploadAvatar (data) {
    return this.transport.post('/api/player/user/uploadAvatar', data)
  }

  load2FA () {
    return this.transport.post('/api/player/user/load2FA')
  }

  enable2FA (code, password) {
    return this.transport.post('/api/player/user/enable2FA', { code, password })
  }

  disable2FA (code, password) {
    return this.transport.post('/api/player/user/disable2FA', { code, password })
  }
}

export const userApiService = new UserApiService(apiTransport)
