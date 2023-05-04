import { apiTransport } from './transport'

class AppApiService {
  constructor (transport) {
    this.transport = transport
  }

  setLang (lang) {
    return this.transport.post(`/api/player/lang/setLang`, { lang: lang })
  }
}

export const appApiService = new AppApiService(apiTransport)
