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
    overlays: any[] = [];
    map: google.maps.Map;
    userName;nickName: string;

    constructor(
        private _tracks: TracksService
    ) {}

    setMap(event) {
        this.map = event.map;
    }

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
                this.drawLines(res.ranges);
            }, err => {
                console.error(err);
            });
    }

    drawLines(ranges: Array < any > ): void {
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
                strokeColor: '#00ff00',
                strokeOpacity: 1,
                strokeWeight: 5
            });
            this.overlays.push(line);
        });
    }

}
