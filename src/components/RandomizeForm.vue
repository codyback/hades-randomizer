<template>
  <v-container>
    <v-switch
      v-model="HellMode"
      :label="`Hell Mode`"
      color="red darken-3"
      v-on:change="
        $emit('randomize', HellMode, WeightedRandomization, HeatLevel)
      "
    ></v-switch>
    <v-switch
      v-model="WeightedRandomization"
      :label="`Weighted Randomization`"
      color="orange darken-3"
      v-on:change="
        $emit('randomize', HellMode, WeightedRandomization, HeatLevel)
      "
    ></v-switch>
    <v-slider
      v-model="HeatLevel"
      :label="`Heat Level`"
      :thumb-size="24"
      v-on:change="
        $emit('randomize', HellMode, WeightedRandomization, HeatLevel)
      "
      thumb-label="always"
      color="orange darken-3"
      :min="min"
      :max="max"
      dense
    ></v-slider>
    <!-- <v-row align="center" justify="space-around">
      <v-btn
        color="orange darken-3"
        text
        @click="$emit('randomize', HellMode, WeightedRandomization, HeatLevel)"
        >Randomize</v-btn
      >
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  name: "RandomizeForm",
  data() {
    return {
      HellMode: false,
      WeightedRandomization: true,
      HeatLevel: 20,
      min: 5,
      max: 63,
    };
  },
};
</script>

<style scoped></style>
