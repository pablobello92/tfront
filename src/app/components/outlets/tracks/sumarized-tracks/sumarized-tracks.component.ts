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
    map,
    skip,
    tap
} from 'rxjs/operators';
import {
    CitiesService
} from '../../../../shared/services/cities.service';
import { MapsService } from './../../../../shared/services/maps.service';
import { SumarizationsService } from './../../../../shared/services/sumarizations.service';
import {
    City,
    MapOptions
} from '../../../../shared/interfaces/City';

import { Coordinate } from '../../../../shared/interfaces/Coordinate';
import { RoadCategories } from '../../../../shared/interfaces/Categories';
declare const google: any;

@Component({
    selector: 'app-sumarized-tracks',
    templateUrl: './sumarized-tracks.component.html',
    styleUrls: ['./sumarized-tracks.component.scss']
})
export class SumarizedTracksComponent implements OnInit {

    private map: google.maps.Map;
    sumarizations = [];

    cities: Observable<City[]> = new Observable<City[]>();
    currentCity: City = null;
    private citySubject: BehaviorSubject<City> = new BehaviorSubject<City>(this.currentCity);
    roadCategories: RoadCategories = null;
    roadCategoriesIterable = [];
    public sumarizationDate: Date = null;

    constructor(
        private _maps: MapsService,
        private _sumarizations: SumarizationsService,
        private _cities: CitiesService
    ) {
        this.cities = this._cities.getCities()
        .pipe(
            tap((cities: City[]) => {
                this.changeCurrentCity(cities[0]);
            })
        );

        this.citySubject.asObservable()
        .pipe(
            skip(1),
            map((city: City) => {
                return <MapOptions>{
                    center: city.center,
                    zoom: city.zoom
                };
            })
        )
        .subscribe((newMapCenter: MapOptions) => {
            this.map.setOptions(newMapCenter);
        });
    }

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

    public changeCurrentCity(c: City): void {
        this.currentCity = c;
        this.citySubject.next(this.currentCity);
    }

    public fetchData(): void {
        this._sumarizations.getSumarizationsByCity(this.currentCity.name)
        .subscribe((res: any) => {
            this.sumarizationDate = new Date(res[0].date);
            this.sumarizations =  this._maps.getDrawableFromRanges(res[0].ranges);
            this.roadCategories = this._maps.getRelativeRoadCategories(res[0].ranges);
            this.roadCategoriesIterable = Object.entries(this.roadCategories)
            .map((entry: any[]) => <Object>{
                text: entry[0],
                color: entry[1].color
            });
        }, err => {
            console.error(err);
        });
    }

}
