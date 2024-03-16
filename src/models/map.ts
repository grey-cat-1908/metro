// @ts-ignore
import { SVG } from '@svgdotjs/svg.js'

import {Branch} from "./branch.ts";
import {Station} from "./station.ts";

export interface MetroMap {
    branch: Branch;
}

export class Map implements MetroMap {
    branch: Branch;

    private draw;

    public constructor(branch: Branch) {
        this.draw = SVG().addTo('#map')
        this.branch = branch
    }

    public setBranch(branch: Branch) {
        this.branch = branch
    }

    private drawStations(stations: Array<Station>) {
        const yMax = (window.innerHeight-50) / 4;

        let last = 200;

        for (let i = 0; i < stations.length; i++) {
            if (stations[i].connectedStations.length > 0) {
                this.draw.circle(50).fill('#f06').cx(last + stations[i].step).cy(yMax)
                this.draw.circle(25).fill('white').cx(last + stations[i].step).cy(yMax)
            } else {
                this.draw.rect(15, 50).fill('#f06').cx(last + stations[i].step).cy(yMax)
            }

            let y;

            if (stations[i].up) {
                y = yMax - 60;
            } else {
                y = yMax + 60;
            }

            let text = this.draw.text(stations[i].name).font({ size: 35}).cx(last + stations[i].step).cy(y);
            text.font({
                family: 'Onest',
                weight: '750',
            })
        }
    }

    public build() {
        this.draw = this.draw.size(window.innerWidth, (window.innerHeight-50) / 2);
        this.draw.clear();

        const lineMax = window.innerWidth - 200;
        const yMax = (window.innerHeight-50) / 4;

        let line = this.draw.line(200, yMax, lineMax, yMax)
        line.stroke({ color: '#f06', width: 16})

        this.drawStations(this.branch.stations)
    }
}