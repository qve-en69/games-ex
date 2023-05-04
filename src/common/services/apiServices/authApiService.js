import { D_AUTH_URL, D_OAUTH_URL } from '../../constants'
import { apiTransport } from './transport'

class AuthApiService {
  constructor (transport) {
    this.transport = transport
  }

  login (login, password) {
    return this.transport.post(`${D_AUTH_URL}/login`, { login, password })
  }

  loginByTfaToken ({ token, code }) {
    return this.transport.post(`${D_AUTH_URL}/loginByTfaToken`, { token, code })
  }

  oauthLogin (data, provider) {
    return this.transport.post(`${D_OAUTH_URL}/${provider}`, data)
  }

  logout () {
    return this.transport.post(`${D_AUTH_URL}/logout`)
  }

  refreshToken () {
    return this.transport.post(`${D_AUTH_URL}/refreshToken`)
  }
}

export const authApiService = new AuthApiService(apiTransport)
