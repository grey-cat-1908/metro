import {defineStore} from "pinia";

export const useStore = defineStore('branch', {
    state: () => {
        return {
            name: 'Тест',
            number: 1,
            color: '#0078BE',
            stations: [],
            width: window.innerWidth,
            height: window.innerHeight / 2
        }
    },
})