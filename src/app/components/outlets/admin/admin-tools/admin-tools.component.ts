import {
    SumarizationsService
} from './../../../../shared/services/sumarizations.service';
import {
    TracksService
} from '../../../../shared/services/tracks.service';
import {
    Component,
    OnInit
} from '@angular/core';
import {
    MatSnackBar
} from '@angular/material/snack-bar';
@Component({
    selector: 'app-admin-tools',
    templateUrl: './admin-tools.component.html',
    styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent implements OnInit {

    constructor(
        private _tracks: TracksService,
        private _sumarization: SumarizationsService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit() {}

    // TODO: add i18n for this
    // TODO: Add success/error/warn classes for the snackbars
    // !Probably this snackbars should be detached into a separate common service!!!
    public predict(anomalies = false): void {
        if (anomalies) {
            this._tracks.executePrediction_anomalies()
                .subscribe(res => {
                    this._snackBar.open('Predicción exitosa: clasificación de anomalías.', 'Ok', {
                        duration: 1500,
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                    });
                }, err => {
                    this._snackBar.open('Error al realizar la predicción.', 'Ok', {
                        duration: 1500,
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                    });
                });
            return;
        }
        this._tracks.executePrediction_roadTypes()
            .subscribe(res => {
                this._snackBar.open('Predicción exitosa: clasificación de caminos.', 'Ok', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                });
            }, err => {
                this._snackBar.open('Error al realizar la predicción.', 'Ok', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                });
            });
    }

    public sumarize(): void {
        this._sumarization.sumarizeTracks()
            .subscribe(_res => {
                this._snackBar.open('Sumarizaciones actualizadas exitosamente.', 'Ok', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                });
            }, err => {
                this._snackBar.open('Error al intentar actualizar las sumarizaciones.', 'Ok', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                });
            });
    }
}
