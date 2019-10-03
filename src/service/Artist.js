import axios from 'axios'
const URL = 'api/artists/'

class ArtistService {
  static getArtists () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(URL)
        const data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default ArtistService
