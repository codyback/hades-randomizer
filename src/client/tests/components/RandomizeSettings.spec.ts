import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import useStore from '../../src/store';

import RandomizeSettings from '../../src/components/RandomizeSettings.vue';

const mountWith = () => {
  return shallowMount(RandomizeSettings, {
    global: {
      plugins: [createTestingPinia()],
    },
  });
};

describe('RandomizeSettings', () => {
  let wrapper: any;
  let store: any;

  beforeEach(() => {
    wrapper = mountWith();
    store = useStore();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('watchers', () => {
    describe('store.hellMode', () => {
      describe('is true', () => {
        beforeEach(() => {
          store.hellMode = false;
        });

        it('sets minHeatLevel to 5', async () => {
          expect(wrapper.vm.minHeatLevel).toBe(1);

          store.hellMode = true;
          await wrapper.vm.$nextTick();

          expect(wrapper.vm.minHeatLevel).toBe(5);
        });

        it('clears out hellModeHeats', async () => {
          expect(store.heatsFilter).toContain('Personal Liability');

          store.hellMode = true;
          await wrapper.vm.$nextTick();

          expect(store.heatsFilter).to.not.contain('Personal Liability');
        });
      });

      describe('is false', () => {
        beforeEach(() => {
          store.hellMode = true;
        });

        it('sets minHeatLevel to 1', async () => {
          expect(wrapper.vm.minHeatLevel).toBe(5);

          store.hellMode = false;
          await wrapper.vm.$nextTick();

          expect(wrapper.vm.minHeatLevel).toBe(1);
        });

        it('restores hellModeHeats', async () => {
          expect(store.heatsFilter).to.not.contain('Personal Liability');

          store.hellMode = false;
          await wrapper.vm.$nextTick();

          expect(store.heatsFilter).toContain('Personal Liability');
        });
      });
    });
  });
});
