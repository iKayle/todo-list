import { mount } from '@vue/test-utils'
import TodoList from './index.vue'
import router from '../../router'
import tasksMock from './__mocks__/index'


describe('TodoList', () => {
  it('renders a todo', () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.text()).toContain('Nenhuma tarefa encontrada.')
    expect(wrapper.exists()).toBe(true)
  })

  it('renders a filter buttons', () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [router]
      }
    })

    const filterButtons = wrapper.findAll('.filter-button')
    expect(filterButtons.length).toBe(3)

    expect(filterButtons[0].text()).toContain('All')
    expect(filterButtons[1].text()).toContain('Completed')
    expect(filterButtons[2].text()).toContain('Pending')
  })

  it('renders a task correctly', async () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [router]
      }
    })

    tasksMock.forEach((task) => {
      wrapper.vm.taskList.push(task)
    })

    await wrapper.vm.$nextTick()

    const renderedTasks = wrapper.findAll('.todo-item')

    expect(renderedTasks.length).toBeGreaterThan(0)

    tasksMock.forEach((task, index) => {
      const renderedTask = renderedTasks[index]
      expect(renderedTask.text()).toContain(task.title)
      expect(renderedTask.text()).toContain(task.description)

      const pElement = renderedTask.find('.completed')

      expect(pElement.classes('line-through')).toBe(task.completed)
      expect(pElement.classes('opacity-20')).toBe(task.completed)
    })
  })

  it('delete a task from list', async () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [router]
      }
    })
    wrapper.vm.taskList.push(tasksMock[0])

    await wrapper.vm.$nextTick()

    const buttonDelete = await wrapper.find('.icon-trash')
    await buttonDelete.trigger('click')

    expect(wrapper.vm.taskList.length).toBe(0)
  })
})
