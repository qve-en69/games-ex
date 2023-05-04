import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['auth'])
  },
  methods: {
    ...mapMutations('game', ['setCurrentGame']),
    checkPrivilege (roles, roleName, privilegeName = false) {
      if (roles) {
        const role = roles.find(role => role.name === roleName)
        if (role) {
          if (!privilegeName) { return true }
          const privilege = role.find(privilege => privilege === privilegeName)
          if (privilege) { return true }
        }
      }
      return false
    },
    open (game) {
      if (this.auth) {
        this.setCurrentGame({
          ...game,
          url: this.url(game.id)
        })
        this.$router.replace(`/games/play/${game.id}`)
      } else {
        this.$router.push({ query: { modal: 'auth' } })
      }
    },
    url (id) {
      const [provider, name] = id.split(':')
      return `https://cdn.softswiss.net/i/s4/${provider}/${name}.png`
    }
  }
}
