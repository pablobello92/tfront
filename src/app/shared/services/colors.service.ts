import { Injectable } from '@angular/core';
import { SeverityCategories, RoadCategories } from '../interfaces/Categories';
import { AppConfig } from '../../configs/app.config';


@Injectable()
export class ColorsService {

    constructor(
        private _config: AppConfig
    ) {}

    public getColor(score: number, limits: RoadCategories): string {
        if (score === 0) {
            return this._config.roadColors.noEvent;
        }
        if (score < limits.veryLow.score) {
            return this._config.roadColors.veryLow;
        }
        if (score < limits.low.score) {
            return this._config.roadColors.low;
        }
        if (score < limits.medium.score) {
            return this._config.roadColors.medium;
        }
        if (score < limits.high.score) {
            return this._config.roadColors.high;
        }
        return this._config.roadColors.veryHigh;
    }

    public getRoadCategories(limits: SeverityCategories<number>): RoadCategories {
        return <RoadCategories> {
            noEvent: {
                score: 0,
                color: this._config.roadColors.noEvent
            },
            veryLow: {
                score: limits.veryLow,
                color: this._config.roadColors.veryLow
            },
            low: {
                score: limits.low,
                color: this._config.roadColors.low
            },
            medium: {
                score: limits.medium,
                color: this._config.roadColors.medium
            },
            high: {
                score: limits.high,
                color: this._config.roadColors.high
            },
            veryHigh: {
                score: limits.veryHigh,
                color: this._config.roadColors.veryHigh
            }
        };
    }

}
