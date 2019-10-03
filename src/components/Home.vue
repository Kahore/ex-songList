<template>
  <div class="home">
    <SongRoot/>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    SongRoot: () => import('../components/song/_SongRoot')
  }
}
</script>
