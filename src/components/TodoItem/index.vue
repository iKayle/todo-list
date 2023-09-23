<script lang="ts">
import IconCheckVue from '../Icons/IconCheck.vue'
import IconPenVue from '../Icons/IconPen.vue'
import IconTrashVue from '../Icons/IconTrash.vue'
import { defineComponent, type PropType } from 'vue'
import { RouterLink } from 'vue-router'

export interface TodoItemProps {
  id: string
  title: string
  description?: string
  completed: boolean
}

export default defineComponent({
  name: 'TodoItem',
  components: {
    RouterLink,
    IconCheckVue,
    IconPenVue,
    IconTrashVue
  },
  props: {
    task: {
      type: Object as PropType<TodoItemProps>,
      required: true
    }
  },
  methods: {
    deleteTask(id: string) {
      this.$emit('delete', id)
    },
    toggleCompleted() {
      const updatedTask = { ...this.task }
      updatedTask.completed = !updatedTask.completed
      this.$emit('toggle', this.task.id, !this.task.completed)
    }
  }
})
</script>

<template>
  <div
    class="border bg-opacity-20 bg-gray-500 space-y-2 p-2 flex flex-col space-x-2 min-h-[100px] rounded-md todo-item"
  >
    <div class="flex flex-row space-x-2 text-center items-center">
      <IconCheckVue
        class="cursor-pointer hover:text-indigo-300 icon-check"
        :class="{ 'text-green-500': task.completed, 'text-gray-400': !task.completed }"
        @click="toggleCompleted()"
      />

      <div class="space-y-2 w-full">
        <h2
          class="text-center font-semibold bg-violet-500 rounded-md"
          :class="{ 'line-through opacity-25 blur-0': task.completed }"
        >
          {{ task.title }}
        </h2>
      </div>
      <div class="space-y-4 items-center flex flex-col justify-end">
        <RouterLink :to="{ name: 'edit', params: { taskId: task.id } }">
          <IconPenVue class="h-5 w-5 hover:text-indigo-300 icon-edit" />
        </RouterLink>
      </div>
    </div>
    <p class="font-thin text-sm completed" :class="{ 'line-through opacity-20': task.completed }">
      {{ task.description }}
    </p>
    <div class="flex justify-end">
      <IconTrashVue
        @click="deleteTask(task.id)"
        class="cursor-pointer h-5 w-5 text-red-400 hover:text-red-500 icon-trash"
      />
    </div>
  </div>
</template>

<style></style>
