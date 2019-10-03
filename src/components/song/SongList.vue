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
          </div>
          <div class="iblock">
            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">build</md-icon>
              <md-tooltip md-direction="top">edit</md-tooltip>
            </md-button>
            <md-button class="md-icon-button md-list-action">
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
import { mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  computed: {
    ...mapGetters(['songs', 'isLoading_SongList'])
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
        console.log('TCL: loadSongs -> params', filter)
        if (typeof filter === 'undefined') {
          await this.$store.dispatch('loadSongs')
        } else {
          await this.$store.dispatch('loadSongs', filter)
        }
      } catch (error) {
        this.error = error.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.iblock {
  display: inline-block;
}
</style>
