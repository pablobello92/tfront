import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {
    GMapModule
} from 'primeng/gmap';

import { MapOptions, City } from '../../../../shared//interfaces/City';
import { Coordinate } from '../../../../shared//interfaces/Coordinate';
import { BehaviorSubject, Observable } from 'rxjs';
import {  map, skip, tap } from 'rxjs/operators';
import { TracksService } from '../../../../shared//services/tracks.service';
import { CitiesService } from '../../../../shared//services/cities.service';
import { Reparation } from '../../../../shared//interfaces/Reparation';
import { ReparationsService } from '../../../../shared//services/reparations.service';
import { MapsService } from '../../../../shared//services/maps.service';

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
    overlays: any[] = [];

    private _markersPlaced = 0;
    markersPlaced: BehaviorSubject<number> = new BehaviorSubject<number>(this._markersPlaced);
    private currentMarkerCenter: MapOptions;

    cities: Observable<City[]> = new Observable<City[]>();
    currentCity: City = null;
    private citySubject: BehaviorSubject<City> = new BehaviorSubject<City>(this.currentCity);

    // TODO: enable buttons prev/next only if there is tracks
    constructor(
        private _tracks: TracksService,
        private _maps: MapsService,
        private _reparations: ReparationsService,
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
            this._reparations.getReparations(this.currentCity.name)
            .subscribe(reparations => {
                const drawables = reparations.map((r: Reparation) => {
                    const coords = <Coordinate[]>[r.from, r.to];
                    return this._maps.getDrawableFromCoordinates(coords);
                });
                this.overlays.push(...drawables);
            });
        });

        this.markersPlaced.asObservable()
        .subscribe((newValue: number) => {
            if (newValue === 2) {
                const lastIndex = this.overlays.length;
                const newMarkers = [this.overlays[lastIndex - 1], this.overlays[lastIndex - 2]];
                const coordinates = this._maps.getCoordinatesFromMarkers(newMarkers);
                const newOverlay = this._maps.getDrawableFromCoordinates(coordinates, 'lime');
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

    public resetMarkers(): any[] {
        this._markersPlaced = 0;
        this.markersPlaced.next(0);
        return this.removeLastTwoMarkers();
    }

    public resetLastReparation(): void {
        this.resetMarkers();
        this.overlays.splice(this.overlays.length - 1, 1);
    }

    private removeLastTwoMarkers(): any[] {
        return this.overlays.splice(this.overlays.length - 3, 2);
    }

    // TODO: add information tooltips to markers
    public postNewReparation(): void {
        const lastMarkers = this.resetMarkers();
        const coordinates = this._maps.getCoordinatesFromMarkers(lastMarkers);
        const newReparation: Reparation = {
            from: {
                lat: coordinates[0].lat,
                lng: coordinates[0].lng
            },
            to: {
                lat: coordinates[1].lat,
                lng: coordinates[1].lng
            },
            city: this.currentCity.name,
            startTime: Date.parse(Date())
        };
        this._reparations.insertReparation(newReparation).subscribe();
    }

}
