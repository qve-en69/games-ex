import axios from 'axios'
const config = {
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
}

export class Transport {
  engine;

  mapToResponse = (response) =>
    response.data

  request (conf) {
    return this.engine
      .request(conf)
      .then(this.mapToResponse)
  }

  constructor () {
    this.engine = axios.create(config)
    this.engine.interceptors.request.use(function (config) {
      config.headers.Language = localStorage.getItem('lang')
      return config
    })
  }

  get (url) {
    return this.request(
      {
        method: 'GET',
        url: `${url}`
      }
    )
  }

  delete (url) {
    return this.request(
      {
        method: 'DELETE',
        url: `${url}`
      }
    )
  }

  put (url, data) {
    return this.request(
      {
        method: 'PUT',
        url: `${url}`,
        data
      }
    )
  }

  post (url, data) {
    return this.request(
      {
        method: 'POST',
        url: `${url}`,
        data
      }
    )
  }

  customRequest (conf) {
    return this.engine
      .request(conf)
  }
}

export const apiTransport = new Transport()
