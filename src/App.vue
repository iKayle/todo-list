<script lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar/index.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    RouterView
  }
}
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
