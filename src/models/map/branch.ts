import {Station} from "./station.ts";

export interface BranchInterface {
    name: string;
    color: string;
    number: number;
    stations: Array<Station>
}

export class Branch implements BranchInterface {
    name: string;
    color: string;
    number: number;
    stations: Array<Station>;

    constructor(name: string, color: string, number: number, stations: Array<Station>) {
        this.name = name;
        this.color = color;
        this.number = number;
        this.stations = stations;
    }
}