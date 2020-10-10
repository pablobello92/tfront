import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {
    GMapModule
} from 'primeng/gmap';
import {DropdownModule} from 'primeng/dropdown';
import {
    TracksService
} from 'src/app/shared/services/tracksService';
import {
    ColorsService
} from '../../../../shared/services/colorsService';

import { MapOptions } from '../../../../shared/interfaces/MapOptions';
import { NumericLimit, CombinedLimit } from '../../../../shared/interfaces/Limit';
import { Range } from '../../../../shared/interfaces/Range';
import { Observable, pipe } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { RangesAndLimits } from '../../../../shared/interfaces/RangesAndLimits';
import { Line } from '../../../../shared/interfaces/Line';
import { ColorInfoWidgetComponent } from './color-info-widget/color-info-widget.component';
import { CitiesService } from '../../../../shared/services/citiesService';
import { City } from '../../../../shared/interfaces/City';

declare var google: any;
@Component({
    selector: 'app-user-tracks',
    templateUrl: './user-tracks.component.html',
    styleUrls: ['./user-tracks.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserTracksComponent implements OnInit {

    options: MapOptions;
    overlays = [];
    userName: string;
    nickName: string;
    city: string;
    deltas = 0;
    deltasBySegment = [];
    maxScore = 0;

    public cities: City[] = [];
    public selectedCity: City;

    public segmentLimits: CombinedLimit;

    constructor(
        private _tracks: TracksService,
        private _colors: ColorsService,
        private _cities: CitiesService
    ) {
        this._cities.getCities()
        .subscribe((cities: City[]) => {
            this.cities = cities;
        });
    }

    ngOnInit() {
        this.userName = 'pablo_bello'; // TODO: vincular a nombre real desde las cookies, idem a user edit
        this.nickName = 'Pablo Bello';

        // TODO: set the city manually: probably you are in Azul but want to see your Tandil Tracks!
        this.city = 'Tandil';

        this.options = {
            center: {
                lat: -37.325884,
                lng: -59.147160
            },
            zoom: 13
        };
    }

    public fetchTracks(): void {
        this._tracks.getTracks(this.userName, this.city)
        .subscribe((ranges: Range[]) => {
            console.log(ranges);
            this.maxScore = this.getMaxValue(ranges);
            this.segmentLimits = this.setRelativeScoreScale(ranges);
            this.overlays = ranges.map((range: Range) =>  this.mapRangeToPolyLine(range));
        }, err => {
            console.error(err);
        });
    }

    /*
    * TODO: ver si puedo descartar los ejes x,y de los datos de acelerometro
    */
    private mapRangeToPolyLine(range: Range): any {
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
            strokeColor: this._colors.getColor(range.score, this.segmentLimits),
            strokeOpacity: 1,
            strokeWeight: 4
        });
    }

    // Obtengo el score maximo para asi armar los rangos de colores (AL FINAL NO LO USÉ)
    private getMaxValue(ranges: Range[]): number {
        let max = 0;
        ranges.forEach(element => {
            if (element.score > max) {
                max = element.score;
            }
        });
        return max;
    }

    private setRelativeScoreScale(ranges: Range[]): CombinedLimit {
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
