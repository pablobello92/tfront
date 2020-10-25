import { MapsService } from './../../../shared/services/maps.service';

import {
    Component,
    OnInit
} from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    of ,
    pipe
} from 'rxjs';
import {
    tap,
    map,
    skip,
    filter
} from 'rxjs/operators';
import {
    CitiesService
} from '../../../shared/services/cities.service';
import {
    City,
    MapOptions
} from '../../../shared/interfaces/City';
import { Track, SumarizedObject } from '../../../shared/interfaces/Track';
import {
    MapFilter
} from '../../../shared/interfaces/MapFilter';
import { SumarizationsService } from './../../../shared/services/sumarizations.service';
import { TracksService } from '../../../shared/services/tracks.service';
import { Coordinate } from '../../../shared/interfaces/Coordinate';
declare const google: any;

@Component({
    selector: 'app-sumarized-tracks',
    templateUrl: './sumarized-tracks.component.html',
    styleUrls: ['./sumarized-tracks.component.scss']
})
export class SumarizedTracksComponent implements OnInit {

    private map: google.maps.Map;
    sumarizations = [];

    constructor(
        private _tracks: TracksService,
        private _maps: MapsService,
        private _sumarizations: SumarizationsService,
        private _cities: CitiesService
    ) {}

    ngOnInit() {}

    public setMap($event) {
        this.map = $event.map;
        const newMapCenter: MapOptions =  <MapOptions>{
            center: <Coordinate>{
                lat: -37.3245325,
                lng: -59.1526661
            },
            zoom: 14
        };
        this.map.setOptions(newMapCenter);
    }

    public fetchData(): void {
        this._sumarizations.getSumarizationsByCity('Tandil')
            .subscribe((res: any) => {
               console.log(res);
               this.sumarizations =  this._maps.getDrawableFromRanges(res[0].ranges);
            }, err => {
                console.error(err);
            });
    }

}
