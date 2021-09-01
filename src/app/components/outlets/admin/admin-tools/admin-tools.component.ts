import {
    Component
} from '@angular/core';
import {
    SumarizationsService
} from './../../../../shared/services/sumarizations.service';
import {
    CookiesService
} from './../../../../shared/services/cookies.service';
import {
    CommonService
} from 'src/app/shared/services/common.service';
import {
    SUMARIZATION_TYPES_VALUE
} from 'src/app/configs/app.config';

@Component({
    selector: 'app-admin-tools',
    templateUrl: './admin-tools.component.html',
    styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent {

    private linkedCities: number[] | null = null;

    constructor(
        private _sumarization: SumarizationsService,
        private _cookies: CookiesService,
        private _common: CommonService
    ) {
        this.linkedCities  = JSON.parse(this._cookies.getCookie('linkedCities'));
    }

    public sumarize(): void {
        const payload = {
            type: SUMARIZATION_TYPES_VALUE.SUMARIZATIONS,
            linkedCities: this.linkedCities
        }
        this._sumarization.executeSumarization(payload)
            .subscribe((res: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.sumarizations.success', 'Ok');
            }, (err: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.sumarizations.error', 'Ok');
            });
    }

    public predict(anomalies = false): void {
        const payload = {
            type: (anomalies) ? SUMARIZATION_TYPES_VALUE.PREDICTION_ANOMALIES : SUMARIZATION_TYPES_VALUE.PREDICTION_ROADS,
            linkedCities: this.linkedCities
        }
        this._sumarization.executePrediction(payload)
            .subscribe((res: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.predictions.success', 'Ok');
            }, (error: any) => {
                this._common.displaySnackBar('messages.snackbar.admin_tools.predictions.error', 'Ok');
            });
    }
}
