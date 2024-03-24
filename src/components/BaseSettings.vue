<script setup lang="ts">
// @ts-nocheck

import {useStore} from '../utils/store.ts';
const store = useStore()
</script>

<template>
  <div class="">
    <ul>
      <li>
        <h3>{{ $t('baseSettings.width')}}:</h3>
        <v-text-field v-model="store.width"></v-text-field>
      </li>
      <li>
        <h3>{{ $t('baseSettings.height')}}:</h3>
        <v-text-field v-model="store.height"></v-text-field>
      </li>
      <li>
        <h3>{{ $t('baseSettings.line')}}:</h3>
        <v-dialog max-width="800">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                color="blue"
                size="x-large"
                variant="flat"
                block
                :text="$t('baseSettings.configure')"
            ></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card :title="$t('baseSettings.configure')">
              <template v-slot:text>
                <h2>{{ $t('baseSettings.configModal.name')}}:</h2>
                <v-text-field v-model="store.name"></v-text-field>

                <h2>{{ $t('baseSettings.configModal.number')}}:</h2>
                <v-text-field v-model="store.number"></v-text-field>

                <h2>{{ $t('baseSettings.configModal.color')}}:</h2>
                <center>
                  <v-color-picker v-model="store.color" mode="hex"></v-color-picker>
                </center>
              </template>

              <hr>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    :text="$t('baseSettings.configModal.close')"
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
</template>

<style scoped>

</style>