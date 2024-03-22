<script setup lang="ts">
// @ts-nocheck

import {Map} from "./models/map.ts";
import {Branch} from "./models/map/branch.ts";
import {onMounted, ref} from 'vue'
import {Station} from "./models/map/station.ts";
import {ConnectedStation} from "./models/map/connectedStation.ts";
import {ExtraBranch} from "./models/map/extraBranch.ts";

import {set, useEventListener} from '@vueuse/core'
import {Settings} from "./models/settings.ts";
import {defineStore} from "pinia";

const element = ref<HTMLDivElement>()

const xcord = ref(0);
const ycord = ref(0);

const mapWidth = ref(window.innerWidth);
const mapHeight = ref(window.innerHeight / 2);

useEventListener(element, 'click', (evt) => {
  xcord.value = evt.offsetX;
  ycord.value = evt.offsetY;
})


let branch: Branch = new Branch('','', -1, [])
let settings: Settings = new Settings(mapWidth.value, mapHeight.value);

let map: Map;

const useStore = defineStore('branch', {
  state: () => {
    return {
      name: 'Тест',
      number: 1,
      color: '#0078BE',
      stations: []
    }
  },
})

// @ts-ignore
const store = useStore()

onMounted(() => {
  map = new Map(branch, settings);

  build();
})

function build () {
  let stations = [];

  for (let station of store.stations) {
    let connectedStations = [];

    for (let connected in station['connectedStations']) {
      let extraBranch: ExtraBranch = new ExtraBranch(connected['branch']['color'], connected['branch']['number']);
      let extraStation: ConnectedStation = new ConnectedStation(connected['name'], extraBranch);

      connectedStations.push(extraStation);
    }

    let modelStation = new Station(station['name'], station['up'], connectedStations, station['step'])

    stations.push(modelStation);
  }

  let branch: Branch = new Branch(store.name,store.color, store.number, stations)
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
                  <h3>Линия:</h3>
                  <v-dialog max-width="800">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                          v-bind="activatorProps"
                          color="blue"
                          size="x-large"
                          variant="flat"
                          block
                          text="Конфигурация"
                      ></v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card title="Конфигурация">
                        <template v-slot:text>
                          <h2>Название:</h2>
                          <v-text-field v-model="store.name"></v-text-field>

                          <h2>Номер:</h2>
                          <v-text-field v-model="store.number"></v-text-field>

                          <h2>Цвет:</h2>
                          <center>
                            <v-color-picker v-model="store.color" mode="hex"></v-color-picker>
                          </center>
                        </template>

                        <hr>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                              text="Закрыть"
                              variant="text"
                              @click="isActive.value = false"
                          ></v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
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
