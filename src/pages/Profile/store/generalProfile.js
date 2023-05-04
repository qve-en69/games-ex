import { errorService } from '@/common/services/errorService'
// import { profileApiService } from '@/D-common/services/apiServices'
export default {
  namespaced: true,
  state: {
    fetchStatus: 'FETCH',
    errorStatus: false,
    profileLogin: '',
    profileEmail: '',
    profileName: '',
    profileSurname: '',
    profileBirthday: '',
    profileSex: '',
    profileCountry: '',
    profileCity: ''
  },
  getters: {
    getProfileLogin (state) {
      return state.profileLogin
    },
    getProfileEmail (state) {
      return state.profileEmail
    },
    getProfileName (state) {
      return state.profileName
    },
    getProfileSurname (state) {
      return state.profileSurname
    },
    getProfileBirthday (state) {
      return state.profileBirthday
    },
    getProfileSex (state) {
      return state.profileSex
    },
    getProfileCountry (state) {
      return state.profileCountry
    },
    getProfileCity (state) {
      return state.profileCity
    }
  },
  mutations: {
    getProfileLogin (state, { profileLogin }) {
      state.profileLogin = profileLogin
    },
    getProfileEmail (state, { profileEmail }) {
      state.profileEmail = profileEmail
    },
    getProfileName (state, { profileName }) {
      state.profileName = profileName
    },
    getProfileSurname (state, { profileSurname }) {
      state.profileSurname = profileSurname
    },
    getProfileBirthday (state, { profileBirthday }) {
      state.profileBirthday = profileBirthday
    },
    getProfileSex (state, { profileSex }) {
      state.profileSex = profileSex
    },
    getProfileCountry (state, { profileCountry }) {
      state.profileCountry = profileCountry
    },
    getProfileCity (state, { profileCity }) {
      state.profileCity = profileCity
    }
  },
  actions: {
    async initProfile (store) {
      try {
        // await store.dispatch('user/initDeposit')
        // login: nick
        // email: ..
      } catch (e) {
        store.commit('setErrorStatus', { errorStatus: true })
        errorService.catch(`Error initProfile ${e.message}`)
      }
      store.commit('setFetchStatus', { fetchStatus: 'FETCHED' })
    }
  }
}
