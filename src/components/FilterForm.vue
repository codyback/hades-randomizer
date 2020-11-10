<template>
  <v-dialog v-model="dialog" scrollable max-width="450">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="orange darken-3" text v-bind="attrs" v-on="on">
        Filters
      </v-btn>
    </template>
    <v-card>
      <h3>Filters</h3>
      <v-expansion-panels flat accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Keepsakes
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="(keepsake, index) in keepsakes" :key="index">
              <FilterItem :item="keepsake" :type="keepsake" :index="index" />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Companions
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-for="(companion, index) in companions" :key="index">
              <FilterItem :item="companion" :type="companion" :index="index" />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Weapons
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-expansion-panels flat accordion>
              <v-expansion-panel
                v-for="(weapon, index) in weapons"
                :key="index"
              >
                <v-expansion-panel-header>
                  {{ weapon.name }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div
                    v-for="(aspect, aspectIndex) in weapon.aspects"
                    :key="aspectIndex"
                  >
                    <FilterItem
                      :item="aspect"
                      :type="aspect"
                      :index="aspectIndex"
                    />
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-btn color="orange darken-1" text @click="dialog = false">
        Close
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import FilterItem from "./FilterItem";

export default {
  name: "FilterForm",
  props: ["companions", "keepsakes", "weapons"],
  components: {
    FilterItem,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>
.item:hover {
  cursor: pointer;
  color: #888888;
}
.active {
  text-decoration: line-through;
  color: #b71c1c;
}
.active:hover {
  color: #888888 !important;
}
</style>
