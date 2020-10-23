<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Heats</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list-item v-for="heat in heats" :key="heat.name">
        <v-row justify="space-around">
          <v-col cols="8">
            {{ heat.name }}
          </v-col>
          <v-col cols="1"> {{ heat.count }}</v-col>
        </v-row>
      </v-list-item>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "HeatComponent",
  props: ["heats"],
};
</script>
