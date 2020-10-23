<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-sheet rounded="lg" min-height="210">
              <RandomizeForm v-on:randomize="updateData" />
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="6">
            <v-sheet rounded="lg">
              <v-expansion-panels v-model="panel">
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
import HeatData from "./data/heat";
import CompanionData from "./data/companion";
import KeepsakeData from "./data/keepsake";
import MirrorData from "./data/mirror";
import WeaponData from "./data/weapon";

import HeatComponent from "./components/Heat";
import KeepsakeCompanionWeaponCompenent from "./components/KeepsakeCompanionWeapon";
import MirrorComponent from "./components/Mirror";
import RandomizeForm from "./components/RandomizeForm";

let rHeat = [];
let rCompanion = [];
let rKeepsake = [];
let rMirror = [];
let rWeapon = [];

export default {
  name: "App",

  components: {
    HeatComponent,
    KeepsakeCompanionWeaponCompenent,
    MirrorComponent,
    RandomizeForm,
  },

  methods: {
    resetData: function() {
      rHeat = [];
      rCompanion = [];
      rKeepsake = [];
      rMirror = [];
      rWeapon = [];

      for (const heat of HeatData) {
        heat["count"] = 0;
        rHeat.push(JSON.parse(JSON.stringify(heat)));
      }
      for (const companion of CompanionData) {
        rCompanion.push(JSON.parse(JSON.stringify(companion)));
      }
      for (const keepsake of KeepsakeData) {
        rKeepsake.push(JSON.parse(JSON.stringify(keepsake)));
      }
      for (const mirror of MirrorData) {
        rMirror.push(JSON.parse(JSON.stringify(mirror)));
      }
      for (const weapon of WeaponData) {
        rWeapon.push(JSON.parse(JSON.stringify(weapon)));
      }

      this.heats = rHeat;
      this.companions = rCompanion;
      this.keepsakes = rKeepsake;
      this.mirrors = rMirror;
      this.weapons = rWeapon;
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

    updateData: function(hellMode, weightedRandomization, heatLevel) {
      let currentHeat = 0;
      this.resetData();
      if (hellMode) {
        // sets the heat options that are on by default in Hell Mode
        const hellOptions = [0, 1, 3, 5, 15];
        for (const option of hellOptions) {
          this.heats[option].count += 1;
          currentHeat += this.heats[option].tiers.pop();
        }
      } else {
        if (this.heats.length === 16) {
          this.heats.pop();
        }
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
        this.resetData();
        this.updateData();
      }

      const randomWeapon = this.completelyRandom(this.weapons);
      const randomAspect = this.completelyRandom(randomWeapon.aspects);
      this.weapons = { name: randomWeapon.name, aspects: randomAspect };

      const mirrorArr = [];
      for (const option of this.mirrors) {
        mirrorArr.push(this.completelyRandom(option));
      }
      this.mirrors = mirrorArr;

      this.keepsakes = this.completelyRandom(this.keepsakes);

      this.companions = this.completelyRandom(this.companions);
    },
  },

  created: function() {
    this.resetData();
    this.updateData(false, true, 20);
  },

  data: () => ({
    heats: rHeat,
    companions: rCompanion,
    keepsakes: rKeepsake,
    mirrors: rMirror,
    weapons: rWeapon,
    panel: 0,
  }),
};
</script>
