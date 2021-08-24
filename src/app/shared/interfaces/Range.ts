import {
    Coordinate
} from './Coordinate';
import {
    StabilityEvent
} from './StabilityEvent';

export interface Segment {
    date: number;
    start: Coordinate;
    end: Coordinate;
    score: number;
    distance: number;
}

export interface SumarizingSegment extends Segment {
    accuracy?: number;
}

export interface IRange extends Segment {
    speed: number;
    stabilityEvents: StabilityEvent[];
}
