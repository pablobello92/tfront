import {
    Injectable
} from '@angular/core';
import {
    SeverityCategories,
    RoadCategories
} from '../interfaces/Categories';
import {
    ROAD_COLORS
} from '../../../app/configs/app.config';


@Injectable()
export class ColorsService {

    constructor(
    ) {}

    public getColor(score: number, limits: RoadCategories): string {
        if (score === 0) {
            return ROAD_COLORS.NO_EVENT;
        }
        if (score < limits.veryLow.score) {
            return ROAD_COLORS.VERY_LOW;
        }
        if (score < limits.low.score) {
            return ROAD_COLORS.LOW;
        }
        if (score < limits.medium.score) {
            return ROAD_COLORS.MEDIUM;
        }
        if (score < limits.high.score) {
            return ROAD_COLORS.HIGH;
        }
        return ROAD_COLORS.VERY_HIGH;
    }

    public getRoadCategories(limits: SeverityCategories<number>): RoadCategories {
        return <RoadCategories> {
            noEvent: {
                score: 0,
                color: ROAD_COLORS.NO_EVENT
            },
            veryLow: {
                score: limits.veryLow,
                color: ROAD_COLORS.VERY_LOW
            },
            low: {
                score: limits.low,
                color: ROAD_COLORS.LOW
            },
            medium: {
                score: limits.medium,
                color: ROAD_COLORS.MEDIUM
            },
            high: {
                score: limits.high,
                color: ROAD_COLORS.HIGH
            },
            veryHigh: {
                score: limits.veryHigh,
                color: ROAD_COLORS.VERY_HIGH
            }
        };
    }

}
