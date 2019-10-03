import axios from 'axios'
const URL = 'api/songs/'
class SongService {
  static getSongs () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(URL)
        const data = res.data
        resolve(
          data.map(song => ({
            ...song,
            createdAt: new Date(song.createdAt)
          }))
        )
      } catch (error) {
        reject(error)
      }
    })
  }
  static insertSong (text) {
    return axios.post(URL, {
      text
    })
  }

  static deleteSong (id) {
    return axios.delete(`${URL}${id}`)
  }
}
export default SongService
