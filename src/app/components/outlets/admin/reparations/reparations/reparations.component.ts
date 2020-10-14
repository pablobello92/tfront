import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {
    GMapModule
} from 'primeng/gmap';

import { MapOptions, City } from '../../../../../shared/interfaces/City';
import { Coordinate } from '../../../../../shared/interfaces/Coordinate';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, skip, tap } from 'rxjs/operators';
import { TracksService } from '../../../../../shared/services/tracksService';
import { CitiesService } from '../../../../../shared/services/citiesService';
import { Reparation } from '../../../../../shared/interfaces/Reparation';

declare const google: any;

/**
 * TODO: The "already marked twice" should be a toaster, or something else asynchronous
 * TODO: customize markers
 * TODO: limit repairs lenght to "una cuadra"... Then the admin should report many
 */
@Component({
    selector: 'app-reparations',
    templateUrl: './reparations.component.html',
    styleUrls: ['./reparations.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReparationsComponent implements OnInit {

    private map: google.maps.Map;
    overlays: any[];

    private _markersPlaced = 0;
    markersPlaced: BehaviorSubject<number> = new BehaviorSubject<number>(this._markersPlaced);
    private currentMarkerCenter: MapOptions;

    cities: Observable<City[]> = new Observable<City[]>();
    currentCity: City = null;
    private citySubject: BehaviorSubject<City> = new BehaviorSubject<City>(this.currentCity);

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
            skip(1),
            map((city: City) => {
                return <MapOptions>{
                    center: city.center,
                    zoom: city.zoom
                };
            })
        )
        .subscribe(newMapCenter => {
            this.map.setOptions(newMapCenter);
        });

        this.markersPlaced.asObservable()
        .subscribe((newValue: number) => {
            if (newValue === 0) {
                this.overlays = [];
            } else if (newValue === 2) {
                const coordinates = this._tracks.getCoordinatesFromMarkers(this.overlays);
                const newOverlay = this._tracks.mapCoordinatesToDrawable(coordinates);
                this.overlays.push(newOverlay);
            }
        });
    }

    ngOnInit() {}

    public changeCurrentCity(c: City): void {
        this.currentCity = c;
        this.citySubject.next(this.currentCity);
    }

    setMap($event): void {
        this.map = $event.map;
    }

    public handleMapClick($event): void {
        if (this._markersPlaced === 2) {
            this.map.setOptions(this.currentMarkerCenter);
            return alert('Ya se ubicaron dos marcadores. Para corregir, hacer click en reset.');
        }
        const coords: Coordinate = {
            lat: $event.latLng.lat(),
            lng: $event.latLng.lng()
        };
        const newMarker = new google.maps.Marker({position: coords, title: 'Desde'});
        this.overlays.push(newMarker);

        this.currentMarkerCenter = <MapOptions> {
            center: {
                lat: coords.lat,
                lng: coords.lng,
            },
            zoom: 16
        };
        this._markersPlaced++;
        this.markersPlaced.next(this._markersPlaced);
    }

    public resetMarkers(): void {
        this._markersPlaced = 0;
        this.markersPlaced.next(0);
    }

    //TODO: POST reparation
    // FE: new method in tracksService
    // BE: new interface, new collection, new endpoint in api.js
    public postNewReparation(): void {
        const coordinates = this._tracks.getCoordinatesFromMarkers(this.overlays.slice(0, 2));
        const newReparation: Reparation = {
            from: {
                lat: coordinates[0].lat,
                lng: coordinates[0].lng
            },
            to: {
                lat: coordinates[1].lat,
                lng: coordinates[1].lng
            },
            city: this.currentCity.name
        };
    }

}
