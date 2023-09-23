<script lang="ts">
export default {
  name: 'NavBar',
  props: {
    msg: {
      type: String,
      default: 'ToDo List'
    }
  }
}
</script>

<template>
  <nav
    class="sticky top-0 flex items-center justify-center px-4 py-3 text-sm font-semibold bg-black/90 backdrop-blur-sm ring-1 ring-black/10"
  >
    <RouterLink :to="{ name: 'home' }">
      <h1 class="text-2xl font-bold text-gray-200 md:text-3xl">
        {{ msg }}
      </h1>
    </RouterLink>
  </nav>
</template>
