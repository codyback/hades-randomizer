<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <v-row align="auto">
          <v-col cols="0" xl="2"></v-col>
          <v-col cols="12" sm="6" xl="4">
            <v-sheet rounded min-height="210" min-width="360">
              <h3>
                Settings
              </h3>

              <RandomizeForm
                :minHeat="minHeat"
                :hellMode="hellMode"
                :heatLevel="heatLevel"
                v-on:randomize="updateData"
              />
            </v-sheet>
            <v-row>
              <v-col>
                <v-sheet rounded style="text-align: center" min-width="360">
                  <v-row>
                    <v-col cols="6">
                      <FilterForm
                        :companions="allCompanions"
                        :weapons="allWeapons"
                        :keepsakes="allKeepsakes"
                      />
                    </v-col>
                    <v-col cols="6">
                      <HeatSettings
                        :heats="allHeats"
                        v-on:custom-heat-settings="customHeatSettings"
                      />
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" sm="6" xl="4">
            <v-sheet rounded min-width="360">
              <h3>Randomized</h3>

              <v-expansion-panels v-model="randomizedPanels" flat accordion>
                <HeatComponent :heats="heats" />
                <MirrorComponent :mirrors="mirrors" />
                <KeepsakeCompanionWeaponCompenent
                  :companion="companions"
                  :weapon="weapons"
                  :keepsake="keepsakes"
                />
              </v-expansion-panels>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Data from "./data/data";

import HeatComponent from "./components/Heat";
import KeepsakeCompanionWeaponCompenent from "./components/KeepsakeCompanionWeapon";
import MirrorComponent from "./components/Mirror";
import RandomizeForm from "./components/RandomizeForm";
import FilterForm from "./components/FilterForm";
import HeatSettings from "./components/HeatSettings";

const HeatData = Data.heats;
const CompanionData = Data.companions;
const KeepsakeData = Data.keepsakes;
const MirrorData = Data.mirrors;
const WeaponData = Data.weapons;

let filteredKeepsakes = [];
let filteredCompanions = [];
let filteredWeapons = [];

let currentHeat = 0;

export default {
  name: "App",

  components: {
    HeatComponent,
    KeepsakeCompanionWeaponCompenent,
    MirrorComponent,
    RandomizeForm,
    FilterForm,
    HeatSettings,
  },

  methods: {
    resetHeat: function() {
      const rHeat = [];

      for (const heat of HeatData) {
        heat["count"] = 0;
        rHeat.push(JSON.parse(JSON.stringify(heat)));
      }

      return rHeat;
    },

    resetCompanion: function() {
      const rCompanion = [];

      for (let i = 0; i < CompanionData.length; i++) {
        if (filteredCompanions.includes(i)) break;
        const companion = CompanionData[i];
        rCompanion.push(JSON.parse(JSON.stringify(companion)));
      }

      return rCompanion;
    },

    resetKeepsake: function() {
      const rKeepsake = [];

      for (let i = 0; i < KeepsakeData.length; i++) {
        if (filteredKeepsakes.includes(i)) break;
        const keepsake = KeepsakeData[i];
        rKeepsake.push(JSON.parse(JSON.stringify(keepsake)));
      }

      return rKeepsake;
    },

    resetMirror: function() {
      const rMirror = [];

      for (const mirror of MirrorData) {
        rMirror.push(JSON.parse(JSON.stringify(mirror)));
      }

      return rMirror;
    },

    resetWeapon: function() {
      const rWeapon = [];

      for (let i = 0; i < WeaponData.length; i++) {
        if (filteredWeapons.includes(i)) break;
        const weapon = WeaponData[i];
        rWeapon.push(JSON.parse(JSON.stringify(weapon)));
      }

      return rWeapon;
    },

    resetData: function() {
      this.heats = this.resetHeat();
      this.companions = this.resetCompanion();
      this.keepsakes = this.resetKeepsake();
      this.mirrors = this.resetMirror();
      this.weapons = this.resetWeapon();
      this.customHeats = [];
      currentHeat = 0;
    },

    filter: function(type, index, checked) {
      switch (type) {
        case "keepsake":
          if (checked) {
            const i = filteredKeepsakes.indexOf(index);
            if (i > -1) {
              filteredKeepsakes.splice(i, 1);
            }
          } else {
            filteredKeepsakes.push(index);
          }
          break;
        case "companion":
          if (checked) {
            const i = filteredCompanions.indexOf(index);
            if (i > -1) {
              filteredCompanions.splice(i, 1);
            }
          } else {
            filteredCompanions.push(index);
          }
          break;
        case "weapon":
          if (checked) {
            const i = filteredWeapons.indexOf(index);
            if (i > -1) {
              filteredWeapons.splice(i, 1);
            }
          } else {
            filteredWeapons.push(index);
          }
          break;
      }
    },

    shuffleArray: function(arr) {
      let counter = arr.length;

      while (counter > 0) {
        let i = Math.floor(Math.random() * counter);
        counter--;

        let temp = arr[counter];
        arr[counter] = arr[i];
        arr[i] = temp;
      }

      return arr;
    },

    completelyRandom: function(arr) {
      const randomNum = Math.floor(Math.random() * arr.length);
      return arr[randomNum];
    },

    getRandomWeight: function(arr) {
      let totalWeight = 0,
        cumulativeWeight = 0,
        i;

      for (i = 0; i < arr.length; i++) {
        totalWeight += arr[i].weighting;
      }

      const randomNum = Math.floor(Math.random() * totalWeight);
      const shuffledArr = this.shuffleArray(arr.slice());
      for (i = 0; i < arr.length; i++) {
        cumulativeWeight += shuffledArr[i].weighting;
        if (randomNum < cumulativeWeight) {
          return shuffledArr[i];
        }
      }
    },

    handleHellMode: function() {
      if (this.hellMode) {
        if (this.heats.length !== 16) this.heats.push(HeatData[15]);
      } else {
        this.heats.pop();
      }
    },

    randomizeHeat: function(weightedRandomization, heatLevel) {
      for (let i = 0; i < this.customHeats.length; i++) {
        this.heats[i].count = this.customHeats[i].count;
        this.heats[i].tiers = this.customHeats[i].tiers;
        currentHeat = this.minHeat;
      }

      let loopCount = 0;
      while (currentHeat < heatLevel) {
        let heatSelection = weightedRandomization
          ? this.getRandomWeight(this.heats)
          : this.completelyRandom(this.heats);
        if (heatSelection.tiers.length) {
          let lastTierArrItem =
            heatSelection.tiers[heatSelection.tiers.length - 1];
          let highestHeat = heatLevel - currentHeat;

          if (highestHeat >= lastTierArrItem) {
            heatSelection.count += 1;
            loopCount = 0;

            currentHeat += heatSelection.tiers.pop();
          }

          loopCount++;
        }
        if (loopCount > 40) {
          break;
        }
      }
      if (loopCount > 49) {
        this.updateData();
      }
    },

    randomizeMirror: function() {
      const mirrorArr = [];
      for (const option of this.mirrors) {
        mirrorArr.push(this.completelyRandom(option));
      }

      return mirrorArr;
    },

    randomizeKeepsake: function() {
      return this.completelyRandom(this.keepsakes);
    },

    randomizeCompanion: function() {
      return this.completelyRandom(this.companions);
    },

    randomizeWeapon: function() {
      const randomWeapon = this.completelyRandom(this.weapons);
      const randomAspect = this.completelyRandom(randomWeapon.aspects);
      return { name: randomWeapon.name, aspects: randomAspect.name };
    },

    updateData: function(weightedRandomization, heatLevel) {
      this.resetData();
      this.handleHellMode();
      this.randomizeHeat(weightedRandomization, heatLevel);
      this.weapons = this.randomizeWeapon();
      this.mirrors = this.randomizeMirror();
      this.keepsakes = this.randomizeKeepsake();
      this.companions = this.randomizeCompanion();
    },
    customHeatSettings: function(customHeats, hellMode, customHeatLevel) {
      this.resetData();
      this.minHeat = customHeatLevel;
      this.heatLevel = customHeatLevel;
      this.hellMode = hellMode;
      this.customHeats = customHeats;
      this.updateData(this.weightedRandomization, customHeatLevel);
    },
  },

  created: function() {
    this.resetData();
    this.updateData(true, 20);
  },

  data: () => ({
    heats: HeatData,
    companions: CompanionData,
    keepsakes: KeepsakeData,
    mirrors: MirrorData,
    weapons: WeaponData,
    allHeats: HeatData,
    allKeepsakes: KeepsakeData,
    allCompanions: CompanionData,
    allWeapons: WeaponData,
    randomizedPanels: 0,
    minHeat: 1,
    hellMode: false,
    heatLevel: 20,
    customHeats: [],
  }),
};
</script>

<style>
h3 {
  text-align: center;
  padding-top: 8px;
}
</style>
