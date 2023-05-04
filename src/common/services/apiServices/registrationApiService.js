import { apiTransport } from './transport'
import { D_REGISTRATION_URL } from '../../constants'

class RegistrationApiService {
  constructor (transport) {
    this.transport = transport
  }

  registerFast (rToken, nick, avatar) {
    return this.transport.post(`${D_REGISTRATION_URL}/fast`, { rToken, nick, avatar })
  }

  registerEmail ({ email, password, rToken, avatar, nick, login }) {
    return this.transport.post(`${D_REGISTRATION_URL}/email`, { email, password, rToken, avatar, nick, login })
  }
  sendEmail (email, password, login) {
    return this.transport.post(`${D_REGISTRATION_URL}/emailSend`, { email, password, login })
  }
}

export const registrationApiService = new RegistrationApiService(apiTransport)
