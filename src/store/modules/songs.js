import SongService from '../../SongService'
export default {
  state: {
    songs: [],
    isLoading_SongList: false
  },
  getters: {
    songs: state => {
      return state.songs
    },
    isLoading_SongList: state => {
      return state.isLoading
    }
  },
  mutations: {
    loadSongs (state, payload) {
      state.songs = payload
    },
    MUTATE_SONG_ADD (state, payload) {
      state.songs.unshift(payload)
    },
    mutate_isLoading (state) {
      state.isLoading_SongList = !state.isLoading_SongList
    }
  },
  actions: {
    async loadSongs ({ commit }, payload) {
      commit('mutate_isLoading')
      let songs = await SongService.getSongs()
      commit('loadSongs', songs)
      commit('mutate_isLoading')
    }
  }
}
