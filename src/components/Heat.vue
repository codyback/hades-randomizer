<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Heats</v-expansion-panel-header>
    <v-expansion-panel-content>
      <div v-for="heat in heats" :key="heat.name">
        <v-row justify="space-around">
          <v-col cols="7" style="vertical-align:middle">
            {{ heat.name }}
          </v-col>
          <v-col cols="3">
            {{ heat.count }}
          </v-col>
        </v-row>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "HeatComponent",
  props: ["heats"],
};
</script>
