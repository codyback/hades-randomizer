import { createTestingPinia } from '@pinia/testing';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentPublicInstance } from 'vue';
import useStore from '../../src/store';

import RandomizeItems from '../../src/components/RandomizedItems.vue';

const mountWith = () => {
  return shallowMount(RandomizeItems, {
    global: {
      plugins: [createTestingPinia({
        initialState: {
          main: {
            heatLevel: 3,
            hellMode: false,
            hellModeHeats: ['testing3'],
            heats: [
              { name: 'testing', tiers: [1] },
              { name: 'testing2', tiers: [2] },
              { name: 'testing3', tiers: [3] },
            ],
            companions: ['companion', 'companion2'],
            keepsakes: [{ name: 'keepsake', weighting: 1 }, { name: 'keepsake2', weighting: 2 }],
            weapons: [{ name: 'weapon', aspects: ['1', '2', '3', '4'] }, { name: 'weapon2', aspects: ['1', '2', '3', '4'] }],
          }
        }
      })],
    },
  });
};

describe('RandomizeItems', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof RandomizeItems>>;
  let store: any;

  beforeEach(() => {
    wrapper = mountWith();
    store = useStore();
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('methods', () => {
    describe('shuffleArray', () => {
      it('shuffles an array', () => {
        const arr = [1, 2, 3, 4, 5];
        const shuffled = wrapper.vm.shuffleArray(arr);

        expect(shuffled).to.not.equal(arr);
        expect(shuffled).to.have.length(arr.length);
      });
    });

    describe('completelyRandom', () => {
      it('returns a random item', () => {
        const arr = [1, 2, 3, 4, 5];
        const random = wrapper.vm.completelyRandom(arr);

        expect(random).to.be.oneOf(arr);
      });
    });

    describe('getWeightedRandom', () => {
      it('returns a random item', () => {
        const arr = [1, 2, 3, 4, 5];
        const random = wrapper.vm.getWeightedRandom(arr);

        expect(random).to.be.oneOf(arr);
      });
    });

    describe('getNewHeats', () => {
      it('returns a new mapped array', () => {
        const newHeats = wrapper.vm.getNewHeats();

        expect(newHeats).to.have.length(3);
        expect(newHeats[0].name).toBe('testing');
        expect(newHeats[0].tiers).to.have.length(1);
        expect(newHeats[0].tiers[0]).toBe(1);
        expect(newHeats[1].name).toBe('testing2');
        expect(newHeats[1].tiers).to.have.length(1);
        expect(newHeats[1].tiers[0]).toBe(2);
        expect(newHeats[2].name).toBe('testing3');
        expect(newHeats[2].tiers).to.have.length(1);
        expect(newHeats[2].tiers[0]).toBe(3);
      });
    });

    describe('clearRandomHeats', () => {
      it('clears the random heats', () => {
        const clearedHeats = wrapper.vm.clearRandomHeats();

        expect(clearedHeats).to.have.length(3);
        expect(clearedHeats[0].name).toBe('testing');
        expect(clearedHeats[0].tiers).to.have.length(0);
        expect(clearedHeats[1].name).toBe('testing2');
        expect(clearedHeats[1].tiers).to.have.length(0);
        expect(clearedHeats[2].name).toBe('testing3');
        expect(clearedHeats[2].tiers).to.have.length(0);
      });
    });

    describe('randomizeHeats', () => {
      it('hellMode: randomizes the heats', async () => {
        store.hellMode = true;

        await wrapper.vm.$nextTick();
        const randomizedHeats = wrapper.vm.randomizeHeats();

        expect(randomizedHeats).to.have.length(3);
        expect(randomizedHeats[2].name).toBe('testing3');
        expect(randomizedHeats[2].tiers).to.have.length(1);
        expect(randomizedHeats[2].tiers[0]).toBe(3);
        let sumOfTiers = 0;
        for (const heat of randomizedHeats) {
          if (heat.tiers[0]) sumOfTiers += heat.tiers[0];
        }

        expect(sumOfTiers).toBe(3);
      });

      it('normalMode: randomizes the heats', async () => {
        await wrapper.vm.$nextTick();

        const randomizedHeats = wrapper.vm.randomizeHeats();
        expect(randomizedHeats).to.have.length(3);
        let sumOfTiers = 0;
        for (const heat of randomizedHeats) {
          if (heat.tiers[0]) sumOfTiers += heat.tiers[0];
        }

        expect(sumOfTiers).toBe(3);
      });

      it('normalMode: non-weighted randomization', async () => {
        store.weightedRandomization = false;
        await wrapper.vm.$nextTick();

        const randomizedHeats = wrapper.vm.randomizeHeats();
        expect(randomizedHeats).to.have.length(3);
        let sumOfTiers = 0;
        for (const heat of randomizedHeats) {
          if (heat.tiers[0]) sumOfTiers += heat.tiers[0];
        }

        expect(sumOfTiers).toBe(3);
      });
    });

    describe('getMirrorColor', () => {
      beforeEach(() => {
        store.mirrors = [['normal', 'inverted']];
      });

      it('returns red when normal', () => {
        const mirror = wrapper.vm.getMirrorColor(0, 'normal');

        expect(mirror).toBe('red');
      });

      it('returns lime when inverted', () => {
        const mirror = wrapper.vm.getMirrorColor(0, 'inverted');

        expect(mirror).toBe('lime');
      });
    });

    describe('randomizeMirror', () => {
      beforeEach(() => {
        store.mirrors = [['normal', 'inverted']];
      });

      it('returns a random mirror', () => {
        const possibleMirrors = ['normal', 'inverted'];
        const mirror = wrapper.vm.randomizeMirror();

        expect(mirror[0]).to.be.oneOf(possibleMirrors);
      });
    });

    describe('randomizeCompanion', () => {
      it('returns a random companion', () => {
        const possibleCompanions = ['companion', 'companion2'];
        const companion = wrapper.vm.randomizeCompanion();

        expect(companion).to.be.oneOf(possibleCompanions);
      });
    });

    describe('randomizeKeepsake', () => {
      it('returns a completely random keepsake', async () => {
        store.weightedRandomization = false;
        await wrapper.vm.$nextTick();
        const possibleKeepsakes = ['keepsake', 'keepsake2'];
        const keepsake = wrapper.vm.randomizeKeepsake();

        expect(keepsake).to.be.oneOf(possibleKeepsakes);
      });

      it('returns a weighted random keepsake', async () => {
        store.weightedRandomization = true;
        await wrapper.vm.$nextTick();
        const possibleKeepsakes = ['keepsake', 'keepsake2'];
        const keepsake = wrapper.vm.randomizeKeepsake();

        expect(keepsake).to.be.oneOf(possibleKeepsakes);
      });
    });

    describe('randomizeWeapon', () => {
      it('returns a random weapon', () => {
        const possibleWeapons = ['weapon', 'weapon2'];
        const weapon = wrapper.vm.randomizeWeapon();

        expect(weapon.name).to.be.oneOf(possibleWeapons);
        expect(wrapper.vm.randomWeapon.name).to.be.oneOf(possibleWeapons);
      });
    });

    describe('randomizeAspect', () => {
      it('returns a random aspect', async () => {
        const possibleAspects = ['1', '2', '3', '4'];
        const randomWeapon = wrapper.vm.randomizeWeapon();
        const aspect = wrapper.vm.randomizeWeaponAspect(randomWeapon);

        expect(aspect).to.be.oneOf(possibleAspects);
        expect(wrapper.vm.randomWeapon.aspect).to.be.oneOf(possibleAspects);
      });
    });
  });
});
