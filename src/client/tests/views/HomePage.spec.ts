import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HomePage from '../../src/views/HomePage.vue';

const mountWith = () => mount(HomePage, {
  shallow: true,
});

describe('views:HomePage', () => {
  it('renders correctly', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders correctly - with prop', () => {
    const wrapper = mountWith();
    wrapper.setProps({ heading: 'Hello World!' });
    expect(wrapper.element).toMatchSnapshot();
  });
});
