import axios from 'axios'
const URL = 'api/songs/'
class SongService {
  static getSongs (params) {
    return new Promise(async (resolve, reject) => {
      let filter = typeof params === 'undefined' ? '' : params
      try {
        let res
        if (typeof params === 'undefined') {
          res = await axios.get(URL)
        } else {
          res = await axios.get(URL, {
            params: {
              filter
            }
          })
        }
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
