import { TracksService } from '../../../../shared/services/tracksService';
import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'app-admin-tools',
    templateUrl: './admin-tools.component.html',
    styleUrls: ['./admin-tools.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminToolsComponent implements OnInit {

    constructor(
        private _tracks: TracksService
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
        this._tracks.sumarizeTracks()
        .subscribe(res => {
            console.log(res);
        }, err => {
            console.error(err);
        });
    }

}
