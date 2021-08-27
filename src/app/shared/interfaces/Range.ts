import {
    Coordinate
} from './Coordinate';
import {
    StabilityEvent
} from './StabilityEvent';

export interface ISegment {
    date: number;
    start: Coordinate;
    end: Coordinate;
    score: number;
    distance: number;
}

export interface ISumarizingSegment extends ISegment {
    accuracy?: number;
}

export interface IRange extends ISegment {
    speed: number;
    stabilityEvents: StabilityEvent[];
}
