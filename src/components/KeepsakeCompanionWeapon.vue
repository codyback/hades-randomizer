<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      Keepsake / Companion / Weapon
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-list-item>
        <v-row justify="space-around">
          <v-col cols="2">
            Keepsake
          </v-col>
          <v-col cols="7" class="center">
            {{ keepsake.name }}
          </v-col>
        </v-row>
      </v-list-item>
      <v-list-item>
        <v-row justify="space-around">
          <v-col cols="2">
            Companion
          </v-col>
          <v-col cols="7" class="center">
            {{ companion }}
          </v-col>
        </v-row>
      </v-list-item>
      <v-list-item>
        <v-row justify="space-around">
          <v-col cols="2">
            Weapon
          </v-col>
          <v-col cols="7" class="center">
            {{ weapon.name }} - {{ weapon.aspects }}
          </v-col>
        </v-row>
      </v-list-item>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "CompanionComponent",
  props: ["companion", "keepsake", "weapon"],
};
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
