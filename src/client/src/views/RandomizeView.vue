<template>
  <div class="row q-pa-sm">
    <div class="col-12 col-md">
      <randomize-settings
        @randomize="randomize"
      />
    </div>
    <div class="col-12 col-md-5">
      <randomized-items
        ref="itemRef"
      />
    </div>
    <div class="col-12 col-md">
      <randomize-filter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import RandomizeSettings from '../components/RandomizeSettings.vue';
import RandomizeFilter from '../components/RandomizeFilter.vue';
import RandomizedItems from '../components/RandomizedItems.vue';

const itemRef = ref();

const randomize = () => {
  itemRef.value.setRandomizedItems();
};
</script>
