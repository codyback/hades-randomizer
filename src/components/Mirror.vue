<template>
  <v-expansion-panel>
    <v-expansion-panel-header>Mirror</v-expansion-panel-header>
    <v-expansion-panel-content>
      <div
        v-for="(mirror, index) in mirrors"
        :key="index"
        :class="mirror.inverse ? 'lime--text' : 'red--text'"
      >
        <v-row justify="space-around">
          <v-col cols="8">
            {{ mirror.name }}
          </v-col>
          <v-col cols="1"> </v-col>
        </v-row>
      </div>
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
.red {
  color: #e26956;
}
.yellow {
  color: #e1fc5f;
}
</style>
