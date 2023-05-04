import { apiTransport } from './transport'

class ProfileApiService {
  constructor (transport) {
    this.transport = transport
  }

  savePersonalData (name, surname, dateOfBirth, sex, country, city) {
    return this.transport.post(`/api/player/user/savePersonalData`, { name, surname, dateOfBirth, sex, country, city })
  }

  confirmEmail (email) {
    return this.transport.post(`/api/player/user/confirmEmail`, { email })
  }
  createLocalAccount (login, password) {
    return this.transport.post(`/api/player/user/createLocalAccount`, { login, password })
  }
  getAuthSessions () {
    return this.transport.post(`/api/player/session/getAuthSession`)
  }
}

export const profileApiService = new ProfileApiService(apiTransport)
