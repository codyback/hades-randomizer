<template>
  <v-row>
    <v-col cols="6">
      {{ heat.name }}
    </v-col>
    <v-col cols="6" style="text-align: right;">
      <v-btn
        small
        text
        :disabled="checkSub"
        @click="$emit('subheat', heat, index)"
        >-</v-btn
      >
      {{ heat.count }}
      <v-btn
        small
        text
        :disabled="heat.tiers.length === 0"
        @click="$emit('addheat', heat, index)"
        >+</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HeatItem",
  props: ["heat", "index", "hellMode"],
  computed: {
    checkSub: function() {
      if (this.heat.count === 0) return true;
      if (this.hellMode) {
        const hellOptions = [0, 1, 3, 5, 15];
        for (const option of hellOptions) {
          if (this.index === option && this.heat.count <= 1) return true;
        }
      }
      return false;
    },
  },
};
</script>
