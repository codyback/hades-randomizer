<template>
  <v-row
    justify="space-around"
    v-on:click="(isActive = !isActive), $emit('filter', type, index, isActive)"
    :class="{ active: isActive }"
    class="item"
  >
    <v-col cols="7">
      {{ item.name }}
    </v-col>
    <v-col cols="3"> </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FilterItem",
  props: ["item", "type", "index"],
  data() {
    return {
      isActive: false,
    };
  },
};
</script>
