<template>
  <section>
    <SongForm/>
    <SongList/>
  </section>
</template>

<script>
export default {
  components: {
    SongForm: () => import('./SongForm'),
    SongList: () => import('./SongList')
  }
}
</script>

<style lang="scss" scoped>

</style>
