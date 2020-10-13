import { TracksService } from '../../../../shared/services/tracksService';
import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'app-admin-tools',
    templateUrl: './admin-tools.component.html',
    styleUrls: ['./admin-tools.component.scss']
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
        .subscribe((res: any) => {
            console.log(res);
        });
    }

    public sumarize(): void {
        alert();
    }

}
