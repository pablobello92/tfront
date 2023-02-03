import {
    ISegment
} from './../interfaces/Range';
import {
    Injectable
} from '@angular/core';
import {
    IRange,
    ISumarizingSegment
} from '../interfaces/Range';
import {
    ColorsService
} from './colors.service';
import {
    Coordinate
} from '../interfaces/Coordinate';
import {
    ColorItem,
    Marker,
    Polyline
} from '../interfaces/Polyline';
@Injectable({
    providedIn: 'root'
})
export class MapsService {

    constructor(
        private _colors: ColorsService
    ) {}

    public getCoordinatesFromMarkers(markers: Marker[]): Coordinate[] {
        return markers.map((marker: Marker) => <Coordinate> {
            lat: marker.lat,
            lng: marker.lng
        });
    }

    public mapCoordinateToPolyline(coordinates: Coordinate[], strokeColor: string, info?: any): Polyline {
        return {
            path: [{
                    lat: coordinates[0].lat,
                    lng: coordinates[0].lng
                },
                {
                    lat: coordinates[1].lat,
                    lng: coordinates[1].lng
                }
            ],
            strokeColor,
            strokeOpacity: 1,
            strokeWeight: 4,
            info
        };
    }

    public mapRangeToPolyline(range: IRange | ISumarizingSegment, colors: ColorItem[]): Polyline {
        return {
            path: [{
                    lat: range.start.lat,
                    lng: range.start.lng
                },
                {
                    lat: range.end.lat,
                    lng: range.end.lng
                }
            ],
            strokeColor: this._colors.getColor(range.score, colors),
            strokeOpacity: 1,
            strokeWeight: 4
        };
    }

    // ? UNUSED: WE'RE USING STATIC LIMITS NOW
    public  getRelativeRoadCategories(ranges: IRange[] | ISumarizingSegment[]): any {
        let max = 0;
        let min = Infinity;
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
        return numericLimit;
    }
}
