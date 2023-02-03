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
    switchMap,
    tap
} from 'rxjs/operators';
import {
    MatDatepickerInputEvent
} from '@angular/material/datepicker';
import {
    MatDialog,
    MatDialogContent,
    MatDialogActions
} from '@angular/material/dialog';
import {
    MatButton
} from '@angular/material/button';
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

    public polylines: Polyline[] = [];
    public markers: Marker[] = [];
    public markersPlaced: BehaviorSubject <number> = new BehaviorSubject<number>(0);

    public currentMapOptions: MapOptions | null = null;

    public cities: Observable <City[]> = new Observable <City[]> ();
    public citySubject: BehaviorSubject <City> = new BehaviorSubject <City | null> (null);

    public dateSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date(1520793625606.0));

    constructor(
        private _zone: NgZone,
        private _maps: MapsService,
        private _reparations: ReparationsService,
        private _cities: CitiesService,
        private _common: CommonService,
        public dialog: MatDialog
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
                map((city: City) => <MapOptions>{center: city.center})
            )
            .subscribe((options: MapOptions) => {
                this._common.updateMapSubject(options);
            });

        this._common.getMapSubject()
        .pipe(
            skip(1),
            tap((options: MapOptions) => {
                this.currentMapOptions = options;
            }),
            map(() => <MapFilter>{
                cityId: this.citySubject.value.id,
                startTime: {
                    from: Date.parse(this.dateSubject.value.toDateString())
                }
            }),
            switchMap((filter: MapFilter) => this._reparations.getReparations(filter))
        )
        .subscribe((reparations: Reparation[]) => {
            const drawables = reparations.map((r: Reparation) =>
                this._maps.mapCoordinateToPolyline(<Coordinate[]>[r.from, r.to], '#0097e6', { date: new Date(r.date) })
            );
            this.polylines.push(...drawables);
        });

        this.markersPlaced.asObservable()
            .pipe(
                filter((value: number) => value === 2),
                map(() => this._maps.getCoordinatesFromMarkers(this.markers)),
                map((coordinates: Coordinate[]) => this._maps.mapCoordinateToPolyline(coordinates, 'lime'))
            )
            .subscribe((polyline: Polyline) => {
                this.polylines.push(polyline);
            });
    }

    public onCityChange(c: City): void {
        this.citySubject.next(c);
    }

    public onDateChange($event: MatDatepickerInputEvent<Date>): void {
        this.dateSubject.next($event.value);
    }

    public overlayClicked(polyline: Polyline): void {
        this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Información',
                body: 'Fecha: ' + (<Date>polyline.info.date),
                showCancelButton: false
            }
        });
    }

    public mapReadyHandler(map: google.maps.Map): void {
        this.map = map;
        this.mapClickListener = this.map.addListener('click', ($event: google.maps.MouseEvent) => {
            this._zone.run(() => {
                if (this.markersPlaced.value === 2) {
                    this._common.displaySnackBar('messages.snackbar.admin_tools.reparations.two_markers', 'Ok');
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
                this.markersPlaced.next(this.markersPlaced.value + 1);
            });
        });
    }

    public resetLastReparation(): void {
        this.resetMarkers();
        this.polylines.pop();
    }

    public resetMarkers(): Marker[] {
        this.markersPlaced.next(0);
        return this.markers.splice(0, 2);
    }

    public postNewReparation(): void {
        const lastMarkers = this.resetMarkers();
        const coordinates = this._maps.getCoordinatesFromMarkers(lastMarkers);
        const newReparation: Reparation = {
            cityId: this.citySubject.value.id,
            date: Date.parse(Date()),
            from: {
                lat: coordinates[0].lat,
                lng: coordinates[0].lng
            },
            to: {
                lat: coordinates[1].lat,
                lng: coordinates[1].lng
            }
        };
        this._reparations.insertReparation(newReparation)
            .subscribe((res: any) => {
                const lastReparation = this.polylines.pop();
                lastReparation.strokeColor = '#0097e6';
                this.polylines.push(lastReparation);
                this._common.displaySnackBar('messages.snackbar.admin_tools.reparations.success', 'Ok');
            }, (error: any) => {
                this.polylines.pop();
                this._common.displaySnackBar('messages.snackbar.admin_tools.reparations.error', 'Ok');
            });
    }

    public ngOnDestroy(): void {
        if (this.mapClickListener) {
            this.mapClickListener.remove();
        }
    }
}
