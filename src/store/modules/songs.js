import SongService from '../../service/Song'
export default {
  state: {
    songs: [],
    songInfo: {},
    isLoading_SongList: false,
    isLoading_SongForm: false
  },
  getters: {
    songs: state => {
      return state.songs
    },
    songInfo: state => {
      return state.songInfo
    },
    isLoading_SongList: state => {
      return state.isLoading_SongList
    },
    isLoading_SongForm: state => {
      return state.isLoading_SongForm
    }
  },
  mutations: {
    loadSongs (state, payload) {
      state.songs = payload
      state.isLoading_SongList = !state.isLoading_SongList
    },
    loadSong_single (state, payload) {
      state.songInfo = payload
      state.isLoading_SongForm = !state.isLoading_SongForm
    },
    MUTATE_SONG_ADD (state, payload) {
      state.songs.unshift(payload)
    },
    MUTATE_SONG_EDIT (state, payload) {
      let index = state.songs.findIndex(song => song._id === payload._id)
      state.songs.splice(index, 1)
      state.songs.unshift(payload)
    },
    MUTATE_SONG_DELETE (state, payload) {
      let index = state.songs.findIndex(song => song._id === payload)
      state.songs.splice(index, 1)
    },
    mutate_isLoading_SongForm (state) {
      state.isLoading_SongForm = !state.isLoading_SongForm
    }
  },
  actions: {
    async loadSongs ({ commit }, payload) {
      commit('loadSongs', [])
      let songs = await SongService.getSongs(payload)
      commit('loadSongs', songs)
    },
    async loadSong_single ({ commit }, payload) {
      commit('loadSong_single', {})
      let song = await SongService.getSongs(payload)
      commit('loadSong_single', song[0])
    },
    async MUTATE_SONG_DELETE ({ commit }, payload) {
      await SongService.deleteSong(payload)
      commit('MUTATE_SONG_DELETE', payload)
    }
  }
}
