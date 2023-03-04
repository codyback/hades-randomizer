import {mount} from '@vue/test-utils';
import {describe, expect, it} from 'vitest';
import {createTestingPinia} from '@pinia/testing';
import useStore from '../../src/store';
import {Heat, Keepsake, Mirror, Weapon} from '../../src/types';
import {installQuasarPlugin} from "@quasar/quasar-app-extension-testing-unit-vitest";
import RandomizeFilter from '../../src/components/RandomizeFilter.vue';

installQuasarPlugin();

const mountWith = () => {
  return mount(RandomizeFilter, {
    global: {
      plugins: [createTestingPinia()],
    },
  });
};

describe('Randomize Filter', () => {
  let wrapper: any;
  let store: any;

  beforeEach(() => {
    wrapper = mountWith();
    store = useStore();
  });

  describe('methods', () => {
    describe('handleHeatFilter', () => {
      it('should add heat to filter', () => {
        const heat = store.heats.find((heat: Heat) => heat.name === 'Hard Labor');
        // should add it to the filter
        wrapper.vm.handleHeatFilter(heat);

        expect(store.heatsFilter).toContain(heat.name);
      });

      it('should remove heat from filter', () => {
        const heat = store.heats.find((heat: Heat) => heat.name === 'Hard Labor');
        // should add it to the filter
        wrapper.vm.handleHeatFilter(heat);

        // should remove it from the filter
        wrapper.vm.handleHeatFilter(heat);

        expect(store.heatsFilter).not.toContain(heat.name);
      });
    });

    describe('handleMirrorFilter', () => {
      it('should add mirror to filter', () => {
        const mirror = store.mirrors.findIndex((mirror: Mirror) =>
          mirror.includes('Shadow Presence'),
        );
        // should add it to the filter
        wrapper.vm.handleMirrorFilter(mirror);

        expect(store.mirrorsFilter).toContain(mirror);
      });

      it('should remove mirror from filter', () => {
        const mirror = store.mirrors.findIndex((mirror: Mirror) =>
          mirror.includes('Shadow Presence'),
        );
        // should add it to the filter
        wrapper.vm.handleMirrorFilter(mirror);

        // should remove it from the filter
        wrapper.vm.handleMirrorFilter(mirror);

        expect(store.mirrorsFilter).not.toContain(mirror);
      });
    });

    describe('handleKeepsakeFilter', () => {
      it('should add keepsake to filter', () => {
        const keepsake = store.keepsakes.find(
          (keepsake: Keepsake) => keepsake.name === 'Old Spiked Collar',
        );
        // should add it to the filter
        wrapper.vm.handleKeepsakeFilter(keepsake);

        expect(store.keepsakesFilter).toContain(keepsake?.name);
      });

      it('should remove keepsake from filter', () => {
        const keepsake = store.keepsakes.find(
          (keepsake: Keepsake) => keepsake.name === 'Old Spiked Collar',
        );
        // should add it to the filter
        wrapper.vm.handleKeepsakeFilter(keepsake);

        // should remove it from the filter
        wrapper.vm.handleKeepsakeFilter(keepsake);

        expect(store.keepsakesFilter).not.toContain(keepsake?.name);
      });
    });

    describe('handleCompanionFilter', () => {
      it('should add companion to filter', () => {
        const companion = store.companions.find(
          (companion: string) => companion === 'Battie',
        );
        // should add it to the filter
        wrapper.vm.handleCompanionFilter(companion);

        expect(store.companionsFilter).toContain(companion);
      });

      it('should remove companion from filter', () => {
        const companion = store.companions.find(
          (companion: string) => companion === 'Battie',
        );
        // should add it to the filter
        wrapper.vm.handleCompanionFilter(companion);

        // should remove it from the filter
        wrapper.vm.handleCompanionFilter(companion);

        expect(store.companionsFilter).not.toContain(companion);
      });
    });

    describe('allWeaponAspectsFiltered', () => {
      it('should return true if all weapon aspects are filtered', () => {
        const stygiusWeapon = store.weapons.find(
          (weapon: Weapon) => weapon.name === 'Stygius',
        );
        stygiusWeapon.aspects.forEach((aspect: string) => {
          store.weaponsFilter.push(`Stygius|${aspect}`);
        });

        expect(wrapper.vm.allWeaponAspectsFiltered(stygiusWeapon)).toBe(true);
      });

      it('should return false if some weapon aspects are filtered', () => {
        const stygiusWeapon = store.weapons.find(
          (weapon: Weapon) => weapon.name === 'Stygius',
        );
        stygiusWeapon.aspects.forEach((aspect: string) => {
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
        const stygiusWeapon = store.weapons.find(
          (weapon: Weapon) => weapon.name === 'Stygius',
        );
        stygiusWeapon.aspects.forEach((aspect: string) => {
          store.weaponsFilter.push(`Stygius|${aspect}`);
        });

        expect(store.weaponsFilter.length).toBe(stygiusWeapon.aspects.length);

        wrapper.vm.clearWeaponsFilter(stygiusWeapon);

        expect(store.weaponsFilter.length).toBe(0);
      });
    });

    describe('handleWeaponFilter', () => {
      it('should add weapon and all aspects to filter', () => {
        const stygiusWeapon = store.weapons.find(
          (weapon: Weapon) => weapon.name === 'Stygius',
        );
        // should add it to the filter
        wrapper.vm.handleWeaponFilter(stygiusWeapon);

        expect(store.weaponsFilter.length).toBe(stygiusWeapon.aspects.length);
        stygiusWeapon.aspects.forEach((aspect: string) => {
          expect(store.weaponsFilter).toContain(`Stygius|${aspect}`);
        });
      });

      it('should remove weapon and all aspects from filter if all aspects are already filtered', () => {
        const stygiusWeapon = store.weapons.find(
          (weapon: Weapon) => weapon.name === 'Stygius',
        );
        // should add it to the filter
        wrapper.vm.handleWeaponFilter(stygiusWeapon);
        expect(store.weaponsFilter.length).toBe(stygiusWeapon?.aspects.length);

        // should remove it from the filter
        wrapper.vm.handleWeaponFilter(stygiusWeapon);

        expect(store.weaponsFilter.length).toBe(0);
      });
    });

    describe('handleWeaponAspectFilter', () => {
      it('should add weapon aspect to filter', () => {
        const stygiusWeapon = store.weapons.find(
          (weapon: Weapon) => weapon.name === 'Stygius',
        );
        const aspect = stygiusWeapon.aspects[0];
        // should add it to the filter
        wrapper.vm.handleWeaponAspectFilter(stygiusWeapon, aspect);

        expect(store.weaponsFilter).toContain(`Stygius|${aspect}`);
      });

      it('should remove weapon aspect from filter', () => {
        const stygiusWeapon = store.weapons.find(
          (weapon: Weapon) => weapon.name === 'Stygius',
        );
        const aspect = stygiusWeapon.aspects[0];
        // should add it to the filter
        wrapper.vm.handleWeaponAspectFilter(stygiusWeapon, aspect);

        // should remove it from the filter
        wrapper.vm.handleWeaponAspectFilter(stygiusWeapon, aspect);

        expect(store.weaponsFilter).not.toContain(`Stygius|${aspect}`);
      });
    });

    describe('disableHeatFilter', () => {
      it('should disable on last heat item and nothing else', () => {
        store.heats.forEach((heat: Heat) => {
          if (
            heat.name !== 'Hard Labor' &&
            heat.name !== 'Personal Liability'
          ) {
            store.heatsFilter.push(heat.name);
          }
        });

        const hardLabor = store.heats.find(
          (heat: Heat) => heat.name === 'Hard Labor',
        );
        const lastingConsequences = store.heats.find(
          (heat: Heat) => heat.name === 'Lasting Consequences',
        );

        expect(wrapper.vm.disableHeatFilter(hardLabor)).toBe(true);
        expect(wrapper.vm.disableHeatFilter(lastingConsequences)).toBe(false);
      });

      it('should always disable Personal Liability', () => {
        const personalLiability = store.heats.find(
          (heat: Heat) => heat.name === 'Personal Liability',
        );

        expect(wrapper.vm.disableHeatFilter(personalLiability)).toBe(true);
      });

      it('should disable hell mode items if hell mode is one', () => {
        store.hellMode = true;

        store.hellModeHeats.forEach((heat: string) => {
          const heatItem = store.heats.find((item: Heat) => item.name === heat);
          expect(wrapper.vm.disableHeatFilter(heatItem)).toBe(true);
        });
      });
    });

    describe('disableMirrorFilter', () => {
      it('should disable on last mirror item and nothing else', () => {
        for (let i = 0; i < 11; i++) {
          store.mirrorsFilter.push(i);
        }

        expect(wrapper.vm.disableMirrorFilter(11)).toBe(true);
        expect(wrapper.vm.disableMirrorFilter(9)).toBe(false);
      });
    });

    describe('disableKeepsakeFilter', () => {
      it('should disable on last keepsake item and nothing else', () => {
        for (let i = 0; i < 24; i++) {
          store.keepsakesFilter.push(`${i}`);
        }

        expect(wrapper.vm.disableKeepsakeFilter({ name: '24' })).toBe(true);
        expect(wrapper.vm.disableKeepsakeFilter({ name: '23' })).toBe(false);
      });
    });

    describe('disableCompanionFilter', () => {
      it('should disable on last companion item and nothing else', () => {
        for (let i = 0; i < 5; i++) {
          store.companionsFilter.push(`${i}`);
        }

        expect(wrapper.vm.disableCompanionFilter('5')).toBe(true);
        expect(wrapper.vm.disableCompanionFilter('4')).toBe(false);
      });
    });

    describe('disableWeaponFilter', () => {
      it('should disable on last weapon item and nothing else', () => {
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 4; j++) {
            store.weaponsFilter.push(`${i}|${j}`);
          }
        }

        const testWeapons = [
          {
            name: '0',
            aspects: ['0', '1', '2', '3'],
          },
          {
            name: '5',
            aspects: ['0', '1', '2', '3'],
          },
        ];

        expect(wrapper.vm.disableWeaponFilter(testWeapons[0])).toBe(false);
        expect(wrapper.vm.disableWeaponFilter(testWeapons[1])).toBe(true);
      });
    });
  });
});
