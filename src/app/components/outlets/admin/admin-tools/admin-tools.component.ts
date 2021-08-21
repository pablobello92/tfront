import {
    Component
} from '@angular/core';
import {
    MatSnackBar
} from '@angular/material/snack-bar';
import {
    SumarizationsService
} from './../../../../shared/services/sumarizations.service';
import {
    TracksService
} from '../../../../shared/services/tracks.service';
import {
    CookiesService
} from './../../../../shared/services/cookies.service';
import {
    PREDICTION_TYPES
} from 'src/app/configs/app.config';

@Component({
    selector: 'app-admin-tools',
    templateUrl: './admin-tools.component.html',
    styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent {

    private linkedCities: number[] | null = null;

    constructor(
        private _tracks: TracksService,
        private _sumarization: SumarizationsService,
        private _cookies: CookiesService,
        private _snackBar: MatSnackBar
    ) {
        this.linkedCities  = JSON.parse(this._cookies.getCookie('linkedCities'));
    }

    public sumarize(): void {
        const payload = {
            linkedCities: this.linkedCities
        }
        this._sumarization.sumarizeTracks(payload)
            .subscribe((res: any) => {
                this._snackBar.open('Sumarizaciones actualizadas exitosamente.', 'Ok', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                });
            }, (err: any) => {
                this._snackBar.open('Error al intentar actualizar las sumarizaciones.', 'Ok', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                });
            });
    }

    // TODO: add i18n for this
    // TODO: Add success/error/warn classes for the snackbars
    // !Probably this snackbars should be detached into a separate common service!!!
    public predict(anomalies = false): void {
        const payload = {
            type: (anomalies) ? PREDICTION_TYPES.ANOMALIES : PREDICTION_TYPES.ROADS,
            linkedCities: this.linkedCities
        }
        const message = (anomalies) ? 'anomalías' : 'caminos';
        this._tracks.executePrediction(payload)
            .subscribe((res: any) => {
                this._snackBar.open('Predicción exitosa: clasificación de ' + message + '.', 'Ok', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                });
            }, (error: any) => {
                this._snackBar.open('Error al realizar la predicción.', 'Ok', {
                    duration: 1500,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                });
            });
    }
}
