<template>
  <div class="row q-pa-sm">
    <div class="col-12 col-md">
      <randomize-settings />
      <randomize-filter />
    </div>
    <div class="col-12 col-md-5">
      <randomize-settings />
      <randomize-filter />
    </div>
    <div class="col-12 col-md">
      <randomize-settings />
      <randomize-filter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RandomizeSettings from '../components/RandomizeSettings.vue';
import RandomizeFilter from '../components/RandomizeFilter.vue';

import useStore from '../store';

const store = useStore();
</script>
