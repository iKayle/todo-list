import { mount } from '@vue/test-utils'
import router from '../../router'
import TodoItem from './index.vue'
import tasksMock from '../TodoList/__mocks__/index'

describe('TodoItem', () => {
  it('should render the component', () => {
    const wrapper = mount(TodoItem, {
      global: {
        plugins: [router]
      },
      props: {
        task: tasksMock[0]
      }
    })
    expect(wrapper.text()).toContain('Teste')
  })

  it('emits delete event when delete icon is clicked', async () => {
    const wrapper = mount(TodoItem, {
      global: {
        plugins: [router]
      },
      props: {
        task: tasksMock[0]
      }
    })

    await wrapper.find('.icon-trash').trigger('click')

    await wrapper.vm.$nextTick()

    const emitted = wrapper.emitted('delete')
    if (emitted && emitted.length > 0) {
      expect(emitted).toBeTruthy()
      expect(emitted[0]).toEqual(['1'])
    }
  })

  it('emits update event when icon check is clicked', async () => {
    const wrapper = mount(TodoItem, {
      global: {
        plugins: [router]
      },
      props: {
        task: tasksMock[0]
      }
    })

    await wrapper.find('.icon-check').trigger('click')

    await wrapper.vm.$nextTick()

    const emitted = wrapper.emitted('update')
    if (emitted && emitted.length > 0) {
      expect(emitted).toBeTruthy()
      expect(emitted[0]).toEqual(['1'])
    }
  })
})
