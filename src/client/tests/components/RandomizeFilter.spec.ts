import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'

import RandomizeFilter from '../../src/components/RandomizeFilter.vue';

const mountWith = () => {
  return shallowMount(RandomizeFilter, {
    global: {
      plugins: [ createTestingPinia() ],
    },
  });
}

describe('Randomize Filter', () => {
  it('renders correctly', () => {
    const wrapper = mountWith();
    expect(wrapper.element).toMatchSnapshot();
  });
});
