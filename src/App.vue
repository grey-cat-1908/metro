<script setup lang="ts">
// @ts-nocheck

import {Map} from "./models/map.ts";
import {Branch} from "./models/map/branch.ts";
import {onMounted, ref} from 'vue'
import {Station} from "./models/map/station.ts";
import {ConnectedStation} from "./models/map/connectedStation.ts";
import {ExtraBranch} from "./models/map/extraBranch.ts";

import {useEventListener} from '@vueuse/core'
import {Settings} from "./models/settings.ts";

const element = ref<HTMLDivElement>()

const xcord = ref(0);
const ycord = ref(0);

useEventListener(element, 'click', (evt) => {
  xcord.value = evt.offsetX;
  ycord.value = evt.offsetY;
})

import StationsTable from "./components/StationsTable.vue";
import NewStation from "./components/NewStation.vue";
import BaseSettings from "./components/BaseSettings.vue";

import {useStore} from './utils/store.ts';
const store = useStore()

let branch: Branch = new Branch('','', -1, [])
let settings: Settings = new Settings(store.width, store.height);

let map: Map;

onMounted(() => {
  store.stations = [
      {'name': 'Начало', 'up': true, 'connectedStations': [], 'step': 0},
      {'name': 'Конец', 'up': true, 'connectedStations': [], 'step': store.width - 400}
  ]

  map = new Map(branch, settings);

  build();
})

function exportFile() {
  build();

  const svg = document.querySelector('svg')

  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);
  let url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

  let element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', 'metroMap.svg');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

function importFile() {
  let element = document.getElementById('fileInput');
  element.click();
}

function setFile(event) {
  const reader = new FileReader();
  reader.addEventListener('load', (readEvent) => {
    if (typeof readEvent.target.result === "string") {
      let importedStore = JSON.parse(readEvent.target.result);

      store.name = importedStore.name;
      store.width = importedStore.width;
      store.height = importedStore.height;
      store.color = importedStore.color;
      store.number = importedStore.number;
      store.stations = importedStore.stations;

      build();
    }
  });
  reader.readAsText(event.target.files[0]);
}

function save () {
  let text = JSON.stringify(store);
  let filename = 'metroMap.json';
  let element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

function build () {
  let stations = [];

  store.stations = store.stations.sort((a,b) => a.step - b.step);

  for (let station of store.stations) {
    let connectedStations = [];

    for (let connected of station['connectedStations']) {
      let extraBranch: ExtraBranch = new ExtraBranch(connected['branch']['color'], connected['branch']['number']);
      let extraStation: ConnectedStation = new ConnectedStation(connected['name'], extraBranch);

      connectedStations.push(extraStation);
    }

    let modelStation = new Station(station['name'], station['up'], connectedStations, station['step'])

    stations.push(modelStation);
  }

  let branch: Branch = new Branch(store.name,store.color, store.number, stations)
  let settings: Settings = new Settings(store.width, store.height);

  map.setSettings(settings)
  map.setBranch(branch)

  map.build()
}
</script>

<template>
  <div>
    <div class="map" id="map" ref="element"></div>
    <div class="settings" id="settings">
      <v-container>
        <v-row>
          <v-col>
            <h2>Основные настройки</h2>
            <br>
            <BaseSettings/>
          </v-col>
          <v-col>
            <h2>Станции</h2>
            <br>
            <NewStation />
            <hr>
            <StationsTable />
          </v-col>
          <v-col>
            <h2>Управление</h2>
            <br>
            <div class="">
              <v-btn size="x-large" variant="flat" block color="blue" @click="importFile">Импорт</v-btn>
              <v-btn size="x-large" variant="flat" block color="orange" @click="exportFile">Экспорт</v-btn>
              <v-btn size="x-large" variant="flat" block color="green" @click="save">Сохранить</v-btn>
              <v-btn size="x-large" variant="flat" block color="red" @click="build">Предпросмотр</v-btn>

              <input type="file" id="fileInput" style="display: none" @change="setFile" accept=".json" />
              <hr>
              <br>
              <h2>Курсор: ({{ xcord }}; {{ ycord }}) |  <a class="text-right" style="text-decoration: none" href="https://arbuz.icu/blog/metro-line/">Подробнее</a></h2>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
</style>
