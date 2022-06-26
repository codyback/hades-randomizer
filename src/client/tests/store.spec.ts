import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import useStore from '../src/store';

describe('Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })

  describe('getters', () => {
    describe('getCompanions', () => {
      it('should return all companions', () => {
        const store = useStore();
        const companions = store.getCompanions;
        expect(companions.length).toBe(6);
        expect(store.companions.length).toBe(6);
        expect(companions[0]).toEqual('Battie');
      });

      it('should return all companions except for one filtered out', () => {
        const store = useStore();
        store.companionsFilter = ['Battie'];
        const companions = store.getCompanions;
        expect(companions.length).toBe(5);
        expect(store.companions.length).toBe(6);
        expect(companions[0]).toEqual('Mort');
        expect(companions).to.not.contain('Battie');
      });

      it('should return all companions except for the ones filtered out', () => {
        const store = useStore();
        store.companionsFilter = ['Battie', 'Mort', 'Shady'];
        const companions = store.getCompanions;
        expect(companions.length).toBe(3);
        expect(companions[0]).toEqual('Rib');
        expect(store.companions.length).toBe(6);
        expect(companions).to.not.contain('Battie');
        expect(companions).to.not.contain('Mort');
        expect(companions).to.not.contain('Shady');
      });

      it('should return none if all companions are filtered out', () => {
        const store = useStore();
        store.companionsFilter = [
          'Battie',
          'Mort',
          'Rib',
          'Shady',
          'Fidi',
          'Antos',
        ];
        const companions = store.getCompanions;
        expect(companions.length).toBe(0);
        expect(store.companions.length).toBe(6);
      });
    });

    describe('getHeats', () => {
      it('should return all heats', () => {
        const store = useStore();
        const heats = store.getHeats;
        expect(heats.length).toBe(15);
        expect(store.heats.length).toBe(16);
        expect(heats[0].name).toEqual('Hard Labor');
      });

      it('should return all heats except for one filtered out', () => {
        const store = useStore();
        store.heatsFilter = ['Benefits Package'];
        const heats = store.getHeats;
        expect(heats.length).toBe(15);
        expect(store.heats.length).toBe(16);
        expect(heats[0].name).toEqual('Hard Labor');
        expect(heats).to.not.contain('Benefits Package');
      });

      it('should return all heats except for the ones filtered out', () => {
        const store = useStore();
        store.heatsFilter = ['Benefits Package', 'Hard Labor', 'Lasting Consequences'];
        const heats = store.getHeats;
        expect(heats.length).toBe(13);
        expect(store.heats.length).toBe(16);
        expect(heats).to.not.contain('Benefits Package');
        expect(heats).to.not.contain('Hard Labor');
        expect(heats).to.not.contain('Lasting Consequences');
      });

      it('should return none if all heats are filtered out', () => {
        const store = useStore();
        store.heatsFilter = [
          'Hard Labor',
          'Lasting Consequences',
          'Convenience Fee',
          'Jury Summons',
          'Extreme Measures',
          'Calisthenics Program',
          'Benefits Package',
          'Middle Management',
          'Underworld Customs',
          'Forced Overtime',
          'Heightened Security',
          'Routine Inspection',
          'Damage Control',
          'Approval Process',
          'Tight Deadline',
          'Personal Liability',
        ];
        expect(store.getHeats.length).toBe(0);
        expect(store.heats.length).toBe(16);
      });
    });

    describe('getKeepsakes', () => {
      it('should return all keepsakes', () => {
        const store = useStore();
        const keepsakes = store.getKeepsakes;
        expect(keepsakes.length).toBe(25);
        expect(store.keepsakes.length).toBe(25);
        expect(keepsakes[0].name).toEqual('Old Spiked Collar');
      });

      it('should return all keepsakes except for one filtered out', () => {
        const store = useStore();
        store.keepsakesFilter = ['Lucky Tooth'];
        const keepsakes = store.getKeepsakes;
        expect(keepsakes.length).toBe(24);
        expect(store.keepsakes.length).toBe(25);
        expect(keepsakes).to.not.contain('Lucky Tooth');
      });

      it('should return all keepsakes except for the ones filtered out', () => {
        const store = useStore();
        store.keepsakesFilter = [
          'Lucky Tooth',
          'Old Spiked Collar',
          'Pierced Butterfly',
        ];
        const keepsakes = store.getKeepsakes;
        expect(keepsakes.length).toBe(22);
        expect(store.keepsakes.length).toBe(25);
        expect(keepsakes).to.not.contain('Lucky Tooth');
        expect(keepsakes).to.not.contain('Old Spiked Collar');
        expect(keepsakes).to.not.contain('Pierced Butterfly');
      });

      it('should return none if all keepsakes are filtered out', () => {
        const store = useStore();
        store.keepsakesFilter = [
          'Old Spiked Collar',
          'Myrmidon Bracer',
          'Black Shawl',
          'Pierced Butterfly',
          'Bone Hourglass',
          'Chthonic Coin Purse',
          'Skull Earring',
          'Distant Memory',
          'Harpy Feather Duster',
          'Lucky Tooth',
          'Thunder Signet',
          'Conch Shell',
          'Owl Pendant', 
          'Eternal Rose', 
          'Blood-Filled Vial', 
          'Adamant Arrowhead', 
          'Overflowing Cup', 
          'Lambent Plume', 
          'Frostbitten Horn', 
          'Cosmic Egg', 
          'Shattered Shackle', 
          'Evergreen Acorn', 
          'Broken Spearpoint', 
          'Pom Blossom', 
          'Sigil of the Dead',
        ];
        expect(store.getKeepsakes.length).toBe(0);
        expect(store.keepsakes.length).toBe(25);
      });
    });

    describe('getMirrors', () => {
      it('should return all mirrors', () => {
        const store = useStore();
        const mirrors = store.getMirrors;
        expect(mirrors.length).toBe(12);
        expect(store.mirrors.length).toBe(12);
        expect(mirrors[0][0]).toEqual('Shadow Presence');
        expect(mirrors[0][1]).toEqual('Fiery Presence');
      });

      it('should return all mirrors except for one filtered out', () => {
        const store = useStore();
        store.mirrorsFilter = [0];
        const mirrors = store.getMirrors;
        expect(mirrors.length).toBe(11);
        expect(store.mirrors.length).toBe(12);
        expect(mirrors[0][0]).toEqual('Chthonic Vitality');
        expect(mirrors[0][1]).toEqual('Dark Regeneration');
      });

      it('should return all mirrors except for the ones filtered out', () => {
        const store = useStore();
        store.mirrorsFilter = [0, 1];
        const mirrors = store.getMirrors;
        expect(mirrors.length).toBe(10);
        expect(store.mirrors.length).toBe(12);
        expect(mirrors[0][0]).toEqual('Death Defiance');
        expect(mirrors[0][1]).toEqual('Stubborn Defiance');
      });

      it('should return none if all mirrors are filtered out', () => {
        const store = useStore();
        store.mirrorsFilter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        expect(store.getMirrors.length).toBe(0);
        expect(store.mirrors.length).toBe(12);
      });
    });

    describe('getWeapons', () => {
      it('should return all weapons', () => {
        const store = useStore();
        const weapons = store.getWeapons;
        expect(weapons.length).toBe(6);
        expect(store.weapons.length).toBe(6);
        expect(weapons[0].name).toEqual('Stygius');
      });

      it('should return all weapons except for one filtered out', () => {
        const store = useStore();
        store.weaponsFilter = ['Stygius|Zagreus'];
        const weapons = store.getWeapons;
        expect(weapons.length).toBe(6);
        expect(store.weapons.length).toBe(6);
        expect(weapons[0].name).toEqual('Stygius');
        expect(weapons[0].aspects).to.not.contain('Zagreus');
        expect(weapons[0].aspects.length).toBe(3);
      });

      it('should return all weapons except for the ones filtered out', () => {
        const store = useStore();
        store.weaponsFilter = [
          'Stygius|Zagreus',
          'Aegis|Chaos',
        ];
        const weapons = store.getWeapons;
        expect(weapons.length).toBe(6);
        expect(store.weapons.length).toBe(6);
        expect(weapons[0].name).toEqual('Stygius');
        expect(weapons[0].aspects).to.not.contain('Zagreus');
        expect(weapons[2].name).toEqual('Aegis');
        expect(weapons[2].aspects).to.not.contain('Chaos');
      });

      it('should return none if all weapons are filtered out', () => {
        const store = useStore();
        store.weaponsFilter = [
          'Stygius|Zagreus',
          'Stygius|Nemesis',
          'Stygius|Poseidon',
          'Stygius|Arthur',
          'Varatha|Zagreus',
          'Varatha|Achilles',
          'Varatha|Hades',
          'Varatha|Guan Yu',
          'Aegis|Zagreus',
          'Aegis|Chaos',
          'Aegis|Zeus',
          'Aegis|Beowulf',
          'Coronacht|Zagreus',
          'Coronacht|Chiron',
          'Coronacht|Hera',
          'Coronacht|Rama',
          'Malphon|Zagreus',
          'Malphon|Talos',
          'Malphon|Demeter',
          'Malphon|Gilgamesh',
          'Exagryph|Zagreus',
          'Exagryph|Eris',
          'Exagryph|Hestia',
          'Exagryph|Lucifer',
        ];
        expect(store.weapons.length).toBe(6);
        expect(store.getWeapons.length).toBe(6);
        store.getWeapons.forEach(weapon => {
          expect(weapon.aspects.length).toBe(0);
        });
      });
    });
  });
});
