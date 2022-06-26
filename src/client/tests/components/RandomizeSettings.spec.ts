import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import RandomizeSettings from '../../src/components/RandomizeSettings.vue';

const mountWith = () => {
  return shallowMount(RandomizeSettings, {
    global: {
      plugins: [ createTestingPinia() ],
    }
  });
}

describe('RandomizeSettings', () => {
  it('renders correctly', () => {
    const wrapper = mountWith();
    expect(wrapper.element).toMatchSnapshot();
  });
});
