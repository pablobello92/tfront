import {
    Component
} from '@angular/core';
import {
    BehaviorSubject,
    Observable,
    Subject
} from 'rxjs';
import {
    map,
    skip,
    tap
} from 'rxjs/operators';
import {
    CitiesService
} from '../../../shared/services/cities.service';
import {
    MapsService
} from '../../../shared/services/maps.service';
import {
    SumarizationsService
} from '../../../shared/services/sumarizations.service';
import {
    City,
    MapOptions
} from '../../../shared/interfaces/City';
import {
    CommonService
} from '../../../shared/services/common.service';
import {
    ISumarization
} from '../../../shared/interfaces/Track';
import {
    SUMARIZATION_TYPES_VALUE,
    SUMARIZATION_TYPES_PAIRS
} from '../../../shared/constants/roadClassifications';
import {
    IRange
} from '../../../shared/interfaces/Range';
import {
    ColorItem,
    Polyline
} from '../../../shared/interfaces/Polyline';
import {
    ColorsService
} from '../../../shared/services/colors.service';

@Component({
    selector: 'app-sumarized-data',
    templateUrl: './sumarized-data.component.html',
    styleUrls: ['./sumarized-data.component.scss']
})
export class SumarizedDataComponent {

    public currentMapOptions: MapOptions | null = null;

    public typesSubject: BehaviorSubject<SUMARIZATION_TYPES_VALUE> = new BehaviorSubject<SUMARIZATION_TYPES_VALUE>(SUMARIZATION_TYPES_VALUE.SUMARIZATIONS);
    public types: any[] = SUMARIZATION_TYPES_PAIRS;

    public polylines: Subject<Polyline[]> = new Subject<Polyline[]>();
    public sumarizationDate: Subject<Date> = new Subject<Date>();

    public cities: Observable <City[]> = new Observable <City[]>();
    public citySubject: BehaviorSubject<City> = new BehaviorSubject<City>(null);

    public colorItems: ColorItem[] = [];

    constructor(
        private _maps: MapsService,
        private _colors: ColorsService,
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

    public onTypeChange(n: any): void {
        this.typesSubject.next(n);
    }

    public onCityChange(c: City): void {
        this.citySubject.next(c);
    }

    public fetchData(): void {
        console.clear();
        this._sumarizations.getSumarizationsByCity(this.citySubject.value.id, this.typesSubject.value)
            .pipe(
                tap((s: ISumarization) => { this.sumarizationDate.next(new Date(s.date)); }),
                map((s: ISumarization) => s.ranges)
            )
            .subscribe((ranges: IRange[]) => {
                this.colorItems = this._colors.getColorMappingsAsArray(this.typesSubject.value);
                const overlays = ranges.map((r: IRange) => this._maps.mapRangeToPolyline(r, this.colorItems));
                this.polylines.next(overlays);
            }, (err: any) => {
                console.error(err);
            });
    }

}
