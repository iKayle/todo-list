import { mount } from '@vue/test-utils'
import FilterButton from './index.vue'
import { vi } from 'vitest'


describe('FilterButton', () => {
  it('renders teh button with label', () => {
    const wrapper = mount(FilterButton, {
      props: {
        label: 'All',
        filterType: 'all'
      }
    })
    expect(wrapper.text()).toContain('All')

  })

  it('applies the correct class when isActive is true'), () => { 
    const wrapper = mount(FilterButton, {
      props: {
        label: 'Completed',
        filterType: 'completed',
        filter: {
          currentFilter: 'completed',
        }
      }
    })
    expect(wrapper.classes('bg-green-500')).toBe(true)
  }

  it('calls handleFilterClick when button is clicked', async () => {
    const setActiveFilterMock = vi.fn()
    const wrapper = mount(FilterButton, {
      props: {
        label: 'Pending',
        filterType: 'pending',
        setActiveFilter: setActiveFilterMock,
      },
    })
    
    await wrapper.trigger('click')
   
    expect(setActiveFilterMock).toHaveBeenCalledWith('pending')
  })

})
