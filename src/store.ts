import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      keepsakes: [],
      keepsakesFilter: [],
      weapons: [],
      weaponsFilter: [],
      companions: [],
      companionsFilter: [],
      heats: [],
      heatsFilter: [],
      hellMode: false,
    };
  },
});
