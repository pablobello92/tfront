import { Segment } from './../interfaces/Range';
import {
    Injectable
} from '@angular/core';
import {
    AppConfig
} from '../../configs/app.config';
import {
    HttpClient
} from '@angular/common/http';
import {
    Observable
} from 'rxjs';
import {
    tap
} from 'rxjs/operators';
import {
    Track
} from '../interfaces/Track';
import {
    IRange,
    SumarizingSegment
} from '../interfaces/Range';
import {
    ColorsService
} from './colors.service';
import {
    CombinedLimit
} from '../interfaces/Limit';
import {
    MapFilter
} from '../interfaces/MapFilter';
import {
    Coordinate
} from '../interfaces/Coordinate';
@Injectable({
    providedIn: 'root'
})
export class MapsService {

    constructor(
        private _colors: ColorsService
    ) {}

    public getDrawableFromRanges(ranges: Segment[]): any[] {
        const limits = this.getRelativeScoreScale(ranges);
        const drawable = ranges.map((range: Segment) => this.mapRangeToDrawable(range, limits));
        return drawable;
    }


    public getCoordinatesFromMarkers(overlays: any[]): Coordinate[] {
        return overlays.map((overlay: any) => < Coordinate > {
            lat: overlay.position.lat(),
            lng: overlay.position.lng()
        });
    }

    public getDrawableFromCoordinates(coordinates: Coordinate[], color: string = '#0097e6'): any {
        return new google.maps.Polyline({
            path: [{
                    lat: coordinates[0].lat,
                    lng: coordinates[0].lng
                },
                {
                    lat: coordinates[1].lat,
                    lng: coordinates[1].lng
                }
            ],
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1,
            strokeWeight: 4
        });
    }

    private mapRangeToDrawable(range: IRange | SumarizingSegment, limits: CombinedLimit): any {
        return new google.maps.Polyline({
            path: [{
                    lat: range.start.lat,
                    lng: range.start.lng
                },
                {
                    lat: range.end.lat,
                    lng: range.end.lng
                }
            ],
            geodesic: true,
            strokeColor: this._colors.getColor(range.score, limits),
            strokeOpacity: 1,
            strokeWeight: 4
        });
    }

    private getRelativeScoreScale(ranges: IRange[] | SumarizingSegment[]): CombinedLimit {
        let min = 100000;
        let max = 0;
        let avg = 0;
        let counter = 0;

        ranges.forEach((range) => {
            const score = range.score;
            if (score > 0) {
                counter++;
                avg += score;
                min = Math.min(min, score);
                max = Math.max(max, score);
            }
        });
        avg = avg / counter;
        const lowerStep = (avg - min) / 4;
        const upperStep = (max - avg) / 4;
        const numericLimit = {
            veryLow: min + lowerStep,
            low: avg - lowerStep,
            medium: avg + upperStep,
            high: max - upperStep
        };
        return this._colors.getCombinedLimits(numericLimit);
    }

}
