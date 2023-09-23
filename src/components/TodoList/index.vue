<script lang="ts">
import type { TodoItemProps } from '../TodoItem/index.vue'
import { onMounted, defineComponent, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import TodoItem from '../TodoItem/index.vue'
import FilterButton from '../FilterButton/index.vue'

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem,
    RouterLink,
    FilterButton
  },

  setup() {
    const taskList = reactive<TodoItemProps[]>([])

    const getTaskList = () => {
      const storedData = localStorage.getItem('taskList')
      if (storedData) {
        try {
          return JSON.parse(storedData)
        } catch (error) {
          console.error('Error parsing LocalStorage data:', error)
        }
      }
      return []
    }

    onMounted(() => {
      taskList.push(...getTaskList())
    })

    const handleDelete = (id: string) => {
      const newTaskList = taskList.filter((task: TodoItemProps) => task.id !== id)
      localStorage.setItem('taskList', JSON.stringify(newTaskList))
      taskList.splice(0, taskList.length, ...newTaskList)
    }

    const handleToggle = (id: string, completed: boolean) => {
      const taskIndex = taskList.findIndex((task: TodoItemProps) => task.id === id)
      if (taskIndex !== -1) {
        taskList[taskIndex].completed = completed

        localStorage.setItem('taskList', JSON.stringify(taskList))
      }
    }

    const filter = reactive({
      currentFilter: 'all'
    })

    const filteredTaskList = computed(() => {
      if (filter.currentFilter === 'completed') {
        return taskList.filter((task) => task.completed)
      } else if (filter.currentFilter === 'pending') {
        return taskList.filter((task) => !task.completed)
      } else {
        return taskList
      }
    })

    const setFilter = (filterType: string) => {
      filter.currentFilter = filterType
    }

    return {
      taskList,
      handleDelete,
      handleToggle,
      setFilter,
      filteredTaskList,
      filter
    }
  }
})
</script>

<template>
  <section class="p-2 container mx-auto lg:w-2/4 px-4 lg:px-0 space-y-4">
    <div class="flex justify-end">
      <button class="border p-2 rounded-md">
        <RouterLink to="/create">Create Task</RouterLink>
      </button>
    </div>
    <div class="md:space-x-4 space-x-2 flex-row flex">
      <FilterButton
        label="All"
        filterType="all"
        :setActiveFilter="setFilter"
        :isActive="filter.currentFilter === 'all'"
        :filter="filter"
      />
      <FilterButton
        label="Completed"
        filterType="completed"
        :setActiveFilter="setFilter"
        :isActive="filter.currentFilter === 'completed'"
        :filter="filter"
      />
      <FilterButton
        label="Pending"
        filterType="pending"
        :setActiveFilter="setFilter"
        :isActive="filter.currentFilter === 'pending'"
        :filter="filter"
      />
    </div>

    <div v-for="task in filteredTaskList" :key="task.id">
      <TodoItem :task="task" @delete="handleDelete" @toggle="handleToggle" :key="task.id" />
    </div>

    <div v-if="filteredTaskList.length === 0" class="flex flex-col items-center p-2">
      <img src="@/assets/emptyState.png" alt="Imagem" height="300" width="300" />
      <p class="text-lg sm:text-xl font-semibold">Nenhuma tarefa encontrada.</p>
    </div>
  </section>
</template>
