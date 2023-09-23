<script lang="ts">
import TodoList from '../components/TodoList/index.vue'

export default {
  name: 'HomeView',
  components: {
    TodoList
  }
}
</script>

<template>
  <main>
    <TodoList />
  </main>
</template>
