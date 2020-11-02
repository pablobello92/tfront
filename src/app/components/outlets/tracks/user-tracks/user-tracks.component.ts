import {
    Component,
    OnInit
} from '@angular/core';
import {
    TracksService
} from '../../../../shared/services/tracks.service';

import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { tap, map, skip, filter } from 'rxjs/operators';
import { CitiesService } from '../../../../shared/services/cities.service';
import { City, MapOptions } from '../../../../shared/interfaces/City';
import { Track } from '../../../../shared/interfaces/Track';
import { MapFilter } from '../../../../shared/interfaces/MapFilter';
import { MapsService } from '../../../../shared/services/maps.service';
import { RoadCategories } from '../../../../shared/interfaces/Categories';

declare const google: any;

@Component({
    selector: 'app-user-tracks',
    templateUrl: './user-tracks.component.html',
    styleUrls: ['./user-tracks.component.scss']
})
export class UserTracksComponent implements OnInit {

    private map: google.maps.Map;
    private tracks: Track[] = [];
    currentTrack: Observable<any[]> = new Observable<any[]>();
    roadCategories: RoadCategories = null;
    roadCategoriesIterable = [];

    cities: Observable<City[]> = new Observable<City[]>();
    currentCity: City = null;
    private citySubject: BehaviorSubject<City> = new BehaviorSubject<City>(this.currentCity);

    private _trackIndex = 0;
    private trackIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this._trackIndex);

    dateFilter = {
        from: new Date(1520793625606.0),
        to: new Date(1537656635848.0)
    };

    paginationLimit = 5;
    offset = 0;

    constructor(
        private _cities: CitiesService,
        private _tracks: TracksService,
        private _maps: MapsService
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

        this.currentTrack = this.trackIndexSubject.asObservable()
        .pipe(
            skip(1),
            filter((nextIndex: number) => (this.tracks.length > 0)),
            map((nextIndex: number) => this.tracks[nextIndex]),
            tap((trackToDraw: Track) => {
                this.roadCategories = this._maps.getRelativeRoadCategories(trackToDraw.ranges);
                console.log(this.roadCategories);
                this.roadCategoriesIterable = Object.entries(this.roadCategories)
                .map((entry: any[]) => <Object>{
                    text: entry[0],
                    color: entry[1].color
                });
            }),
            map((trackToDraw: Track) => this._maps.getDrawableFromRanges(trackToDraw.ranges))
        );
    }

    ngOnInit() {
    }

    public setMap($event) {
        this.map = $event.map;
    }

    public changeCurrentCity(c: City): void {
        this.currentCity = c;
        this.citySubject.next(this.currentCity);
    }

    public changeTrackIndex(n: number): void {
        this._trackIndex =  this._trackIndex + n;
        this.trackIndexSubject.next(this._trackIndex);
    }

    public getTrackIndex(): number {
        return this.trackIndexSubject.value;
    }

    public fetchUserTracks(): void {
        const filterObject: MapFilter = {
            user: 'pablo_bello', //TODO: put cookie user
            city: this.currentCity.name,
            startTime: {
                from: Date.parse(this.dateFilter.from.toDateString()),
                to: Date.parse(this.dateFilter.to.toDateString())
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
