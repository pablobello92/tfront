import {
    Component,
    OnInit
} from '@angular/core';

import {
    GMapModule
} from 'primeng/gmap';
import {
    TracksService
} from 'src/app/shared/services/tracksService';

declare var google: any;

@Component({
    selector: 'app-user-tracks',
    templateUrl: './user-tracks.component.html',
    styleUrls: ['./user-tracks.component.scss']
})
export class UserTracksComponent implements OnInit {

    options: any;
    overlays = [];
    userName;nickName: string;
    deltas = 0;
    deltasBySegment = [];

    maxScore = 0;


    private readonly COLOR_NOEVENT = '#00ffff'; // cyan
    private readonly COLOR_VERYLOW = '#00ff00'; // green
    private readonly COLOR_LOW = '#ffff00'; // yellow
    private readonly COLOR_MEDIUM = '#ff8000'; // orange
    private readonly COLOR_HIGH = '#ff0000'; // red
    private readonly COLOR_VERYHIGH = '#8000ff'; // purple

    private veryLowLimit: number;
    private lowLimit: number;
    private mediumLimit: number;
    private highLimit: number;

    constructor(
        private _tracks: TracksService
    ) {}

    ngOnInit() {
        this.userName = 'pablo_bello'; // TODO: vincular a nombre real desde las cookies, idem a user edit
        this.nickName = 'Pablo Bello';

        this.options = {
            center: {
                lat: -37.325884,
                lng: -59.147160
            },
            zoom: 13
        };
    }

    public fetchOne(): void {
        this._tracks.getTracks(this.userName).subscribe(
            res => {
                console.clear();
                console.log(res);
                this.maxScore = this.getMaxValue(res.ranges);
                this.drawLines(res.ranges);
            }, err => {
                console.error(err);
            });
    }

    public fetchAll(): void {
        this._tracks.getAllTracks(this.userName).subscribe(
            ranges => {
                console.clear();
                this.maxScore = this.getMaxValue(ranges);
                console.log(ranges);
                this.drawLines(ranges);
            }, err => {
                console.error(err);
            });
    }

    private drawLines(ranges: any[]): void { // TODO: ver si puedo descartar los ejes x,y de los datos de acelerometro
        this.getEventScoreScale(ranges);
        ranges.forEach(element => {
            const line = new google.maps.Polyline({
                path: [{
                        lat: element.start.latitude,
                        lng: element.start.longitude
                    },
                    {
                        lat: element.end.latitude,
                        lng: element.end.longitude
                    }
                ],
                geodesic: true,
                strokeColor: this.getColor(element.score),
                strokeOpacity: 1,
                strokeWeight: 4
            });
            this.overlays.push(line);
        });
        return;
    }

    // Obtengo el score maximo para asi armar los rangos de colores (AL FINAL NO LO USÉ)
    private getMaxValue(ranges: any[] ): number {
        let max = 0;
        ranges.forEach(element => {
            if (element.score > max) {
                max = element.score;
            }
        });
        return max;
    }

    private getEventScoreScale(ranges: any[]): void {

        let min = 100000;
        let max = 0;
        let avg = 0;
        let counter = 0;

        ranges.forEach((range) => {
            const score = range.score;
            if (score > 0) {
                counter++;
                avg += score;
                min = Math.min(min, score);
                max = Math.max(max, score);
            }
        });
        avg = avg / counter;

        const lowerStep = (avg - min) / 4;
        const upperStep = (max - avg) / 4;

        this.veryLowLimit = min + lowerStep;
        this.lowLimit = avg - lowerStep;
        this.mediumLimit = avg + upperStep;
        this.highLimit = max - upperStep;

        return;
    }

    private getColor(score: number): string {
        if (score === 0) {
            return this.COLOR_NOEVENT;
        }
        if (score < this.veryLowLimit) {
            return this.COLOR_VERYLOW;
        }
        if (score < this.lowLimit) {
            return this.COLOR_LOW;
        }
        if (score < this.mediumLimit) {
            return this.COLOR_MEDIUM;
        }
        if (score < this.highLimit) {
            return this.COLOR_HIGH;
        }
        return this.COLOR_VERYHIGH;
    }
}
