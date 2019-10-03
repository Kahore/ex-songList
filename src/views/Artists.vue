<template>
  <div class="home">
    <Artists/>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    Artists: () => import('../components/Artists')
  }
}
</script>
