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
    Range
} from '../interfaces/Range';
import {
    ColorsService
} from './colorsService';
import {
    CombinedLimit
} from '../interfaces/Limit';
import {
    MapFilter
} from '../interfaces/MapFilter';
import { Coordinate } from '../interfaces/Coordinate';

declare var google: any;

@Injectable()
export class TracksService {

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig,
        private _colors: ColorsService
    ) {}

    private getRelativeScoreScale(ranges: Range[]): CombinedLimit {
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

    public getCoordinatesFromMarkers(overlays: any[]): Coordinate[] {
        return overlays.map((overlay: any) =>  <Coordinate>{
                lat: overlay.position.lat(),
                lng: overlay.position.lng()
            }
        );
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

    private mapRangeToDrawable(range: Range, limits: CombinedLimit): any {
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

    public getDrawableFromTrack(track: Track): any[] {
        const limits = this.getRelativeScoreScale(track.ranges);
        const drawable = track.ranges.map((range: Range) => this.mapRangeToDrawable(range, limits));
        return drawable;
    }

    public getUserTracks(filterObject: MapFilter): Observable < Track[] > {
        const params = '?username=' + filterObject.user + '&city=' + filterObject.city + '&pages=' + filterObject.pages
        + '&from=' + filterObject.startTime.from + '&to=' + filterObject.startTime.to;
        const endpoint = this.appConfig.server + this.appConfig.endpoints.tracks.get + params;
        return <Observable < Track[] >> this.http.get(endpoint);
    }

    public executePrediction_roadTypes(): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.predictions.roadTypes;
        return <Observable < any >> this.http.get(endpoint)
        .pipe(
            tap(res => {console.log(res);
            })
        );
    }

    public sumarizeTracks(): Observable < any > {
        const endpoint = this.appConfig.server + this.appConfig.endpoints.tracks.sumarize;
        return <Observable < any >> this.http.get(endpoint);
    }

    /**
     *  Asphalt
     * Cobbles
     * Concrete
     * Earth (0..3)
     * /
     private getRoadType(value: number): string {

    }
     /*
     * Call
     * Door
     * Message
     * Pothole
     * 'Speed Bump'
     * 'Street Gutter' (0..5)
    *  */
}
