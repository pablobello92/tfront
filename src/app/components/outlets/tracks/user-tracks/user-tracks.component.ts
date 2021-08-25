import {
    Component
} from '@angular/core';
import {
    BehaviorSubject,
    Observable
} from 'rxjs';
import {
    tap,
    map,
    skip,
    filter
} from 'rxjs/operators';
import {
    MatDatepickerInputEvent
} from '@angular/material/datepicker';
import {
    DateAdapter
} from '@angular/material/core';
import {
    CitiesService
} from '../../../../shared/services/cities.service';
import {
    TracksService
} from '../../../../shared/services/tracks.service';
import {
    City,
    MapOptions
} from '../../../../shared/interfaces/City';
import {
    Track
} from '../../../../shared/interfaces/Track';
import {
    MapFilter
} from '../../../../shared/interfaces/MapFilter';
import {
    MapsService
} from '../../../../shared/services/maps.service';
import {
    RoadCategories
} from '../../../../shared/interfaces/Categories';
import {
    CookiesService
} from '../../../../shared/services/cookies.service';
import {
    Polyline
} from 'src/app/shared/interfaces/Polyline';
import {
    CommonService
} from 'src/app/shared/services/common.service';
import {
    ISimpleRange
} from 'src/app/shared/interfaces/ISimpleRange';

@Component({
    selector: 'app-user-tracks',
    templateUrl: './user-tracks.component.html',
    styleUrls: ['./user-tracks.component.scss']
})
export class UserTracksComponent {

    public currentMapOptions: MapOptions | null = null;

    public currentTrack: Observable<Polyline[]> = new Observable<Polyline[]>();

    private userId: number | null = null;
    private tracks: Track[] = [];
    public roadCategories: RoadCategories | null = null;
    public roadCategoriesIterable = [];

    public cities: Observable<City[]> = new Observable<City[]> ();
    public citySubject: BehaviorSubject<City> = new BehaviorSubject<City>(null);

    public trackIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    public dateSubject: BehaviorSubject<ISimpleRange<Date>> = new BehaviorSubject<ISimpleRange<Date>>({
        from: new Date(1520793625606.0),
        to: new Date(1537656635848.0)
    });

    public paginationLimit = 5;
    public offset = 0;

    constructor(
        private _common: CommonService,
        private _cities: CitiesService,
        private _tracks: TracksService,
        private _maps: MapsService,
        private _cookies: CookiesService,
        private _adapter: DateAdapter<any>
    ) {
        this._adapter.setLocale('es-ES');
        this.userId = parseInt(this._cookies.getCookie('id'));
        this.cities = this._cities.getCities()
            .pipe(
                tap((cities: City[]) => {
                    this.onCityChange(cities[0]);
                })
            );

        this.citySubject.asObservable()
            .pipe(
                skip(1),
                map((city: City) => <MapOptions> {
                        center: city.center
                    }
                )
            )
            .subscribe((options: MapOptions) => {
                this.currentMapOptions = options;
            });

            this.currentTrack = this.trackIndexSubject.asObservable()
            .pipe(
                skip(1),
                filter((nextIndex: number) => (this.tracks.length > 0)),
                map((nextIndex: number) => this.tracks[nextIndex]),
                tap((trackToDraw: Track) => {
                    this.roadCategories = this._maps.getRelativeRoadCategories(trackToDraw.ranges);
                    this.roadCategoriesIterable = Object.entries(this.roadCategories)
                        .map((entry: any[]) => < Object > {
                            text: entry[0],
                            color: entry[1].color
                        });
                }),
                map((trackToDraw: Track) => this._maps.getPolylinesFromRanges(trackToDraw.ranges))
            );
    }

    public onCityChange(c: City): void {
        this.citySubject.next(c);
    }

    public onDateChange($event: MatDatepickerInputEvent<Date>, name): void {
        const nextValue = this.dateSubject.value;
        nextValue[name] = $event.value;
        this.dateSubject.next(nextValue);
    }

    public changeTrackIndex(n: number): void {
        this.trackIndexSubject.next(this.trackIndexSubject.value + n);
    }

    public fetchUserTracks(): void {
        const filterObject: MapFilter = {
            userId: this.userId,
            cityId: this.citySubject.value.id,
            startTime: {
                from: Date.parse(this.dateSubject.value.from.toDateString()),
                to: Date.parse(this.dateSubject.value.to.toDateString())
            },
            pages: this.paginationLimit,
            offset: this.offset
        };
        this._tracks.getUserTracks(filterObject)
            .subscribe((tracks: Track[]) => {
                this.tracks = tracks;
                this.trackIndexSubject.next(0);
            }, err => {
                console.error(err);
            });
    }
}
