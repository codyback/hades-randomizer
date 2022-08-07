<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';

const $q = useQuasar();

$q.dark.set(true);

</script>
