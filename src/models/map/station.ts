import {ConnectedStation} from './connectedStation.ts'

export interface StationInterface {
    name: string;
    up: boolean;
    connectedStations: Array<ConnectedStation>;
    step: number;
}

export class Station implements StationInterface {
    name: string;
    up: boolean;
    connectedStations: Array<ConnectedStation>
    step: number;

    constructor(name: string, up: boolean, connectedStations: Array<ConnectedStation>, step: number) {
        this.name = name;
        this.up = up;
        this.connectedStations = connectedStations;
        this.step = step;
    }
}