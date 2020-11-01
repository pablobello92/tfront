import { SumarizationsService } from './../../../../shared/services/sumarizations.service';
import { TracksService } from '../../../../shared/services/tracks.service';
import {
    Component,
    OnInit
} from '@angular/core';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-admin-tools',
    templateUrl: './admin-tools.component.html',
    styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent implements OnInit {

    msgs: Message[] = [];

    constructor(
        private _tracks: TracksService,
        private _sumarization: SumarizationsService
    ) {}

    ngOnInit() {}

    public predict(anomalies = false): void {
        if (anomalies) {
            alert('anomalies predicted!');
            return;
        }
        this._tracks.executePrediction_roadTypes()
        .subscribe(res => {
            console.log(res);
        }, err => {
            console.error(err);
        });
    }

    public sumarize(): void {
        this._sumarization.sumarizeTracks()
        .subscribe(_res => {
            this.msgs.push({
                severity: 'success',
                detail: 'Sumarizaciones actualizadas exitosamente.'
            });
        }, err => {
            this.msgs.push({
                severity: 'error',
                detail: 'Error al intentar actualizar las sumarizaciones.'
            });
        });
    }
}
