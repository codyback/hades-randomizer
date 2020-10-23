<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Mirror</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list-item v-for="(mirror, index) in mirrors" :key="index">
        <v-row justify="space-around">
          <v-col cols="8">
            {{ mirror }}
          </v-col>
          <v-col cols="1"> </v-col>
        </v-row>
      </v-list-item>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "MirrorComponent",
  props: ["mirrors"],
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
