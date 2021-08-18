import {
    Component,
    OnInit
} from '@angular/core';
import {
    MapOptions,
    City
} from '../../../../shared//interfaces/City';
import {
    Coordinate
} from '../../../../shared//interfaces/Coordinate';
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
} from '../../../../shared//services/cities.service';
import {
    Reparation
} from '../../../../shared//interfaces/Reparation';
import {
    ReparationsService
} from '../../../../shared//services/reparations.service';
import {
    MapsService
} from '../../../../shared//services/maps.service';
import {
    MapFilter
} from '../../../../shared/interfaces/MapFilter';
import {
    MatDatepickerInputEvent
} from '@angular/material/datepicker';
import {
    MatSnackBar
} from '@angular/material/snack-bar';

/**
 * TODO: The "already marked twice" should be a toaster, or something else asynchronous
 */
@Component({
    selector: 'app-reparations',
    templateUrl: './reparations.component.html',
    styleUrls: ['./reparations.component.scss']
})
export class ReparationsComponent implements OnInit {

    // TODO: remove this mock and use the center subject!
    public currentMapOptions: MapOptions = {
        center: {
            lat: -37.3234275,
            lng: -59.1371982
        },
        zoom: 12
    };

    public overlays: any[] = [];

    private _markersPlaced = 0;
    markersPlaced: BehaviorSubject < number > = new BehaviorSubject < number > (this._markersPlaced);
    private currentMarkerCenter: MapOptions;

    cities: Observable < City[] > = new Observable < City[] > ();
    currentCity: City = null;
    private citySubject: BehaviorSubject < City > = new BehaviorSubject < City > (this.currentCity);

    dateFilter = new Date(1520793625606.0);

    constructor(
        private _maps: MapsService,
        private _reparations: ReparationsService,
        private _cities: CitiesService,
        private _snackBar: MatSnackBar
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
                    return <MapOptions > {
                        center: city.center,
                        zoom: city.zoom
                    };
                })
            )
            .subscribe((newMapCenter: MapOptions) => {
                this.currentMapOptions = newMapCenter;
                const filterObject: MapFilter = {
                    cityId: this.currentCity.id,
                    startTime: {
                        from: Date.parse(this.dateFilter.toDateString())
                    }
                };
                this._reparations.getReparations(filterObject)
                    .subscribe(reparations => {
                        const drawables = reparations.map((r: Reparation) => {
                            const coords = < Coordinate[] > [r.from, r.to];
                            return this._maps.mapCoordinateToPolyline(coords);
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
                    const newOverlay = this._maps.mapCoordinateToPolyline(coordinates, 'lime');
                    this.overlays.push(newOverlay);
                }
            });
    }

    ngOnInit() {}

    public changeCurrentCity(c: City): void {
        this.currentCity = c;
        this.citySubject.next(this.currentCity);
    }

    public overlayClicked($event): void {
        alert('Funcionalidad no implementada.');
    }

    public handleMapClick($event): void {
        alert('funcionalidad comentada hasta adaptar el feature de agregar los dos marcadores al nuevo agm-map');
        /* if (this._markersPlaced === 2) {
            // TODO: take a look at this!!
            this.currentMapOptions = this.currentMarkerCenter;
            this._snackBar.open('Ya se ubicaron dos marcadores. Para corregir, hacer click en reset', 'Ok', {
                duration: 1500,
                horizontalPosition: 'right',
                verticalPosition: 'top',
            });
            return;
        }
        const coords: Coordinate = {
            lat: $event.latLng.lat(),
            lng: $event.latLng.lng()
        };
        const newMarker = new google.maps.Marker({
            position: coords,
            title: 'Desde'
        });
        this.overlays.push(newMarker);

        this.currentMarkerCenter = < MapOptions > {
            center: {
                lat: coords.lat,
                lng: coords.lng,
            },
            zoom: 16
        };
        this._markersPlaced++;
        this.markersPlaced.next(this._markersPlaced); */
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

    // TODO: this probably would need a refactor
    public onDateChange($event: MatDatepickerInputEvent < Date > ): void {
        this.dateFilter = $event.value;
    }
}
