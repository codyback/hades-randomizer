<template>
  <q-card class="settings q-ma-sm">
    <q-card-section>
      <div class="column">
        <q-toggle
          v-model="store.weightedRandomization"
          label="Weighted Randomization"
          color="primary"
        />
        <q-toggle
          v-model="store.hellMode"
          label="Hell Mode"
          color="secondary"
        />
      </div>
      <q-slider
        v-model="store.heatLevel"
        :min="minHeatLevel"
        :max="store.getHeatLevelMax"
        label
        label-always
        :label-value="`Heat Level: ${store.heatLevel}`"
        switch-label-side
        color="secondary"
      />
    </q-card-section>
    <q-card-section>
      <q-btn
        color="primary"
        label="Randomize"
        class="full-width"
        unelevated
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import useStore from '../store';

const store = useStore();

const minHeatLevel = ref(1);

watch(() => store.hellMode, (hellMode) => {
  if (hellMode) {
    minHeatLevel.value = 5;
    store.hellModeHeats.forEach((heat) => {
      if (store.heatsFilter.includes(heat)) {
        store.heatsFilter.splice(store.heatsFilter.indexOf(heat), 1);
      }
    });
  } else {
    minHeatLevel.value = 1;
    if (!store.heatsFilter.includes('Personal Liability')) {
      store.heatsFilter.push('Personal Liability');
    }
  }
});

watch(() => store.getHeatLevelMax, (newValue) => {
  store.heatLevel = Math.min(store.heatLevel, newValue);
});
</script>

<style scoped lang="scss">
.settings {
  min-width: 30%;
}
</style>
