import ArtistService from '../../service/Artist'
export default {
  state: {
    artists: []
  },
  getters: {
    artists: state => {
      return state.artists
    }
  },
  mutations: {
    LOAD_ARTISTS (state, payload) {
      state.artists = payload
    }
  },
  actions: {
    async LOAD_ARTISTS ({ commit }, payload) {
      let artists = await ArtistService.getArtists()
      commit('LOAD_ARTISTS', artists)
    }
  }
}
