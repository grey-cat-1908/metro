<script setup lang="ts">
// @ts-nocheck

import {useStore} from '../utils/store.ts';
const store = useStore()
</script>

<template>
  <v-table style="max-height: 19em">
    <thead>
    <tr>
      <th class="text-left">
        {{ $t('stationsTable.name') }}
      </th>
      <th class="text-left">
        {{ $t('stationsTable.step') }} (<code>x</code>)
      </th>
      <th class="text-left">{{ $t('stationsTable.action') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="i in store.stations.length"
    >
      <td>{{ store.stations[i - 1].name }}</td>
      <td>{{ store.stations[i - 1].step }}</td>
      <td>
        <v-dialog max-width="800">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                icon="mdi-pencil"
                variant="text"
                v-bind="activatorProps">
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card :title="$t('stationsTable.editStation.title')">
              <template v-slot:text>
                <h2>{{ $t('stationsTable.editStation.name') }}:</h2>
                <v-text-field v-model="store.stations[i-1].name"></v-text-field>

                <h2>{{ $t('stationsTable.editStation.show') }}:</h2>
                <v-btn v-if="store.stations[i-1].up == true" size="x-large" variant="flat" block color="green" @click="store.stations[i-1].up = false">{{ $t('stationsTable.editStation.up') }}</v-btn>
                <v-btn v-else size="x-large" variant="flat" block color="blue" @click="store.stations[i-1].up = true">{{ $t('stationsTable.editStation.down') }}</v-btn>

                <h2>{{ $t('stationsTable.editStation.step') }} (<code>x: 0 — {{ store.width - 400 }}</code>):</h2>
                <div class="">
                  <v-slider
                      class="ma-5"
                      v-model="store.stations[i-1].step"
                      :max="store.width - 400"
                      :min="0"
                      :step="10"
                      density="compact"
                  >
                    <template v-slot:append>
                      <v-text-field
                          density="compact"
                          style="width: 100px"
                          variant="outlined"
                          hide-details
                          v-model="store.stations[i-1].step"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </div>
                <h2>{{ $t('stationsTable.editStation.connectedStations.title') }}</h2>
                <br>
                <v-btn
                    color="purple"
                    size="x-large"
                    variant="flat"
                    block
                    :text="$t('stationsTable.editStation.connectedStations.add')"
                    @click="store.stations[i-1].connectedStations.push({'name': 'Тест', 'branch': {'color': '#fff', 'number': 2}})">
                </v-btn>
                <v-expansion-panels>
                  <v-expansion-panel
                      v-for="j in store.stations[i-1].connectedStations.length"
                      :key="j"
                  >
                    <template v-slot:title>
                      <h2>{{ store.stations[i-1].connectedStations[j - 1].name }}</h2>
                    </template>
                    <template v-slot:text>
                      <h3>{{ $t('stationsTable.editStation.connectedStations.name') }}:</h3>
                      <v-text-field v-model="store.stations[i-1].connectedStations[j - 1].name"></v-text-field>

                      <h3>{{ $t('stationsTable.editStation.connectedStations.number') }}:</h3>
                      <v-text-field v-model="store.stations[i-1].connectedStations[j - 1].branch.number"></v-text-field>

                      <h3>{{ $t('stationsTable.editStation.connectedStations.color') }}:</h3>
                      <center>
                        <v-color-picker v-model="store.stations[i-1].connectedStations[j - 1].branch.color" mode="hex"></v-color-picker>
                      </center>

                      <br>

                      <v-btn
                          color="red"
                          size="x-large"
                          variant="flat"
                          block
                          :text="$t('stationsTable.editStation.connectedStations.delete')"
                          @click="store.stations[i-1].connectedStations.splice(j - 1, 1);">
                      </v-btn>
                    </template>
                  </v-expansion-panel>
                </v-expansion-panels>
                <br>
                <hr>
                <br>
                <v-btn
                    color="red"
                    size="x-large"
                    variant="flat"
                    block
                    :text="$t('stationsTable.editStation.delete')"
                    @click="isActive.value = false; store.stations.splice(i - 1, 1);">
                </v-btn>
              </template>

              <hr>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    :text="$t('stationsTable.editStation.close')"
                    variant="text"
                    @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>