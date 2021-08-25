import {
    Component
} from '@angular/core';
import {
    BehaviorSubject,
    Observable
} from 'rxjs';
import {
    map,
    skip,
    tap
} from 'rxjs/operators';
import {
    CitiesService
} from '../../../../shared/services/cities.service';
import {
    MapsService
} from './../../../../shared/services/maps.service';
import {
    SumarizationsService
} from './../../../../shared/services/sumarizations.service';
import {
    City,
    MapOptions
} from '../../../../shared/interfaces/City';

import {
    RoadCategories
} from '../../../../shared/interfaces/Categories';
import {
    CommonService
} from '../../../../shared/services/common.service';

@Component({
    selector: 'app-sumarized-tracks',
    templateUrl: './sumarized-tracks.component.html',
    styleUrls: ['./sumarized-tracks.component.scss']
})
export class SumarizedTracksComponent {

    public currentMapOptions: MapOptions | null = null;

    public sumarizations = [];
    public sumarizationDate: Date = null;

    public cities: Observable < City[] > = new Observable < City[] > ();
    public citySubject: BehaviorSubject<City> = new BehaviorSubject<City>(null);

    public roadCategories: RoadCategories = null;
    public roadCategoriesIterable = [];


    constructor(
        private _maps: MapsService,
        private _sumarizations: SumarizationsService,
        private _cities: CitiesService,
        private _common: CommonService
    ) {
        this.cities = this._cities.getCities()
            .pipe(
                tap((cities: City[]) => {
                    this.onCityChange(cities[0]);
                })
            );

        this.citySubject.asObservable()
            .pipe(
                skip(1),
                map((city: City) => <MapOptions>{
                        center: city.center
                    }
                )
            )
            .subscribe((options: MapOptions) => {
                this._common.updateMapSubject(options);
            });

        this._common.getMapSubject()
        .pipe(skip(1))
        .subscribe((options: MapOptions) => {
            this.currentMapOptions = options;
        });
    }

    public onCityChange(c: City): void {
        this.citySubject.next(c);
    }

    // TODO: refactor this!... make a pipe() and last a subscription
    public fetchData(): void {
        this._sumarizations.getSumarizationsByCity(this.citySubject.value.id)
            .subscribe((res: any[]) => {
                this.sumarizations = this._maps.getPolylinesFromRanges(res[0].ranges);
                this.sumarizationDate = new Date(res[0].date);
                this.roadCategories = this._maps.getRelativeRoadCategories(res[0].ranges);
                this.roadCategoriesIterable = Object.entries(this.roadCategories)
                    .map((entry: any[]) => < Object > {
                        text: entry[0],
                        color: entry[1].color
                    });
            }, (err: any) => {
                console.error(err);
            });
    }

}
