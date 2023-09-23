<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'FilterButton',
  props: {
    label: String,
    filterType: String,
    setActiveFilter: Function,
    filter: Object
  },
  setup(props) {
    const isActive = computed(() => {
      return props.filter?.currentFilter === props.filterType
    })

    const handleFilterClick = () => {
      if (props.setActiveFilter) {
        props.setActiveFilter(props.filterType)
      }
    }

    return {
      isActive,
      handleFilterClick
    }
  }
})
</script>

<template>
  <button
    class="border rounded-md p-1.5 md:p-2 lg:w-32 w-24 hover:bg-indigo-400 ease-in-out transition-all duration-75 filter-button"
    :class="{
      'bg-indigo-500': filterType === 'all' && isActive,
      'bg-green-500': filterType === 'completed' && isActive,
      'bg-amber-500': filterType === 'pending' && isActive
    }"
    @click="handleFilterClick"
  >
    {{ label }}
  </button>
</template>
