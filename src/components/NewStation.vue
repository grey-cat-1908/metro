<script setup lang="ts">
import {useStore} from '../utils/store.ts';
const store = useStore()
</script>

<template>
  <v-dialog max-width="800">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          v-bind="activatorProps"
          color="purple"
          size="x-large"
          variant="flat"
          block
          text="Добавить станцию"
          @click="store.stations.push({'name': 'Тест', 'up': true, 'connectedStations': [], 'step': 300})">
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Конфигурация: Новая Станция">
        <template v-slot:text>
          <h2>Название:</h2>
          <v-text-field v-model="store.stations[store.stations.length-1].name"></v-text-field>

          <h2>Отображение:</h2>
          <v-btn v-if="store.stations[store.stations.length-1].up == true" size="x-large" variant="flat" block color="green" @click="store.stations[store.stations.length-1].up = false">Сверху</v-btn>
          <v-btn v-else size="x-large" variant="flat" block color="blue" @click="store.stations[store.stations.length-1].up = true">Снизу</v-btn>

          <h2>Шаг (<code>x: 0 — {{ store.width - 400 }}</code>):</h2>
          <div class="">
            <v-slider
                class="ma-5"
                v-model="store.stations[store.stations.length-1].step"
                :max="store.width - 400"
                :min="0"
                :step="10"
                density="compact"
            >
              <template v-slot:append>
                <v-text-field
                    v-model="store.stations[store.stations.length-1].step"
                    density="compact"
                    style="width: 100px"
                    type="number"
                    variant="outlined"
                    hide-details
                ></v-text-field>
              </template>
            </v-slider>
          </div>
          <h2>Связанные станции (переходы):</h2>
          <br>
          <v-btn
              color="purple"
              size="x-large"
              variant="flat"
              block
              text="Добавить переход"
              @click="store.stations[store.stations.length-1].connectedStations.push({'name': 'Тест', 'branch': {'color': '#fff', 'number': 2}})">
          </v-btn>
          <v-expansion-panels>
            <v-expansion-panel
                v-for="i in store.stations[store.stations.length-1].connectedStations.length"
                :key="i"
            >
              <template v-slot:title>
                <h2>{{ store.stations[store.stations.length-1].connectedStations[i - 1].name }}</h2>
              </template>
              <template v-slot:text>
                <h3>Название:</h3>
                <v-text-field v-model="store.stations[store.stations.length-1].connectedStations[i - 1].name"></v-text-field>

                <h3>Номер линии:</h3>
                <v-text-field v-model="store.stations[store.stations.length-1].connectedStations[i - 1].branch.number"></v-text-field>

                <h2>Цвет:</h2>
                <center>
                  <v-color-picker v-model="store.stations[store.stations.length-1].connectedStations[i - 1].branch.color" mode="hex"></v-color-picker>
                </center>

                <v-btn
                    color="red"
                    size="x-large"
                    variant="flat"
                    block
                    text="Удалить переход"
                    @click="store.stations[store.stations.length-1].connectedStations.splice(i - 1, 1);">
                </v-btn>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
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
</template>

<style scoped>

</style>