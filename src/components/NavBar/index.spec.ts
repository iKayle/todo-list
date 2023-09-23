import { mount } from '@vue/test-utils';
import NavBar from './index.vue';


describe('NavBar', () => { 
    it('renders a navbar', () => {
        const wrapper = mount(NavBar);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders a navbar with custom msg', () => {
        const wrapper = mount(NavBar, {
            props: {
                msg: 'Hello World'
            }
        });
        expect(wrapper.text()).toContain('Hello World');
    });

});