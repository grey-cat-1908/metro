// @ts-ignore
import { SVG } from '@svgdotjs/svg.js'

import {Branch} from "./branch.ts";
import {Station} from "./station.ts";
import {ConnectedStation} from "./connectedStation.ts";

const yMax = (window.innerHeight-50) / 4;

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

    private getTextPosition(up: boolean): number {
        if (up) {
            return yMax - 60;
        } else {
            return yMax + 60;
        }
    }

    private drawConnectedStations(stations: Array<ConnectedStation>, up: boolean, cx: number, scy: number) {
        for (let i = 0; i < stations.length; i++) {
            let cy;
            if (up) {
                cy = scy + (i + 1) * 50
            } else {
                cy = scy - (i + 1) * 50
            }
            this.draw.circle(40).fill(stations[i].branch.color).cx(cx).cy(cy)

            let text = this.draw.text(stations[i].branch.number.toString()).fill('white').font({ size: 28}).cx(cx).cy(cy);
            text.font({
                family: 'Onest',
                weight: '750',
            })

            let naming = this.draw.text(stations[i].name).fill('black').font({ size: 25});
            naming.cx(cx + 30 + (naming.bbox().width / 2)).cy(cy);
            naming.font({
                family: 'Onest',
                weight: '750',
                leading: 1
            })
        }
    }

    private drawStations(stations: Array<Station>) {
        let last = 200;

        for (let i = 0; i < stations.length; i++) {
            let cx = last + stations[i].step;
            if (stations[i].connectedStations.length > 0) {
                this.draw.circle(50).fill('#f06').cx(cx).cy(yMax)
                this.draw.circle(25).fill('white').cx(cx).cy(yMax)

                this.drawConnectedStations(stations[i].connectedStations, stations[i].up, cx, yMax);
            } else {
                this.draw.rect(15, 50).fill('#f06').cx(cx).cy(yMax)
            }

            let textPosition: number = this.getTextPosition(stations[i].up)

            let text = this.draw.text(stations[i].name).font({ size: 35}).cx(last + stations[i].step).cy(textPosition);
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