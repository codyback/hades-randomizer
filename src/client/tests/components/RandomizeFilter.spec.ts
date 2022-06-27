import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'
import useStore from '../../src/store';

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

  describe('methods', () => {
    describe('disableHeatFilter', () => {
      it('should disable on last heat item and nothing else', () => {
        const wrapper = mountWith();
        const store = useStore();

        store.heats.forEach(heat => {
          if (heat.name !== 'Hard Labor' && heat.name !== 'Personal Liability') {
            store.heatsFilter.push(heat.name);
          }
        });

        const hardLabor = store.heats.find(heat => heat.name === 'Hard Labor');
        const lastingConsequences = store.heats.find(heat => heat.name === 'Lasting Consequences');

        expect(wrapper.vm.disableHeatFilter(hardLabor)).toBe(true);
        expect(wrapper.vm.disableHeatFilter(lastingConsequences)).toBe(false);
      });

      it('should always disable Personal Liability', () => {
        const wrapper = mountWith();
        const store = useStore();

        const personalLiability = store.heats.find(heat => heat.name === 'Personal Liability');

        expect(wrapper.vm.disableHeatFilter(personalLiability)).toBe(true);
      });

      it('should disable hell mode items if hell mode is one', () => {
        const wrapper = mountWith();
        const store = useStore();

        store.hellMode = true;
        
        store.hellModeHeats.forEach(heat => {
          const heatItem = store.heats.find(item => item.name === heat);
          expect(wrapper.vm.disableHeatFilter(heatItem)).toBe(true);
        });
      });
    });

    describe('handleHeatFilter', () => {
      it('should add heat to filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const heat = store.heats.find(heat => heat.name === 'Hard Labor');
        // should add it to the filter
        wrapper.vm.handleHeatFilter(heat);

        expect(store.heatsFilter).toContain(heat?.name);
      });

      it('should remove heat from filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const heat = store.heats.find(heat => heat.name === 'Hard Labor');
        // should add it to the filter
        wrapper.vm.handleHeatFilter(heat);

        // should remove it from the filter
        wrapper.vm.handleHeatFilter(heat);

        expect(store.heatsFilter).not.toContain(heat?.name);
      });
    });

    describe('handleMirrorFilter', () => {
      it('should add mirror to filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const mirror = store.mirrors.findIndex(mirror => mirror.includes('Shadow Presence'));
        // should add it to the filter
        wrapper.vm.handleMirrorFilter(mirror);

        expect(store.mirrorsFilter).toContain(mirror);
      });

      it('should remove mirror from filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const mirror = store.mirrors.findIndex(mirror => mirror.includes('Shadow Presence'));
        // should add it to the filter
        wrapper.vm.handleMirrorFilter(mirror);

        // should remove it from the filter
        wrapper.vm.handleMirrorFilter(mirror);

        expect(store.mirrorsFilter).not.toContain(mirror);
      });
    });

    describe('handleKeepsakeFilter', () => {
      it('should add keepsake to filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const keepsake = store.keepsakes.find(keepsake => keepsake.name === 'Old Spiked Collar');
        // should add it to the filter
        wrapper.vm.handleKeepsakeFilter(keepsake);

        expect(store.keepsakesFilter).toContain(keepsake?.name);
      });

      it('should remove keepsake from filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const keepsake = store.keepsakes.find(keepsake => keepsake.name === 'Old Spiked Collar');
        // should add it to the filter
        wrapper.vm.handleKeepsakeFilter(keepsake);

        // should remove it from the filter
        wrapper.vm.handleKeepsakeFilter(keepsake);

        expect(store.keepsakesFilter).not.toContain(keepsake?.name);
      });
    });

    describe('handleCompanionFilter', () => {
      it('should add companion to filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const companion = store.companions.find(companion => companion === 'Battie');
        // should add it to the filter
        wrapper.vm.handleCompanionFilter(companion);

        expect(store.companionsFilter).toContain(companion);
      });

      it('should remove companion from filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const companion = store.companions.find(companion => companion === 'Battie');
        // should add it to the filter
        wrapper.vm.handleCompanionFilter(companion);

        // should remove it from the filter
        wrapper.vm.handleCompanionFilter(companion);

        expect(store.companionsFilter).not.toContain(companion);
      });
    });

    describe('allWeaponAspectsFiltered', () => {
      it('should return true if all weapon aspects are filtered', () => {
        const wrapper = mountWith();
        const store = useStore();

        const stygiusWeapon = store.weapons.find(weapon => weapon.name === 'Stygius');
        stygiusWeapon?.aspects.forEach(aspect => {
          store.weaponsFilter.push(`Stygius|${aspect}`);
        });

        expect(wrapper.vm.allWeaponAspectsFiltered(stygiusWeapon)).toBe(true);
      });

      it('should return false if some weapon aspects are filtered', () => {
        const wrapper = mountWith();
        const store = useStore();

        const stygiusWeapon = store.weapons.find(weapon => weapon.name === 'Stygius');
        stygiusWeapon?.aspects.forEach(aspect => {
          // skip first index
          if (aspect !== 'Zagreus') {
            store.weaponsFilter.push(`Stygius|${aspect}`);
          }
        });

        expect(wrapper.vm.allWeaponAspectsFiltered(stygiusWeapon)).toBe(false);
      });
    });

    describe('clearWeaponsFilter', () => {
      it('should clear weapons filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const stygiusWeapon = store.weapons.find(weapon => weapon.name === 'Stygius');
        stygiusWeapon?.aspects.forEach(aspect => {
          store.weaponsFilter.push(`Stygius|${aspect}`);
        });

        expect(store.weaponsFilter.length).toBe(stygiusWeapon?.aspects.length);

        wrapper.vm.clearWeaponsFilter(stygiusWeapon);

        expect(store.weaponsFilter.length).toBe(0);
      });
    });

    describe('handleWeaponFilter', () => {
      it('should add weapon and all aspects to filter', () => {
        const wrapper = mountWith();
        const store = useStore();

        const stygiusWeapon = store.weapons.find(weapon => weapon.name === 'Stygius');
        // should add it to the filter
        wrapper.vm.handleWeaponFilter(stygiusWeapon);

        expect(store.weaponsFilter.length).toBe(stygiusWeapon?.aspects.length);
        stygiusWeapon?.aspects.forEach(aspect => {
          expect(store.weaponsFilter).toContain(`Stygius|${aspect}`);
        });
      });

      it('should remove weapon and all aspects from filter if all aspects are already filtered', () => {
        const wrapper = mountWith();
        const store = useStore();

        const stygiusWeapon = store.weapons.find(weapon => weapon.name === 'Stygius');
        // should add it to the filter
        wrapper.vm.handleWeaponFilter(stygiusWeapon);
        expect(store.weaponsFilter.length).toBe(stygiusWeapon?.aspects.length);

        // should remove it from the filter
        wrapper.vm.handleWeaponFilter(stygiusWeapon);

        expect(store.weaponsFilter.length).toBe(0);
      });
    });
  });
});
