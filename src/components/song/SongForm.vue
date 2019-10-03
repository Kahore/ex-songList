<template>
<section>
 <md-dialog :md-active.sync="showDialog">
  <form class="md-layout md-alignment-top-center" @submit.prevent="createSong">
    <md-card class="md-layout-item md-size-100 md-small-size-100">
      <md-card-header>
        <div class="md-title">New Song</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="name">Song name</label>
              <md-input name="name" id="name" v-model="name" />
                <!-- <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span> -->
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="artist">Artist</label>
                <md-input name="artist" id="artist" autocomplete="family-name" v-model="artist" :disabled="sending" />
                <!-- <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span> -->
              </md-field>
            </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="album">Album</label>
              <md-input name="album" id="album" v-model="album" />
              <!-- <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
              <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span> -->
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="genre">Genre</label>
              <md-input name="genre" id="genre" v-model="genre" />
              <!-- <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
              <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span> -->
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="year">Year</label>
              <md-input name="year" id="year" v-model="year" />
              <!-- <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
              <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span> -->
            </md-field>
          </div>
        </div>
      </md-card-content>
        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            :disabled="sending"
            @click="showDialog = false">Create</md-button>
        </md-card-actions>
        </md-card>
  </form>
  </md-dialog>
  <md-button class="md-primary md-raised" @click="showDialog = true">Add new</md-button>
  </section>
</template>

<script>
import SongService from '../../service/Song'
export default {
  name: 'SongForm',
  data () {
    return {
      name: '',
      artist: '',
      album: '',
      genre: '',
      year: '',
      showDialog: false,
      sending: false
    }
  },
  methods: {
    async createSong (e) {
      let data = {
        name: this.name,
        artist: this.artist,
        album: this.album,
        genre: this.genre,
        year: this.year
      }
      await SongService.insertSong(data).then(res => {
        data = { ...data, _id: res.data._id }
        this.$store.commit('MUTATE_SONG_ADD', data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
