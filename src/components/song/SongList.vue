<template>
<div class="md-layout md-alignment-top-center">
  <div class="md-layout-item md-size-50">
    <p v-if="error">{{ error }}</p>
    <div v-if="isLoading_SongList">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div>
       <md-button
          type="submit"
          class="md-primary"
          @click="loadSongs()">Clear filter</md-button>
    </div>
      <md-list
        class="md-triple-line"
        v-for="(song, index) in songs"
        :key="song._id"
        :index="index">
        <md-list-item>
          <div class="md-list-item-text">
            <span>{{song.name}}</span>
            <span>
              <a href="" @click.prevent="loadSongs({artist:song.artist})">{{song.artist}}</a> -
              <a href="" @click.prevent="loadSongs({album:song.album})">{{song.album}}</a>
            </span>
            <p>
              <a href="" @click.prevent="loadSongs({genre:song.genre})">{{song.genre}}</a> -
              <a href="" @click.prevent="loadSongs({year:song.year})">{{song.year}}</a>
            </p>
            <span>
              {{getDateTime(song.createdAt)}}
            </span>
          </div>
          <div class="iblock">
            <md-button
              class="md-icon-button md-list-action"
              @click="editModalSong({_id:song._id})">
              <md-icon class="md-primary">build</md-icon>
              <md-tooltip md-direction="top">edit</md-tooltip>
            </md-button>
            <md-button
              class="md-icon-button md-list-action"
              @click="deleteSong(song._id)">
              <md-icon class="md-primary">delete</md-icon>
              <md-tooltip md-direction="top">delete</md-tooltip>
            </md-button>
          </div>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </md-list>
  </div>
</div>
</template>

<script>
import EventBus from '../../EventBus'
import { mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  computed: {
    ...mapGetters(['songs', 'isLoading_SongList']),
  },
  data () {
    return {
      error: ''
    }
  },
  async created () {
    await this.loadSongs()
  },
  methods: {
    async loadSongs (params) {
      try {
        let filter = params
        if (typeof filter === 'undefined') {
          await this.$store.dispatch('loadSongs')
        } else {
          await this.$store.dispatch('loadSongs', filter)
        }
      } catch (error) {
        this.error = error.message
      }
    },
    editModalSong (songIdParam) {
      try {
        this.$store.dispatch('loadSong_single', songIdParam)
        EventBus.$emit('MODAL_RISE')
      } catch (error) {
        this.error = error.message
      }
    },
    deleteSong (songId) {
      try {
        this.$store.dispatch('MUTATE_SONG_DELETE', songId)
      } catch (error) {
        this.error = error.message
      }
    },
    getDateTime (createdAt) {
      let day = createdAt
      let dd = String(day.getDate()).padStart(2, '0')
      let mm = String(day.getMonth() + 1).padStart(2, '0')
      let yyyy = day.getFullYear()
      let hh = String(day.getHours()).padStart(2, '0')
      let min = String(day.getMinutes()).padStart(2, '0')
      let ss = String(day.getSeconds()).padStart(2, '0')
      day = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss
      return day
    }
  }
}
</script>

<style lang="scss" scoped>
.iblock {
  display: inline-block;
}
</style>
