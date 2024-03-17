<script setup lang="ts">
import {Map} from "./models/map.ts";
import {Branch} from "./models/branch.ts";
import { onMounted } from 'vue'
import {Station} from "./models/station.ts";
import {ConnectedStation} from "./models/connectedStation.ts";
import {ExtraBranch} from "./models/extraBranch.ts";

onMounted(() => {
  let extraBranch1: ExtraBranch = new ExtraBranch( "#EF161E", 1)
  let extraStation1: ConnectedStation = new ConnectedStation("Библиотека\nимени Ленина", extraBranch1)

  let extraBranch4: ExtraBranch = new ExtraBranch( "#00BFFF", 4)
  let extraStation4: ConnectedStation = new ConnectedStation("Александровский\nсад", extraBranch4)

  let extraBranch9: ExtraBranch = new ExtraBranch( "#999999", 9)
  let extraStation9: ConnectedStation = new ConnectedStation("Боровицкая", extraBranch9)

  let station1: Station = new Station("Смоленская", false, [], 0)
  let station2: Station = new Station("Арбатская", true, [extraStation1, extraStation9, extraStation4], 500)

  let branch: Branch = new Branch('Арбатско-Покровская линия','#0078BE', 3, [station1, station2])
  let map: Map = new Map(branch)

  map.build()
})
</script>

<template>
  <div>
    <div class="map" id="map"></div>
    <div class="settings" id="settings">
    </div>
  </div>
</template>

<style scoped>
</style>
