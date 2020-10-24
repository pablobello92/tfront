import { TracksService } from '../../../../shared/services/tracks.service';
import { AdminToolsService } from '../../../../shared/services/adminTools.service';
import { SumarizingObject, Track } from '../../../../shared/interfaces/Track';
import { map } from 'rxjs/operators';
import { IRange, SumarizingSegment } from '../../../../shared/interfaces/Range';
import { getCenter, getDistance } from 'geolib';
import {
    Component,
    OnInit,
    ViewEncapsulation
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
                this.msgs.push({
                    severity: 'success',
                    detail: 'Sumarizaciones actualizadas exitosamente.'
                });
            }, error => {
                this.msgs.push({
                    severity: 'error',
                    detail: 'Error al intentar actualizar las sumarizaciones.'
                });
            });
        }, err => {
            console.error(err);
        });
    }

    private sumarizeByCity(item: SumarizingObject): any {
        const ranges: SumarizingSegment[] = [];
        const tracks = item.tracks;
        tracks.forEach((track: Track) => {
            this.addSumarizedSegmentsByTrack(ranges, track);
        });
        return {
            city: item.city,
            date: Date.parse(new Date().toDateString()),
            ranges
        };
    }

    private addSumarizedSegmentsByTrack(temp: SumarizingSegment[], track: Track): any {
        const startTime = track.startTime;
        const segments: SumarizingSegment[] = track.ranges.map((item: IRange) => this.mapRangeToSumarizingRange(item));
        segments.forEach((segment: SumarizingSegment) => {
            this.addRangeToResult(segment, temp);
        });
    }

    // add Coordinate = { lat/lng } type to elements
    private addRangeToResult(rangeToMerge: SumarizingSegment, subTemp: SumarizingSegment[]): any {
        const midpoint = getCenter([rangeToMerge.start, rangeToMerge.end]);
        const toMerge = subTemp.find((range: SumarizingSegment) => this.shouldMerge(midpoint, range));
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

    private mergeRanges = (oldRange: SumarizingSegment, newRange: SumarizingSegment): void => {
        const NEW_DATA_WEIGHT = 0.6;
        const OLD_DATA_WEIGHT = 1 - NEW_DATA_WEIGHT;
        oldRange.score = oldRange.score * OLD_DATA_WEIGHT + newRange.score * NEW_DATA_WEIGHT;
        oldRange.date = newRange.date;
        oldRange.accuracy++;
    }

    private mapRangeToSumarizingRange = (range: IRange): SumarizingSegment => {
        const {speed, stabilityEvents, ...relevantFields} = range;
        return <SumarizingSegment> {
            ...relevantFields,
            accuracy: 0
        };
    }
}
