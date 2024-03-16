<script setup lang="ts">
import {Map} from "./models/map.ts";
import {Branch} from "./models/branch.ts";
import { onMounted } from 'vue'
import {Station} from "./models/station.ts";
import {ConnectedStation} from "./models/connectedStation.ts";
import {ExtraBranch} from "./models/extraBranch.ts";

onMounted(() => {
  let extraBranch1: ExtraBranch = new ExtraBranch("Таганско-Краснопресненская", "#800080", 2)
  let extraStation1: ConnectedStation = new ConnectedStation("Кузнецкий\nмост", extraBranch1)

  let station1: Station = new Station("Охотный ряд", false, [], 0)
  let station2: Station = new Station("Лубянка", true, [extraStation1], 500)

  let branch: Branch = new Branch('Best','#FF0000', 1, [station1, station2])
  let map: Map = new Map(branch)

  map.build()
})
</script>

<template>
  <div>
    <div class="map" id="map"></div>
    <div class="settings" id="settings"></div>
  </div>
</template>

<style scoped>
</style>
