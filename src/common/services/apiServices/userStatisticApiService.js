import { apiTransport } from './transport'

class UserStatisticApiService {
  constructor (transport) {
    this.transport = transport
  }

  changeNickName (newNickName) {
    return this.transport.post(`/api/player/user/changeNickName`, { newNickName })
  }

  changeNickAvatar (newAvatar) {
    return this.transport.post(`/api/player/user/confirmEmail`, { newAvatar })
  }
  getUserInfo (userId) {
    return apiTransport.post('/api/player/user/info', {
      userId: userId
    })
  }
}

export const userStatisticApiService = new UserStatisticApiService(apiTransport)
