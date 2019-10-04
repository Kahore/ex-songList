<template>
<section>
 <md-dialog :md-active.sync="showDialog">
  <form
    class="md-layout md-alignment-top-center"
    @submit.prevent="saveSong(songInfo)">
    <md-card class="md-layout-item md-size-100 md-small-size-100">
      <md-card-header>
        <div class="md-title">New Song</div>
      </md-card-header>
      <md-progress-bar
        v-if="isLoading_SongForm"
        md-mode="query"/>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('name')">
              <label for="name">Song name</label>
              <md-input name="name" id="name" v-model="songInfo.name" />
              <span class="md-error" v-if="!$v.songInfo.name.required">The song name is required</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('artist')">
                <label for="artist">Artist</label>
                <md-input name="artist" id="artist" autocomplete="family-name" v-model="songInfo.artist" :disabled="sending" />
                <span class="md-error" v-if="!$v.songInfo.artist.required">The artist is required</span>
              </md-field>
            </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('album')">
              <label for="album">Album</label>
              <md-input name="album" id="album" v-model="songInfo.album" />
              <span class="md-error" v-if="!$v.songInfo.album.required">The album is required</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('album')">
              <label for="genre">Genre</label>
              <md-input name="genre" id="genre" v-model="songInfo.genre" />
              <span class="md-error" v-if="!$v.songInfo.genre.required">The genre is required</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('year')">
              <label for="year">Year</label>
              <md-input name="year" id="year" v-model="songInfo.year" />
              <span class="md-error" v-if="!$v.songInfo.year.required">The year is required</span>
            </md-field>
          </div>
        </div>
      </md-card-content>
        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            :disabled="sending">
            <template v-if="songInfo._id">
              Edit
            </template>
            <template v-else>
              Create
            </template>
            </md-button>
        </md-card-actions>
        </md-card>
  </form>
  </md-dialog>
  <md-button class="md-primary md-raised" @click="modalRiseForCreate()">Add new</md-button>
  </section>
</template>

<script>
import EventBus from '../../EventBus'
import SongService from '../../service/Song'
import { SONG_INFO } from '../../store/model/song'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'SongForm',
  mounted () {
    EventBus.$on('MODAL_RISE', payload => {
      this.modalToggler(true)
    })
  },
  data () {
    return {
      showDialog: false,
      sending: false
    }
  },
  computed: {
    ...mapGetters(['songInfo', 'isLoading_SongForm'])
  },
  validations: {
    songInfo: {
      name: {
        required
      },
      artist: {
        required
      },
      album: {
        required
      },
      genre: {
        required
      },
      year: {
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.songInfo[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    modalRiseForCreate () {
      this.resetDetails()
      this.$store.commit('mutate_isLoading_SongForm')
      this.showDialog = true
    },
    modalToggler (mode) {
      this.showDialog = mode
    },
    saveSong (songInfo) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let isNew = this._isNew(songInfo)
        this.sending = true
        if (isNew) {
          this.createSong(songInfo)
        } else {
          this.updateSong(songInfo)
        }
        this.sending = false
        this.resetDetails()
        this.modalToggler(false)
        this.$store.commit('mutate_isLoading_SongForm')
      }
    },
    async createSong (songInfo) {
      let data = songInfo
      await SongService.insertSong(data).then(res => {
        data = { ...data, _id: res.data._id }
        this.$store.commit('MUTATE_SONG_ADD', data)
      })
    },
    async updateSong (songInfo) {
      await SongService.updateSong(songInfo).then(res => {
        this.$store.commit('MUTATE_SONG_EDIT', songInfo)
      })
    },
    _isNew (songInfo) {
      if (typeof songInfo._id === 'undefined') {
        return true
      } else {
        return false
      }
    },
    resetDetails () {
    // MEMO: reset previously selected data
      this.$store.commit('loadSong_single', JSON.parse(JSON.stringify(SONG_INFO)))
    }
  }
}
</script>

<style lang="scss" scoped>
// .md-error input, .md--error textarea, .md--error input:focus, .md--error input:hover {
//     border-color: #f79483;
// }

// .form-group__message--error {
//    display: none;
// }
//  .form-group--error > .form-group__message--error {
//     font-size: 0.75rem;
//     display: block;
//     color: #f57f6c;
// }
</style>
