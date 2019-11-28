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
    userName; nickName: string;
    deltas = 0;
    deltasBySegment = [];

    maxScore = 0;

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

    drawLines(ranges: Array < any > ): void { // TODO: ver si puedo descartar los ejes x,y de los datos de acelerometro
        ranges.forEach(element => {
            let line = new google.maps.Polyline({
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
                strokeColor: this.getStrokeColor(element.score),
                strokeOpacity: 1,
                strokeWeight: 5
            });
            this.overlays.push(line);
        });
    }

    // Es estático, en las notas comenté que esto debe de ser algo dinámico
    getStrokeColor(score: number): string {
        return (score < 2) ? '#00ff00' : (score < 3 ) ? '#ffff00' : (score < 5) ? '#ff6600' : (score < 20 ) ? '#ff0000' : '#6600ff';
    }

    // Obtengo el score maximo para asi armar los rangos de colores (AL FINAL NO LO USÉ)
    getMaxValue(ranges: Array < any > ): number {
        let max = 0;
        ranges.forEach(element => {
            if (element.score > max) {
                max = element.score;
            }
        });
        return max;
    }

}
