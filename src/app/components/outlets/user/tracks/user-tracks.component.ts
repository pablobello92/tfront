import {
    Component,
    OnInit,
    ViewEncapsulation,
    EventEmitter
} from '@angular/core';
import {
    TracksService
} from 'src/app/shared/services/tracksService';

import { Range } from '../../../../shared/interfaces/Range';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { tap, map, skip, filter } from 'rxjs/operators';
import { ColorInfoWidgetComponent } from './color-info-widget/color-info-widget.component';
import { CitiesService } from '../../../../shared/services/citiesService';
import { City, MapOptions } from '../../../../shared/interfaces/City';
import { Track } from '../../../../shared/interfaces/Track';
import { MapFilter } from '../../../../shared/interfaces/MapFilter';

declare var google: any;

@Component({
    selector: 'app-user-tracks',
    templateUrl: './user-tracks.component.html',
    styleUrls: ['./user-tracks.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserTracksComponent implements OnInit {
    // private map: google.maps.Map;
    //currentMapCenter: Observable<MapOptions> = new Observable<MapOptions>();
    currentMapCenter: MapOptions = null;
    currentTrack: Observable<any[]> = new Observable<any[]>();
    private tracks: Track[] = [];

    cities: Observable<City[]> = new Observable<City[]>();
    private currentCity: City = null;
    private citySubject: BehaviorSubject<City> = new BehaviorSubject<City>(this.currentCity);
    filterDate: Date[] = null;

    /**
     * TODO: agregar un onChange sobre este campo, asi se habilitan/deshabilitan los botones
     */
    paginationLimit = 5;

    private _trackIndex = 0;
    private trackIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this._trackIndex);

    // TODO: enable buttons prev/next only if there is tracks
    // Date.parse(new Date(this.tracks[0].startTime))
    constructor(
        private _tracks: TracksService,
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
            skip(2),
            map((city: City) => {
                return <MapOptions>{
                    center: city.center,
                    zoom: city.zoom
                };
            })
        )
        .subscribe(newMapCenter => {
            this.currentMapCenter = newMapCenter;
            // this.map.setOptions(newMapCenter);
        });

        this.currentTrack = this.trackIndexSubject.asObservable()
        .pipe(
            skip(1),
            filter((nextIndex: number) => (this.tracks.length > 0)),
            map((nextIndex: number) => this.tracks[nextIndex]),
            map((trackToDraw: Track) => this._tracks.getDrawableFromTrack(trackToDraw))
        );
    }

    ngOnInit() {
    }

    public setMap($event) {
        // this.map = $event.map;
    }

    public changeCurrentCity(c: City): void {
        this.citySubject.next(c);
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
            user: 'pablo_bello',
            city: this.currentCity.name,
            pages: this.paginationLimit
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
