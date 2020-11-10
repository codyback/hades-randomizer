<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red darken-3" text v-bind="attrs" v-on="on">
        Customize Heat
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <h3>Customize Heat</h3>
        <v-switch
          v-model="HellMode"
          :label="`Hell Mode`"
          color="red darken-3"
          @change="resetHeats()"
        />
        <div v-for="(heat, index) in localHeats" :key="index">
          <HeatItem
            :heat="heat"
            :index="index"
            :hellMode="HellMode"
            @addheat="addHeat"
            @subheat="subHeat"
          />
        </div>
        <div class="center">
          <v-btn
            color="orange darken-3"
            text
            @click="(HellMode = false), resetHeats()"
          >
            Reset
          </v-btn>
          <v-btn
            color="red darken-3"
            text
            @click="(dialog = false), saveCustomHeat()"
          >
            Save
          </v-btn>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import AllData from "../data/data";

import HeatItem from "./HeatItem";

const HeatData = AllData.heats;
let currentHeat = 0;

export default {
  name: "HeatSettings",
  props: ["heats"],
  components: { HeatItem },
  methods: {
    resetHeats: function() {
      const rHeat = [];

      for (const heat of HeatData) {
        heat["count"] = 0;
        rHeat.push(JSON.parse(JSON.stringify(heat)));
      }

      this.localHeats = rHeat;
      this.handleHellMode();
      currentHeat = 0;
    },

    addHeat: function(heatObj, index) {
      const tiers = heatObj.tiers;
      if (tiers.length) {
        heatObj.count += 1;
        currentHeat += this.localHeats[index].tiers.pop();
      }
    },

    subHeat: function(heatObj, index) {
      if (heatObj.count !== 0) {
        const currentTier = heatObj.tiers.length; // 3
        const newHeatObj = HeatData[index];
        const tierToAdd = newHeatObj.tiers[currentTier];

        this.localHeats[index].tiers.push(tierToAdd);
        currentHeat -= tierToAdd;
        heatObj.count -= 1;
      }
    },

    handleHellMode: function() {
      if (this.HellMode) {
        // sets the heat options that are on by default in Hell Mode
        const hellOptions = [0, 1, 3, 5, 15];
        for (const option of hellOptions) {
          this.localHeats[option].count += 1;
          currentHeat += this.localHeats[option].tiers.pop();
        }
      } else {
        if (this.localHeats.length === 16) {
          this.localHeats.pop();
        }
      }
    },

    saveCustomHeat: function() {
      this.$emit(
        "custom-heat-settings",
        this.localHeats,
        this.HellMode,
        currentHeat
      );
    },
  },

  created: function() {
    this.resetHeats();
  },
  data() {
    return {
      dialog: false,
      HellMode: false,
      localHeats: this.heats,
    };
  },
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
