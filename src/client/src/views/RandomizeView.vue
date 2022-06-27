<template>
  <div class="row q-pa-sm">
    <div class="col-12 col-md">
      <randomize-settings />
      <randomize-filter />
    </div>
    <div class="col-12 col-md-5">
      <randomized-items />
    </div>
    <div class="col-12 col-md">
    </div>
  </div>
</template>

<script lang="ts" setup>
import RandomizeSettings from '../components/RandomizeSettings.vue';
import RandomizeFilter from '../components/RandomizeFilter.vue';
import RandomizedItems from '../components/RandomizedItems.vue';
</script>
