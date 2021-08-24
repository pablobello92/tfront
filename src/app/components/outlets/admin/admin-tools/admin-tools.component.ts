import {
    Component
} from '@angular/core';
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
    CommonService
} from 'src/app/shared/services/common.service';
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
        private _common: CommonService
    ) {
        this.linkedCities  = JSON.parse(this._cookies.getCookie('linkedCities'));
    }

    public sumarize(): void {
        const payload = {
            linkedCities: this.linkedCities
        }
        this._sumarization.sumarizeTracks(payload)
            .subscribe((res: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.sumarizations.success', 'Ok');
            }, (err: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.sumarizations.error', 'Ok');
            });
    }

    // TODO: add i18n for this
    // TODO: Add success/error/warn classes for the snackbars
    public predict(anomalies = false): void {
        const payload = {
            type: (anomalies) ? PREDICTION_TYPES.ANOMALIES : PREDICTION_TYPES.ROADS,
            linkedCities: this.linkedCities
        }
        this._tracks.executePrediction(payload)
            .subscribe((res: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.predictions.success', 'Ok');
            }, (error: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.predictions.error', 'Ok');
            });
    }
}
