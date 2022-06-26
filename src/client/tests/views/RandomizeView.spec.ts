import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import RandomizeView from '../../src/views/RandomizeView.vue';

const mountWith = () => {
  return mount(RandomizeView, {
    global: {
      stubs: [
        'randomize-settings',
        'randomize-filter'
      ],
      plugins: [ createTestingPinia() ],
    }
  });
}

describe('RandomizeView', () => {
  it('renders', () => {
    const wrapper = mountWith();
    expect(wrapper.element).toMatchSnapshot();
  });
});
