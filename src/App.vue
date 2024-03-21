<script setup lang="ts">
import {Map} from "./models/map.ts";
import {Branch} from "./models/map/branch.ts";
import {onMounted, ref} from 'vue'
import {Station} from "./models/map/station.ts";
import {ConnectedStation} from "./models/map/connectedStation.ts";
import {ExtraBranch} from "./models/map/extraBranch.ts";

// @ts-ignore
import {set, useEventListener} from '@vueuse/core'
import {Settings} from "./models/settings.ts";

const element = ref<HTMLDivElement>()

const xcord = ref(0);
const ycord = ref(0);

const mapWidth = ref(window.innerWidth);
const mapHeight = ref(window.innerHeight / 2);

// @ts-ignore
useEventListener(element, 'click', (evt) => {
  xcord.value = evt.offsetX;
  ycord.value = evt.offsetY;
})


let branch: Branch = new Branch('','', -1, [])
let settings: Settings = new Settings(mapWidth.value, mapHeight.value);

let map: Map;

onMounted(() => {
  map = new Map(branch, settings);

  build();
})

function build () {
  let extraBranch1: ExtraBranch = new ExtraBranch( "#EF161E", 1)
  let extraStation1: ConnectedStation = new ConnectedStation("Библиотека\nимени Ленина", extraBranch1)

  let extraBranch4: ExtraBranch = new ExtraBranch( "#00BFFF", 4)
  let extraStation4: ConnectedStation = new ConnectedStation("Александровский\nсад", extraBranch4)

  let extraBranch9: ExtraBranch = new ExtraBranch( "#999999", 9)
  let extraStation9: ConnectedStation = new ConnectedStation("Боровицкая", extraBranch9)

  let station1: Station = new Station("Смоленская", false, [], 0)
  let station2: Station = new Station("Арбатская", true, [extraStation1, extraStation9, extraStation4], 200)

  let branch: Branch = new Branch('Арбатско-Покровская линия','#0078BE', 3, [station1, station2])
  let settings: Settings = new Settings(mapWidth.value, mapHeight.value);

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
            <div class="">
              <ul>
                <li>
                  <h3>Ширина схемы:</h3>
                  <v-text-field v-model="mapWidth"></v-text-field>
                </li>
                <li>
                  <h3>Высота схемы:</h3>
                  <v-text-field v-model="mapHeight"></v-text-field>
                </li>
                <li>
                  <h3>Ветка:</h3>
                  <v-btn size="x-large" variant="flat" block color="blue">Конфигурация</v-btn>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col>
            <h2>Основные настройки</h2>
            <br>
            <div class="">
              <ul>
                <li>
                  <h3>Ширина схемы:</h3>
                  <v-text-field></v-text-field>
                </li>
                <li>
                  <h3>Высота схемы:</h3>
                  <v-text-field></v-text-field>
                </li>
                <li>
                  <h3>Ветка:</h3>
                  <v-btn size="x-large" variant="flat" block color="blue">Конфигурация</v-btn>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col>
            <h2>Управление</h2>
            <br>
            <div class="">
              <v-btn size="x-large" variant="flat" block color="blue">Импорт</v-btn>
              <v-btn size="x-large" variant="flat" block color="orange">Экспорт</v-btn>
              <v-btn size="x-large" variant="flat" block color="green">Сохранить</v-btn>
              <v-btn size="x-large" variant="flat" block color="red" @click="build">Предпросмотр</v-btn>
              <hr>
              <br>
              <h2>Курсор: ({{ xcord }}; {{ ycord }})</h2>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
</style>
