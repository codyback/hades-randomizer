<template>
  <q-card class="q-ma-sm">
    <q-card-section>
      <h4 data-cy="randomizeTitle">Randomized</h4>
      <q-list dense>
        <q-expansion-item
          group="randomized-group"
          label="Heats"
          default-opened
          data-cy="heatsRandomizedExpansion"
        >
          <q-card>
            <q-card-section>
              <div class="row">
                <div class="col-md-2 col-0"></div>
                <div class="col-md-6 col-10">
                  <q-list data-cy="heatsRandomizedList">
                    <q-item
                      v-for="heat in store.heats"
                      :key="heat.name"
                      dense
                    >
                      {{ heat.name }}
                    </q-item>
                  </q-list>
                </div>
                <div class="col-md-4 col-2">
                  <q-list>
                    <q-item
                      v-for="(heat, index) in store.heats"
                      :key="heat.name"
                      dense
                    >
                      {{ randomHeats[index]?.tiers?.length }}
                    </q-item>
                  </q-list>
                </div>
                <div class="col-md-2 col-0"></div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="randomized-group"
          label="Mirrors"
          data-cy="mirrorsRandomizedExpansion"
        >
          <q-card>
            <q-card-section>
              <q-list data-cy="mirrorsRandomizedList">
                <q-item
                  v-for="(mirror, index) in randomMirrors"
                  :key="index"
                  dense
                >
                  <div
                    :class="`text-${getMirrorColor(
                      index,
                      mirror,
                    )} text-center full-width`"
                  >
                    {{ mirror }}
                  </div>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="randomized-group"
          label="Companion - Keepsake - Weapon"
          data-cy="miscRandomizedExpansion"
        >
          <q-card>
            <q-card-section>
              <q-list>
                <q-item
                  data-cy="companionRandomizedItem"
                  dense
                >
                <div
                  class="text-center col-6"
                >
                  Companion
                </div>
                <div
                  class="text-center col-6"
                >
                  {{ randomCompanion }}
                </div>
                </q-item>
                <q-item
                  data-cy="keepsakeRandomizedItem"
                  dense
                >
                <div
                  class="text-center col-6"
                >
                  Keepsake
                </div>
                <div
                  class="text-center col-6"
                >
                  {{ randomKeepsake }}
                </div>
                </q-item>
                <q-item
                  data-cy="weaponRandomizedItem"
                  dense
                >
                <div
                  class="text-center col-6"
                >
                  Weapon
                </div>
                <div
                  class="text-center col-6"
                >
                  {{ randomWeapon.name }} - {{ randomWeapon.aspect}}
                </div>
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
import {
  onMounted, ref, Ref, watch,
} from 'vue';
import useStore from '../store';
import { Heat, Weapon, Companion } from '../types';

const store = useStore();

interface hasWeighting {
  weighting: number;
}

const randomHeats: Ref<Partial<Heat>[]> = ref([]);
const randomMirrors: Ref<string[]> = ref([]);
const randomCompanion: Ref<Companion> = ref('');
const randomKeepsake: Ref<string> = ref('');
const randomWeapon: Ref<{name: string, aspect: string}> = ref({ name: '', aspect: '' });

function shuffleArray<T>(arr: T[]): T[] {
  const newArr = [...arr];

  let counter = newArr.length;
  while (counter > 0) {
    const i = Math.floor(Math.random() * counter);
    counter -= 1;
    const temp = newArr[counter];
    newArr[counter] = newArr[i];
    newArr[i] = temp;
  }

  return newArr;
}

function completelyRandom<T>(arr: T[]): T {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
}

function getWeightedRandom<T extends hasWeighting>(arr: T[]): T {
  let totalWeight = 0;
  let cumulativeWeight = 0;
  let i;
  for (i = 0; i < arr.length; i += 1) {
    totalWeight += arr[i].weighting;
  }
  const randomNum = Math.floor(Math.random() * totalWeight);
  const shuffledArr = shuffleArray([...arr]);
  for (i = 0; i < arr.length; i += 1) {
    cumulativeWeight += shuffledArr[i].weighting;
    /* c8 ignore next 3 */
    if (randomNum < cumulativeWeight) {
      return shuffledArr[i];
    }
  }

  return arr[0];
}

function getNewHeats() {
  return [...store.getHeats].map((heat) => ({
    ...heat,
    tiers: [...heat.tiers],
  }));
}

function clearRandomHeats() {
  const randomizedHeats = [] as Partial<Heat>[];

  store.heats.forEach((heat) => {
    randomizedHeats.push({
      name: heat.name,
      tiers: [],
    });
  });

  return randomizedHeats;
}

function randomizeHeats() {
  let heats = getNewHeats();
  let randomizedHeats = clearRandomHeats();
  let currentHeatLevel = 0;

  // handles hellMode
  if (store.hellMode) {
    store.hellModeHeats.forEach((heatName) => {
      const heatIndex = heats.findIndex((h) => h.name === heatName);
      const actualHeatIndex = randomizedHeats.findIndex(
        (h) => h.name === heatName,
      );
      const heatLevel = heats[heatIndex].tiers.pop();
      if (heatLevel) {
        randomizedHeats[actualHeatIndex].tiers?.push(heatLevel);
        currentHeatLevel += heatLevel;
      }
    });
  }

  let loopCount = 0;
  while (currentHeatLevel < store.heatLevel) {
    const randomHeat = store.weightedRandomization
      ? getWeightedRandom(heats)
      : completelyRandom(heats);
    const heatIndex = heats.findIndex((h) => h.name === randomHeat?.name);

    const maximumHeatLevelItem = store.heatLevel - currentHeatLevel;
    const isValidHeat = randomHeat?.tiers.length
      && randomHeat?.tiers[randomHeat.tiers.length - 1] <= maximumHeatLevelItem;

    if (randomHeat?.tiers?.length === 0) {
      heats.splice(heatIndex, 1);
    }

    if (isValidHeat) {
      const heatName = randomHeat?.name;
      const actualHeatIndex = randomizedHeats.findIndex(
        (h) => h.name === heatName,
      );
      const heatLevel = heats[heatIndex].tiers.pop();
      if (heatLevel) {
        randomizedHeats[actualHeatIndex].tiers?.push(heatLevel);
        currentHeatLevel += heatLevel;
      }
    } else {
      loopCount += 1;
    }

    // if no possible heats, reset the loop
    /* c8 ignore next 6 */
    if (loopCount > 500) {
      randomizedHeats = clearRandomHeats();
      heats = getNewHeats();
      currentHeatLevel = 0;
      loopCount = 0;
    }
  }

  return randomizedHeats;
}

function getMirrorColor(index: number, mirror: string) {
  const mirrorIndex = store.getMirrors[index].findIndex((m) => m === mirror);
  return mirrorIndex === 0 ? 'red' : 'lime';
}

function randomizeMirror(): string[] {
  const mirrors = store.getMirrors;
  const randomizedMirrors = [] as string[];

  mirrors.forEach((mirror) => randomizedMirrors.push(completelyRandom(mirror)));

  return randomizedMirrors;
}

function randomizeCompanion(): string {
  const companions = store.getCompanions;
  return completelyRandom(companions);
}

function randomizeKeepsake(): string {
  const keepsakes = store.getKeepsakes;

  const keepsake = store.weightedRandomization
    ? getWeightedRandom(keepsakes)
    : completelyRandom(keepsakes);

  return keepsake.name;
}

function randomizeWeapon(): Weapon {
  const weapons = store.getWeapons;
  return completelyRandom(weapons);
}

function randomizeWeaponAspect(weapon: Weapon): string {
  return completelyRandom(weapon.aspects);
}

function setRandomizedItems() {
  randomHeats.value = randomizeHeats();
  randomMirrors.value = randomizeMirror();
  randomCompanion.value = randomizeCompanion();
  randomKeepsake.value = randomizeKeepsake();
  const weapon = randomizeWeapon();
  randomWeapon.value = {
    name: weapon.name,
    aspect: randomizeWeaponAspect(weapon),
  };
}

onMounted(() => setRandomizedItems());
watch(() => store.heatLevel, () => { randomHeats.value = randomizeHeats(); });
watch(() => store.heatsFilter.length, () => { randomHeats.value = randomizeHeats(); });
watch(() => store.mirrorsFilter.length, () => { randomMirrors.value = randomizeMirror(); });
watch(() => store.keepsakesFilter.length, () => { randomKeepsake.value = randomizeKeepsake(); });
watch(() => store.companionsFilter.length, () => { randomCompanion.value = randomizeCompanion(); });
watch(() => store.weaponsFilter.length, () => {
  const weapon = randomizeWeapon();
  randomWeapon.value = {
    name: weapon.name,
    aspect: randomizeWeaponAspect(weapon),
  };
});

defineExpose({ setRandomizedItems });
</script>

<style lang="scss" scoped>
h4 {
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5em;
}
</style>
