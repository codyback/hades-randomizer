<template>
  <div>
    <h1>{{ heading }}</h1>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  heading: {
    type: String,
    default: 'Hades - Randomizer',
  },
});
</script>
