import { defineStore } from 'pinia';

const useStore = defineStore('main', {
  state: () => ({
    companions: [
      'Battie',
      'Mort',
      'Rib',
      'Shady',
      'Fidi',
      'Antos',
    ],
    heats: [
      { name: 'Hard Labor', tiers: [1, 1, 1, 1, 1], weighting: 35 },
      { name: 'Lasting Consequences', tiers: [1, 1, 1, 1], weighting: 45 },
      { name: 'Convenience Fee', tiers: [1, 1], weighting: 75 },
      { name: 'Jury Summons', tiers: [1, 1, 1], weighting: 50 },
      { name: 'Extreme Measures', tiers: [4, 3, 2, 1], weighting: 90 },
      { name: 'Calisthenics Program', tiers: [1, 1], weighting: 25 },
      { name: 'Benefits Package', tiers: [3, 2], weighting: 80 },
      { name: 'Middle Management', tiers: [2], weighting: 60 },
      { name: 'Underworld Customs', tiers: [2], weighting: 60 },
      { name: 'Forced Overtime', tiers: [3, 3], weighting: 45 },
      { name: 'Heightened Security', tiers: [1], weighting: 35 },
      { name: 'Routine Inspection', tiers: [2, 2, 2, 2], weighting: 20 },
      { name: 'Damage Control', tiers: [1, 1], weighting: 55 },
      { name: 'Approval Process', tiers: [3, 2], weighting: 15 },
      { name: 'Tight Deadline', tiers: [3, 2, 1], weighting: 35 },
      { name: 'Personal Liability', tiers: [1], weighting: 0 },
    ],
    keepsakes: [
      { name: 'Old Spiked Collar', weighting: 20 },
      { name: 'Myrmidon Bracer', weighting: 10 },
      { name: 'Black Shawl', weighting: 25 },
      { name: 'Pierced Butterfly', weighting: 35 },
      { name: 'Bone Hourglass', weighting: 20 },
      { name: 'Chthonic Coin Purse', weighting: 45 },
      { name: 'Skull Earring', weighting: 30 },
      { name: 'Distant Memory', weighting: 25 },
      { name: 'Harpy Feather Duster', weighting: 35 },
      { name: 'Lucky Tooth', weighting: 30 },
      { name: 'Thunder Signet', weighting: 60 },
      { name: 'Conch Shell', weighting: 60 },
      { name: 'Owl Pendant', weighting: 60 },
      { name: 'Eternal Rose', weighting: 60 },
      { name: 'Blood-Filled Vial', weighting: 60 },
      { name: 'Adamant Arrowhead', weighting: 60 },
      { name: 'Overflowing Cup', weighting: 60 },
      { name: 'Lambent Plume', weighting: 35 },
      { name: 'Frostbitten Horn', weighting: 60 },
      { name: 'Cosmic Egg', weighting: 30 },
      { name: 'Shattered Shackle', weighting: 40 },
      { name: 'Evergreen Acorn', weighting: 15 },
      { name: 'Broken Spearpoint', weighting: 20 },
      { name: 'Pom Blossom', weighting: 50 },
      { name: 'Sigil of the Dead', weighting: 40 },
    ],
    mirrors: [
      [
        'Shadow Presence',
        'Fiery Presence',
      ],
      [
        'Chthonic Vitality',
        'Dark Regeneration',
      ],
      [
        'Death Defiance',
        'Stubborn Defiance',
      ],
      [
        'Greater Reflex',
        'Ruthless Reflex',
      ],
      [
        'Boiling Blood',
        'Abyssal Blood',
      ],
      [
        'Infernal Soul',
        'Stygian Soul',
      ],
      [
        'Deep Pockets',
        'Golden Touch',
      ],
      [
        'Thick Skin',
        'High Confidence',
      ],
      [
        'Privileged Status',
        'Family Favorite',
      ],
      [
        'Olympian Favor',
        'Dark Foresight',
      ],
      [
        "Gods' Pride",
        "Gods' Legacy",
      ],
      [
        'Fated Authority',
        'Fated Persuasion',
      ],
    ],
    weapons: [
      {
        name: 'Stygius',
        aspects: [
          'Zagreus',
          'Nemesis',
          'Poseidon',
          'Arthur',
        ],
      },
      {
        name: 'Varatha',
        aspects: [
          'Zagreus',
          'Achilles',
          'Hades',
          'Guan Yu',
        ],
      },
      {
        name: 'Aegis',
        aspects: [
          'Zagreus',
          'Chaos',
          'Zeus',
          'Beowulf',
        ],
      },
      {
        name: 'Coronacht',
        aspects: [
          'Zagreus',
          'Chiron',
          'Hera',
          'Rama',
        ],
      },
      {
        name: 'Malphon',
        aspects: [
          'Zagreus',
          'Talos',
          'Demeter',
          'Gilgamesh',
        ],
      },
      {
        name: 'Exagryph',
        aspects: [
          'Zagreus',
          'Eris',
          'Hestia',
          'Lucifer',
        ],
      },
    ],
    companionsFilter: [] as string[],
    heatsFilter: [] as string[],
    keepsakesFilter: [] as string[],
    mirrorsFilter: [] as number[],
    weaponsFilter: [] as string[],
    hellMode: false,
  }),
  getters: {
    getCompanions:
      (state) => state.companions.filter((item) => !state.companionsFilter.includes(item)),
    getHeats:
      (state) => state.heats.filter((item) => !state.heatsFilter.includes(item.name)),
    getKeepsakes:
      (state) => state.keepsakes.filter((item) => !state.keepsakesFilter.includes(item.name)),
    getMirrors:
      (state) => state.mirrors.filter((_item, index) => !state.mirrorsFilter.includes(index)),
    getWeapons: (state) => {
      const weapons = [...state.weapons];
      return weapons.map((weapon) => {
        const aspects = weapon.aspects.filter((aspect) => !state.weaponsFilter.includes(`${weapon.name}|${aspect}`));
        return {
          name: weapon.name,
          aspects,
        };
      });
    },
  },
});

export default useStore;
