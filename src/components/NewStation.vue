<script setup lang="ts">
// @ts-nocheck

import {useStore} from '../utils/store.ts';
const store = useStore()
</script>

<template>
    <v-btn
        color="purple"
        size="x-large"
        variant="flat"
        block
        @click="store.stations.push({'name': 'Тест', 'up': true, 'connectedStations': [], 'step': 300})">
      {{ $t("newStation.add_station") }}
    </v-btn>
</template>

<style scoped>

</style>