<template>
  <v-container>
    <v-switch
      v-model="WeightedRandomization"
      :label="`Weighted Randomization`"
      color="orange darken-3"
      v-on:change="$emit('randomize', WeightedRandomization, HeatLevel)"
    ></v-switch>
    <v-spacer></v-spacer>
    <v-slider
      v-model="HeatLevel"
      :label="`Heat Level`"
      :thumb-size="24"
      v-on:change="$emit('randomize', WeightedRandomization, HeatLevel)"
      thumb-label="always"
      color="orange darken-3"
      :min="minHeat"
      :max="hellMode ? 64 : 63"
      dense
    ></v-slider>
    <v-row align="center" justify="space-around">
      <v-btn
        color="orange darken-3"
        text
        @click="$emit('randomize', WeightedRandomization, HeatLevel)"
        >Randomize</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RandomizeForm",
  props: ["minHeat", "hellMode", "heatLevel"],
  data() {
    return {
      WeightedRandomization: true,
      HeatLevel: this.heatLevel,
    };
  },
};
</script>

<style scoped></style>
