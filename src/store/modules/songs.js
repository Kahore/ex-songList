import SongService from '../../service/Song'
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
      state.isLoading_SongList = !state.isLoading_SongList
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
      commit('loadSongs', [])
      let songs = await SongService.getSongs(payload)
      commit('loadSongs', songs)
    }
  }
}
