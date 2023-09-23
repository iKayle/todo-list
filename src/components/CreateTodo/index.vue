<script lang="ts">
import { defineComponent } from 'vue'
import type { TodoItemProps } from '../TodoItem/index.vue'
import IconLeftVue from '../Icons/IconLeft.vue'
import { useToast } from 'vue-toastification'

export default defineComponent({
  name: 'CreateTodo',
  components: {
    IconLeftVue
  },
  data() {
    return {
      id: '',
      title: '',
      description: '',
      completed: false,
      taskId: this.$route.params.taskId
    }
  },
  setup() {
    const toast = useToast()

    return {
      toast
    }
  },

  created() {
    const taskId = this.$route.params.taskId

    if (taskId) {
      const taskList = JSON.parse(localStorage.getItem('taskList') || '[]')
      const task = taskList.find((task: any) => task.id === taskId)

      if (task) {
        this.id = task.id
        this.title = task.title
        this.description = task.description
        this.completed = task.completed
      }
    }
  },

  methods: {
    handleSubmit() {
      try {
        const data = {
          title: this.title,
          description: this.description,
          id: crypto.randomUUID(),
          completed: this.completed
        }

        const taskList = JSON.parse(localStorage.getItem('taskList') || '[]')

        if (this.id) {
          const taskIndex = taskList.findIndex((task: TodoItemProps) => task.id === this.id)
          taskList[taskIndex] = data

          this.toast.success('ToDo updated successfully')
        } else {
          taskList.push(data)
          this.toast.success('ToDo created successfully')
        }

        localStorage.setItem('taskList', JSON.stringify(taskList))

        this.title = ''
        this.description = ''

        this.$router.push('/')
      } catch (error) {
        console.log(error, 'error')
        this.toast.error('Error creating ToDo')
      }
    },

    goBack() {
      this.$router.go(-1)
    }
  }
})
</script>

<template>
  <section class="p-2 container mx-auto lg:w-2/4 px-4 lg:px-0 space-y-4">
    <IconLeftVue
      class="cursor-pointer text-white h-5 w-5 hover:text-indigo-400"
      @click="goBack()"
    />

    <h2 class="text-xl">{{ taskId ? 'Edit Task' : 'Create Task' }}</h2>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div class="w-full flex flex-col">
        <label for="title">Title</label>
        <input v-model="title" placeholder="" class="rounded-md text-black" />
      </div>
      <div class="w-full flex flex-col">
        <label for="description">Description</label>
        <textarea v-model="description" placeholder="" class="rounded-md text-black"></textarea>
      </div>

      <button
        :disabled="!title.trim()"
        type="submit"
        class="bg-violet-600 text-white px-4 py-2 rounded-md"
        :class="!title.trim() ? 'opacity-50 cursor-not-allowed' : ''"
      >
        {{ taskId ? 'Edit' : 'Submit' }}
      </button>
    </form>
  </section>
</template>
