import { Injectable } from '@angular/core';
import { NumericLimit, CombinedLimit, StringLimit } from '../interfaces/Limit';


@Injectable()
export class ColorsService {

    private readonly colorLimits: StringLimit;

    constructor() {
        this.colorLimits = {
            noEvent: '#00ffff', // cyan
            veryLow: '#00ff00', // green
            low: '#ffff00', // yellow
            medium: '#ff8000', // orange
            high: '#ff0000', // red
            veryHigh: '#8000ff'  // purple
        };
    }

    /**
     * The colors are relative to one path? or global?
     * It should be clarified
     */

    public getColor(score: number, limits: CombinedLimit): string {
        if (score === 0) {
            return limits.noEvent.color;
        }
        if (score < limits.veryLow.score) {
            return limits.veryLow.color;
        }
        if (score < limits.low.score) {
            return limits.low.color;
        }
        if (score < limits.medium.score) {
            return limits.medium.color;
        }
        if (score < limits.high.score) {
            return limits.high.color;
        }
        return limits.veryHigh.color;
    }

    /**
     * Messy code
     */
    public getCombinedLimits(limits: NumericLimit): CombinedLimit {
        return <CombinedLimit> {
            noEvent: {
                score: 0,
                color: '#00ffff'
            },
            veryLow: {
                score: limits.veryLow,
                color: '#00ff00'
            },
            low: {
                score: limits.low,
                color: '#ffff00'
            },
            medium: {
                score: limits.medium,
                color: '#ff8000'
            },
            high: {
                score: limits.high,
                color: '#ff0000'
            },
            veryHigh: {
                score: limits.veryHigh,
                color: '#8000ff'
            }
        };
    }

}
