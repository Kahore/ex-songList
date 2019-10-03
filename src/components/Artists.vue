<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item md-size-50">
      <md-list
        class="md-singe-line"
        v-for="(artist, index) in artists"
        :key="index">
        <md-list-item>
          <div class="md-list-item-text">
            <router-link :to='"/"+artist'>
              <p>{{artist}}</p>
            </router-link>
          </div>
        </md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ArtistsList',
  computed: {
    ...mapGetters(['artists'])
  },
  async created () {
    try {
      await this.$store.dispatch('LOAD_ARTISTS')
    } catch (error) {
      console.log('TCL: created -> error', error)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
