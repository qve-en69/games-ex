import axios from 'axios'

const config = {
  baseURL: '/api',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
}
const instance = axios.create(config)

export default instance
