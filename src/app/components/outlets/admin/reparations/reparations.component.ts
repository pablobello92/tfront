import {
    Component,
    NgZone,
    OnDestroy
} from '@angular/core';
import {
    BehaviorSubject,
    Observable
} from 'rxjs';
import {
    filter,
    map,
    skip,
    tap
} from 'rxjs/operators';
import {
    MatDatepickerInputEvent
} from '@angular/material/datepicker';
import {
    MatDialog
} from '@angular/material/dialog';
import {
    Marker,
    Polyline
} from '../../../../shared/interfaces/Polyline';

import {
    CitiesService
} from '../../../../shared/services/cities.service';
import {
    Reparation
} from '../../../../shared/interfaces/Reparation';
import {
    ReparationsService
} from '../../../../shared/services/reparations.service';
import {
    MapsService
} from '../../../../shared//services/maps.service';
import {
    MapFilter
} from '../../../../shared/interfaces/MapFilter';
import {
    MapOptions,
    City
} from '../../../../shared//interfaces/City';
import {
    Coordinate
} from '../../../../shared//interfaces/Coordinate';
import {
    CommonService
} from '../../../../shared/services/common.service';
import {
    ConfirmDialogComponent
} from '../../../../components/shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-reparations',
    templateUrl: './reparations.component.html',
    styleUrls: ['./reparations.component.scss']
})
export class ReparationsComponent implements OnDestroy {

    public map: google.maps.Map;
    public mapClickListener: google.maps.MapsEventListener | null = null;

    // TODO: remove this mock and use the center subject!
    public currentMapOptions: MapOptions = {
        center: {
            lat: -37.3234275,
            lng: -59.1371982
        },
        zoom: 12
    };

    public polylines: Polyline[] = [];
    public markers: Marker[] = [];

    public markersPlaced: BehaviorSubject <number> = new BehaviorSubject <number> (0);
    public currentMarkerCenter: MapOptions;

    public cities: Observable <City[]> = new Observable <City[]> ();
    public currentCity: City = null;
    private citySubject: BehaviorSubject <City> = new BehaviorSubject <City> (this.currentCity);

    dateFilter = new Date(1520793625606.0);

    constructor(
        private _maps: MapsService,
        private _reparations: ReparationsService,
        private _cities: CitiesService,
        private _common: CommonService,
        public dialog: MatDialog,
        private _zone: NgZone
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
                    return <MapOptions> {
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
                            const coords = <Coordinate[]> [r.from, r.to];
                            return this._maps.mapCoordinateToPolyline(coords);
                        });
                        this.polylines.push(...drawables);
                    });
            });

        this.markersPlaced.asObservable()
        .pipe(
            filter((value: number) => value === 2),
            map(() => {
                const coordinates = this._maps.getCoordinatesFromMarkers(this.markers);
                const overlay = this._maps.mapCoordinateToPolyline(coordinates, 'lime');
                return overlay;
            })
        )
            .subscribe((polyline: Polyline) => {
                this.polylines.push(polyline);
            });
    }

    public changeCurrentCity(c: City): void {
        this.currentCity = c;
        this.citySubject.next(this.currentCity);
    }

    // TODO: this probably would need a refactor
    public onDateChange($event: MatDatepickerInputEvent<Date>): void {
        this.dateFilter = $event.value;
    }

    public overlayClicked(polyline: Polyline): void {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Información',
                body: 'Color: ' + polyline.strokeColor
            }
        });
    }

    public mapReadyHandler(map: google.maps.Map): void {
        this.map = map;
        this.mapClickListener = this.map.addListener('click', ($event: google.maps.MouseEvent) => {
            this._zone.run(() => {
                if (this.markersPlaced.value === 2) {
                    this.currentMapOptions = this.currentMarkerCenter;
                    this._common.displaySnackBar('messages.snackbar.reparations.two_markers', 'Ok');
                    return;
                }
                const coords: Coordinate = {
                    lat: $event.latLng.lat(),
                    lng: $event.latLng.lng()
                };
                const newMarker: Marker = {
                    lat: coords.lat,
                    lng: coords.lng,
                    title: 'Marcador'
                };
                this.markers.push(newMarker);
                this.currentMarkerCenter = <MapOptions> {
                    center: {
                        lat: coords.lat,
                        lng: coords.lng,
                    },
                    zoom: 16
                };
                this.markersPlaced.next(this.markersPlaced.value + 1);
            });
        });
    }

    public resetLastReparation(): void {
        this.resetMarkers();
        this.polylines.splice(this.polylines.length - 1, 1);
    }

    public resetMarkers(): any[] {
        this.markersPlaced.next(0);
        return this.removeLastTwoMarkers();
    }

    private removeLastTwoMarkers(): any[] {
        return this.polylines.splice(this.polylines.length - 3, 2);
    }

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
        this._reparations.insertReparation(newReparation)
            .subscribe((res: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.reparations.success', 'Ok');
            }, (error: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.reparations.error', 'Ok');
            });
    }

    public ngOnDestroy(): void {
        if (this.mapClickListener) {
            this.mapClickListener.remove();
        }
    }
}
