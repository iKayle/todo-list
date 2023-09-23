import { mount } from "@vue/test-utils"
import CreateTodo from "./index.vue"
import router from '../../router'

describe('CreateTodo', () => { 
    it('renders a create todo', () => {
        const wrapper = mount(CreateTodo, {
            global: {
                plugins: [router],
            },
        })
        
        expect(wrapper.exists()).toBe(true)
     })

  it('submit a new todo', async () => {
     const wrapper = mount(CreateTodo, {
      global: {
        plugins: [router],
      }
    })
    
    const title = 'teste'
    const description = 'description'  

   await wrapper.find('input').setValue(title)
   await wrapper.find('textarea').setValue(description)

   await wrapper.find('form').trigger('submit.prevent') 

   expect(wrapper.emitted()).toHaveProperty('submit')

  })  
})