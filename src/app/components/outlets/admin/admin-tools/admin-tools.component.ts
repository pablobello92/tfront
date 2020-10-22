import { TracksService } from '../../../../shared/services/tracks.service';
import { AdminToolsService } from '../../../../shared/services/adminTools.service';
import { SumarizingObject, Track } from '../../../../shared/interfaces/Track';
import { map } from 'rxjs/operators';
import { IRange } from '../../../../shared/interfaces/Range';
import { getCenter, getDistance } from 'geolib';
import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'app-admin-tools',
    templateUrl: './admin-tools.component.html',
    styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent implements OnInit {

    constructor(
        private _tracks: TracksService,
        private _adminTools: AdminToolsService
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
        this._adminTools.getMock()
        .pipe(
            map((mock: SumarizingObject[]) => mock.map((item: SumarizingObject) => this.sumarizeByCity(item)))
        )
        .subscribe((sumarizedObjects: any[]) => {
            console.log(sumarizedObjects);
            this._adminTools.insertSumarizations(sumarizedObjects)
            .subscribe(result => {
                console.log(result);
            }, error => {
                console.error(error);
            });
        }, err => {
            console.error(err);
        });
    }

    private sumarizeByCity(item: SumarizingObject): any {
        const ranges: IRange[] = [];
        const tracks = item.tracks;
        tracks.forEach((track: Track) => {
            this.addSumarizedSegmentsByTrack(ranges, track);
        });
        return {
            city: item.city,
            ranges
        };
    }

    private addSumarizedSegmentsByTrack(temp: IRange[], track: Track): any {
        const startTime = track.startTime;
        const ranges: IRange[] = track.ranges;

        ranges.forEach((range: IRange) => {
            this.addRangeToResult(range, temp);
        });
    }

    // add Coordinate = { lat/lng } type to elements
    private addRangeToResult(rangeToMerge: IRange, subTemp: IRange[]): any {
        const midpoint = getCenter([rangeToMerge.start, rangeToMerge.end]);
        const toMerge = subTemp.find((range: IRange) => this.shouldMerge(midpoint, range));
        if (!toMerge) {
            rangeToMerge.accuracy = 1;
            subTemp.push(rangeToMerge);
        } else {
            this.mergeRanges(toMerge, rangeToMerge);
        }
    }

    private shouldMerge = (point: any, range: any): boolean => {
        const distance = getDistance(range.start, range.end);
        const distanceToStart = getDistance(range.start, point);
        const distanceToEnd = getDistance(range.end, point);
        return distanceToStart < distance && distanceToEnd < distance;
    }

    private mergeRanges = (oldRange: IRange, newRange: IRange): void => {
        const NEW_DATA_WEIGHT = 0.6;
        const OLD_DATA_WEIGHT = 1 - NEW_DATA_WEIGHT;
        oldRange.score = oldRange.score * OLD_DATA_WEIGHT + newRange.score * NEW_DATA_WEIGHT;
        oldRange.date = newRange.date;
        oldRange.accuracy++;
    }
}
