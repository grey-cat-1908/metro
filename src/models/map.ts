// @ts-ignore
import { SVG } from '@svgdotjs/svg.js'

import {Branch} from "./map/branch.ts";
import {Station} from "./map/station.ts";
import {ConnectedStation} from "./map/connectedStation.ts";
import {Settings} from "./settings.ts";

export interface MetroMap {
    branch: Branch;
    settings: Settings
}

export class Map implements MetroMap {
    branch: Branch;
    settings: Settings

    private yMax: number;
    private draw;

    public constructor(branch: Branch, settings: Settings) {
        this.draw = SVG().addTo('#map')
        this.branch = branch
        this.settings = settings
        this.yMax = (this.settings.height - 50) / 4
    }

    public setBranch(branch: Branch) {
        this.branch = branch
    }

    public setSettings(settings: Settings) {
        this.settings = settings
    }

    private getTextPosition(up: boolean): number {
        if (up) {
            return this.yMax - 60;
        } else {
            return this.yMax + 60;
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

            let fontSize;
            if (stations[i].branch.number.toString().length > 1) {
                fontSize = 22;
            } else {
                fontSize = 28;
            }
            let text = this.draw.text(stations[i].branch.number.toString()).fill('white').font({ size: fontSize}).cx(cx).cy(cy);
            text.font({
                family: 'Roboto Mono',
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
                this.draw.circle(50).fill(this.branch.color).cx(cx).cy(this.yMax)
                this.draw.circle(25).fill('white').cx(cx).cy(this.yMax)

                this.drawConnectedStations(stations[i].connectedStations, stations[i].up, cx, this.yMax);
            } else {
                this.draw.rect(15, 50).fill(this.branch.color).cx(cx).cy(this.yMax)
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
        const lineMax = this.settings.width - 200;
        this.yMax = (this.settings.height - 50) / 4

        this.draw = this.draw.size(this.settings.width, this.yMax * 2);
        this.draw.clear();

        // @ts-ignore
        this.draw.style("@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap')")

        this.draw.circle(50).fill(this.branch.color).cx(50).cy(50)

        let text = this.draw.text(this.branch.number.toString()).font({ size: 35}).fill('#fff').cx(50).cy(50);
        text.font({
            family: 'Roboto Mono',
            weight: '750',
        })

        let naming = this.draw.text(this.branch.name).font({ size: 35});
        naming.cx(90 + (naming.bbox().width / 2)).cy(50);
        naming.font({
            family: 'Onest',
            weight: '750',
        })

        let line = this.draw.line(200, this.yMax, lineMax, this.yMax)
        line.stroke({ color: this.branch.color, width: 16})

        this.drawStations(this.branch.stations)
    }
}