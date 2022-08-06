<template>
  <q-card class="filter q-ma-sm">
    <q-card-section>
      <h4>Filters</h4>
      <q-list dense>
        <q-expansion-item group="filter-group" label="Heats">
          <q-card>
            <q-card-section>
              <q-list>
                <q-item
                  v-for="heat in store.heats"
                  :key="heat.name"
                  clickable
                  dense
                  @click="handleHeatFilter(heat)"
                  :active="store.heatsFilter.includes(heat.name)"
                  :disable="disableHeatFilter(heat)"
                >
                  {{ heat.name }}
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="filter-group"
          label="Mirrors"
        >
          <q-card>
            <q-card-section>
              <q-list>
                <q-item
                  v-for="(mirror, index) in store.mirrors"
                  :key="index"
                  clickable
                  dense
                  @click="handleMirrorFilter(index)"
                  :active="store.mirrorsFilter.includes(index)"
                  :disable="disableMirrorFilter(index)"
                  active-class="text-primary"
                >
                  <div class="col">
                    {{ mirror[0] }}
                  </div>
                  <div class="col">
                    {{ mirror[1] }}
                  </div>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="filter-group"
          label="Keepsakes"
        >
          <q-card>
            <q-card-section>
              <q-list>
                <q-item
                  v-for="keepsake in store.keepsakes"
                  :key="keepsake.name"
                  clickable
                  dense
                  @click="handleKeepsakeFilter(keepsake)"
                  :active="store.keepsakesFilter.includes(keepsake.name)"
                  :disable="disableKeepsakeFilter(keepsake)"
                >
                  {{ keepsake.name }}
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="filter-group"
          label="Companions"
        >
          <q-card>
            <q-card-section>
              <q-list>
                <q-item
                  v-for="companion in store.companions"
                  :key="companion"
                  clickable
                  dense
                  @click="handleCompanionFilter(companion)"
                  :active="store.companionsFilter.includes(companion)"
                  :disable="disableCompanionFilter(companion)"
                >
                  {{ companion }}
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item group="filter-group" label="Weapons">
          <q-card>
            <q-card-section>
              <q-list
                v-for="weapon in store.weapons"
                :key="weapon.name"
                dense
                :active="allWeaponAspectsFiltered(weapon)"
              >
                <q-item
                  clickable
                  dense
                  :active="allWeaponAspectsFiltered(weapon)"
                  :disable="disableWeaponFilter(weapon)"
                  @click="handleWeaponFilter(weapon)"
                >
                  {{ weapon.name }}
                </q-item>
                <q-item
                  v-for="aspect in weapon.aspects"
                  :key="aspect"
                  :inset-level="1"
                  clickable
                  dense
                  :active="
                    store.weaponsFilter.includes(`${weapon.name}|${aspect}`)
                  "
                  :disable="disableAspectFilter(weapon, aspect)"
                  @click="handleWeaponAspectFilter(weapon, aspect)"
                >
                  {{ aspect }}
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import useStore from '../store';
import { Heat, Keepsake, Weapon } from '../types';

const store = useStore();

function handleHeatFilter(heat: Heat) {
  if (store.heatsFilter.includes(heat.name)) {
    store.heatsFilter.splice(store.heatsFilter.indexOf(heat.name), 1);
  } else {
    store.heatsFilter.push(heat.name);
  }
}

function handleMirrorFilter(index: number) {
  if (store.mirrorsFilter.includes(index)) {
    store.mirrorsFilter.splice(store.mirrorsFilter.indexOf(index), 1);
  } else {
    store.mirrorsFilter.push(index);
  }
}

function handleKeepsakeFilter(keepsake: Keepsake) {
  if (store.keepsakesFilter.includes(keepsake.name)) {
    store.keepsakesFilter.splice(
      store.keepsakesFilter.indexOf(keepsake.name),
      1,
    );
  } else {
    store.keepsakesFilter.push(keepsake.name);
  }
}

function handleCompanionFilter(companion: string) {
  if (store.companionsFilter.includes(companion)) {
    store.companionsFilter.splice(store.companionsFilter.indexOf(companion), 1);
  } else {
    store.companionsFilter.push(companion);
  }
}

function allWeaponAspectsFiltered(weapon: Weapon) {
  return weapon.aspects.every((aspect) => store.weaponsFilter.includes(`${weapon.name}|${aspect}`));
}

function clearWeaponsFilter(weapon: Weapon) {
  store.weaponsFilter = store.weaponsFilter.filter(
    (aspect) => !aspect.startsWith(weapon.name),
  );
}

function handleWeaponFilter(weapon: Weapon) {
  if (allWeaponAspectsFiltered(weapon)) {
    clearWeaponsFilter(weapon);
  } else {
    clearWeaponsFilter(weapon);
    weapon.aspects.forEach((aspect: string) => {
      store.weaponsFilter.push(`${weapon.name}|${aspect}`);
    });
  }
}

function handleWeaponAspectFilter(weapon: Weapon, aspect: string) {
  const key = `${weapon.name}|${aspect}`;
  if (store.weaponsFilter.includes(key)) {
    store.weaponsFilter.splice(store.weaponsFilter.indexOf(key), 1);
  } else {
    store.weaponsFilter.push(key);
  }
}

function disableHeatFilter(heat: Heat) {
  const maxLength = store.heats.length - 1;
  return (
    (store.heatsFilter.length === maxLength
      && !store.heatsFilter.includes(heat.name))
    || heat.name === 'Personal Liability'
    || (store.hellMode && store.hellModeHeats.includes(heat.name))
  );
}

function disableMirrorFilter(index: number) {
  const maxLength = store.mirrors.length - 1;
  return (
    store.mirrorsFilter.length === maxLength && !store.mirrorsFilter.includes(index)
  );
}

function disableKeepsakeFilter(keepsake: Keepsake) {
  const maxLength = store.keepsakes.length - 1;
  return (
    store.keepsakesFilter.length === maxLength
    && !store.keepsakesFilter.includes(keepsake.name)
  );
}

function disableCompanionFilter(companion: string) {
  const maxLength = store.companions.length - 1;
  return (
    store.companionsFilter.length === maxLength
    && !store.companionsFilter.includes(companion)
  );
}

function disableWeaponFilter(weapon: Weapon) {
  let allAspectsFiltered = true;
  weapon.aspects.forEach((aspect) => {
    if (!store.weaponsFilter.includes(`${weapon.name}|${aspect}`)) {
      allAspectsFiltered = false;
    }
  });

  return store.weaponsFilter.length >= 20 && !allAspectsFiltered;
}

function disableAspectFilter(weapon: Weapon, aspect: string) {
  return (
    store.weaponsFilter.length === 23
    && !store.weaponsFilter.includes(`${weapon.name}|${aspect}`)
  );
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5em;
}
.filter {
  min-width: 30%;
}

.q-item--active {
  text-decoration-line: line-through;
}
</style>
